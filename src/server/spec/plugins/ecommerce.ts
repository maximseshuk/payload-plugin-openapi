import type { OperationObject, ParameterObject, SchemaObject } from '@scalar/openapi-types/3.2'

import { ERROR_SCHEMA_NAME, errorResponses, jsonBody, jsonResponse } from '@/server/spec/components.js'
import { refTo, schemaName } from '@/server/spec/names.js'
import { securedRequirement } from '@/server/spec/security.js'
import type { MessageKey } from '@/shared/translations/types.js'
import { upperFirst } from '@/shared/utils.js'

import { type OfficialPlugin, collectionGroups, idSchema, messageErrors, mountEndpoints } from './shared.js'
import { stripeWebhookOperation } from './stripe.js'

const TAG = 'Ecommerce'

const PAYMENT_PATH = /^\/payments\/([^/]+)\/(initiate|confirm-order)$/

const CART_OPERATIONS: Record<string, { operationId: string; summary: MessageKey }> = {
  '/:id/add-item': { operationId: 'addItem', summary: 'ecommerceAddItem' },
  '/:id/remove-item': { operationId: 'removeItem', summary: 'ecommerceRemoveItem' },
  '/:id/update-item': { operationId: 'updateItem', summary: 'ecommerceUpdateItem' },
  '/:id/clear': { operationId: 'clear', summary: 'ecommerceClearCart' },
  '/:id/merge': { operationId: 'merge', summary: 'ecommerceMergeCart' },
}

export const ecommerce: OfficialPlugin = {
  slug: '@payloadcms/plugin-ecommerce',
  tag: TAG,
  build: ({ config, collections, ctx, schemas, t }) => {
    const id = idSchema(ctx)
    const secret: SchemaObject = { type: 'string' }
    const failure: SchemaObject = {
      type: 'object',
      properties: { message: { type: 'string' }, success: { type: 'boolean', enum: [false] } },
      required: ['message', 'success'],
    }

    const cartBodies: Record<string, SchemaObject> = {
      '/:id/add-item': {
        type: 'object',
        properties: {
          item: {
            type: 'object',
            additionalProperties: true,
            properties: { product: id, variant: id },
            required: ['product'],
          },
          quantity: { type: 'number', default: 1 },
          secret,
        },
        required: ['item'],
      },
      '/:id/remove-item': {
        type: 'object',
        properties: { itemID: { type: 'string' }, secret },
        required: ['itemID'],
      },
      '/:id/update-item': {
        type: 'object',
        properties: {
          itemID: { type: 'string' },
          quantity: {
            description: t('ecommerceQuantity'),
            oneOf: [
              { type: 'number' },
              { type: 'object', properties: { $inc: { type: 'number' } }, required: ['$inc'] },
            ],
          },
          removeOnZero: { type: 'boolean', default: true },
          secret,
        },
        required: ['itemID', 'quantity'],
      },
      '/:id/clear': { type: 'object', properties: { secret } },
      '/:id/merge': {
        type: 'object',
        properties: { sourceCartID: id, sourceSecret: { type: 'string' } },
        required: ['sourceCartID', 'sourceSecret'],
      },
    }

    const cartGroups = collectionGroups(
      collections.filter((c) =>
        (c.endpoints || []).some((endpoint) => endpoint.method === 'post' && endpoint.path === '/:id/add-item'),
      ),
      ctx,
      ({ method, path }, collection): OperationObject | undefined => {
        const meta = CART_OPERATIONS[path]
        if (!meta || method !== 'post') return undefined
        const name = schemaName(collection.slug)
        const merge = path === '/:id/merge'
        const cart: SchemaObject = schemas[name]
          ? { $ref: refTo(name) }
          : { type: 'object', additionalProperties: true }
        const param: ParameterObject = { name: 'id', in: 'path', required: true, schema: id }
        return {
          tags: [TAG],
          operationId: `${meta.operationId}${name}`,
          summary: t(meta.summary),
          description: merge ? undefined : t('ecommerceCartAccess'),
          parameters: [param],
          requestBody: { ...jsonBody(cartBodies[path]!), required: path !== '/:id/clear' },
          responses: {
            '200': jsonResponse(t('ecommerceCartResult'), {
              type: 'object',
              properties: { cart, message: { type: 'string' }, success: { type: 'boolean', enum: [true] } },
              required: ['cart', 'message', 'success'],
            }),
            ...messageErrors(merge ? ['400', '401'] : ['400'], t, failure),
            ...errorResponses(['403'], t),
            '404': jsonResponse(t('error404Ecommerce'), {
              oneOf: [
                {
                  type: 'object',
                  properties: { cart: { type: ['object', 'null'] }, ...failure.properties },
                  required: ['cart', 'message', 'success'],
                },
                { $ref: refTo(ERROR_SCHEMA_NAME) },
              ],
            }),
          },
          ...(merge ? { security: securedRequirement() } : {}),
        }
      },
    )

    const address: SchemaObject = { type: 'object', additionalProperties: true }
    const paymentBody = (extra: Record<string, SchemaObject>) => ({
      ...jsonBody({
        type: 'object',
        additionalProperties: true,
        properties: {
          cartID: id,
          secret,
          customerEmail: { type: 'string', format: 'email' },
          billingAddress: address,
          shippingAddress: address,
          ...extra,
        },
        ...(Object.keys(extra).length > 0 ? { required: Object.keys(extra) } : {}),
      }),
      description: t('ecommercePaymentBody'),
    })

    const payments = mountEndpoints(config.endpoints, ctx.apiRoute, ({ method, path }) => {
      if (method !== 'post') return undefined
      if (path === '/payments/stripe/webhooks') {
        return stripeWebhookOperation({ tag: TAG, operationId: 'ecommerceStripeWebhooks', t })
      }
      const match = PAYMENT_PATH.exec(path)
      if (!match) return undefined
      const [, methodName = '', step] = match
      const stripe = methodName === 'stripe'
      const suffix = upperFirst(methodName.replace(/[^A-Za-z0-9]+(.)?/g, (_, c: string = '') => c.toUpperCase()))
      if (step === 'initiate') {
        return {
          tags: [TAG],
          operationId: `initiatePayment${suffix}`,
          summary: t('ecommerceInitiatePayment', { method: methodName }),
          requestBody: paymentBody({}),
          responses: {
            '200': jsonResponse(t('ecommerceInitiateResult'), {
              type: 'object',
              additionalProperties: true,
              properties: {
                message: { type: 'string' },
                ...(stripe ? { clientSecret: { type: 'string' }, paymentIntentID: { type: 'string' } } : {}),
              },
              required: ['message'],
            }),
            ...messageErrors(['400', '404', '500'], t),
          },
        }
      }
      return {
        tags: [TAG],
        operationId: `confirmOrder${suffix}`,
        summary: t('ecommerceConfirmOrder', { method: methodName }),
        requestBody: paymentBody(stripe ? { paymentIntentID: { type: 'string' } } : {}),
        responses: {
          '200': jsonResponse(t('ecommerceConfirmResult'), {
            type: 'object',
            additionalProperties: true,
            properties: {
              message: { type: 'string' },
              orderID: id,
              transactionID: id,
              ...(stripe ? { accessToken: { type: 'string' } } : {}),
            },
            required: ['message', 'orderID', 'transactionID'],
          }),
          ...messageErrors(['400', '404', '500'], t),
        },
      }
    })

    return [{ paths: payments }, ...cartGroups]
  },
}

import type { OperationObject, SchemaObject } from '@scalar/openapi-types/3.2'

import { jsonBody, jsonResponse } from '@/server/spec/components.js'
import { securedRequirement } from '@/server/spec/security.js'
import type { Translate } from '@/shared/translations/types.js'

import { type OfficialPlugin, messageErrors, mountEndpoints } from './shared.js'

const TAG = 'Stripe'

export const stripeWebhookOperation = ({
  tag,
  operationId,
  t,
}: {
  tag: string
  operationId: string
  t: Translate
}): OperationObject => {
  const received: SchemaObject = {
    type: 'object',
    properties: { received: { type: 'boolean' } },
    required: ['received'],
  }
  return {
    tags: [tag],
    operationId,
    summary: t('stripeWebhook'),
    parameters: [{ name: 'stripe-signature', in: 'header', schema: { type: 'string' } }],
    requestBody: {
      ...jsonBody({ type: 'object', additionalProperties: true }),
      description: t('stripeWebhookBody'),
    },
    responses: {
      '200': jsonResponse(t('stripeWebhookResult'), received),
      '400': jsonResponse(t('error400StripeWebhook'), received),
    },
  }
}

export const stripe: OfficialPlugin = {
  slug: '@payloadcms/plugin-stripe',
  tag: TAG,
  build: ({ config, ctx, options, t }) => {
    const rest = options?.rest as { allowedMethods?: unknown } | undefined
    const allowed = Array.isArray(rest?.allowedMethods) ? (rest.allowedMethods as string[]) : undefined
    const restOperation: OperationObject = {
      tags: [TAG],
      operationId: 'stripeRest',
      summary: t('stripeRest'),
      requestBody: jsonBody({
        type: 'object',
        properties: {
          stripeMethod: { type: 'string', ...(allowed ? { enum: [...new Set(allowed)] } : {}) },
          stripeArgs: { type: 'array', items: {} },
        },
        required: ['stripeMethod', 'stripeArgs'],
      }),
      responses: {
        '200': jsonResponse(t('stripeRestResult'), {
          type: 'object',
          properties: { data: {}, status: { type: 'integer', enum: [200] } },
          required: ['data', 'status'],
        }),
        ...messageErrors(['400', '401', '403'], t),
        '404': jsonResponse(t('error404StripeRest'), {
          type: 'object',
          properties: { message: { type: 'string' }, status: { type: 'integer', enum: [404] } },
          required: ['message', 'status'],
        }),
        ...messageErrors(['500'], t),
      },
      security: securedRequirement(),
    }
    return [
      {
        paths: mountEndpoints(config.endpoints, ctx.apiRoute, ({ method, path }) => {
          if (method !== 'post') return undefined
          if (path === '/stripe/webhooks') return stripeWebhookOperation({ tag: TAG, operationId: 'stripeWebhooks', t })
          return path === '/stripe/rest' ? restOperation : undefined
        }),
      },
    ]
  },
}

import type { OperationObject, SchemaObject } from '@scalar/openapi-types/3.2'

import { errorResponses, jsonBody, jsonResponse } from '@/server/spec/components.js'
import { securedRequirement } from '@/server/spec/security.js'
import type { MessageKey } from '@/shared/translations/types.js'

import { type OfficialPlugin, idSchema, mountEndpoints } from './shared.js'

const TAG = 'SEO'

const GENERATORS: Record<string, { operationId: string; summary: MessageKey; image?: boolean }> = {
  '/plugin-seo/generate-title': { operationId: 'seoGenerateTitle', summary: 'seoTitle' },
  '/plugin-seo/generate-description': { operationId: 'seoGenerateDescription', summary: 'seoDescription' },
  '/plugin-seo/generate-url': { operationId: 'seoGenerateUrl', summary: 'seoUrl' },
  '/plugin-seo/generate-image': { operationId: 'seoGenerateImage', summary: 'seoImage', image: true },
}

export const seo: OfficialPlugin = {
  slug: '@payloadcms/plugin-seo',
  tag: TAG,
  build: ({ config, ctx, t }) => {
    const id = idSchema(ctx)
    const operation = (path: string): OperationObject | undefined => {
      const generator = GENERATORS[path]
      if (!generator) return undefined
      const result: SchemaObject = generator.image
        ? { oneOf: [{ type: 'string' }, { type: 'number' }, { type: 'object', additionalProperties: true }] }
        : { type: 'string' }
      return {
        tags: [TAG],
        operationId: generator.operationId,
        summary: t(generator.summary),
        requestBody: {
          ...jsonBody({
            type: 'object',
            additionalProperties: true,
            properties: {
              id: { oneOf: [{ type: 'string' }, { type: 'number' }] },
              collectionSlug: { type: 'string' },
              globalSlug: { type: 'string' },
              doc: { type: 'object', additionalProperties: true, properties: { id } },
              locale: { type: 'string' },
              title: { type: 'string' },
            },
          }),
          description: t('seoBody'),
        },
        responses: {
          '200': jsonResponse(t('seoResult'), {
            type: 'object',
            properties: { result },
            required: ['result'],
          }),
          ...errorResponses(['401', '403', '500'], t),
        },
        security: securedRequirement(),
      }
    }
    return [
      {
        paths: mountEndpoints(config.endpoints, ctx.apiRoute, (endpoint) =>
          endpoint.method === 'post' ? operation(endpoint.path) : undefined,
        ),
      },
    ]
  },
}

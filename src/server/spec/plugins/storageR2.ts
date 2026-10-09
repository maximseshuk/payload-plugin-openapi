import type { OperationObject, ParameterObject } from '@scalar/openapi-types/3.2'

import { errorResponses } from '@/server/spec/components.js'
import { securedRequirement } from '@/server/spec/security.js'

import { type OfficialPlugin, mountEndpoints } from './shared.js'

const TAG = 'Storage R2'

const UPLOAD_PATH = /^\/storage-r2-multi-part-upload(?:-(\d+))?$/

const query = (name: string, required: boolean, type: 'string' | 'integer' = 'string'): ParameterObject => ({
  name,
  in: 'query',
  required,
  schema: { type },
})

export const storageR2: OfficialPlugin = {
  slug: '@payloadcms/storage-r2',
  tag: TAG,
  installed: (config) => (config.storage ?? []).some((adapter) => adapter?.name === 'r2'),
  build: ({ config, ctx, t }) => {
    const upload = (suffix: string): OperationObject => ({
      tags: [TAG],
      operationId: `r2MultipartUpload${suffix}`,
      summary: t('r2Upload'),
      description: t('r2UploadDesc'),
      parameters: [
        query('collection', true),
        query('fileName', true),
        query('fileType', true),
        query('docPrefix', false),
        query('multipartId', false),
        query('multipartKey', false),
        query('multipartNumber', false, 'integer'),
        query('signedReceipt', false),
      ],
      requestBody: {
        content: {
          'application/octet-stream': { schema: { type: 'string', format: 'binary' } },
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: { partNumber: { type: 'integer' }, etag: { type: 'string' } },
                required: ['partNumber', 'etag'],
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: t('r2UploadResult'),
          content: {
            'application/json': {
              schema: {
                type: 'object',
                additionalProperties: true,
                properties: {
                  filename: { type: 'string' },
                  key: { type: 'string' },
                  uploadId: { type: 'string' },
                  uploadReference: { type: 'object', additionalProperties: true },
                  partNumber: { type: 'integer' },
                  etag: { type: 'string' },
                },
              },
            },
            'text/plain': { schema: { type: 'string' } },
          },
        },
        ...errorResponses(['400', '403', '500'], t),
        '412': { description: t('errorR2412'), content: { 'text/plain': { schema: { type: 'string' } } } },
      },
      security: securedRequirement(),
    })
    return [
      {
        paths: mountEndpoints(config.endpoints, ctx.apiRoute, ({ method, path }) => {
          const match = UPLOAD_PATH.exec(path)
          return method === 'post' && match ? upload(match[1] ?? '') : undefined
        }),
      },
    ]
  },
}

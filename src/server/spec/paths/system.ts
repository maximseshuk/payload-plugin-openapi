import type { PathsObject, ResponsesObject } from '@scalar/openapi-types/3.2'

import { SECURITY_SCHEME_NAME, errorResponses, jsonBody, jsonResponse } from '@/server/spec/components.js'
import { makeT } from '@/shared/translations/index.js'
import type { BuildContext } from '@/shared/types/index.js'

export const buildSystemPaths = ({
  ctx,
  access,
  uploadSlugs,
}: {
  ctx: BuildContext
  access: boolean
  uploadSlugs: string[]
}): PathsObject => {
  const t = makeT(ctx.i18n)
  const paths: PathsObject = {}

  if (access) {
    paths[`${ctx.apiRoute}/access`] = {
      get: {
        tags: ['Access'],
        operationId: 'access',
        responses: {
          '200': jsonResponse(t('authAccess'), { type: 'object', additionalProperties: true }),
          ...errorResponses(['500'], t),
        },
      },
    }
  }

  if (uploadSlugs.length > 0) {
    const staged: ResponsesObject = {
      '204': { description: t('uploadStageResult') },
      ...errorResponses(['400', '500'], t),
    }

    paths[`${ctx.apiRoute}/upload-instructions`] = {
      post: {
        tags: ['Uploads'],
        operationId: 'getUploadInstructions',
        summary: t('uploadInstructionsSummary'),
        requestBody: jsonBody({
          type: 'object',
          additionalProperties: false,
          properties: {
            collectionSlug: { type: 'string', enum: uploadSlugs },
            docPrefix: { type: 'string' },
            filename: { type: 'string' },
            filesize: { type: 'integer', minimum: 0 },
            mimeType: { type: 'string' },
          },
          required: ['collectionSlug', 'filename', 'filesize', 'mimeType'],
        }),
        responses: {
          '200': jsonResponse(t('uploadInstructionsResult'), {
            type: 'object',
            properties: {
              type: { type: 'string', enum: ['http', 'dispatch'] },
              file: {
                type: 'object',
                properties: {
                  filename: { type: 'string' },
                  mimeType: { type: 'string' },
                  size: { type: 'integer' },
                  uploadReference: { type: 'object', additionalProperties: true },
                },
                required: ['filename', 'mimeType', 'size', 'uploadReference'],
              },
              request: {
                type: 'object',
                properties: {
                  method: { type: 'string', enum: ['POST', 'PUT'] },
                  url: { type: 'string' },
                  headers: { type: 'object', additionalProperties: { type: 'string' } },
                },
                required: ['method', 'url'],
              },
              name: { type: 'string' },
              data: {},
            },
            required: ['type', 'file'],
          }),
          ...errorResponses(['400', '403', '500'], t),
        },
        security: [{ [SECURITY_SCHEME_NAME]: [] }],
      },
    }
    paths[`${ctx.apiRoute}/upload-instructions/{uploadId}`] = {
      parameters: [{ name: 'uploadId', in: 'path', required: true, schema: { type: 'string' } }],
      put: {
        tags: ['Uploads'],
        operationId: 'uploadStagedFile',
        summary: t('uploadStagePutSummary'),
        requestBody: {
          required: true,
          content: { '*/*': { schema: { type: 'string', format: 'binary' } } },
        },
        responses: staged,
        security: [{ [SECURITY_SCHEME_NAME]: [] }],
      },
      delete: {
        tags: ['Uploads'],
        operationId: 'deleteStagedFile',
        summary: t('uploadStageDeleteSummary'),
        responses: staged,
        security: [{ [SECURITY_SCHEME_NAME]: [] }],
      },
    }
  }

  return paths
}

import type {
  ReferenceObject,
  RequestBodyObject,
  ResponseObject,
  ResponsesObject,
  SchemaObject,
  SecuritySchemeObject,
} from '@scalar/openapi-types/3.2'

import type { Translate } from '../translations/types.js'
import { refTo } from './names.js'

type SchemaOrRef = SchemaObject | ReferenceObject

export const nullableType = (type: 'integer' | 'string' | 'number' | 'boolean'): SchemaObject => ({
  type: [type, 'null'],
})

export const jsonResponse = (description: string, schema: SchemaOrRef): ResponseObject => ({
  description,
  content: { 'application/json': { schema } },
})

export const jsonOk = (description: string, schema: SchemaOrRef): ResponsesObject => ({
  '200': jsonResponse(description, schema),
})

export const jsonBody = (schema: SchemaOrRef): RequestBodyObject => ({
  required: true,
  content: { 'application/json': { schema } },
})

export const messageResponse = (description: string): ResponsesObject =>
  jsonOk(description, { type: 'object', properties: { message: { type: 'string' } } })

export type ErrorCode = '400' | '401' | '403' | '404' | '500'

export const ERROR_SCHEMA_NAME = 'ErrorResponse'

const ERROR_KEYS = {
  '400': 'error400',
  '401': 'error401',
  '403': 'error403',
  '404': 'error404',
  '500': 'error500',
} as const

export const ERRORS = {
  list: ['400', '403', '500'] as ErrorCode[],
  read: ['403', '404', '500'] as ErrorCode[],
  create: ['400', '403', '500'] as ErrorCode[],
  update: ['400', '403', '404', '500'] as ErrorCode[],
  delete: ['403', '404', '500'] as ErrorCode[],
  globalRead: ['403', '500'] as ErrorCode[],
  globalUpdate: ['400', '403', '500'] as ErrorCode[],
  login: ['400', '401', '403', '500'] as ErrorCode[],
  session: ['401', '500'] as ErrorCode[],
  authAction: ['400', '403', '500'] as ErrorCode[],
  versionList: ['400', '403', '404', '500'] as ErrorCode[],
  versionRead: ['403', '404', '500'] as ErrorCode[],
  versionRestore: ['403', '404', '500'] as ErrorCode[],
} as const

export const buildErrorResponseSchema = (): SchemaObject => ({
  type: 'object',
  properties: {
    errors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          name: { type: 'string' },
          field: { type: 'string' },
          data: { type: 'object', additionalProperties: true },
        },
        required: ['message'],
      },
    },
  },
  required: ['errors'],
})

const errorRef: ReferenceObject = { $ref: refTo(ERROR_SCHEMA_NAME) }

const errorContent = (description: string): ResponseObject => ({
  description,
  content: { 'application/json': { schema: errorRef } },
})

export const errorResponses = (codes: ErrorCode[], t: Translate): ResponsesObject => {
  const responses: ResponsesObject = {}
  for (const code of codes) responses[code] = errorContent(t(ERROR_KEYS[code]))
  return responses
}

export const buildListEnvelopeSchema = (base: string): SchemaObject => ({
  type: 'object',
  properties: {
    docs: { type: 'array', items: { $ref: refTo(base) } },
    totalDocs: { type: 'integer' },
    limit: { type: 'integer' },
    totalPages: { type: 'integer' },
    page: { type: 'integer' },
    pagingCounter: { type: 'integer' },
    hasPrevPage: { type: 'boolean' },
    hasNextPage: { type: 'boolean' },
    prevPage: nullableType('integer'),
    nextPage: nullableType('integer'),
  },
  required: ['docs', 'totalDocs', 'limit', 'totalPages', 'page'],
})

export const uploadRequestBody = ({
  bodyRef,
  fileRequired,
  t,
}: {
  bodyRef: ReferenceObject
  fileRequired: boolean
  t: Translate
}): RequestBodyObject => {
  const fieldsSchemaName = bodyRef.$ref.split('/').pop() ?? 'the document'
  return {
    required: fileRequired,
    description: t('uploadBody'),
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
              description: t('uploadFile'),
            },
            _payload: {
              allOf: [bodyRef],
              description: t('uploadPayloadField', { schema: fieldsSchemaName }),
            },
          },
          ...(fileRequired ? { required: ['file'] } : {}),
        },
        encoding: {
          file: { contentType: 'application/octet-stream' },
          _payload: { contentType: 'application/json' },
        },
      },
      'application/json': { schema: bodyRef },
    },
  }
}

export const SECURITY_SCHEME_NAME = 'PayloadToken'
export const INTERACTIVE_SCHEME_NAME = 'PayloadLogin'

export const interactiveSecurityScheme = ({
  tokenUrl,
  t,
}: {
  tokenUrl: string
  t: Translate
}): SecuritySchemeObject => ({
  type: 'oauth2',
  description: t('securityInteractive'),
  flows: { password: { tokenUrl, scopes: {} } },
})

export const securityScheme = ({ cookiePrefix, t }: { cookiePrefix: string; t: Translate }): SecuritySchemeObject => ({
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
  description: t('securityBearer', { cookiePrefix }),
})

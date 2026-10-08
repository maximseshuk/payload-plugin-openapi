import type {
  OperationObject,
  PathsObject,
  ReferenceObject,
  ResponsesObject,
  SchemaObject,
} from '@scalar/openapi-types/3.2'
import type { SanitizedCollectionConfig } from 'payload'

import {
  ERRORS,
  type ErrorCode,
  SECURITY_SCHEME_NAME,
  errorResponses,
  jsonBody,
  jsonResponse,
  messageResponse,
} from '@/server/spec/components.js'
import { refTo, schemaName } from '@/server/spec/names.js'
import { authTagName } from '@/server/spec/tags.js'
import { makeT } from '@/shared/translations/index.js'
import type { BuildContext } from '@/shared/types/index.js'

const LOCAL_STRATEGY_ROUTES = ['login', 'forgot-password', 'reset-password', 'first-register', 'unlock', 'verify/{id}']

const identifierBody = (
  auth: SanitizedCollectionConfig['auth'],
  extra: Record<string, SchemaObject> = {},
): SchemaObject => {
  const email: SchemaObject = { type: 'string', format: 'email' }
  const username: SchemaObject = { type: 'string' }
  const extraRequired = Object.keys(extra)
  const loginWithUsername = auth?.loginWithUsername
  const base = { type: 'object', additionalProperties: false } as const

  if (!loginWithUsername) {
    return { ...base, properties: { email, ...extra }, required: ['email', ...extraRequired] }
  }
  if (typeof loginWithUsername === 'object' && loginWithUsername.allowEmailLogin) {
    return {
      ...base,
      properties: { email, username, ...extra },
      ...(extraRequired.length > 0 ? { required: extraRequired } : {}),
      anyOf: [{ required: ['email'] }, { required: ['username'] }],
    }
  }
  return { ...base, properties: { username, ...extra }, required: ['username', ...extraRequired] }
}

export const buildAuthPaths = ({
  collection,
  ctx,
  includeAdmin,
  nestedTags,
}: {
  collection: SanitizedCollectionConfig
  ctx: BuildContext
  includeAdmin: boolean
  nestedTags: boolean
}): PathsObject => {
  const auth = collection.auth
  if (!auth) return {}

  const t = makeT(ctx.i18n)
  const name = schemaName(collection.slug)
  const base = `${ctx.apiRoute}/${collection.slug}`
  const tag = [nestedTags ? authTagName(name) : name]
  const userRef: ReferenceObject = { $ref: refTo(name) }

  const op = (
    operationId: string,
    codes: ErrorCode[],
    extra: Omit<OperationObject, 'tags' | 'operationId'> & { responses: ResponsesObject },
  ): OperationObject => ({
    tags: tag,
    operationId,
    ...extra,
    responses: { ...extra.responses, ...errorResponses(codes, t) },
  })

  const paths: PathsObject = {
    [`${base}/login`]: {
      post: op(`login${name}`, ERRORS.login, {
        requestBody: jsonBody(identifierBody(auth, { password: { type: 'string' } })),
        responses: {
          '200': jsonResponse(t('authLogin'), {
            type: 'object',
            properties: {
              message: { type: 'string' },
              user: userRef,
              token: { type: 'string' },
              exp: { type: 'integer' },
            },
          }),
        },
      }),
    },
    [`${base}/logout`]: {
      post: op(`logout${name}`, ERRORS.session, { responses: messageResponse(t('authLogout')) }),
    },
    [`${base}/me`]: {
      get: op(`me${name}`, ERRORS.session, {
        responses: {
          '200': jsonResponse(t('authMe'), {
            type: 'object',
            properties: {
              user: userRef,
              collection: { type: 'string' },
              token: { type: 'string' },
              exp: { type: 'integer' },
            },
          }),
        },
      }),
    },
    [`${base}/refresh-token`]: {
      post: op(`refreshToken${name}`, ERRORS.session, {
        responses: {
          '200': jsonResponse(t('authRefreshToken'), {
            type: 'object',
            properties: {
              message: { type: 'string' },
              refreshedToken: { type: 'string' },
              exp: { type: 'integer' },
              user: userRef,
            },
          }),
        },
      }),
    },
    [`${base}/forgot-password`]: {
      post: op(`forgotPassword${name}`, ERRORS.authAction, {
        requestBody: jsonBody(identifierBody(auth)),
        responses: messageResponse(t('authForgotPassword')),
      }),
    },
    [`${base}/reset-password`]: {
      post: op(`resetPassword${name}`, ERRORS.authAction, {
        requestBody: jsonBody({
          type: 'object',
          additionalProperties: false,
          properties: { token: { type: 'string' }, password: { type: 'string' } },
          required: ['token', 'password'],
        }),
        responses: {
          '200': jsonResponse(t('authResetPassword'), {
            type: 'object',
            properties: {
              message: { type: 'string' },
              token: { type: 'string' },
              user: userRef,
            },
          }),
        },
      }),
    },
  }

  if (includeAdmin) {
    paths[`${base}/first-register`] = {
      post: op(`firstRegister${name}`, ERRORS.create, {
        requestBody: jsonBody({ $ref: refTo(`${name}Create`) } as SchemaObject),
        responses: {
          '200': jsonResponse(t('authFirstRegister'), {
            type: 'object',
            properties: {
              message: { type: 'string' },
              user: userRef,
              token: { type: 'string' },
              exp: { type: 'integer' },
            },
          }),
        },
      }),
    }
    paths[`${base}/init`] = {
      get: op(`init${name}`, ERRORS.session, {
        responses: {
          '200': jsonResponse(t('authInit'), {
            type: 'object',
            properties: { initialized: { type: 'boolean' } },
          }),
        },
      }),
    }
  }

  paths[`${base}/unlock`] = {
    post: op(`unlock${name}`, ERRORS.authAction, {
      requestBody: jsonBody(identifierBody(auth)),
      responses: messageResponse(t('authUnlock')),
    }),
  }

  if (auth.verify) {
    paths[`${base}/verify/{id}`] = {
      post: op(`verify${name}`, ERRORS.authAction, {
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: messageResponse(t('authVerify')),
      }),
    }
  }

  if (auth.disableLocalStrategy) {
    for (const route of LOCAL_STRATEGY_ROUTES) delete paths[`${base}/${route}`]
  }

  if (typeof auth.useAPIKey === 'object' && auth.useAPIKey.reveal === true) {
    const errorBody = (description: string) =>
      jsonResponse(description, { type: 'object', properties: { error: { type: 'string' } } })
    paths[`${base}/{id}/api-key/reveal`] = {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: ctx.defaultIDType === 'number' ? 'integer' : 'string' },
        },
      ],
      post: {
        tags: tag,
        operationId: `revealApiKey${name}`,
        responses: {
          '200': jsonResponse(t('apiKeyReveal'), {
            type: 'object',
            properties: { apiKey: { type: 'string' } },
            required: ['apiKey'],
          }),
          '403': errorBody(t('error403')),
          '404': errorBody(t('error404')),
          ...errorResponses(['500'], t),
        },
        security: [{ [SECURITY_SCHEME_NAME]: [] }],
      },
    }
  }

  return paths
}

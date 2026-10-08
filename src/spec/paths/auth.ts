import type { SanitizedCollectionConfig } from 'payload'
import type {
  OperationObject,
  PathsObject,
  ReferenceObject,
  ResponsesObject,
  SchemaObject,
} from '@scalar/openapi-types/3.2'

import type { BuildContext } from '../../types.js'
import { makeT } from '../../translations/index.js'
import { ERRORS, type ErrorCode, errorResponses, jsonBody, jsonResponse, messageResponse } from '../components.js'
import { refTo, schemaName } from '../names.js'
import { authTagName } from '../tags.js'

const identifierProps = (
  auth: SanitizedCollectionConfig['auth'],
): {
  properties: Record<string, SchemaObject>
  required: string[]
} => {
  const loginWithUsername = Boolean(auth?.loginWithUsername)
  const usernameOnly = typeof auth?.loginWithUsername === 'object' && auth.loginWithUsername.requireEmail === false

  if (loginWithUsername && usernameOnly) {
    return { properties: { username: { type: 'string' } }, required: ['username'] }
  }
  if (loginWithUsername) {
    return {
      properties: { email: { type: 'string', format: 'email' }, username: { type: 'string' } },
      required: [],
    }
  }
  return { properties: { email: { type: 'string', format: 'email' } }, required: ['email'] }
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
  if (!auth || auth.disableLocalStrategy) return {}

  const t = makeT(ctx.i18n)
  const name = schemaName(collection.slug)
  const base = `${ctx.apiRoute}/${collection.slug}`
  const tag = [nestedTags ? authTagName(name) : name]
  const ident = identifierProps(auth)
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
        requestBody: jsonBody({
          type: 'object',
          additionalProperties: false,
          properties: { ...ident.properties, password: { type: 'string' } },
          required: [...ident.required, 'password'],
        }),
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
        requestBody: jsonBody({
          type: 'object',
          additionalProperties: false,
          properties: { email: { type: 'string', format: 'email' } },
          required: ['email'],
        }),
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
    paths[`${base}/access`] = {
      get: op(`access${name}`, ERRORS.session, {
        responses: {
          '200': jsonResponse(t('authAccess'), {
            type: 'object',
            additionalProperties: true,
          }),
        },
      }),
    }
  }

  paths[`${base}/unlock`] = {
    post: op(`unlock${name}`, ERRORS.authAction, {
      requestBody: jsonBody({
        type: 'object',
        additionalProperties: false,
        properties: { email: { type: 'string', format: 'email' } },
        required: ['email'],
      }),
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

  return paths
}

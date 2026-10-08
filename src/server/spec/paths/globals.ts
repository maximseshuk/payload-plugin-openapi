import type { PathsObject, ReferenceObject } from '@scalar/openapi-types/3.2'
import type { SanitizedGlobalConfig } from 'payload'

import { ERRORS, docAccessOperation, errorResponses, jsonOk, validateOperation } from '@/server/spec/components.js'
import { globalSchemaName, refTo, updateSchemaName } from '@/server/spec/names.js'
import {
  buildParamSchemas,
  commonReadParams,
  type ReadParamRefs,
  validateParams,
  writeParams,
} from '@/server/spec/params.js'
import type { EntitySecurity } from '@/server/spec/security.js'
import { makeT } from '@/shared/translations/index.js'
import type { BuildContext } from '@/shared/types/index.js'

export const buildGlobalPaths = ({
  global,
  ctx,
  security = {},
  access = false,
}: {
  global: SanitizedGlobalConfig
  ctx: BuildContext
  security?: EntitySecurity
  access?: boolean
}): PathsObject => {
  const t = makeT(ctx.i18n)
  const name = globalSchemaName(global.slug)
  const docRef: ReferenceObject = { $ref: refTo(name) }
  const updateRef: ReferenceObject = { $ref: refTo(updateSchemaName(name)) }
  const { read: secRead, update: secUpdate, validate: secValidate } = security

  const paramSchemas = buildParamSchemas({ fields: global.fields, ctx })
  const refs: ReadParamRefs = {
    select: true,
    populate: Boolean(paramSchemas.populate),
    joins: Boolean(paramSchemas.joins),
  }

  const paths: PathsObject = {
    [`${ctx.apiRoute}/globals/${global.slug}`]: {
      get: {
        tags: [name],
        operationId: `find${name}`,
        parameters: commonReadParams({ base: name, ctx, refs }),
        responses: { ...jsonOk(t('globalDoc'), docRef), ...errorResponses(ERRORS.globalRead, t) },
        security: secRead,
      },
      post: {
        tags: [name],
        operationId: `update${name}`,
        parameters: writeParams({ base: name, entity: global, ctx, refs, operation: 'globalUpdate' }),
        requestBody: { content: { 'application/json': { schema: updateRef } } },
        responses: {
          ...jsonOk(t('globalDoc'), {
            type: 'object',
            properties: { message: { type: 'string' }, result: docRef },
          }),
          ...errorResponses(ERRORS.globalUpdate, t),
        },
        security: secUpdate,
      },
    },
    [`${ctx.apiRoute}/globals/${global.slug}/validate`]: {
      post: validateOperation({
        tag: name,
        operationId: `validate${name}`,
        parameters: validateParams(ctx),
        requestBody: { content: { 'application/json': { schema: updateRef } } },
        errors: ERRORS.globalUpdate,
        security: secValidate,
        t,
      }),
    },
  }

  if (access) {
    paths[`${ctx.apiRoute}/globals/${global.slug}/access`] = {
      post: docAccessOperation({
        tag: name,
        operationId: `access${name}`,
        operations: ['read', 'update', 'validate', ...(global.versions ? ['readVersions'] : [])],
        bodyRef: updateRef,
        errors: ['500'],
        t,
      }),
    }
  }

  return paths
}

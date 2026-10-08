import type { SanitizedGlobalConfig } from 'payload'
import type { PathsObject, ReferenceObject } from '@scalar/openapi-types/3.2'

import type { BuildContext } from '../../types.js'
import { makeT } from '../../translations/index.js'
import { ERRORS, errorResponses, jsonOk } from '../components.js'
import { globalSchemaName, refTo, updateSchemaName } from '../names.js'
import { buildParamSchemas, commonReadParams, type ReadParamRefs, writeParams } from '../params.js'
import type { EntitySecurity } from '../security.js'

export const buildGlobalPaths = ({
  global,
  ctx,
  security = {},
}: {
  global: SanitizedGlobalConfig
  ctx: BuildContext
  security?: EntitySecurity
}): PathsObject => {
  const t = makeT(ctx.i18n)
  const name = globalSchemaName(global.slug)
  const docRef: ReferenceObject = { $ref: refTo(name) }
  const updateRef: ReferenceObject = { $ref: refTo(updateSchemaName(name)) }
  const { read: secRead, update: secUpdate } = security

  const paramSchemas = buildParamSchemas({ fields: global.fields, ctx })
  const refs: ReadParamRefs = {
    select: true,
    populate: Boolean(paramSchemas.populate),
    joins: Boolean(paramSchemas.joins),
  }

  const okDoc = jsonOk(t('globalDoc'), docRef)

  return {
    [`${ctx.apiRoute}/globals/${global.slug}`]: {
      get: {
        tags: [name],
        operationId: `find${name}`,
        parameters: commonReadParams({ base: name, ctx, refs }),
        responses: { ...okDoc, ...errorResponses(ERRORS.globalRead, t) },
        security: secRead,
      },
      post: {
        tags: [name],
        operationId: `update${name}`,
        parameters: writeParams({ base: name, entity: global, ctx, refs, operation: 'globalUpdate' }),
        requestBody: { content: { 'application/json': { schema: updateRef } } },
        responses: { ...okDoc, ...errorResponses(ERRORS.globalUpdate, t) },
        security: secUpdate,
      },
    },
  }
}

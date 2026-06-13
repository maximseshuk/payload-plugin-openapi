import type { SanitizedGlobalConfig } from 'payload'
import type { PathsObject, ReferenceObject } from '@scalar/openapi-types/3.2'

import type { BuildContext } from '../../types.js'
import { makeT } from '../../translations/index.js'
import { ERRORS, SECURITY_SCHEME_NAME, errorResponses, isOpenToPublic, jsonOk } from '../components.js'
import { globalSchemaName, refTo, updateSchemaName } from '../names.js'
import { buildParamSchemas, commonReadParams, type ReadParamRefs } from '../params.js'

export const buildGlobalPaths = ({
  global,
  ctx,
}: {
  global: SanitizedGlobalConfig
  ctx: BuildContext
}): PathsObject => {
  const t = makeT(ctx.i18n)
  const name = globalSchemaName(global.slug)
  const docRef: ReferenceObject = { $ref: refTo(name) }
  const updateRef: ReferenceObject = { $ref: refTo(updateSchemaName(name)) }
  const secured = isOpenToPublic(global.access?.read) ? undefined : [{ [SECURITY_SCHEME_NAME]: [] }]

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
        security: secured,
      },
      post: {
        tags: [name],
        operationId: `update${name}`,
        requestBody: { content: { 'application/json': { schema: updateRef } } },
        responses: { ...okDoc, ...errorResponses(ERRORS.globalUpdate, t) },
        security: secured,
      },
    },
  }
}

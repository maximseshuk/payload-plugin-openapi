import type { ParameterObject, PathsObject, ReferenceObject, SchemaObject } from '@scalar/openapi-types/3.2'

import { ERRORS, errorResponses, jsonResponse, nullableType } from '@/server/spec/components.js'
import { refTo, schemaName } from '@/server/spec/names.js'
import { buildParamSchemas, commonReadParams, type ReadParamRefs } from '@/server/spec/params.js'
import type { EntitySecurity } from '@/server/spec/security.js'
import { versionsTagName } from '@/server/spec/tags.js'
import { makeT } from '@/shared/translations/index.js'
import type { BuildContext, Entity, IDType } from '@/shared/types/index.js'

const buildVersionSchema = (base: string, idType: IDType): SchemaObject => {
  const id: SchemaObject = { type: idType === 'number' ? 'integer' : 'string' }
  return {
    type: 'object',
    properties: {
      id,
      parent: id,
      version: { $ref: refTo(base) },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
      latest: { type: 'boolean' },
      autosave: { type: 'boolean' },
      snapshot: { type: 'boolean' },
      publishedLocale: { type: 'string' },
    },
    required: ['id', 'parent', 'version', 'createdAt', 'updatedAt'],
  }
}

const buildVersionListSchema = (base: string): SchemaObject => ({
  type: 'object',
  properties: {
    docs: { type: 'array', items: { $ref: refTo(`${base}Version`) } },
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
})

export interface VersionSchemas {
  version: SchemaObject
  versionList: SchemaObject
}

export const versionComponentSchemas = ({
  docBase,
  base,
  idType,
}: {
  docBase: string
  base: string
  idType: IDType
}): VersionSchemas => ({
  version: buildVersionSchema(docBase, idType),
  versionList: buildVersionListSchema(base),
})

const versionRef = (base: string): ReferenceObject => ({
  $ref: refTo(`${base}Version`),
})
const versionListRef = (base: string): ReferenceObject => ({
  $ref: refTo(`${base}VersionList`),
})

const listVersionParams = ({
  base,
  ctx,
  refs,
}: {
  base: string
  ctx: BuildContext
  refs: ReadParamRefs
}): ParameterObject[] => {
  const t = makeT(ctx.i18n)
  return [
    { name: 'page', in: 'query', schema: { type: 'integer' } },
    { name: 'limit', in: 'query', schema: { type: 'integer' } },
    { name: 'pagination', in: 'query', schema: { type: 'boolean' } },
    {
      name: 'sort',
      in: 'query',
      description: t('paramSortShort'),
      schema: { type: 'string' },
    },
    ...commonReadParams({ base, ctx, refs }),
    {
      name: 'where',
      in: 'query',
      description: t('versionWhere'),
      content: {
        'application/json': { schema: { type: 'object', additionalProperties: true } },
      },
    },
  ]
}

export const buildVersionPaths = ({
  entity,
  pathBase,
  ctx,
  schemaBase,
  nestedTags,
  security = {},
  global = false,
}: {
  entity: Entity
  pathBase: string
  ctx: BuildContext
  schemaBase?: string
  nestedTags: boolean
  security?: EntitySecurity
  global?: boolean
}): PathsObject => {
  if (!entity.versions) return {}

  const t = makeT(ctx.i18n)
  const name = schemaBase ?? schemaName(entity.slug)
  const versionsTag = [nestedTags ? versionsTagName(name) : name]
  const paramSchemas = buildParamSchemas({ fields: entity.fields, ctx })
  const refs: ReadParamRefs = {
    select: true,
    populate: Boolean(paramSchemas.populate),
    joins: Boolean(paramSchemas.joins),
  }
  const idParam: ParameterObject = {
    name: 'id',
    in: 'path',
    required: true,
    schema: { type: ctx.defaultIDType === 'number' ? 'integer' : 'string' },
  }

  const message: SchemaObject = { type: 'string' }
  const restoreResponse: SchemaObject = global
    ? { type: 'object', properties: { message, doc: { $ref: refTo(name) } } }
    : { allOf: [{ $ref: refTo(name) }, { type: 'object', properties: { message } }] }

  return {
    [`${pathBase}/versions`]: {
      get: {
        tags: versionsTag,
        operationId: `find${name}Versions`,
        parameters: listVersionParams({ base: name, ctx, refs }),
        responses: {
          '200': jsonResponse(t('versionList'), versionListRef(name)),
          ...errorResponses(ERRORS.versionList, t),
        },
        security: security.readVersions,
      },
    },
    [`${pathBase}/versions/{id}`]: {
      parameters: [idParam],
      get: {
        tags: versionsTag,
        operationId: `find${name}VersionById`,
        parameters: commonReadParams({ base: name, ctx, refs }),
        responses: {
          '200': jsonResponse(t('versionSingle'), versionRef(name)),
          ...errorResponses(ERRORS.versionRead, t),
        },
        security: security.readVersions,
      },
      post: {
        tags: versionsTag,
        operationId: `restore${name}Version`,
        parameters: [
          { name: 'depth', in: 'query', schema: { type: 'integer' } },
          { name: 'draft', in: 'query', schema: { type: 'boolean' } },
        ],
        responses: {
          '200': jsonResponse(t('versionRestored'), restoreResponse),
          ...errorResponses(ERRORS.versionRestore, t),
        },
        security: security.update,
      },
    },
  }
}

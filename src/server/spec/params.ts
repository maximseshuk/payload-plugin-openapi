import type { ParameterObject, ReferenceObject, SchemaObject } from '@scalar/openapi-types/3.2'
import type { Field } from 'payload'

import { makeT } from '@/shared/translations/index.js'
import type { BuildContext, Entity } from '@/shared/types/index.js'

import { exposableFields } from './fields.js'
import { joinsSchemaName, populateSchemaName, querySchemaName, refTo, selectSchemaName } from './names.js'

const fieldName = (field: Field): string | undefined =>
  'name' in field && typeof field.name === 'string' ? field.name : undefined

const relationTargets = (field: Field): string[] => {
  if (field.type !== 'relationship' && field.type !== 'upload') return []
  const relTo = (field as { relationTo: string | string[] }).relationTo
  return Array.isArray(relTo) ? relTo : [relTo]
}

export const buildSelectSchema = ({ fields, ctx }: { fields: Field[]; ctx: BuildContext }): SchemaObject => {
  const properties: Record<string, SchemaObject> = {}
  for (const field of exposableFields(fields)) {
    const name = fieldName(field)
    if (name) properties[name] = { type: 'boolean' }
  }
  return {
    type: 'object',
    additionalProperties: false,
    description: makeT(ctx.i18n)('schemaSelect'),
    properties,
  }
}

export const buildPopulateSchema = ({
  fields,
  ctx,
}: {
  fields: Field[]
  ctx: BuildContext
}): SchemaObject | undefined => {
  const targets = new Set<string>()
  for (const field of exposableFields(fields)) {
    for (const target of relationTargets(field)) targets.add(target)
  }
  if (targets.size === 0) return undefined

  const properties: Record<string, SchemaObject> = {}
  for (const target of targets) {
    properties[target] = { type: 'object', additionalProperties: { type: 'boolean' } }
  }
  return {
    type: 'object',
    additionalProperties: false,
    description: makeT(ctx.i18n)('schemaPopulate'),
    properties,
  }
}

export const buildJoinsSchema = ({ fields, ctx }: { fields: Field[]; ctx: BuildContext }): SchemaObject | undefined => {
  const joinControls: SchemaObject = {
    type: 'object',
    additionalProperties: false,
    properties: {
      limit: { type: 'integer' },
      page: { type: 'integer' },
      sort: { type: 'string' },
      count: { type: 'boolean' },
      where: { type: 'object', additionalProperties: true },
    },
  }

  const properties: Record<string, SchemaObject> = {}
  for (const field of exposableFields(fields)) {
    if (field.type !== 'join') continue
    const name = fieldName(field)
    if (name) properties[name] = joinControls
  }
  if (Object.keys(properties).length === 0) return undefined
  return {
    type: 'object',
    additionalProperties: false,
    description: makeT(ctx.i18n)('schemaJoins'),
    properties,
  }
}

export interface ParamSchemas {
  select: SchemaObject
  populate?: SchemaObject
  joins?: SchemaObject
}

export const buildParamSchemas = ({ fields, ctx }: { fields: Field[]; ctx: BuildContext }): ParamSchemas => ({
  select: buildSelectSchema({ fields, ctx }),
  populate: buildPopulateSchema({ fields, ctx }),
  joins: buildJoinsSchema({ fields, ctx }),
})

const OPERATORS_BY_TYPE: Record<string, string[]> = {
  text: ['equals', 'not_equals', 'like', 'contains', 'in', 'not_in', 'exists'],
  textarea: ['equals', 'not_equals', 'like', 'contains', 'in', 'not_in', 'exists'],
  email: ['equals', 'not_equals', 'like', 'contains', 'in', 'not_in', 'exists'],
  code: ['equals', 'not_equals', 'like', 'contains', 'exists'],
  number: [
    'equals',
    'not_equals',
    'greater_than',
    'greater_than_equal',
    'less_than',
    'less_than_equal',
    'in',
    'not_in',
    'exists',
  ],
  date: ['equals', 'not_equals', 'greater_than', 'greater_than_equal', 'less_than', 'less_than_equal', 'exists'],
  checkbox: ['equals', 'not_equals', 'exists'],
  radio: ['equals', 'not_equals', 'in', 'not_in', 'exists'],
  select: ['equals', 'not_equals', 'in', 'not_in', 'exists'],
  relationship: ['equals', 'not_equals', 'in', 'not_in', 'exists'],
  upload: ['equals', 'not_equals', 'in', 'not_in', 'exists'],
}

const fieldHasQueryOperators = (field: Field): boolean => Boolean(OPERATORS_BY_TYPE[field.type])

export const collectionHasFilters = (fields: Field[]): boolean =>
  exposableFields(fields).some((f) => fieldName(f) && fieldHasQueryOperators(f))

export const buildQueryOperationsSchema = ({
  base,
  fields,
  ctx,
}: {
  base: string
  fields: Field[]
  ctx: BuildContext
}): SchemaObject => {
  const properties: Record<string, SchemaObject> = {}

  for (const field of exposableFields(fields)) {
    const name = fieldName(field)
    const operators = OPERATORS_BY_TYPE[field.type]
    if (!name || !operators) continue
    properties[name] = {
      type: 'object',
      additionalProperties: false,
      properties: Object.fromEntries(operators.map((op) => [op, {}])),
    }
  }

  const selfRef: ReferenceObject = { $ref: refTo(querySchemaName(base)) }
  properties.and = { type: 'array', items: selfRef }
  properties.or = { type: 'array', items: selfRef }

  return {
    type: 'object',
    additionalProperties: false,
    description: makeT(ctx.i18n)('schemaWhere'),
    properties,
  }
}

export interface ReadParamRefs {
  select: boolean
  populate: boolean
  joins: boolean
}

const objectParam = (name: string, ref?: string): ParameterObject => ({
  name,
  in: 'query',
  content: {
    'application/json': {
      schema: ref ? { $ref: ref } : { type: 'object', additionalProperties: true },
    },
  },
})

const localeParam = (ctx: BuildContext): ParameterObject => ({
  name: 'locale',
  in: 'query',
  description: makeT(ctx.i18n)('paramLocale'),
  schema: ctx.locales.length > 0 ? { type: 'string', enum: [...ctx.locales, 'all'] } : { type: 'string' },
})

const fallbackLocaleParam = (ctx: BuildContext): ParameterObject => ({
  name: 'fallback-locale',
  in: 'query',
  description: makeT(ctx.i18n)('paramFallbackLocale'),
  schema: ctx.locales.length > 0 ? { type: 'string', enum: [...ctx.locales, 'none'] } : { type: 'string' },
})

export const commonReadParams = ({
  base,
  ctx,
  refs,
}: {
  base: string
  ctx: BuildContext
  refs: ReadParamRefs
}): ParameterObject[] => {
  const params: ParameterObject[] = [
    {
      name: 'depth',
      in: 'query',
      description: makeT(ctx.i18n)('paramDepth'),
      schema: { type: 'integer' },
    },
    localeParam(ctx),
    fallbackLocaleParam(ctx),
    objectParam('select', refs.select ? refTo(selectSchemaName(base)) : undefined),
    {
      name: 'flattenLocales',
      in: 'query',
      description: makeT(ctx.i18n)('paramFlattenLocales'),
      schema: { type: 'boolean' },
    },
    { name: 'draft', in: 'query', description: makeT(ctx.i18n)('paramDraft'), schema: { type: 'boolean' } },
    { name: 'trash', in: 'query', description: makeT(ctx.i18n)('paramTrash'), schema: { type: 'boolean' } },
  ]

  if (refs.populate) {
    params.push(objectParam('populate', refTo(populateSchemaName(base))))
  }
  if (refs.joins) {
    params.push(objectParam('joins', refTo(joinsSchemaName(base))))
  }

  return params
}

export type WriteOperation = 'create' | 'update' | 'updateByID' | 'delete' | 'duplicate' | 'globalUpdate'

const SHARED = ['depth', 'locale', 'fallback-locale', 'select', 'populate']
const ALL_LOCALES = ['publishAllLocales', 'unpublishAllLocales']

const WRITE_PARAMS: Record<WriteOperation, Set<string>> = {
  create: new Set([...SHARED, 'draft', 'autosave', 'publishAllLocales']),
  update: new Set([...SHARED, 'draft', 'trash', 'overrideLock', ...ALL_LOCALES]),
  updateByID: new Set([...SHARED, 'draft', 'trash', 'autosave', 'overrideLock', ...ALL_LOCALES]),
  delete: new Set([...SHARED, 'trash', 'overrideLock']),
  duplicate: new Set([...SHARED, 'draft', 'selectedLocales[]']),
  globalUpdate: new Set([...SHARED, 'draft', 'autosave', ...ALL_LOCALES]),
}

const entityWriteParams = (entity: Entity, ctx: BuildContext): ParameterObject[] => {
  const t = makeT(ctx.i18n)
  const flag = (name: string, key: Parameters<typeof t>[0]): ParameterObject => ({
    name,
    in: 'query',
    description: t(key),
    schema: { type: 'boolean' },
  })
  const drafts = entity.versions ? entity.versions.drafts : false
  const params: ParameterObject[] = []
  if (drafts && drafts.autosave) params.push(flag('autosave', 'paramAutosave'))
  if (drafts && drafts.localizeStatus) {
    params.push(flag('publishAllLocales', 'paramPublishAllLocales'))
    params.push(flag('unpublishAllLocales', 'paramUnpublishAllLocales'))
  }
  if (entity.lockDocuments !== false) params.push(flag('overrideLock', 'paramOverrideLock'))
  if (ctx.locales.length > 0) {
    params.push({
      name: 'selectedLocales[]',
      in: 'query',
      description: t('paramSelectedLocales'),
      style: 'form',
      explode: true,
      schema: { type: 'array', items: { type: 'string', enum: ctx.locales } },
    })
  }
  return params
}

export const writeParams = ({
  base,
  entity,
  ctx,
  refs,
  operation,
}: {
  base: string
  entity: Entity
  ctx: BuildContext
  refs: ReadParamRefs
  operation: WriteOperation
}): ParameterObject[] =>
  [...commonReadParams({ base, ctx, refs }), ...entityWriteParams(entity, ctx)].filter((p) =>
    WRITE_PARAMS[operation].has(p.name),
  )

export const validateParams = (ctx: BuildContext): ParameterObject[] =>
  ctx.locales.length > 0
    ? [
        {
          name: 'locale',
          in: 'query',
          description: makeT(ctx.i18n)('paramValidateLocale'),
          style: 'form',
          explode: true,
          schema: { type: 'array', items: { type: 'string', enum: [...ctx.locales, 'all'] } },
        },
      ]
    : []

export const whereParam = (base: string): ParameterObject => objectParam('where', refTo(querySchemaName(base)))

export const buildListParams = ({
  base,
  fields,
  ctx,
  refs,
}: {
  base: string
  fields: Field[]
  ctx: BuildContext
  refs: ReadParamRefs
}): ParameterObject[] => {
  const params: ParameterObject[] = [
    { name: 'page', in: 'query', schema: { type: 'integer' } },
    { name: 'limit', in: 'query', schema: { type: 'integer' } },
    { name: 'pagination', in: 'query', schema: { type: 'boolean' } },
    {
      name: 'sort',
      in: 'query',
      description: makeT(ctx.i18n)('paramSort'),
      schema: { type: 'string' },
    },
    ...commonReadParams({ base, ctx, refs }),
  ]

  if (collectionHasFilters(fields)) {
    params.push(whereParam(base))
  }

  return params
}

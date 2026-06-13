import { entityToJSONSchema } from 'payload'
import type { Block, Field, SanitizedConfig } from 'payload'
import type { SchemaObject } from '@scalar/openapi-types/3.2'
import { getTranslation } from '@payloadcms/translations'

import type { BuildContext, Entity, IDType } from '../types.js'
import { deepMerge, isPlainObject } from '../utils.js'
import { makeT } from '../translations/index.js'
import { AUTH_FIELDS, flattenFields } from './fields.js'
import { rewriteRefs } from './names.js'

const READ_HIDDEN_FIELDS = new Set<string>([...AUTH_FIELDS, 'collection'])

const SERVER_FIELDS = ['id', 'createdAt', 'updatedAt']

// Drop interfaceName: entityToJSONSchema emits dangling $refs otherwise.
// Shallow copy only, config has functions, structuredClone would throw.
const stripInterfaceName = <T>(entity: T): T => {
  const { interfaceName: _omit, ...rest } = entity as T & { interfaceName?: string }
  return rest as T
}

const toComponentSchema = ({
  config,
  source,
  idType,
}: {
  config: SanitizedConfig
  source: Entity | Block
  idType: IDType
}): SchemaObject => {
  const jsonSchema = entityToJSONSchema(config, source as never, new Map(), idType)
  const blockSlugs = new Set((config.blocks ?? []).map((b) => b.slug))
  const schema = rewriteRefs(jsonSchema as never, blockSlugs) as unknown as SchemaObject
  delete schema.title
  return schema
}

const fieldOpenapi = (field: Field): Record<string, unknown> | undefined => {
  const meta = (field as { custom?: { openapi?: unknown } }).custom?.openapi
  return isPlainObject(meta) ? meta : undefined
}

const isLocaleKeyed = (value: unknown, ctx: BuildContext): value is Record<string, string> => {
  if (!isPlainObject(value)) return false
  const keys = Object.keys(value)
  return (
    keys.length > 0 &&
    keys.every((k) => ctx.locales.includes(k)) &&
    Object.values(value).every((v) => typeof v === 'string')
  )
}

// Resolve locale values only under text keys. Other keys may legitimately
// hold objects with locale-named props (e.g. `properties.en`).
const LOCALIZABLE_KEYS = new Set(['description', 'title', 'summary'])

const resolveTextValue = (value: unknown, ctx: BuildContext): string | undefined => {
  if (typeof value === 'function') {
    try {
      const result = (value as (args: { t: unknown; i18n: unknown }) => unknown)({ t: ctx.i18n.t, i18n: ctx.i18n })
      return typeof result === 'string' && result.length > 0 ? result : undefined
    } catch {
      return undefined
    }
  }
  if (isLocaleKeyed(value, ctx)) return getTranslation(value, ctx.i18n)
  return undefined
}

export const resolveLocalizedStrings = (value: unknown, ctx: BuildContext): unknown => {
  if (!isPlainObject(value)) return value
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(value)) {
    if (LOCALIZABLE_KEYS.has(k)) {
      const resolved = resolveTextValue(v, ctx)
      if (resolved !== undefined) out[k] = resolved
      else if (typeof v !== 'function') out[k] = resolveLocalizedStrings(v, ctx)
      continue
    }
    out[k] = resolveLocalizedStrings(v, ctx)
  }
  return out
}

const applyFieldOverrides = ({
  schema,
  fields,
  ctx,
}: {
  schema: SchemaObject
  fields: Field[]
  ctx: BuildContext
}): void => {
  if (!schema.properties) return
  for (const field of flattenFields(fields)) {
    const name = 'name' in field ? field.name : undefined
    const override = fieldOpenapi(field)
    if (!name || !override) continue
    const current = schema.properties[name]
    if (isPlainObject(current)) {
      const resolved = resolveLocalizedStrings(override, ctx) as Record<string, unknown>
      schema.properties[name] = deepMerge(current, resolved) as SchemaObject
    }
  }
}

const isRef = (value: unknown): value is { $ref: string } => isPlainObject(value) && typeof value.$ref === 'string'

const isBlockBranch = (branch: unknown): boolean => {
  if (isRef(branch)) return branch.$ref.startsWith('#/components/schemas/Block')
  return isPlainObject(branch) && isPlainObject(branch.properties) && 'blockType' in branch.properties
}

const addBlockDiscriminators = (node: unknown): void => {
  if (Array.isArray(node)) {
    for (const item of node) addBlockDiscriminators(item)
    return
  }
  if (!isPlainObject(node)) return
  const oneOf = node.oneOf
  if (Array.isArray(oneOf) && oneOf.length > 0 && oneOf.every(isBlockBranch)) {
    ;(node as SchemaObject).discriminator = { propertyName: 'blockType' }
  }
  for (const value of Object.values(node)) addBlockDiscriminators(value)
}

const markLocalizedFields = ({
  schema,
  fields,
  ctx,
}: {
  schema: SchemaObject
  fields: Field[]
  ctx: BuildContext
}): void => {
  if (!schema.properties || ctx.locales.length === 0) return
  for (const field of flattenFields(fields)) {
    if (!('localized' in field) || !field.localized) continue
    const name = 'name' in field ? field.name : undefined
    if (!name || !(name in schema.properties)) continue
    const single = schema.properties[name] as SchemaObject
    schema.properties[name] = {
      oneOf: [
        single,
        {
          type: 'object',
          description: makeT(ctx.i18n)('schemaPerLocale'),
          properties: Object.fromEntries(ctx.locales.map((l) => [l, single])),
        },
      ],
    }
  }
}

const removeProps = (schema: SchemaObject, names: Iterable<string>): void => {
  if (!schema.properties) return
  for (const name of names) delete schema.properties[name]
  if (Array.isArray(schema.required)) {
    const drop = new Set(names)
    schema.required = schema.required.filter((r: string) => !drop.has(r))
  }
}

const buildBaseSchema = ({
  entity,
  config,
  ctx,
}: {
  entity: Entity
  config: SanitizedConfig
  ctx: BuildContext
}): SchemaObject => {
  const schema = toComponentSchema({ config, source: stripInterfaceName(entity), idType: ctx.defaultIDType })
  const isAuth = 'auth' in entity && Boolean(entity.auth)
  if (isAuth) removeProps(schema, READ_HIDDEN_FIELDS)
  applyFieldOverrides({ schema, fields: entity.fields, ctx })
  addBlockDiscriminators(schema)
  return schema
}

const cloneSchema = (schema: SchemaObject): SchemaObject => ({
  ...schema,
  properties: { ...schema.properties },
  required: Array.isArray(schema.required) ? [...schema.required] : schema.required,
})

const flattenRelationships = ({
  schema,
  fields,
  idType,
}: {
  schema: SchemaObject
  fields: Field[]
  idType: IDType
}): void => {
  if (!schema.properties) return
  const idSchema: SchemaObject = { type: idType === 'number' ? 'integer' : 'string' }
  for (const field of flattenFields(fields)) {
    if (field.type !== 'relationship' && field.type !== 'upload') continue
    const name = 'name' in field ? field.name : undefined
    if (!name || !(name in schema.properties)) continue
    schema.properties[name] = 'hasMany' in field && field.hasMany ? { type: 'array', items: idSchema } : idSchema
  }
}

export interface EntitySchemas {
  read: SchemaObject
  create: SchemaObject
  update: SchemaObject
}

export const buildEntitySchemas = async ({
  entity,
  config,
  ctx,
}: {
  entity: Entity
  config: SanitizedConfig
  ctx: BuildContext
}): Promise<EntitySchemas> => {
  const read = buildBaseSchema({ entity, config, ctx })
  const isAuth = 'auth' in entity && Boolean(entity.auth)
  const idType = ctx.defaultIDType

  const create = cloneSchema(read)
  if (Array.isArray(create.required)) {
    const optional = new Set(SERVER_FIELDS)
    create.required = create.required.filter((r: string) => !optional.has(r))
  }
  flattenRelationships({ schema: create, fields: entity.fields, idType })
  if (isAuth && create.properties) {
    create.properties.password = { type: 'string' }
    create.required = [...new Set([...(create.required ?? []), 'password'])]
  }

  const update = cloneSchema(read)
  delete update.required
  if (update.properties) delete update.properties.id
  flattenRelationships({ schema: update, fields: entity.fields, idType })
  if (isAuth && update.properties) {
    update.properties.password = { type: 'string' }
  }

  markLocalizedFields({ schema: read, fields: entity.fields, ctx })

  return { read, create, update }
}

export const buildBlockSchema = (block: Block, config: SanitizedConfig): SchemaObject => {
  const schema = toComponentSchema({ config, source: stripInterfaceName(block), idType: 'text' })
  const blockType: SchemaObject = { type: 'string', enum: [block.slug] }
  const properties = { ...schema.properties, blockType }
  const required = [...new Set(['blockType', ...(schema.required ?? [])])]
  return { ...schema, type: 'object', properties, required }
}

import { getTranslation } from '@payloadcms/translations'
import { entityToJSONSchema } from 'payload'
import type { Block, Field, SanitizedConfig, SchemaVariant } from 'payload'

import { makeT } from '@/shared/translations/index.js'
import type { BuildContext, Entity, IDType, Schema } from '@/shared/types/index.js'
import { deepMerge, isPlainObject } from '@/shared/utils.js'

import { AUTH_FIELDS, flattenFields } from './fields.js'
import { rewriteRefs } from './names.js'

const READ_HIDDEN_FIELDS = new Set<string>([...AUTH_FIELDS, 'collection'])

const stripInterfaceName = <T>(entity: T): T => {
  const { interfaceName: _omit, ...rest } = entity as T & { interfaceName?: string }
  return rest as T
}

const toComponentSchema = ({
  config,
  source,
  idType,
  defs = new Map(),
  variant,
}: {
  config: SanitizedConfig
  source: Entity | Block
  idType: IDType
  defs?: Map<string, unknown>
  variant?: SchemaVariant
}): Schema => {
  const jsonSchema = entityToJSONSchema(
    config,
    source as never,
    defs as never,
    idType,
    new Set(),
    undefined,
    undefined,
    undefined,
    variant,
  )
  const blockSlugs = new Set((config.blocks ?? []).map((b) => b.slug))
  const schema = rewriteRefs(jsonSchema as never, blockSlugs, defs) as unknown as Schema
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

const applyFieldOverrides = ({ schema, fields, ctx }: { schema: Schema; fields: Field[]; ctx: BuildContext }): void => {
  if (!schema.properties) return
  for (const field of flattenFields(fields)) {
    const name = 'name' in field ? field.name : undefined
    const override = fieldOpenapi(field)
    if (!name || !override) continue
    const current = schema.properties[name]
    if (isPlainObject(current)) {
      const resolved = resolveLocalizedStrings(override, ctx) as Record<string, unknown>
      schema.properties[name] = deepMerge(current, resolved) as Schema
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
    ;(node as Schema).discriminator = { propertyName: 'blockType' }
  }
  for (const value of Object.values(node)) addBlockDiscriminators(value)
}

const fixPolymorphicJoinRequired = (node: unknown): void => {
  if (Array.isArray(node)) {
    for (const item of node) fixPolymorphicJoinRequired(item)
    return
  }
  if (!isPlainObject(node)) return
  const { properties, required } = node as Schema
  if (isPlainObject(properties) && 'relationTo' in properties && Array.isArray(required)) {
    ;(node as Schema).required = required.map((r: string) => (r === 'collectionSlug' ? 'relationTo' : r))
  }
  for (const value of Object.values(node)) fixPolymorphicJoinRequired(value)
}

const markLocalizedFields = ({ schema, fields, ctx }: { schema: Schema; fields: Field[]; ctx: BuildContext }): void => {
  if (!schema.properties || ctx.locales.length === 0) return
  for (const field of flattenFields(fields)) {
    if (!('localized' in field) || !field.localized) continue
    const name = 'name' in field ? field.name : undefined
    if (!name || !(name in schema.properties)) continue
    const single = schema.properties[name] as Schema
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

const removeProps = (schema: Schema, names: Iterable<string>): void => {
  if (!schema.properties) return
  for (const name of names) delete schema.properties[name]
  if (Array.isArray(schema.required)) {
    const drop = new Set(names)
    schema.required = schema.required.filter((r: string) => !drop.has(r))
  }
}

const isConstantDeny = (access: unknown): boolean => {
  if (typeof access !== 'function' || access.length > 0) return false
  try {
    return access() === false
  } catch {
    return false
  }
}

const deniedWrites = (fields: Field[], operation: 'create' | 'update'): string[] =>
  flattenFields(fields)
    .filter((field) => 'name' in field && 'access' in field && isConstantDeny(field.access?.[operation]))
    .map((field) => (field as { name: string }).name)

const cloneSchema = (schema: Schema): Schema => ({
  ...schema,
  properties: { ...schema.properties },
  required: Array.isArray(schema.required) ? [...schema.required] : schema.required,
})

export interface EntitySchemas {
  read: Schema
  create: Schema
  update: Schema
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
  const source = stripInterfaceName(entity)
  const defs = new Map<string, unknown>()
  const idType = ctx.defaultIDType
  const read = toComponentSchema({ config, source, idType, defs })
  const write = toComponentSchema({ config, source, idType, defs, variant: 'input' })
  const isAuth = 'auth' in entity && Boolean(entity.auth)

  for (const schema of [read, write]) {
    if (isAuth) removeProps(schema, READ_HIDDEN_FIELDS)
    applyFieldOverrides({ schema, fields: entity.fields, ctx })
    addBlockDiscriminators(schema)
  }
  fixPolymorphicJoinRequired(read)

  const create = cloneSchema(write)
  if (isAuth && create.properties) {
    create.properties.password = { type: 'string' }
    create.required = [...new Set([...(create.required ?? []), 'password'])]
  }

  removeProps(create, deniedWrites(entity.fields, 'create'))

  const update = cloneSchema(write)
  removeProps(update, deniedWrites(entity.fields, 'update'))
  delete update.required
  if (update.properties) delete update.properties.id
  if (isAuth && update.properties) {
    update.properties.password = { type: 'string' }
  }

  markLocalizedFields({ schema: read, fields: entity.fields, ctx })

  return { read, create, update }
}

export const buildBlockSchema = (block: Block, config: SanitizedConfig): Schema => {
  const schema = toComponentSchema({ config, source: stripInterfaceName(block), idType: 'text' })
  const blockType: Schema = { type: 'string', enum: [block.slug] }
  const properties = { ...schema.properties, blockType }
  const required = [...new Set(['blockType', ...(schema.required ?? [])])]
  return { ...schema, type: 'object', properties, required }
}

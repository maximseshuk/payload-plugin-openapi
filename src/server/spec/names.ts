import { upperFirst } from '@/shared/utils.js'

export const schemaName = (slug: string): string =>
  upperFirst(slug.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase()))

export const blockSchemaName = (slug: string): string => {
  const stripped = slug.replace(/^block[-_]?/i, '').replace(/[-_]?block$/i, '')
  return `Block${schemaName(stripped || slug)}`
}

export const globalSchemaName = (slug: string): string => `Global${schemaName(slug)}`

export const listSchemaName = (base: string): string => `${base}List`
export const createSchemaName = (base: string): string => `${base}Create`
export const updateSchemaName = (base: string): string => `${base}Update`
export const querySchemaName = (base: string): string => `${base}QueryOperations`
export const selectSchemaName = (base: string): string => `${base}Select`
export const populateSchemaName = (base: string): string => `${base}Populate`
export const joinsSchemaName = (base: string): string => `${base}Joins`

export const refTo = (name: string): string => `#/components/schemas/${name}`

type JsonValue = Record<string, unknown> | unknown[] | string | number | boolean | null

const REF = /^#\/(?:definitions|\$defs|components\/schemas)\/(.+)$/

const findBlockSlug = (name: string, blockSlugs: Set<string>): string | undefined =>
  [...blockSlugs].find((s) => s === name || schemaName(s) === schemaName(name))

const normalizeRef = (ref: string, blockSlugs: Set<string>): string => {
  const match = REF.exec(ref)
  if (!match) return ref
  const captured = match[1]!
  const blockSlug = findBlockSlug(captured, blockSlugs)
  if (blockSlug) return `#/components/schemas/${blockSchemaName(blockSlug)}`
  return `#/components/schemas/${schemaName(captured)}`
}

export const rewriteRefs = (
  node: JsonValue,
  blockSlugs: Set<string> = new Set(),
  defs: Map<string, unknown> = new Map(),
): JsonValue => {
  if (Array.isArray(node)) return node.map((item) => rewriteRefs(item as JsonValue, blockSlugs, defs))
  if (node && typeof node === 'object') {
    const { $ref, ...rest } = node
    const name = typeof $ref === 'string' ? REF.exec($ref)?.[1] : undefined
    if (name && defs.has(name) && !findBlockSlug(name, blockSlugs)) {
      return rewriteRefs({ ...(defs.get(name) as Record<string, unknown>), ...rest }, blockSlugs, defs)
    }
    const out: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(node)) {
      out[key] =
        key === '$ref' && typeof value === 'string'
          ? normalizeRef(value, blockSlugs)
          : rewriteRefs(value as JsonValue, blockSlugs, defs)
    }
    return out
  }
  return node
}

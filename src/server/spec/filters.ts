import type { PathsObject } from '@scalar/openapi-types/3.2'
import type { SanitizedCollectionConfig, SanitizedGlobalConfig } from 'payload'

import type {
  EntityKind,
  EntityMatcher,
  HttpMethod,
  OperationContext,
  OperationKind,
  OperationRule,
  ResolvedFilters,
} from '@/shared/types/index.js'

const SYSTEM_COLLECTIONS = new Set([
  'payload-jobs',
  'payload-locked-documents',
  'payload-preferences',
  'payload-migrations',
  'payload-kv',
  'payload-llm-instructions',
  'payload-query-presets',
])

const SYSTEM_GLOBALS = new Set(['payload-jobs-stats'])

const HTTP_METHODS: HttpMethod[] = ['get', 'post', 'patch', 'put', 'delete']

interface EntityRef {
  slug: string
  kind: EntityKind
}

const matchesEntity = (matcher: EntityMatcher, { slug, kind }: EntityRef): boolean => {
  if (typeof matcher === 'string') return matcher === slug
  if (matcher instanceof RegExp) return matcher.test(slug)
  return matcher.kind === kind && matcher.slug === slug
}

const anyMatch = (matchers: EntityMatcher[], entity: EntityRef): boolean =>
  matchers.some((m) => matchesEntity(m, entity))

const isHiddenCollection = (collection: SanitizedCollectionConfig): boolean => {
  if ((collection as { hidden?: unknown }).hidden === true) return true
  const hidden = collection.admin?.hidden
  if (typeof hidden === 'function') {
    try {
      return hidden({ user: null } as never) === true
    } catch {
      return false
    }
  }
  return hidden === true
}

const passesIncludeExclude = (entity: EntityRef, filters: ResolvedFilters): boolean => {
  if (filters.include.length > 0 && !anyMatch(filters.include, entity)) return false
  if (anyMatch(filters.exclude, entity)) return false
  return true
}

export const shouldIncludeCollection = (collection: SanitizedCollectionConfig, filters: ResolvedFilters): boolean => {
  const { slug } = collection
  if (SYSTEM_COLLECTIONS.has(slug) && !filters.includeSystem) return false
  if (!filters.includeHidden && isHiddenCollection(collection)) return false
  return passesIncludeExclude({ slug, kind: 'collection' }, filters)
}

export const shouldIncludeGlobal = (global: SanitizedGlobalConfig, filters: ResolvedFilters): boolean => {
  if (SYSTEM_GLOBALS.has(global.slug) && !filters.includeSystem) return false
  return passesIncludeExclude({ slug: global.slug, kind: 'global' }, filters)
}

const ruleMatchesMethod = (rule: OperationRule, method: HttpMethod): boolean => {
  if (rule.method === undefined) return true
  return Array.isArray(rule.method) ? rule.method.includes(method) : rule.method === method
}

const matchesOptional = (matcher: string | RegExp | undefined, value: string | undefined): boolean => {
  if (matcher === undefined) return true
  if (value === undefined) return false
  return matcher instanceof RegExp ? matcher.test(value) : matcher === value
}

const ruleMatches = (rule: OperationRule, { method, slug, kind, path, plugin }: OperationContext): boolean =>
  ruleMatchesMethod(rule, method) &&
  matchesOptional(rule.slug, slug) &&
  matchesOptional(rule.plugin, plugin) &&
  (rule.kind === undefined || rule.kind === kind) &&
  (rule.path === undefined || rule.path.test(path))

export const PLUGIN_KEY = 'x-payload-plugin'

export const operationPlugin = (operation: unknown, plugin: string | undefined): string | undefined => {
  const marked = (operation as Record<string, unknown> | undefined)?.[PLUGIN_KEY]
  return plugin ?? (typeof marked === 'string' ? marked : undefined)
}

export const stripPluginKeys = (paths: PathsObject): PathsObject => {
  for (const item of Object.values(paths)) {
    for (const method of HTTP_METHODS)
      delete (item as Record<HttpMethod, Record<string, unknown> | undefined>)[method]?.[PLUGIN_KEY]
  }
  return paths
}

const isOperationExcluded = async (filters: ResolvedFilters, op: OperationContext): Promise<boolean> => {
  for (const rule of filters.excludeOperations) {
    if (typeof rule === 'function' ? (await rule(op)) === true : ruleMatches(rule, op)) return true
  }
  return false
}

export const filterOperations = async ({
  paths,
  slug,
  kind,
  plugin,
  filters,
}: {
  paths: PathsObject
  slug?: string
  kind: OperationKind
  plugin?: string
  filters: ResolvedFilters
}): Promise<PathsObject> => {
  if (filters.excludeOperations.length === 0) return paths

  for (const [path, item] of Object.entries(paths)) {
    if (!item) continue
    let remaining = 0
    const ops = item as Record<HttpMethod, unknown>
    for (const method of HTTP_METHODS) {
      if (!ops[method]) continue
      const op = { method, path, slug, kind, plugin: operationPlugin(ops[method], plugin) }
      if (await isOperationExcluded(filters, op)) {
        delete ops[method]
      } else {
        remaining += 1
      }
    }
    if (remaining === 0) delete paths[path]
  }
  return paths
}

import type { SanitizedCollectionConfig, SanitizedGlobalConfig } from 'payload'
import type { PathsObject } from '@scalar/openapi-types/3.2'
import type {
  EntityKind,
  EntityMatcher,
  HttpMethod,
  OperationContext,
  OperationRule,
  ResolvedFilters,
} from '../types.js'

const SYSTEM_COLLECTIONS = new Set([
  'payload-jobs',
  'payload-locked-documents',
  'payload-preferences',
  'payload-migrations',
  'payload-folders',
])

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

export const shouldIncludeGlobal = (global: SanitizedGlobalConfig, filters: ResolvedFilters): boolean =>
  passesIncludeExclude({ slug: global.slug, kind: 'global' }, filters)

const ruleMatchesMethod = (rule: OperationRule, method: HttpMethod): boolean => {
  if (rule.method === undefined) return true
  return Array.isArray(rule.method) ? rule.method.includes(method) : rule.method === method
}

const ruleMatchesSlug = (rule: OperationRule, slug: string): boolean => {
  if (rule.slug === undefined) return true
  return rule.slug instanceof RegExp ? rule.slug.test(slug) : rule.slug === slug
}

const ruleMatches = (rule: OperationRule, { method, slug, kind, path }: OperationContext): boolean =>
  ruleMatchesMethod(rule, method) &&
  ruleMatchesSlug(rule, slug) &&
  (rule.kind === undefined || rule.kind === kind) &&
  (rule.path === undefined || rule.path.test(path))

const isOperationExcluded = (filters: ResolvedFilters, op: OperationContext): boolean => {
  if (filters.excludeOperations.some((rule) => ruleMatches(rule, op))) return true
  return filters.excludeWhen?.(op) ?? false
}

export const filterOperations = ({
  paths,
  slug,
  kind,
  filters,
}: {
  paths: PathsObject
  slug: string
  kind: EntityKind
  filters: ResolvedFilters
}): PathsObject => {
  if (filters.excludeOperations.length === 0 && !filters.excludeWhen) return paths

  for (const [path, item] of Object.entries(paths)) {
    if (!item) continue
    let remaining = 0
    const ops = item as Record<HttpMethod, unknown>
    for (const method of HTTP_METHODS) {
      if (!ops[method]) continue
      if (isOperationExcluded(filters, { method, slug, kind, path })) {
        delete ops[method]
      } else {
        remaining += 1
      }
    }
    if (remaining === 0) delete paths[path]
  }
  return paths
}

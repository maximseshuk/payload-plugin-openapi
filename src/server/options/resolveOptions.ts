import { PLUGIN_NAME } from '@/shared/constants.js'
import type { FilterOptions, OpenApiPluginOptions, ResolvedFilters, ResolvedOptions } from '@/shared/types/index.js'
import { isPlainObject } from '@/shared/utils.js'

const resolveFilters = (filters: FilterOptions = {}): ResolvedFilters => ({
  include: filters.include ?? [],
  exclude: filters.exclude ?? [],
  includeHidden: filters.includeHidden ?? false,
  includeSystem: filters.includeSystem ?? false,
  includeCustom: filters.includeCustom ?? true,
  includeAuth: filters.includeAuth ?? true,
  includeAdminAuth: filters.includeAdminAuth ?? false,
  includeVersions: filters.includeVersions ?? true,
  includeJobs: filters.includeJobs ?? true,
  excludeOperations: filters.excludeOperations ?? [],
})

const DEFAULT_AUTH_PATH = '/openapi-auth'

const resolveInteractiveAuth = (
  option: OpenApiPluginOptions['interactiveAuth'],
): ResolvedOptions['interactiveAuth'] => {
  if (!option) return { enabled: false, path: DEFAULT_AUTH_PATH }
  if (option === true) return { enabled: true, path: DEFAULT_AUTH_PATH }
  return { enabled: true, path: option.path ?? DEFAULT_AUTH_PATH, collection: option.collection }
}

export const assertNoRemovedKeys = (removed: Array<[unknown, string]>): void => {
  for (const [value, message] of removed) {
    if (value !== undefined) throw new Error(`[${PLUGIN_NAME}] ${message}`)
  }
}

export const resolveOptions = (options: OpenApiPluginOptions): ResolvedOptions => {
  const legacy = options as Record<string, unknown>
  const legacyFilters = isPlainObject(legacy.filters) ? legacy.filters : {}
  const legacyAuth = isPlainObject(legacy.interactiveAuth) ? legacy.interactiveAuth : {}
  assertNoRemovedKeys([
    [legacy.metadata, 'metadata was renamed to info'],
    [legacy.specEndpoint, 'specEndpoint was renamed to path'],
    [legacy.securityWhen, "securityWhen was removed, use security (return 'public' or 'secured', not true or false)"],
    [legacyFilters.excludeWhen, 'filters.excludeWhen was removed, use a function in filters.excludeOperations'],
    [legacyAuth.endpoint, 'interactiveAuth.endpoint was renamed to interactiveAuth.path'],
    [
      options.extensions?.some((extension) => (extension.transform?.length ?? 0) > 1) || undefined,
      'extensions[].transform takes one object now, use ({ doc, payload }) instead of (doc, ctx)',
    ],
  ])

  if (!options.info?.title || !options.info?.version) {
    throw new Error(`[${PLUGIN_NAME}] info.title and info.version are required`)
  }

  return {
    info: options.info,
    openapiVersion: options.openapiVersion ?? '3.2',
    path: options.path ?? '/openapi.json',
    serve: options.serve ?? true,
    access: options.access,
    servers: options.servers,
    trustedHosts: (options.trustedHosts ?? []).map((host) => host.toLowerCase()),
    filters: resolveFilters(options.filters),
    interactiveAuth: resolveInteractiveAuth(options.interactiveAuth),
    nestedTags: options.nestedTags ?? false,
    security: options.security,
    cache: options.cache ?? true,
    extensions: options.extensions ?? [],
  }
}

import { PLUGIN_NAME } from './constants.js'
import type { FilterOptions, OpenApiPluginOptions, ResolvedFilters, ResolvedOptions } from './types.js'

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
  excludeWhen: filters.excludeWhen,
})

const DEFAULT_AUTH_ENDPOINT = '/openapi-auth'

const resolveInteractiveAuth = (
  option: OpenApiPluginOptions['interactiveAuth'],
): ResolvedOptions['interactiveAuth'] => {
  if (!option) return { enabled: false, endpoint: DEFAULT_AUTH_ENDPOINT }
  if (option === true) return { enabled: true, endpoint: DEFAULT_AUTH_ENDPOINT }
  return { enabled: true, endpoint: option.endpoint ?? DEFAULT_AUTH_ENDPOINT }
}

export const resolveOptions = (options: OpenApiPluginOptions): ResolvedOptions => {
  if (!options.metadata?.title || !options.metadata?.version) {
    throw new Error(`${PLUGIN_NAME}: metadata.title and metadata.version are required.`)
  }

  return {
    metadata: options.metadata,
    openapiVersion: options.openapiVersion ?? '3.2',
    specEndpoint: options.specEndpoint ?? '/openapi.json',
    serve: options.serve ?? true,
    filters: resolveFilters(options.filters),
    interactiveAuth: resolveInteractiveAuth(options.interactiveAuth),
    nestedTags: options.nestedTags ?? false,
    securityWhen: options.securityWhen,
    cache: options.cache ?? true,
    extensions: options.extensions ?? [],
  }
}

import { reportTelemetry } from '@seshuk/payload-plugin-tooling/telemetry'
import type { Payload, PluginsMap } from 'payload'

import { PLUGIN_NAME, SCALAR_PLUGIN_NAME, SWAGGER_UI_PLUGIN_NAME } from '@/shared/constants.js'
import type { OpenApiPluginOptions, ResolvedOptions } from '@/shared/types/index.js'

export type TelemetryFeatures = {
  access: boolean
  cache: boolean
  extensions: boolean
  extensionTransform: boolean
  filtersEntities: boolean
  filtersExcludeOperations: boolean
  filtersIncludeSystem: boolean
  interactiveAuth: boolean
  nestedTags: boolean
  openapiVersion30: boolean
  openapiVersion31: boolean
  security: boolean
  serve: boolean
  servers: boolean
  trustedHosts: boolean
  uiScalar: boolean
  uiSwagger: boolean
}

export const buildFeatures = ({
  plugins,
  resolved,
}: {
  plugins: PluginsMap
  resolved: ResolvedOptions
}): TelemetryFeatures => ({
  access: Boolean(resolved.access),
  cache: resolved.cache,
  extensions: resolved.extensions.length > 0,
  extensionTransform: resolved.extensions.some((extension) => Boolean(extension.transform)),
  filtersEntities: resolved.filters.include.length > 0 || resolved.filters.exclude.length > 0,
  filtersExcludeOperations: resolved.filters.excludeOperations.length > 0,
  filtersIncludeSystem: resolved.filters.includeSystem,
  interactiveAuth: resolved.interactiveAuth.enabled,
  nestedTags: resolved.nestedTags,
  openapiVersion30: resolved.openapiVersion === '3.0',
  openapiVersion31: resolved.openapiVersion === '3.1',
  security: Boolean(resolved.security),
  serve: resolved.serve,
  servers: Boolean(resolved.servers),
  trustedHosts: resolved.trustedHosts.length > 0,
  uiScalar: Boolean(plugins[SCALAR_PLUGIN_NAME]),
  uiSwagger: Boolean(plugins[SWAGGER_UI_PLUGIN_NAME]),
})

export const reportOpenApiTelemetry = ({
  features,
  options,
  payload,
}: {
  features: TelemetryFeatures
  options: OpenApiPluginOptions
  payload: Payload
}): Promise<void> =>
  reportTelemetry({
    disableEnv: 'OPENAPI_TELEMETRY_DISABLED',
    docsUrl: 'https://payload-plugin-openapi.seshuk.im/v1/configuration/telemetry',
    features,
    option: options.telemetry,
    packageName: PLUGIN_NAME,
    payload,
    product: 'payload-plugin-openapi',
  })

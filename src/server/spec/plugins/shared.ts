import type { OperationObject, PathsObject, ResponsesObject, SchemaObject } from '@scalar/openapi-types/3.2'
import type { Endpoint, SanitizedCollectionConfig, SanitizedConfig } from 'payload'

import { jsonResponse } from '@/server/spec/components.js'
import { getOpenapiMeta, normalizePath } from '@/server/spec/paths/custom.js'
import type { Translate } from '@/shared/translations/types.js'
import type { BuildContext } from '@/shared/types/index.js'

export interface PluginBuildArgs {
  config: SanitizedConfig
  collections: SanitizedCollectionConfig[]
  ctx: BuildContext
  options: Record<string, unknown> | undefined
  schemas: Record<string, SchemaObject>
  t: Translate
}

export interface PluginGroup {
  paths: PathsObject
  slug?: string
}

export interface OfficialPlugin {
  slug: string
  tag: string
  installed?: (config: SanitizedConfig) => boolean
  build: (args: PluginBuildArgs) => PluginGroup[]
}

export const mountEndpoints = (
  endpoints: Endpoint[] | false | undefined,
  prefix: string,
  operation: (endpoint: Endpoint) => OperationObject | undefined,
): PathsObject => {
  const out: PathsObject = {}
  for (const endpoint of endpoints || []) {
    if (getOpenapiMeta(endpoint)) continue
    const op = operation(endpoint)
    if (!op) continue
    const path = normalizePath(prefix, endpoint.path)
    out[path] = { ...out[path], [endpoint.method]: op }
  }
  return out
}

export const collectionGroups = (
  collections: SanitizedCollectionConfig[],
  ctx: BuildContext,
  operation: (endpoint: Endpoint, collection: SanitizedCollectionConfig) => OperationObject | undefined,
): PluginGroup[] =>
  collections
    .map((collection) => ({
      slug: collection.slug,
      paths: mountEndpoints(collection.endpoints, `${ctx.apiRoute}/${collection.slug}`, (endpoint) =>
        operation(endpoint, collection),
      ),
    }))
    .filter((group) => Object.keys(group.paths).length > 0)

export const idSchema = (ctx: BuildContext): SchemaObject => ({
  type: ctx.defaultIDType === 'number' ? 'integer' : 'string',
})

export const messageSchema: SchemaObject = {
  type: 'object',
  properties: { message: { type: 'string' } },
  required: ['message'],
}

const MESSAGE_ERROR_KEYS = {
  '400': 'pluginError400',
  '401': 'pluginError401',
  '403': 'pluginError403',
  '404': 'pluginError404',
  '500': 'pluginError500',
} as const

export const messageErrors = (
  codes: Array<keyof typeof MESSAGE_ERROR_KEYS>,
  t: Translate,
  schema: SchemaObject = messageSchema,
): ResponsesObject => Object.fromEntries(codes.map((code) => [code, jsonResponse(t(MESSAGE_ERROR_KEYS[code]), schema)]))

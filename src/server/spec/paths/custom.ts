import type { OperationObject, PathsObject } from '@scalar/openapi-types/3.2'
import type { Endpoint, SanitizedCollectionConfig, SanitizedConfig, SanitizedGlobalConfig } from 'payload'

import type { BuildContext } from '@/shared/types/index.js'

const getOpenapiMeta = (endpoint: Endpoint): OperationObject | undefined => {
  const meta = endpoint.custom?.openapi
  return meta && typeof meta === 'object' ? (meta as OperationObject) : undefined
}

const normalizePath = (prefix: string, path: string): string => {
  const joined = `${prefix}${path.startsWith('/') ? path : `/${path}`}`
  return joined.replace(/:([A-Za-z0-9_]+)/g, '{$1}')
}

const collect = ({
  endpoints,
  prefix,
  out,
}: {
  endpoints: Endpoint[] | false | undefined
  prefix: string
  out: PathsObject
}): void => {
  if (!endpoints) return
  for (const endpoint of endpoints) {
    const meta = getOpenapiMeta(endpoint)
    if (!meta) continue
    const path = normalizePath(prefix, endpoint.path)
    const method = endpoint.method.toLowerCase()
    out[path] = { ...out[path], [method]: { ...meta } }
  }
}

export const buildCustomEndpointPaths = ({
  config,
  collections,
  globals,
  ctx,
}: {
  config: SanitizedConfig
  collections: SanitizedCollectionConfig[]
  globals: SanitizedGlobalConfig[]
  ctx: BuildContext
}): PathsObject => {
  const out: PathsObject = {}
  collect({ endpoints: config.endpoints, prefix: ctx.apiRoute, out })
  for (const collection of collections) {
    collect({ endpoints: collection.endpoints, prefix: `${ctx.apiRoute}/${collection.slug}`, out })
  }
  for (const global of globals) {
    collect({ endpoints: global.endpoints, prefix: `${ctx.apiRoute}/globals/${global.slug}`, out })
  }
  return out
}

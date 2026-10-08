import type { AcceptedLanguages, I18n } from '@payloadcms/translations'
import type { Document, ServerObject } from '@scalar/openapi-types/3.2'
import { getLocalI18n } from 'payload'
import type { BasePayload, SanitizedConfig } from 'payload'

import type { BuildContext, ResolvedOptions } from '@/shared/types/index.js'

import { buildDocument } from './buildDocument.js'
import { toOpenApi30, toOpenApi31 } from './downconvert.js'

export interface BuildOpenApiInput {
  payload: BasePayload
  options: ResolvedOptions
  language?: string
  i18n?: I18n
  servers?: ServerObject[]
}

export const staticServers = (options: ResolvedOptions, config: SanitizedConfig): ServerObject[] => {
  if (Array.isArray(options.servers)) return options.servers
  return config.serverURL ? [{ url: config.serverURL }] : []
}

export const buildOpenApiDocument = async (input: BuildOpenApiInput): Promise<Document> => {
  const { payload, options, language, servers } = input
  const { config } = payload

  const locales = config.localization === false ? [] : config.localization.locales.map((locale) => locale.code)

  const i18n =
    input.i18n ??
    (await getLocalI18n({ config, language: (language ?? config.i18n?.fallbackLanguage) as AcceptedLanguages }))

  const supported = Object.keys(config.i18n?.supportedLanguages ?? {})
  const docLanguages = supported.length > 0 ? supported : ['en']

  const ctx: BuildContext = {
    defaultIDType: payload.db.defaultIDType,
    locales,
    apiRoute: config.routes?.api ?? '/api',
    docLanguages,
    i18n,
  }

  const doc = await buildDocument({
    payload,
    options,
    servers: servers ?? staticServers(options, config),
    collections: Object.values(payload.collections).map((collection) => collection.config),
    globals: config.globals,
    config,
    ctx,
  })

  if (options.openapiVersion === '3.0') return toOpenApi30(doc)
  if (options.openapiVersion === '3.1') return toOpenApi31(doc)
  return doc
}

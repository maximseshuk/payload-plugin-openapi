import { getLocalI18n } from 'payload'
import type { BasePayload } from 'payload'
import type { AcceptedLanguages, I18n } from '@payloadcms/translations'
import type { Document } from '@scalar/openapi-types/3.2'

import type { BuildContext, ResolvedOptions } from '../types.js'
import { buildDocument } from './buildDocument.js'
import { toOpenApi30, toOpenApi31 } from './downconvert.js'

export interface BuildOpenApiInput {
  payload: BasePayload
  options: ResolvedOptions
  language?: string
  i18n?: I18n
  servers?: { url: string }[]
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
    options,
    servers: servers ?? [],
    collections: Object.values(payload.collections).map((collection) => collection.config),
    globals: config.globals,
    config,
    ctx,
    logger: payload.logger,
  })

  if (options.openapiVersion === '3.0') return toOpenApi30(doc)
  if (options.openapiVersion === '3.1') return toOpenApi31(doc)
  return doc
}

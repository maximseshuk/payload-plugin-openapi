import type { Document, ServerObject } from '@scalar/openapi-types/3.2'
import { Forbidden } from 'payload'
import type { PayloadHandler, PayloadRequest } from 'payload'

import { buildOpenApiDocument, staticServers } from '@/server/spec/build.js'
import type { ResolvedOptions } from '@/shared/types/index.js'

type SpecHandler = (options: ResolvedOptions) => PayloadHandler

const requestServers = async (req: PayloadRequest, options: ResolvedOptions): Promise<ServerObject[]> => {
  if (typeof options.servers === 'function') return options.servers({ req })
  const host = req.headers.get('host')?.toLowerCase()
  if (!options.servers && host && options.trustedHosts.includes(host)) {
    const protocol = host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https'
    return [{ url: `${protocol}://${host}` }]
  }
  return staticServers(options, req.payload.config)
}

const requestedLang = (req: PayloadRequest): string | undefined => {
  const raw = new URL(req.url ?? '', 'http://localhost').searchParams.get('lang')
  if (!raw) return undefined
  const supported = req.payload.config.i18n?.supportedLanguages
  return !supported || raw in supported ? raw : undefined
}

export const specHandler: SpecHandler = (options) => {
  const cache = new Map<string, Document>()

  return async (req: PayloadRequest) => {
    if (options.access && (await options.access({ req })) !== true) throw new Forbidden(req.t)
    const requested = requestedLang(req)
    const lang = requested ?? req.i18n?.language ?? req.payload.config.i18n?.fallbackLanguage ?? 'en'

    let doc = cache.get(lang)
    if (!options.cache || !doc) {
      doc = await buildOpenApiDocument({
        payload: req.payload,
        options,
        language: lang,
        i18n: requested ? undefined : req.i18n,
      })
      cache.set(lang, doc)
    }
    return Response.json({ ...doc, servers: await requestServers(req, options) })
  }
}

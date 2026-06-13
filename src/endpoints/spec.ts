import type { PayloadHandler, PayloadRequest } from 'payload'
import type { Document } from '@scalar/openapi-types/3.2'
import type { ResolvedOptions } from '../types.js'
import { buildOpenApiDocument } from '../spec/build.js'

type SpecHandler = (options: ResolvedOptions) => PayloadHandler

const deriveServerUrl = (req: PayloadRequest): string => {
  const host = req.headers.get('host') ?? 'localhost:3000'
  const protocol = host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https'
  return `${protocol}://${host}`
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
    const document = { ...doc, servers: [{ url: deriveServerUrl(req) }] }
    return Response.json(document)
  }
}

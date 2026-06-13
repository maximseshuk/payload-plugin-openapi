import { resolveOptions } from '../src/options.js'
import type { BuildContext } from '../src/types.js'
import type { Translate } from '../src/translations/types.js'
import { en } from '../src/translations/locales/en.js'
import { PLUGIN_NAME as NS } from '../src/constants.js'
import { I18n, importDateFNSLocale } from '@payloadcms/translations'

export const t: Translate = (key, vars) => {
  let str = en[NS][key]
  for (const [k, v] of Object.entries(vars ?? {})) {
    str = str.replaceAll(`{{${k}}}`, String(v))
  }
  return str
}

const stubT = (key: string, vars?: Record<string, unknown>): string => {
  const bare = key.startsWith(`${NS}:`) ? key.slice(NS.length + 1) : undefined
  if (!bare || !(bare in en[NS])) return key
  return t(bare as keyof (typeof en)[typeof NS], vars)
}

export const i18nStub: I18n = {
  language: 'en',
  fallbackLanguage: 'en',
  dateFNSKey: 'en-US',
  dateFNS: await importDateFNSLocale('en-US'),
  translations: {} as I18n['translations'],
  t: stubT as never,
}

export const ctx: BuildContext = {
  defaultIDType: 'text',
  locales: ['en', 'de'],
  apiRoute: '/api',
  docLanguages: ['en'],
  i18n: i18nStub,
}

export const baseInput = (overrides: Record<string, unknown> = {}) => ({
  options: resolveOptions({ metadata: { title: 'Test API', version: '1.0.0' } }),
  servers: [{ url: 'http://localhost:3000' }],
  collections: [],
  globals: [],
  config: {} as never,
  ctx,
  logger: { warn() {} } as never,
  ...overrides,
})

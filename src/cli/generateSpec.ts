import { writeFile } from 'node:fs/promises'
import path from 'node:path'

import { strictObject, z } from 'payload'
import { defineCLICommand } from 'payload/cli'

import { buildOpenApiDocument } from '@/server/spec/build.js'
import { PLUGIN_NAME } from '@/shared/constants.js'
import type { ResolvedOptions } from '@/shared/types/index.js'

const optionalString = (description: string) => z.optional(z.string()).check(z.describe(description))

export const generateSpecCommand = defineCLICommand({
  description: 'Write the OpenAPI document to a file.',
  input: strictObject({
    lang: optionalString(
      'Locale for translated descriptions; `all` writes one file per supported language. Defaults to the i18n fallback.',
    ),
    out: optionalString('Output file for a single-language run (default openapi.json).'),
    server: optionalString(
      'Base URL written to the document `servers`. Defaults to the `servers` option, then `serverURL`.',
    ),
  }),
  handler: async ({ args, getConfig, getPayload }) => {
    const config = await getConfig()
    const resolved = config.custom?.[PLUGIN_NAME] as ResolvedOptions | undefined
    if (!resolved) {
      throw new Error(
        `${PLUGIN_NAME}: plugin is not registered in payload.config — no resolved options found on config.custom['${PLUGIN_NAME}'].`,
      )
    }

    const payload = await getPayload()
    const { lang, out, server } = args
    const servers = server ? [{ url: server }] : undefined

    const fallback = config.i18n?.fallbackLanguage ?? 'en'
    const supported = config.i18n?.supportedLanguages ? Object.keys(config.i18n.supportedLanguages) : [fallback]
    const langs = lang === 'all' ? supported : [lang ?? fallback]

    for (const language of langs) {
      const doc = await buildOpenApiDocument({ payload, options: resolved, language, servers })
      const file = langs.length > 1 ? `openapi.${language}.json` : (out ?? 'openapi.json')
      await writeFile(path.resolve(file), `${JSON.stringify(doc, null, 2)}\n`)
      payload.logger.info(`Wrote ${file}`)
    }
  },
})

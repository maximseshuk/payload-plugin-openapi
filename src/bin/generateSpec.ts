import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { getPayload } from 'payload'
import type { SanitizedConfig } from 'payload'

import { PLUGIN_NAME } from '../constants.js'
import type { ResolvedOptions } from '../types.js'
import { buildOpenApiDocument } from '../spec/build.js'

interface CliArgs {
  lang?: string
  out?: string
  server?: string
}

export const parseArgs = (argv: string[]): CliArgs => {
  const args: CliArgs = {}
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === undefined) continue
    const read = (key: keyof CliArgs, flag: string): boolean => {
      if (arg === flag) {
        args[key] = argv[++i]
        return true
      }
      if (arg.startsWith(`${flag}=`)) {
        args[key] = arg.slice(flag.length + 1)
        return true
      }
      return false
    }
    if (read('lang', '--lang')) continue
    if (read('out', '--out')) continue
    read('server', '--server')
  }
  return args
}

/**
 * Bin entrypoint registered automatically by the OpenAPI plugin. Reads resolved
 * plugin options from `config.custom[PLUGIN_NAME]` (stashed during config build),
 * then writes the OpenAPI document(s) to disk — no HTTP request required.
 *
 * Flags:
 *   --lang <code|all>  locale for translated descriptions; `all` writes one file
 *                      per supported language. Defaults to the i18n fallback.
 *   --out <path>       output file for a single-language run (default openapi.json).
 *   --server <url>     base URL written to the document's `servers`. The HTTP
 *                      endpoint derives this per request; on disk there's no
 *                      request, so pass it here or leave `servers` empty.
 *
 * Note: the spec reflects public-access marking only (no per-user access),
 * identical to the HTTP endpoint.
 */
export const script = async (config: SanitizedConfig): Promise<void> => {
  const resolved = config.custom?.[PLUGIN_NAME] as ResolvedOptions | undefined
  if (!resolved) {
    throw new Error(
      `${PLUGIN_NAME}: plugin is not registered in payload.config — no resolved options found on config.custom['${PLUGIN_NAME}'].`,
    )
  }

  const payload = await getPayload({ config })
  const { lang, out, server } = parseArgs(process.argv)
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

  await payload.destroy()
  process.exit(0)
}

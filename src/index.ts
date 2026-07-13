import { fileURLToPath } from 'node:url'
import type { Config, Plugin } from 'payload'

import { PLUGIN_NAME } from './constants.js'
import { resolveOptions } from './options.js'
import type { OpenApiPluginOptions } from './types.js'
import { interactiveAuthHandler } from './endpoints/interactiveAuth.js'
import { specHandler } from './endpoints/spec.js'
import { translations } from './translations/index.js'

const BIN_KEY = 'openapi:generate'

const resolveBinScriptPath = (): string => {
  const selfUrl = new URL(import.meta.url)
  const ext = selfUrl.pathname.endsWith('.ts') ? '.ts' : '.js'
  return fileURLToPath(new URL(`./bin/generateSpec${ext}`, selfUrl))
}

export const openapi =
  (options: OpenApiPluginOptions): Plugin =>
  (config: Config): Config => {
    if (options.enabled === false) return config

    const resolved = resolveOptions(options)
    const authCollection = (config.collections ?? []).find((c) => Boolean(c.auth))?.slug ?? 'users'

    config.i18n = config.i18n ?? {}
    config.i18n.translations = config.i18n.translations ?? {}
    const supportedKeys = config.i18n.supportedLanguages ? Object.keys(config.i18n.supportedLanguages) : ['en']
    for (const lang of supportedKeys) {
      const pluginEntry = translations[lang as keyof typeof translations]
      if (!pluginEntry) continue
      const typedLang = lang as keyof typeof config.i18n.translations
      config.i18n.translations[typedLang] = {
        ...(config.i18n.translations[typedLang] as Record<string, unknown>),
        [PLUGIN_NAME]: pluginEntry[PLUGIN_NAME],
      } as (typeof config.i18n.translations)[typeof typedLang]
    }

    return {
      ...config,
      custom: {
        ...config.custom,
        [PLUGIN_NAME]: resolved,
      },
      bin: [...(config.bin ?? []), { key: BIN_KEY, scriptPath: resolveBinScriptPath() }],
      endpoints: [
        ...(config.endpoints ?? []),
        // `serve: false` registers the CLI bin only — nothing is mounted over HTTP.
        ...(resolved.serve
          ? [
              {
                path: resolved.specEndpoint,
                method: 'get' as const,
                handler: specHandler(resolved),
              },
              ...(resolved.interactiveAuth.enabled
                ? [
                    {
                      path: resolved.interactiveAuth.endpoint,
                      method: 'post' as const,
                      handler: interactiveAuthHandler(authCollection),
                    },
                  ]
                : []),
            ]
          : []),
      ],
    }
  }

export { buildOpenApiDocument } from './spec/build.js'
export type { BuildOpenApiInput } from './spec/build.js'
export { toOpenApi30, toOpenApi31 } from './spec/downconvert.js'
export { scalar } from './ui/scalar.js'
export { swaggerUi } from './ui/swagger.js'

export type {
  BuildContext,
  EntityOperation,
  EntitySecurityOverride,
  FilterOptions,
  OpenApiExtension,
  OpenApiMetadata,
  OpenApiPluginOptions,
  OpenApiVersion,
  OperationContext,
  UiPluginOptions,
} from './types.js'

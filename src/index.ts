import { fileURLToPath } from 'node:url'

import { definePlugin } from 'payload'

import { interactiveAuthHandler } from '@/server/endpoints/interactiveAuth.js'
import { specHandler } from '@/server/endpoints/spec.js'
import { resolveOptions } from '@/server/options/resolveOptions.js'
import { readSecurityOverride } from '@/server/spec/security.js'
import { buildFeatures, reportOpenApiTelemetry } from '@/server/telemetry.js'
import { PLUGIN_NAME } from '@/shared/constants.js'
import { translations } from '@/shared/translations/index.js'
import type { OpenApiPluginOptions } from '@/shared/types/index.js'

const CLI_COMMAND = 'openapi:generate'

const resolveCommandPath = (): string => {
  const selfUrl = new URL(import.meta.url)
  const ext = selfUrl.pathname.endsWith('.ts') ? '.ts' : '.js'
  return `${fileURLToPath(new URL(`./cli/generateSpec${ext}`, selfUrl))}#generateSpecCommand`
}

export const openapi = definePlugin<OpenApiPluginOptions>({
  slug: PLUGIN_NAME,
  plugin: ({ config, options, plugins }) => {
    const resolved = resolveOptions(options)
    for (const entity of [...(config.collections ?? []), ...(config.globals ?? [])]) readSecurityOverride(entity)
    if (options.enabled === false) return config

    const authCollection =
      resolved.interactiveAuth.collection ?? (config.collections ?? []).find((c) => Boolean(c.auth))?.slug ?? 'users'
    const features = buildFeatures({ plugins, resolved })

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
      cli:
        config.cli === false
          ? config.cli
          : {
              ...config.cli,
              commands: { [CLI_COMMAND]: resolveCommandPath(), ...config.cli?.commands },
            },
      endpoints: [
        ...(config.endpoints ?? []),
        ...(resolved.serve
          ? [
              {
                path: resolved.path,
                method: 'get' as const,
                handler: specHandler(resolved),
              },
              ...(resolved.interactiveAuth.enabled
                ? [
                    {
                      path: resolved.interactiveAuth.path,
                      method: 'post' as const,
                      handler: interactiveAuthHandler(authCollection),
                    },
                  ]
                : []),
            ]
          : []),
      ],
      onInit: async (payload) => {
        await config.onInit?.(payload)
        void reportOpenApiTelemetry({ features, options, payload })
      },
    }
  },
})

export { buildOpenApiDocument } from '@/server/spec/build.js'
export type { BuildOpenApiInput } from '@/server/spec/build.js'
export { toOpenApi30, toOpenApi31 } from '@/server/spec/downconvert.js'
export { scalar } from '@/server/ui/scalar.js'
export { swaggerUi } from '@/server/ui/swagger.js'

export type {
  AccessOption,
  BuildContext,
  EntityOpenApiMeta,
  EntityOperation,
  EntitySecurityOverride,
  ExtensionContext,
  FieldOpenApiMeta,
  FilterOptions,
  LocalizedText,
  OpenApiExtension,
  OpenApiInfo,
  OpenApiPluginOptions,
  OpenApiVersion,
  OperationContext,
  OperationFilter,
  OperationKind,
  OperationRule,
  SecurityMarking,
  SecurityOption,
  ServersOption,
  UiPluginOptions,
} from '@/shared/types/index.js'

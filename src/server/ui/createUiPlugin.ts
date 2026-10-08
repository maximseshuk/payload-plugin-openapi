import { definePlugin, Forbidden } from 'payload'

import { assertNoRemovedKeys } from '@/server/options/resolveOptions.js'
import { PLUGIN_NAME } from '@/shared/constants.js'
import type { ResolvedOptions, UiPluginOptions } from '@/shared/types/index.js'

export interface UiRenderArgs {
  specUrl: string
  cdnBase: string
  pinned: boolean
  title: string
  configuration: Record<string, unknown>
}

export interface UiPluginSpec {
  slug: string
  defaultDocsUrl: string
  defaultCdnBase: string
  render: (args: UiRenderArgs) => string
}

export const createUiPlugin = (spec: UiPluginSpec) =>
  definePlugin<UiPluginOptions | undefined>({
    slug: spec.slug,
    plugin: ({ config, options = {} }) => {
      assertNoRemovedKeys([[(options as Record<string, unknown>).specEndpoint, 'specEndpoint was renamed to specURL']])
      if (options.enabled === false) return config

      return {
        ...config,
        endpoints: [
          ...(config.endpoints ?? []),
          {
            path: options.path ?? spec.defaultDocsUrl,
            method: 'get',
            handler: async (req) => {
              if (options.access && (await options.access({ req })) !== true) throw new Forbidden(req.t)
              const { custom, routes } = req.payload.config
              const resolved = custom?.[PLUGIN_NAME] as ResolvedOptions | undefined
              const html = spec.render({
                specUrl: options.specURL ?? `${routes?.api ?? '/api'}${resolved?.path ?? '/openapi.json'}`,
                cdnBase: options.cdnBase ?? spec.defaultCdnBase,
                pinned: (options.cdnBase ?? spec.defaultCdnBase) === spec.defaultCdnBase,
                title: resolved?.info.title ?? 'API Reference',
                configuration: options.configuration ?? {},
              })
              return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } })
            },
          },
        ],
      }
    },
  })

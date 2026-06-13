import type { Config, Plugin } from 'payload'
import type { UiPluginOptions } from '../types.js'

export interface UiRenderArgs {
  specUrl: string
  cdnBase: string
  title: string
  configuration: Record<string, unknown>
}

export interface UiPluginSpec {
  defaultDocsUrl: string
  defaultCdnBase: string
  render: (args: UiRenderArgs) => string
}

export const createUiPlugin =
  (spec: UiPluginSpec) =>
  (options: UiPluginOptions = {}): Plugin =>
  (config: Config): Config => {
    if (options.enabled === false) return config

    const docsPath = options.path ?? spec.defaultDocsUrl
    const specUrl = options.specEndpoint ?? `${config.routes?.api ?? '/api'}/openapi.json`
    const cdnBase = options.cdnBase ?? spec.defaultCdnBase
    const html = spec.render({
      specUrl,
      cdnBase,
      title: 'API Reference',
      configuration: options.configuration ?? {},
    })

    return {
      ...config,
      endpoints: [
        ...(config.endpoints ?? []),
        {
          path: docsPath,
          method: 'get',
          handler: () => new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } }),
        },
      ],
    }
  }

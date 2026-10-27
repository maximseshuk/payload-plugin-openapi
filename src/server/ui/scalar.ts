import type { Plugin } from 'payload'

import { SCALAR_PLUGIN_NAME } from '@/shared/constants.js'
import type { UiPluginOptions } from '@/shared/types/index.js'

import { createUiPlugin } from './createUiPlugin.js'
import { escapeHtml, htmlPage, integrityAttrs, jsonForScript, specUrlExpr } from './html.js'

const SCRIPT_INTEGRITY = 'sha384-omTRdD9MbjA1vm12DqRUVvqJlr3VzSixvAdF1Jruu9AJOiJKyTKraIB6DyX+m10M'

export const scalar: (options?: UiPluginOptions) => Plugin = createUiPlugin({
  slug: SCALAR_PLUGIN_NAME,
  defaultDocsUrl: '/docs',
  defaultCdnBase: 'https://cdn.jsdelivr.net/npm/@scalar/api-reference@1.72.4/dist/browser/standalone.js',
  render: ({ specUrl, cdnBase, pinned, title, configuration }) =>
    htmlPage({
      title,
      head: '',
      body:
        `<div id="app"></div>` +
        `<script src="${escapeHtml(cdnBase)}"${integrityAttrs(pinned, SCRIPT_INTEGRITY)}></script>` +
        `<script>Scalar.createApiReference('#app',{url:${specUrlExpr(specUrl)},` +
        `...${jsonForScript(configuration)}})</script>`,
    }),
})

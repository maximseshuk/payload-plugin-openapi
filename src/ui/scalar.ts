import { createUiPlugin } from './createUiPlugin.js'
import { escapeHtml, htmlPage, jsonForScript, specUrlExpr } from './html.js'

export const scalar = createUiPlugin({
  defaultDocsUrl: '/docs',
  defaultCdnBase: 'https://cdn.jsdelivr.net/npm/@scalar/api-reference',
  render: ({ specUrl, cdnBase, title, configuration }) =>
    htmlPage({
      title,
      head: '',
      body:
        `<div id="app"></div>` +
        `<script src="${escapeHtml(cdnBase)}"></script>` +
        `<script>Scalar.createApiReference('#app',{url:${specUrlExpr(specUrl)},` +
        `...${jsonForScript(configuration)}})</script>`,
    }),
})

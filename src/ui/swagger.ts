import { createUiPlugin } from './createUiPlugin.js'
import { escapeHtml, htmlPage, jsonForScript, specUrlExpr } from './html.js'

export const swaggerUi = createUiPlugin({
  defaultDocsUrl: '/docs',
  defaultCdnBase: 'https://cdn.jsdelivr.net/npm/swagger-ui-dist',
  render: ({ specUrl, cdnBase, title, configuration }) =>
    htmlPage({
      title,
      head: `<link rel="stylesheet" href="${escapeHtml(cdnBase)}/swagger-ui.css"/>`,
      body:
        `<div id="swagger-ui"></div>` +
        `<script src="${escapeHtml(cdnBase)}/swagger-ui-bundle.js"></script>` +
        `<script>window.onload=()=>SwaggerUIBundle({url:${specUrlExpr(specUrl)},` +
        `dom_id:'#swagger-ui',...${jsonForScript(configuration)}})</script>`,
    }),
})

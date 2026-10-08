import { SWAGGER_UI_PLUGIN_NAME } from '@/shared/constants.js'

import { createUiPlugin } from './createUiPlugin.js'
import { escapeHtml, htmlPage, integrityAttrs, jsonForScript, specUrlExpr } from './html.js'

const STYLE_INTEGRITY = 'sha384-Ov4/wv3j2bmct8cDc5X4ngJZohVPzEmc6uDPH8WeljUxO5vtoykvMEfbu9Vh6RaW'
const SCRIPT_INTEGRITY = 'sha384-ZPehFMQommnnuaZ4rpxgkgTT2DKFVp4hZC/7pLit+9Lek9T1YGSo23eHFbvNkXkw'

export const swaggerUi = createUiPlugin({
  slug: SWAGGER_UI_PLUGIN_NAME,
  defaultDocsUrl: '/docs',
  defaultCdnBase: 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.33.1',
  render: ({ specUrl, cdnBase, pinned, title, configuration }) =>
    htmlPage({
      title,
      head: `<link rel="stylesheet" href="${escapeHtml(cdnBase)}/swagger-ui.css"${integrityAttrs(pinned, STYLE_INTEGRITY)}/>`,
      body:
        `<div id="swagger-ui"></div>` +
        `<script src="${escapeHtml(cdnBase)}/swagger-ui-bundle.js"${integrityAttrs(pinned, SCRIPT_INTEGRITY)}></script>` +
        `<script>window.onload=()=>SwaggerUIBundle({url:${specUrlExpr(specUrl)},` +
        `dom_id:'#swagger-ui',...${jsonForScript(configuration)}})</script>`,
    }),
})

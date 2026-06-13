export const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export const jsonForScript = (value: unknown): string => JSON.stringify(value ?? {}).replace(/</g, '\\u003c')

export const htmlPage = ({ title, head, body }: { title: string; head: string; body: string }): string =>
  `<!doctype html><html><head><meta charset="utf-8"/><title>${escapeHtml(title)}</title>` +
  `<meta name="viewport" content="width=device-width, initial-scale=1"/>${head}</head>` +
  `<body>${body}</body></html>`

export const specUrlExpr = (specUrl: string): string => {
  const u = JSON.stringify(specUrl)
  return `(function(){var l=new URLSearchParams(location.search).get('lang');return ${u}+(l?((${u}.indexOf('?')>-1?'&':'?')+'lang='+encodeURIComponent(l)):'')})()`
}

import { ecommerce } from './ecommerce.js'
import { importExport } from './importExport.js'
import { mcp } from './mcp.js'
import { multiTenant } from './multiTenant.js'
import { search } from './search.js'
import { seo } from './seo.js'
import type { OfficialPlugin } from './shared.js'
import { storageR2 } from './storageR2.js'
import { stripe } from './stripe.js'

export const OFFICIAL_PLUGINS: OfficialPlugin[] = [
  ecommerce,
  stripe,
  mcp,
  seo,
  search,
  multiTenant,
  importExport,
  storageR2,
]

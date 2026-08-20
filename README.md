<div align="center">

<picture>
  <img src="docs/logo.svg" alt="OpenAPI Plugin for Payload CMS" height="80" />
</picture>

<h1>OpenAPI Plugin for Payload CMS</h1>

<p>Generate an OpenAPI 3.0/3.1/3.2 specification from your Payload config and serve it with Scalar or Swagger UI.</p>

<a href="https://github.com/maximseshuk/payload-plugin-openapi/releases/"><img src="https://img.shields.io/github/v/release/maximseshuk/payload-plugin-openapi?style=flat-square&logo=github" alt="GitHub release" /></a>
<a href="https://www.npmjs.com/package/@seshuk/payload-plugin-openapi"><img src="https://img.shields.io/npm/v/@seshuk/payload-plugin-openapi?style=flat-square&logo=npm" alt="npm version" /></a>
<a href="https://www.npmjs.com/package/@seshuk/payload-plugin-openapi"><img src="https://img.shields.io/npm/dm/@seshuk/payload-plugin-openapi?style=flat-square&logo=npm" alt="npm downloads" /></a>
<a href="https://github.com/maximseshuk/payload-plugin-openapi/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/maximseshuk/payload-plugin-openapi/ci.yml?style=flat-square&logo=github" alt="CI" /></a>
<a href="https://payload-plugin-openapi.seshuk.im/"><img src="https://img.shields.io/badge/docs-payload--plugin--openapi.seshuk.im-blue?style=flat-square&logo=readthedocs&logoColor=white" alt="Documentation" /></a>
<a href="https://github.com/maximseshuk/payload-plugin-openapi/blob/main/LICENSE"><img src="https://img.shields.io/github/license/maximseshuk/payload-plugin-openapi?style=flat-square" alt="license" /></a>
<a href="https://ko-fi.com/V7V61UCT39"><img src="https://img.shields.io/badge/Ko--fi-Buy_me_a_coffee-ff5f5f?style=flat-square&logo=ko-fi&logoColor=white" alt="Ko-fi" /></a>

</div>

## Features

- **Full spec from your config** — collections, globals, auth, versions, and jobs are documented with zero annotation.
- **Interactive docs included** — mount Scalar or Swagger UI, or both on different paths.
- **Native metadata** — document custom endpoints and refine field schemas through Payload's own `custom.openapi` key. No wrapper, no separate registry.
- **Precise filtering** — choose exactly which entities and operations end up in the spec.
- **Security marking** — every operation is marked public or secured by probing your access functions, with per-entity and document-wide overrides.
- **Localized** — descriptions resolve through your Payload i18n, and the UI ships translations for 44 locales.
- **File generation** — write the spec to disk with `payload openapi:generate` for CI, schema diffs, or client codegen.
- **One option for the spec version** — serve OpenAPI 3.0, 3.1, or 3.2 from the same config.

## Quick start

Requires **Payload CMS 3.53.0 or later** and **Node.js 20 or later**.

### Install

```bash
npm install @seshuk/payload-plugin-openapi
yarn add @seshuk/payload-plugin-openapi
pnpm add @seshuk/payload-plugin-openapi
```

### Configure

Add the plugin to your Payload config, plus a docs UI renderer:

```typescript
import { buildConfig } from 'payload'
import { openapi, scalar } from '@seshuk/payload-plugin-openapi'

export default buildConfig({
  plugins: [
    openapi({
      metadata: {
        title: 'My API',
        version: '1.0.0',
      },
    }),
    scalar(),
  ],
})
```

Two endpoints are now live, both relative to your API route (`/api` by default):

- `GET /api/openapi.json` — the generated OpenAPI document
- `GET /api/docs` — the interactive API reference

`metadata.title` and `metadata.version` are required; the plugin throws at boot without them. Prefer Swagger UI? Swap `scalar()` for `swaggerUi()`, or mount both on different paths.

The document is built lazily from the fully sanitized config, so collections, fields, and endpoints added by other plugins are picked up regardless of plugin order.

Add `filters` to control what is exposed, `interactiveAuth` for a login dialog in the docs UI, `extensions` for anything the generator doesn't produce on its own — see the [configuration reference](https://payload-plugin-openapi.seshuk.im/configuration/overview).

## Documentation

Full docs are at **<https://payload-plugin-openapi.seshuk.im/>**:

- [Quick start](https://payload-plugin-openapi.seshuk.im/quick-start)
- [Configuration reference](https://payload-plugin-openapi.seshuk.im/configuration/overview)
- [Filters](https://payload-plugin-openapi.seshuk.im/configuration/filters)
- [Security marking](https://payload-plugin-openapi.seshuk.im/configuration/security-marking)
- [Docs UI — Scalar & Swagger](https://payload-plugin-openapi.seshuk.im/configuration/docs-ui)
- [Documenting custom endpoints](https://payload-plugin-openapi.seshuk.im/guides/custom-endpoints)
- [Field metadata](https://payload-plugin-openapi.seshuk.im/guides/field-metadata)
- [CLI — `openapi:generate`](https://payload-plugin-openapi.seshuk.im/cli/generate)
- [Examples](https://payload-plugin-openapi.seshuk.im/guides/examples)

## For plugin authors

If you maintain a Payload plugin, attach a `custom.openapi` Operation Object to the endpoints you add and they show up in the generated spec — no dependency on this package, and nothing for your users to wire up. The same key works on fields. If this plugin isn't installed, the metadata is inert. See [For plugin authors](https://payload-plugin-openapi.seshuk.im/guides/plugin-authors).

## Related plugins

- **[@seshuk/payload-storage-bunny](https://github.com/maximseshuk/payload-storage-bunny)** — store files and stream video from Payload CMS on Bunny's global CDN.
- **[@seshuk/payload-plugin-media-preview](https://github.com/maximseshuk/payload-plugin-media-preview)** — preview images, video, audio, and documents directly in the Payload admin panel.

## Support

Bug reports, feature requests, and questions go to [GitHub Issues](https://github.com/maximseshuk/payload-plugin-openapi/issues). For Payload itself, see the [Payload CMS docs](https://payloadcms.com/docs) and [Discord](https://discord.gg/payloadcms).

## License

MIT — see [LICENSE](LICENSE).

## Credits

Built by [Maxim Seshuk](https://github.com/maximseshuk) for the Payload CMS community.

If this plugin saves you time, you can [buy me a coffee](https://ko-fi.com/seshuk) ☕

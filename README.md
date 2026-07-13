<div align="center">

<h1>OpenAPI Plugin for Payload CMS</h1>

<p>OpenAPI 3.0/3.1/3.2 specs from your Payload CMS instance, with Scalar or Swagger UI.</p>

<a href="https://www.npmjs.com/package/@seshuk/payload-plugin-openapi"><img src="https://img.shields.io/npm/v/@seshuk/payload-plugin-openapi?style=flat-square&logo=npm" alt="npm version" /></a>
<a href="https://www.npmjs.com/package/@seshuk/payload-plugin-openapi"><img src="https://img.shields.io/npm/dm/@seshuk/payload-plugin-openapi?style=flat-square" alt="npm downloads" /></a>
<a href="https://github.com/maximseshuk/payload-plugin-openapi/releases/"><img src="https://img.shields.io/github/v/release/maximseshuk/payload-plugin-openapi?style=flat-square&logo=github" alt="GitHub release" /></a>
<a href="https://github.com/maximseshuk/payload-plugin-openapi/blob/main/LICENSE"><img src="https://img.shields.io/github/license/maximseshuk/payload-plugin-openapi?style=flat-square" alt="license" /></a>
<a href="https://ko-fi.com/V7V61UCT39"><img src="https://img.shields.io/badge/Ko--fi-Buy_me_a_coffee-ff5f5f?style=flat-square&logo=ko-fi&logoColor=white" alt="Ko-fi" /></a>

</div>

## Features

- Full spec from your config — collections, globals, auth, versions, and jobs, with zero annotation needed.
- Document custom endpoints and refine field schemas and descriptions with native `custom.openapi` metadata.
- Localized descriptions and 44 UI locales, resolved through your Payload i18n.
- Interactive docs out of the box with **Scalar** or **Swagger UI**.
- Filter exactly which entities and operations are exposed.
- Generate the spec to a file for CI, schema diffs, or client codegen.
- OpenAPI 3.0, 3.1, or 3.2 — one option switches the output.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
  - [Plugin Options](#plugin-options)
  - [Metadata](#metadata)
  - [OpenAPI Version](#openapi-version)
  - [Filters](#filters)
  - [Interactive Auth](#interactive-auth)
  - [Security Marking](#security-marking)
  - [Caching](#caching)
- [Docs UI](#docs-ui)
- [Documenting Custom Endpoints](#documenting-custom-endpoints)
  - [Annotating fields](#annotating-fields)
  - [For plugin authors](#for-plugin-authors)
- [Extensions](#extensions)
- [Writing to a File](#writing-to-a-file)
  - [Generate only, no runtime endpoint](#generate-only-no-runtime-endpoint)
  - [Serving a pre-generated file in the docs UI](#serving-a-pre-generated-file-in-the-docs-ui)
- [Programmatic Use](#programmatic-use)
- [Internationalization](#internationalization)
- [Exports](#exports)
- [License](#license)
- [Related Plugins](#related-plugins)

## Requirements

- Payload `^3.53.0`
- Node.js `>=20`

## Installation

```bash
pnpm add @seshuk/payload-plugin-openapi
# or
npm install @seshuk/payload-plugin-openapi
# or
yarn add @seshuk/payload-plugin-openapi
```

## Quick Start

```ts
import { openapi, scalar } from '@seshuk/payload-plugin-openapi'
import { buildConfig } from 'payload'

export default buildConfig({
  // ...
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

That's it. Two endpoints are now live:

- `GET /api/openapi.json` — the generated OpenAPI document
- `GET /api/docs` — interactive API reference (Scalar)

Both paths are mounted under your Payload API route (`routes.api`, `/api` by default), since the plugin registers them as Payload endpoints. The `path` and `specEndpoint` options you pass are relative to that route.

Prefer Swagger UI? Swap `scalar()` for `swaggerUi()` — or mount both on different paths.

> [!NOTE]
> `metadata.title` and `metadata.version` are required. The plugin throws on boot if either is missing.

## Configuration

### Plugin Options

| Option            | Type                            | Default           | Description                                                                                                                |
| ----------------- | ------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `metadata`        | `OpenApiMetadata`               | —                 | API title, version, and description. **Required.**                                                                         |
| `openapiVersion`  | `'3.0' \| '3.1' \| '3.2'`       | `'3.2'`           | Spec version to serve                                                                                                      |
| `specEndpoint`    | `string`                        | `'/openapi.json'` | Path the spec is served from (relative to the API route)                                                                   |
| `enabled`         | `boolean`                       | `true`            | Set `false` to disable the plugin entirely                                                                                 |
| `serve`           | `boolean`                       | `true`            | Set `false` to register only the CLI generator and serve nothing over HTTP ([details](#generate-only-no-runtime-endpoint)) |
| `filters`         | `FilterOptions`                 | see below         | Which entities and operations to document ([details](#filters))                                                            |
| `interactiveAuth` | `boolean \| { endpoint }`       | `false`           | Username/password login for the docs UI                                                                                    |
| `nestedTags`      | `boolean`                       | `false`           | Emit an OpenAPI 3.2 nested tag hierarchy (see below)                                                                       |
| `securityWhen`    | `(ctx) => boolean \| undefined` | —                 | Override the auto-detected security marking per operation ([details](#security-marking))                                   |
| `cache`           | `boolean`                       | `true`            | Cache the built document for the life of the process                                                                       |
| `extensions`      | `OpenApiExtension[]`            | `[]`              | Inject paths, components, tags, or transform the document                                                                  |

### Metadata

```ts
openapi({
  metadata: {
    title: 'My API',
    version: '1.0.0',
    description: 'Public API for the example app.',
  },
})
```

### OpenAPI Version

The document is always built as 3.2. The `openapiVersion` option controls what gets served:

| Version | Behavior                                                                      |
| ------- | ----------------------------------------------------------------------------- |
| `'3.2'` | Served as built (default)                                                     |
| `'3.1'` | A downconversion pass strips 3.2-only fields                                  |
| `'3.0'` | A downconversion pass to 3.0 (e.g. nullable handling, `examples` → `example`) |

> [!NOTE]
> Scalar and Swagger UI don't render OpenAPI 3.2 nested tags yet. The `nestedTags` option is **off by default**, so `doc.tags` is a flat list of per-entity tags with descriptions. Turn it on only if your consumer understands the 3.2 `kind`/`parent` tag tree.

### Filters

`filters` decides what ends up in the spec: which entities are documented, which Payload-internal collections show up, which endpoint groups are generated, and which operations are dropped. It's one flat object.

| Option              | Type               | Default | Description                                                                     |
| ------------------- | ------------------ | ------- | ------------------------------------------------------------------------------- |
| `include`           | `EntityMatcher[]`  | `[]`    | Allowlist. When non-empty, only matching entities are documented                |
| `exclude`           | `EntityMatcher[]`  | `[]`    | Entities to leave out entirely (schemas and paths)                              |
| `includeHidden`     | `boolean`          | `false` | Include collections flagged `hidden` / `admin.hidden`                           |
| `includeSystem`     | `boolean`          | `false` | Include Payload-internal collections (`payload-jobs`, `payload-preferences`, …) |
| `includeCustom`     | `boolean`          | `true`  | Document endpoints carrying `custom.openapi` metadata                           |
| `includeAuth`       | `boolean`          | `true`  | Document auth operations (login / logout / me / …)                              |
| `includeAdminAuth`  | `boolean`          | `false` | Document admin/bootstrap auth endpoints (`/init`, `/access`, first-register)    |
| `includeVersions`   | `boolean`          | `true`  | Document version operations (`/versions`, `/versions/{id}`)                     |
| `includeJobs`       | `boolean`          | `true`  | Document jobs endpoints (`/payload-jobs/run`, `/handle-schedules`)              |
| `excludeOperations` | `OperationRule[]`  | `[]`    | Per-operation removal rules                                                     |
| `excludeWhen`       | `(ctx) => boolean` | —       | Escape hatch: return `true` to drop an operation                                |

#### Choosing entities with `include` and `exclude`

These two lists decide which collections and globals are documented. Each entry is one of three things:

| Matcher          | Matches                                                        | Example                           |
| ---------------- | -------------------------------------------------------------- | --------------------------------- |
| a string         | one entity by its exact slug                                   | `'posts'`                         |
| a `RegExp`       | every entity whose slug matches the pattern                    | `/^marketing-/`                   |
| `{ kind, slug }` | one entity, when a collection and a global share the same slug | `{ kind: 'global', slug: 'nav' }` |

The rules are:

- `include` is an allowlist. Leave it empty and everything is documented; add anything and only matching entities survive.
- `exclude` always wins. If an entity matches both lists, it's dropped.

**Document only a few collections.** With `include` set, nothing else makes it into the spec:

```ts
filters: {
  include: ['posts', 'media', 'categories'],
}
```

**Document everything except a couple of entities:**

```ts
filters: {
  exclude: ['audit-log', 'internal-settings'],
}
```

**Match a group of slugs with a regular expression.** The pattern is tested against the slug, so this keeps every collection whose slug starts with `public-`:

```ts
filters: {
  // public-posts, public-media, public-authors … all kept; everything else dropped.
  include: [/^public-/],
}
```

A few more patterns, for reference:

- `/^public-/` — slug starts with `public-`
- `/-draft$/` — slug ends with `-draft`
- `/^(posts|pages)$/` — slug is exactly `posts` or `pages`
- `/internal/i` — slug contains `internal`, case-insensitive

**Disambiguate a collection from a global.** If you have a collection and a global that share a slug, a plain string would match both. Use `{ kind, slug }` to target one:

```ts
filters: {
  // Keep the `settings` collection, drop the `settings` global.
  exclude: [{ kind: 'global', slug: 'settings' }],
}
```

**Mix them.** `include` narrows the set first, then `exclude` removes from what's left:

```ts
filters: {
  // Document every `public-*` collection, but never the drafts one.
  include: [/^public-/],
  exclude: ['public-drafts'],
}
```

`include` and `exclude` only apply to your own collections and globals. Hidden and Payload-internal collections are governed by `includeHidden` and `includeSystem`, which run first — adding `payload-jobs` to `include` won't surface it unless `includeSystem` is on.

#### Dropping individual operations

`include` / `exclude` work at the entity level. To remove specific operations (a single method on one collection, every `DELETE`, anything under a path prefix), use `excludeOperations` or `excludeWhen`.

Each rule in `excludeOperations` is a set of conditions. Within one rule every field you set must match (AND). Across rules, an operation is dropped if any rule matches it. Leave a field out and it matches anything.

```ts
filters: {
  excludeOperations: [
    // Drop every DELETE, on any entity.
    { method: 'delete' },
    // Drop writes to `posts`, but leave its reads alone.
    { slug: 'posts', method: ['post', 'patch', 'put'] },
    // Drop anything matching a path, regardless of method or entity.
    { path: /\/preview$/ },
  ],
}
```

`excludeWhen` is the escape hatch for logic that doesn't fit a rule. It runs after `excludeOperations` and gets the method, path, slug, and kind for each operation:

```ts
filters: {
  excludeWhen: ({ path, method }) => path.includes('/internal/') || method === 'put',
}
```

### Interactive Auth

By default the docs UI expects you to paste a bearer token. Turn on `interactiveAuth` to add a token endpoint and a matching security scheme, so Scalar/Swagger can show an **Authorize** dialog where users log in with their Payload credentials:

```ts
openapi({
  metadata: { title: 'My API', version: '1.0.0' },
  interactiveAuth: true, // token endpoint at /api/openapi-auth
  // interactiveAuth: { endpoint: '/login' },  // or a custom path → /api/login
})
```

The endpoint logs in against your first auth-enabled collection (falling back to `users`) and returns the JWT. It accepts the username as either `email` or `username`, matching how your collection is configured.

> [!WARNING]
> The interactive auth endpoint exchanges credentials for a live JWT. Only enable it on docs you intend real users to authenticate against, and serve them over HTTPS.

### Security Marking

Each operation in the spec is marked either public or secured (referencing the `PayloadToken` scheme). The marking is a **static hint**, not a live access check — it tells a reader which endpoints need a token.

By default the plugin figures this out per operation by probing your Payload access functions as an **anonymous request** (`user: null`): an operation is marked public only if its access function settles on `true`. The probe is deliberately conservative:

- An `async` access function is awaited — `async () => true` is correctly public.
- A function that returns a `Where` query (partial access), throws, or times out is marked secured.
- A function that reaches into the database (`req.payload.find(...)`) is marked secured — the probe never runs live queries, so DB-driven access always errs on the side of a padlock.

The marking is per operation: `read` covers list/find-by-id/count, `create` covers create/duplicate, `update` covers update and bulk update, `delete` covers delete and bulk delete.

When the guess is wrong, override it — two ways, override wins over the probe:

**Per entity, with `custom.openapi.security`** on a collection or global:

```ts
export const Posts: CollectionConfig = {
  slug: 'posts',
  custom: {
    openapi: {
      // true → all operations public; false → all secured; or per operation:
      security: { read: true, create: false, update: false, delete: false },
    },
  },
  // ...
}
```

**Across the whole document, with `securityWhen`** — an escape hatch mirroring `filters.excludeWhen`. Return `true` to mark an operation public, `false` to mark it secured, or `undefined` to keep the detected marking. It runs last, after `custom.openapi.security` and the probe, over collection, global, auth, and version operations alike:

```ts
openapi({
  metadata: { title: 'My API', version: '1.0.0' },
  securityWhen: ({ slug, method }) => (slug === 'public-feed' && method === 'get' ? true : undefined),
})
```

> [!NOTE]
> This is public-access marking only — the plugin never runs per-user access checks. The generated spec matches what the HTTP endpoint enforces at runtime; the marking just documents it.

### Caching

The Payload config is static after boot, so the document is identical on every request apart from the server URL (which is always filled in fresh). Caching is on by default. Disable it in development so edits to your config show up without a restart:

```ts
openapi({
  metadata: { title: 'My API', version: '1.0.0' },
  cache: process.env.NODE_ENV === 'production',
})
```

## Docs UI

The plugin ships two UI renderers. Each is a separate Payload plugin you add alongside `openapi()` — mount one, or both on different paths:

```ts
import { openapi, scalar, swaggerUi } from '@seshuk/payload-plugin-openapi'

plugins: [
  openapi({ metadata: { title: 'My API', version: '1.0.0' } }),
  scalar(), // Scalar at /api/docs
  swaggerUi({ path: '/swagger' }), // Swagger UI at /api/swagger
]
```

Both renderers accept the same options:

| Option          | Type                      | Default                     | Description                                                                       |
| --------------- | ------------------------- | --------------------------- | --------------------------------------------------------------------------------- |
| `path`          | `string`                  | `'/docs'`                   | Where the docs UI is served, relative to the API route (so `/docs` → `/api/docs`) |
| `specEndpoint`  | `string`                  | `'<apiRoute>/openapi.json'` | URL the UI fetches the document from                                              |
| `cdnBase`       | `string`                  | official jsDelivr package   | CDN base for the UI's assets                                                      |
| `configuration` | `Record<string, unknown>` | `{}`                        | Extra config merged into the library's init options                               |
| `enabled`       | `boolean`                 | `true`                      | Set `false` to skip mounting the UI                                               |

`configuration` is passed straight through to the underlying library — Scalar's `createApiReference` config or Swagger's `SwaggerUIBundle` options. It must be JSON-serializable; functions aren't supported there.

```ts
scalar({
  configuration: {
    theme: 'purple',
    hideDownloadButton: true,
  },
})
```

## Documenting Custom Endpoints

Any custom Payload endpoint with `custom.openapi` metadata is picked up automatically (as long as `filters.includeCustom` stays on). The metadata is a standard OpenAPI [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object):

```ts
import type { Endpoint } from 'payload'

const healthEndpoint: Endpoint = {
  path: '/health',
  method: 'get',
  handler: () => Response.json({ ok: true }),
  custom: {
    openapi: {
      summary: 'Health check',
      tags: ['System'],
      responses: {
        '200': { description: 'Service is healthy' },
      },
    },
  },
}
```

Endpoints are collected from the top-level config (`/api/health`), from collections (`/api/<slug>/...`), and from globals (`/api/globals/<slug>/...`). Path params written `:id` are normalized to `{id}` for you.

`custom.openapi` is the convention shown in Payload's own [agent skills](https://github.com/payloadcms/payload/blob/main/tools/claude-plugin/skills/payload/reference/ENDPOINTS.md#openapi-documentation). The plugin reads exactly that shape, so the metadata you write stays a plain OpenAPI Operation Object on the endpoint where it belongs — no plugin-specific wrapper, no separate registry to keep in sync. Endpoints already documented this way are picked up with zero changes.

### Annotating fields

The same `custom.openapi` convention works on individual fields. The plugin already infers each field's schema from its Payload type; anything you put under `custom.openapi` is merged on top of that schema, so you can add a `description`, an `example`, `format`, constraints, or override what was inferred:

```ts
import type { Field } from 'payload'

const slug: Field = {
  name: 'slug',
  type: 'text',
  custom: {
    openapi: {
      description: 'URL-safe identifier, lowercase with dashes.',
      pattern: '^[a-z0-9-]+$',
      example: 'hello-world',
    },
  },
}
```

The merge is deep and your keys win, so `custom.openapi` only changes what you name and leaves the rest of the inferred schema intact. It applies wherever the field appears — read, create, and update schemas alike.

`description`, `title`, and `summary` are localizable. Give them a function or a locale-keyed object and they're resolved against the request language, the same way Payload labels are:

```ts
const slug: Field = {
  name: 'slug',
  type: 'text',
  custom: {
    openapi: {
      // a function…
      description: ({ t }) => t('fields:slugHelp'),
      // …or a locale map:
      // description: { en: 'URL-safe identifier', ru: 'URL-совместимый идентификатор' },
    },
  },
}
```

### For plugin authors

If you maintain a Payload plugin that adds its own endpoints, you can make them show up in the spec **without depending on this package** — and without your users having to wire anything up. Attach a `custom.openapi` Operation Object to each endpoint you add, exactly as above:

```ts
import type { Config, Plugin } from 'payload'

export const myPlugin =
  (): Plugin =>
  (config: Config): Config => ({
    ...config,
    endpoints: [
      ...(config.endpoints ?? []),
      {
        path: '/my-feature/sync',
        method: 'post',
        handler: syncHandler,
        custom: {
          // Picked up automatically if the OpenAPI plugin is installed; ignored otherwise.
          openapi: {
            summary: 'Trigger a sync',
            tags: ['My Feature'],
            responses: { '202': { description: 'Sync queued' } },
          },
        },
      },
    ],
  })
```

If your plugin adds collections, globals, or fields, the field-level `custom.openapi` from [above](#annotating-fields) works there too — annotate the fields you add and they carry their own documentation into the spec.

This works regardless of plugin order. The OpenAPI plugin doesn't read your config when it runs — it builds the document lazily, on request, from the fully sanitized config. By then every plugin has run, so it sees your endpoints and fields no matter where either plugin sits in the `plugins` array. The `custom.openapi` key is a plain convention: if the OpenAPI plugin isn't installed, the metadata is inert and harmless.

For documentation that isn't tied to a single endpoint or field — shared components, extra tags, or a post-build transform — your users can pass an [extension](#extensions). That's an opt-in your users wire into their own `openapi({ extensions: [...] })` call; there's no implicit cross-plugin channel to maintain.

## Extensions

For anything the generator doesn't produce on its own, pass `extensions`. Each extension can add paths, components, and tags, and/or transform the finished document before it's served:

```ts
import type { OpenApiExtension } from '@seshuk/payload-plugin-openapi'

const myExtension: OpenApiExtension = {
  paths: {
    '/webhooks/stripe': {
      post: { summary: 'Stripe webhook', responses: { '200': { description: 'OK' } } },
    },
  },
  components: {
    securitySchemes: {
      apiKey: { type: 'apiKey', in: 'header', name: 'X-API-Key' },
    },
  },
  tags: [{ name: 'Webhooks', description: 'Inbound webhooks' }],
  transform: (doc, ctx) => {
    doc.info.termsOfService = 'https://example.com/terms'
    return doc
  },
}

openapi({
  metadata: { title: 'My API', version: '1.0.0' },
  extensions: [myExtension],
})
```

The `transform` hook receives the full document and a `BuildContext` (locales, API route, active i18n), and must return the document to serve.

## Writing to a File

The plugin registers a Payload `bin` script under the `openapi:generate` key, so you can write the document to a file without making an HTTP request — handy for committing the spec, running schema diffs in CI, or feeding a client-code generator.

```bash
# Writes openapi.json using the i18n fallback language.
payload openapi:generate

# Pick a language and an output path.
payload openapi:generate --lang ru --out ./spec/openapi.ru.json

# Set the base URL written to the spec's `servers`.
payload openapi:generate --server https://api.example.com

# Write one file per supported language: openapi.<lang>.json
payload openapi:generate --lang all
```

| Flag       | Description                                                                           |
| ---------- | ------------------------------------------------------------------------------------- |
| `--lang`   | Locale for translated descriptions, or `all` to write one file per supported language |
| `--out`    | Output path for a single-language run (default `openapi.json`)                        |
| `--server` | Base URL written to the spec's `servers`. Omit it to leave `servers` empty            |

> [!NOTE]
> The generated spec reflects public-access marking only — it does not run per-user access checks. This matches the HTTP endpoint exactly.

**Setting the server URL.** Over HTTP the `servers` field is filled in per request from the incoming `Host` header, so there's nothing to configure. A file on disk has no request to read the host from, so you set it yourself with `--server` (or, when building the document in your own code, an explicit `servers` — see [Programmatic Use](#programmatic-use)). `metadata` carries the API's title, version, and description only, not its URL — keeping the base URL out of the spec is what lets the same document work behind any host, proxy, or environment.

### Generate only, no runtime endpoint

By default the plugin both registers the `openapi:generate` CLI **and** serves the spec at `/api/openapi.json`. If you only want the CLI — generate the file at build time and host it yourself, without exposing a live endpoint — set `serve: false`:

```ts
openapi({
  metadata: { title: 'My API', version: '1.0.0' },
  serve: false, // register the CLI generator only; nothing is served over HTTP
})
```

The plugin still needs to be in your `plugins` array (that's what registers the `bin` script and the resolved options it reads), but it won't mount the spec or interactive-auth endpoints. Then generate the file wherever you keep static assets:

```bash
payload openapi:generate --server https://api.example.com --out ./public/openapi.json
```

Now serve `public/openapi.json` like any other static file — through Next.js, a CDN, nginx, or by committing it to the repo. There's no per-request work and no way to hit a stale or unauthenticated spec at runtime.

### Serving a pre-generated file in the docs UI

The docs UI plugins (`scalar`/`swaggerUi`) load the spec from a URL, and that URL doesn't have to be the plugin's own endpoint. Point `specEndpoint` at your static file and the UI renders it directly — no runtime generation involved:

```ts
plugins: [
  openapi({ metadata: { title: 'My API', version: '1.0.0' }, serve: false }),
  scalar({ specEndpoint: '/openapi.json' }), // loads public/openapi.json
]
```

For multiple languages, generate one file per language (`--lang all`) and wire up a switcher exactly as in [Internationalization](#internationalization) — just point the `sources` at your static files (`/openapi.en.json`, …) instead of the runtime endpoint.

> [!TIP]
> Even with the default runtime endpoint, you're not re-generating on every request. With `cache: true` (the default) the document is built once on first hit and reused for the life of the process — only the server URL is refreshed per request. `serve: false` is for when you want **no** runtime endpoint at all, not merely to avoid rebuild cost.

## Programmatic Use

Need the document in your own code? `buildOpenApiDocument` builds it from a live Payload instance, and the downconverters are exported too:

```ts
import { buildOpenApiDocument, toOpenApi30 } from '@seshuk/payload-plugin-openapi'

const doc = await buildOpenApiDocument({
  payload, // a BasePayload instance
  options, // resolved plugin options
  language: 'en', // optional
  servers: [{ url: 'https://api.example.com' }],
})

const v30 = toOpenApi30(doc)
```

## Internationalization

The plugin includes UI translations for 44 locales, automatically merged into your Payload i18n configuration under the `@seshuk/payload-plugin-openapi` namespace. Only the languages present in your project's `i18n.supportedLanguages` are merged in.

Entity titles and descriptions in the generated spec are resolved through the active request locale. The spec endpoint also honors an explicit `?lang=` query param (when supported), so `GET /api/openapi.json?lang=ru` returns Russian descriptions.

To put a language switcher in the docs UI, point Scalar's `sources` at the same runtime endpoint with different `?lang=` values — nothing is pre-generated, each language resolves on request:

```ts
scalar({
  configuration: {
    sources: [
      { title: 'English', url: '/api/openapi.json?lang=en', default: true },
      { title: 'Русский', url: '/api/openapi.json?lang=ru' },
    ],
  },
})
```

When `sources` is set, the renderer's own `specEndpoint` is ignored, and the first entry is the default unless another sets `default: true`. Swagger UI has no built-in switcher — for it, mount one instance per language on its own `path`:

```ts
swaggerUi({ path: '/docs/en', specEndpoint: '/api/openapi.json?lang=en' }),
swaggerUi({ path: '/docs/ru', specEndpoint: '/api/openapi.json?lang=ru' }),
```

The same switcher works against static files instead of the runtime endpoint — see [Serving a pre-generated file in the docs UI](#serving-a-pre-generated-file-in-the-docs-ui).

Supported locales: `ar`, `az`, `bg`, `bn` (BD/IN), `ca`, `cs`, `da`, `de`, `en`, `es`, `et`, `fa`, `fr`, `he`, `hr`, `hu`, `hy`, `id`, `is`, `it`, `ja`, `ko`, `lt`, `lv`, `my`, `nb`, `nl`, `pl`, `pt`, `ro`, `rs` (Cyrillic/Latin), `ru`, `sk`, `sl`, `sv`, `ta`, `th`, `tr`, `uk`, `vi`, `zh`, `zhTw`.

## Exports

Everything is exported from the single main entry point:

| Export                 | Kind     | Description                                     |
| ---------------------- | -------- | ----------------------------------------------- |
| `openapi`              | plugin   | The main plugin — generates and serves the spec |
| `scalar`               | plugin   | Mounts a Scalar API reference UI                |
| `swaggerUi`            | plugin   | Mounts a Swagger UI                             |
| `buildOpenApiDocument` | function | Build the document from a live Payload instance |
| `toOpenApi30`          | function | Downconvert a 3.2 document to 3.0               |
| `toOpenApi31`          | function | Downconvert a 3.2 document to 3.1               |

All public types are exported from the same entry point, so editor autocomplete picks them up on `import type { … } from '@seshuk/payload-plugin-openapi'`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related Plugins

- **[@seshuk/payload-storage-bunny](https://github.com/maximseshuk/payload-storage-bunny)** — Bunny.net storage adapter for Payload CMS
- **[@seshuk/payload-plugin-media-preview](https://github.com/maximseshuk/payload-plugin-media-preview)** — Preview images, video, audio, and documents directly in the Payload admin panel

## Support

- **Bug Reports**: [GitHub Issues](https://github.com/maximseshuk/payload-plugin-openapi/issues)
- **Questions**: Open a [GitHub Issue](https://github.com/maximseshuk/payload-plugin-openapi/issues) or ask in the [Payload CMS Discord](https://discord.gg/payloadcms)

## Credits

Built with ❤️ for the Payload CMS community.

If you find this plugin useful, [buy me a coffee](https://ko-fi.com/V7V61UCT39).

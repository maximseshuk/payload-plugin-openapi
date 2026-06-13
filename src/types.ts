import type { SanitizedCollectionConfig, SanitizedGlobalConfig } from 'payload'
import type { ComponentsObject, Document, PathsObject, TagObject } from '@scalar/openapi-types/3.2'

import type { I18n } from '@payloadcms/translations'

// Shared primitives

export type OpenApiVersion = '3.0' | '3.1' | '3.2'

export type EntityKind = 'collection' | 'global'

export type HttpMethod = 'get' | 'post' | 'patch' | 'put' | 'delete'

export type IDType = 'text' | 'number'

export type Entity = SanitizedCollectionConfig | SanitizedGlobalConfig

// Plugin options

export interface OpenApiMetadata {
  title: string
  version: string
  description?: string
}

/**
 * Interactive "Authorize" login for the docs UI. When on, the plugin adds a
 * token endpoint and a security scheme so Scalar/Swagger can log in with a
 * username and password instead of pasting a token. Off by default. The
 * endpoint path is relative to the API route (`/openapi-auth` → `/api/openapi-auth`).
 *   - `true` — on, at the default endpoint (`/openapi-auth`).
 *   - `{ endpoint }` — on, at a custom token endpoint path.
 */
export type InteractiveAuthOption = boolean | { endpoint?: string }

/** Match an entity by slug (any kind), a {kind,slug} pair, or a slug pattern. */
export type EntityMatcher = string | RegExp | { kind: EntityKind; slug: string }

/**
 * Drops generated operations. Within one rule, every set field must match (AND);
 * an operation is removed if any rule matches it. Fields:
 *   - `method` — HTTP method(s); omit to match any.
 *   - `slug`   — entity slug, exact string or RegExp; omit to match any.
 *   - `kind`   — restrict to collections or globals; omit to match both.
 *   - `path`   — RegExp tested against the final route path (e.g. `/api/posts/{id}`).
 */
export interface OperationRule {
  method?: HttpMethod | HttpMethod[]
  slug?: string | RegExp
  kind?: EntityKind
  path?: RegExp
}

/** Context passed to {@link FilterOptions.excludeWhen} for each operation. */
export interface OperationContext {
  method: HttpMethod
  path: string
  slug: string
  kind: EntityKind
}

/**
 * Controls what appears in the spec, in one flat object: which entities are
 * documented, which Payload-internal collections to show, which extra endpoint
 * groups to generate, and which operations to drop.
 */
export interface FilterOptions {
  /** Allowlist of entities; when non-empty, only matching entities are documented. */
  include?: EntityMatcher[]
  /** Entities to omit entirely (schemas + paths). */
  exclude?: EntityMatcher[]
  /** Include collections flagged `hidden`/`admin.hidden`. Default false. */
  includeHidden?: boolean
  /** Include Payload-internal collections (payload-jobs, payload-preferences, ...). Default false. */
  includeSystem?: boolean
  /** Document endpoints carrying `custom.openapi` metadata. Default true. */
  includeCustom?: boolean
  /** Document auth operation endpoints (login/logout/me/...). Default true. */
  includeAuth?: boolean
  /** Document admin/bootstrap auth endpoints (/init, /access, first-register). Default false. */
  includeAdminAuth?: boolean
  /** Document version operation endpoints (/versions, /versions/{id}). Default true. */
  includeVersions?: boolean
  /** Document jobs endpoints (/payload-jobs/run, /handle-schedules). Default true. */
  includeJobs?: boolean
  /** Per-operation removal rules. */
  excludeOperations?: OperationRule[]
  /** Escape hatch: return true to drop an operation. Runs after excludeOperations. */
  excludeWhen?: (ctx: OperationContext) => boolean
}

export interface OpenApiExtension {
  paths?: PathsObject
  components?: ComponentsObject
  tags?: TagObject[]
  transform?: (doc: Document, ctx: BuildContext) => Document
}

export type OpenApiPluginOptions = {
  metadata: OpenApiMetadata
  /**
   * OpenAPI version to serve. The document is always built as 3.2; `3.1` and
   * `3.0` each run a downconversion pass on the result. Default `3.2`.
   */
  openapiVersion?: OpenApiVersion
  /**
   * Where the spec is served, relative to the Payload API route (`routes.api`,
   * `/api` by default). So the `/openapi.json` default is served at
   * `/api/openapi.json`. Default `/openapi.json`.
   */
  specEndpoint?: string
  enabled?: boolean
  /**
   * Mount the runtime spec (and interactive-auth) endpoints. Default true. Set
   * false to register only the `openapi:generate` CLI bin and skip serving over
   * HTTP — generate the spec to a file and host it however you like (static
   * asset, CDN, committed to the repo). The docs UI plugins (`scalar`/`swaggerUi`)
   * are unaffected; point their `specEndpoint` at wherever the file ends up.
   */
  serve?: boolean
  filters?: FilterOptions
  /** Interactive docs-UI login. See {@link InteractiveAuthOption}. Default false. */
  interactiveAuth?: InteractiveAuthOption
  /**
   * Emit an OpenAPI 3.2 nested tag hierarchy (nav groups via `kind`/`parent`,
   * plus per-entity auth/version sub-tags). Off by default: Scalar and Swagger UI
   * don't render 3.2 nested tags yet and would show a confusing flat list of group
   * names. When off, `doc.tags` is a flat list of per-entity tags with their
   * descriptions.
   */
  nestedTags?: boolean
  /**
   * Cache the built document for the life of the process. The Payload config is
   * static after boot, so the spec is the same every time apart from the server
   * URL, which is filled in fresh per response. Default true; set false in dev to
   * rebuild on every request, e.g. `cache: process.env.NODE_ENV === 'production'`.
   */
  cache?: boolean
  extensions?: OpenApiExtension[]
}

export interface UiPluginOptions {
  /**
   * Where the docs UI is served, relative to the Payload API route
   * (`routes.api`, `/api` by default). So the `/docs` default is served at
   * `/api/docs`. Default `/docs`.
   */
  path?: string
  /** Absolute URL the UI fetches the OpenAPI document from. Default `<apiRoute>/openapi.json`. */
  specEndpoint?: string
  /** CDN base for the UI's assets. Default is the official jsDelivr package. */
  cdnBase?: string
  /**
   * Extra UI config, merged into the underlying library's init options (Scalar's
   * `createApiReference` config or Swagger UI's `SwaggerUIBundle`). Must be
   * JSON-serializable, functions aren't supported here.
   */
  configuration?: Record<string, unknown>
  /** Set false to skip mounting the docs UI. */
  enabled?: boolean
}

// Resolved options

export interface ResolvedFilters {
  include: EntityMatcher[]
  exclude: EntityMatcher[]
  includeHidden: boolean
  includeSystem: boolean
  includeCustom: boolean
  includeAuth: boolean
  includeAdminAuth: boolean
  includeVersions: boolean
  includeJobs: boolean
  excludeOperations: OperationRule[]
  excludeWhen?: (ctx: OperationContext) => boolean
}

export interface ResolvedOptions {
  metadata: OpenApiMetadata
  openapiVersion: OpenApiVersion
  specEndpoint: string
  serve: boolean
  filters: ResolvedFilters
  interactiveAuth: { enabled: boolean; endpoint: string }
  nestedTags: boolean
  cache: boolean
  extensions: OpenApiExtension[]
}

// Build context

export interface BuildContext {
  defaultIDType: IDType
  locales: string[]
  apiRoute: string
  /** Languages the docs are available in (project `i18n.supportedLanguages`). */
  docLanguages: string[]
  /** Request i18n: resolves Payload entity descriptions and, via {@link makeT}, plugin strings. */
  i18n: I18n
}

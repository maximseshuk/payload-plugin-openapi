import type { I18n } from '@payloadcms/translations'
import type {
  ComponentsObject,
  Document,
  InfoObject,
  PathsObject,
  SecurityRequirementObject,
  SchemaObject,
  ServerObject,
  TagObject,
} from '@scalar/openapi-types/3.2'
import type { BasePayload, PayloadRequest, SanitizedCollectionConfig, SanitizedGlobalConfig } from 'payload'

// Shared primitives

export type OpenApiVersion = '3.0' | '3.1' | '3.2'

export type EntityKind = 'collection' | 'global'

export type OperationKind = EntityKind | 'custom' | 'jobs' | 'system'

export type HttpMethod = 'get' | 'post' | 'patch' | 'put' | 'delete'

export type IDType = 'text' | 'number'

export type Schema = Exclude<SchemaObject, boolean>

export type Entity = SanitizedCollectionConfig | SanitizedGlobalConfig

export type EntityOperation = 'read' | 'create' | 'update' | 'delete' | 'validate'

export type SecurityMarking = 'public' | 'secured'

/**
 * Marking for a collection or global, set in its `custom.openapi.security`:
 * one marking for every operation, or one per operation. Operations you leave
 * out keep the marking the access probe found. `read` also marks the version
 * reads. `validate` falls back to `update` when you leave it out.
 */
export type EntitySecurityOverride = SecurityMarking | Partial<Record<EntityOperation, SecurityMarking>>

/**
 * Text that follows the request language: a string, a map of language to
 * string (`{ en: '…', de: '…' }`), or a function that gets `{ t, i18n }`.
 */
export type LocalizedText =
  | string
  | Record<string, string>
  | ((args: { t: (key: string, vars?: Record<string, unknown>) => string; i18n: I18n }) => string)

/** `custom.openapi` on a collection or global. */
export interface EntityOpenApiMeta {
  /** Overrides the public or secured marking. See {@link EntitySecurityOverride}. */
  security?: EntitySecurityOverride
}

/**
 * `custom.openapi` on a field: a partial Schema Object deep-merged on top of
 * the inferred one. `description`, `title` and `summary` follow the
 * request language.
 */
export interface FieldOpenApiMeta {
  description?: LocalizedText
  title?: LocalizedText
  summary?: LocalizedText
  [keyword: string]: unknown
}

declare module 'payload' {
  interface CollectionCustom {
    openapi?: EntityOpenApiMeta
  }
  interface GlobalCustom {
    openapi?: EntityOpenApiMeta
  }
  interface FieldCustom {
    openapi?: FieldOpenApiMeta
  }
}

// Plugin options

/**
 * The OpenAPI `info` object. `title` and `version` are required. `description`
 * can follow the request language, see {@link LocalizedText}.
 */
export type OpenApiInfo = Omit<InfoObject, 'description'> & { description?: LocalizedText }

/**
 * Base URLs for the spec's `servers`: a fixed list, or a function that gets
 * the request.
 */
export type ServersOption =
  | ServerObject[]
  | ((args: { req: PayloadRequest }) => ServerObject[] | Promise<ServerObject[]>)

/**
 * Interactive "Authorize" login for the docs UI. When on, the plugin adds a
 * token endpoint and a security scheme so Scalar/Swagger can log in with a
 * username and password instead of pasting a token. Off by default.
 *   - `true` — on, at the default path, against the first auth collection.
 *   - `{ path, collection }` — on, with a custom token endpoint path or auth collection.
 */
export type InteractiveAuthOption =
  | boolean
  | {
      /**
       * Token endpoint path, relative to the API route (`/openapi-auth` → `/api/openapi-auth`).
       * @default '/openapi-auth'
       */
      path?: string
      /**
       * Auth collection the login runs against.
       * @default the first collection with `auth` enabled, or `'users'`
       */
      collection?: string
    }

/**
 * Gate for a plugin route. Return `true` to serve the request; anything else
 * answers 403.
 */
export type AccessOption = (args: { req: PayloadRequest }) => boolean | Promise<boolean>

/** Match an entity by slug (any kind), a {kind,slug} pair, or a slug pattern. */
export type EntityMatcher = string | RegExp | { kind: EntityKind; slug: string }

/**
 * Drops generated operations. Within one rule, every set field must match (AND);
 * an operation is removed if any rule matches it. Fields:
 *   - `method` — HTTP method(s); omit to match any.
 *   - `slug`   — collection or global slug, exact string or RegExp; omit to match any.
 *     A rule with `slug` never matches custom, jobs or system operations.
 *   - `kind`   — restrict to one operation group; omit to match all.
 *   - `path`   — RegExp tested against the final route path (e.g. `/api/posts/{id}`).
 */
export interface OperationRule {
  method?: HttpMethod | HttpMethod[]
  slug?: string | RegExp
  kind?: OperationKind
  path?: RegExp
}

/** Context passed to `excludeOperations` functions and `security` for each operation. */
export interface OperationContext {
  method: HttpMethod
  path: string
  /** Collection or global slug. Unset for custom, jobs and system operations. */
  slug?: string
  kind: OperationKind
}

/** A rule, or a function that drops the operation when it returns (or resolves to) `true`. */
export type OperationFilter = OperationRule | ((ctx: OperationContext) => boolean | Promise<boolean>)

type SecurityDecision = SecurityMarking | SecurityRequirementObject[] | undefined

/**
 * Decides the security marking of one operation. `'public'` removes it,
 * `'secured'` sets the default requirement, an array sets that exact
 * requirement, and `undefined` keeps `detected`.
 */
export type SecurityOption = (
  ctx: OperationContext & { detected: SecurityMarking },
) => SecurityDecision | Promise<SecurityDecision>

/**
 * Controls what appears in the spec, in one flat object: which entities are
 * documented, which Payload-internal collections to show, which extra endpoint
 * groups to generate, and which operations to drop.
 */
export interface FilterOptions {
  /**
   * Allowlist of entities; when non-empty, only matching entities are documented.
   * @default []
   */
  include?: EntityMatcher[]
  /**
   * Entities to omit entirely (schemas + paths).
   * @default []
   */
  exclude?: EntityMatcher[]
  /**
   * Include collections flagged `hidden`/`admin.hidden`.
   * @default false
   */
  includeHidden?: boolean
  /**
   * Include Payload-internal collections and globals (payload-jobs, payload-preferences, payload-jobs-stats, ...).
   * @default false
   */
  includeSystem?: boolean
  /**
   * Document endpoints carrying `custom.openapi` metadata.
   * @default true
   */
  includeCustom?: boolean
  /**
   * Document auth operation endpoints (login/logout/me/...).
   * @default true
   */
  includeAuth?: boolean
  /**
   * Document admin/bootstrap auth endpoints (/init, first-register, root /access) and the document access endpoints (/{slug}/access/{id}, /globals/{slug}/access).
   * @default false
   */
  includeAdminAuth?: boolean
  /**
   * Document version operation endpoints (/versions, /versions/{id}).
   * @default true
   */
  includeVersions?: boolean
  /**
   * Document jobs endpoints (/payload-jobs/run, /handle-schedules).
   * @default true
   */
  includeJobs?: boolean
  /**
   * Drops operations from every group: collection, global, custom, jobs and
   * system. An operation is removed when any rule matches it or any function
   * returns `true`.
   * @default []
   */
  excludeOperations?: OperationFilter[]
}

export interface OpenApiExtension {
  /** Paths deep-merged into the generated ones. */
  paths?: PathsObject
  /** Components deep-merged into the generated ones. */
  components?: ComponentsObject
  /** Tags appended to the list; a tag whose name already exists is skipped. */
  tags?: TagObject[]
  /**
   * Runs on the finished document and returns the document to use. Gets one
   * object: `doc` plus the {@link ExtensionContext}, e.g. `({ doc, payload }) => doc`.
   * It can be `async`. If it throws, the spec request fails: the plugin never
   * serves a document that skipped a transform.
   */
  transform?: (args: ExtensionContext) => Document | Promise<Document>
}

/** What `extensions[].transform` gets: the finished document and the build context. */
export type ExtensionContext = BuildContext & { doc: Document; payload: BasePayload; options: ResolvedOptions }

export type OpenApiPluginOptions = {
  /** The document's `info` object. `title` and `version` are required. See {@link OpenApiInfo}. */
  info: OpenApiInfo
  /**
   * OpenAPI version to serve. The document is always built as 3.2; `3.1` and
   * `3.0` each run a downconversion pass on the result.
   * @default '3.2'
   */
  openapiVersion?: OpenApiVersion
  /**
   * Where the spec is served, relative to the Payload API route (`routes.api`,
   * `/api` by default). So the `/openapi.json` default is served at
   * `/api/openapi.json`.
   * @default '/openapi.json'
   */
  path?: string
  /**
   * Set false to turn the plugin off. It then adds no endpoints, no CLI command
   * and no translations. The plugin adds no collections, so the schema stays the same.
   * @default true
   */
  enabled?: boolean
  /**
   * Mount the runtime spec (and interactive-auth) endpoints. Set false to
   * register only the `openapi:generate` CLI command and skip serving over
   * HTTP — generate the spec to a file and host it however you like (static
   * asset, CDN, committed to the repo). Point the docs UI plugins' `specURL`
   * at wherever the file ends up.
   * @default true
   */
  serve?: boolean
  /**
   * Who may read the spec endpoint. Runs on every request.
   * @default open to everyone
   */
  access?: AccessOption
  /**
   * The spec's `servers`. A function runs on every request. See {@link ServersOption}.
   * @default `[{ url: serverURL }]` when the Payload `serverURL` is set, otherwise `[]` (clients use the spec's own origin)
   */
  servers?: ServersOption
  /**
   * Hosts the spec may echo back as its server URL. When the request `Host`
   * header (`host` or `host:port`) is on this list, `servers` is
   * `https://<host>` (`http` for localhost and 127.*). The `Host` header comes from
   * the client, so the plugin never uses it unless you list it here. A
   * `servers` option wins over this list.
   * @default []
   */
  trustedHosts?: string[]
  /** What appears in the spec. See {@link FilterOptions}. */
  filters?: FilterOptions
  /**
   * Interactive docs-UI login. See {@link InteractiveAuthOption}.
   * @default false
   */
  interactiveAuth?: InteractiveAuthOption
  /**
   * Emit an OpenAPI 3.2 nested tag hierarchy (nav groups via `kind`/`parent`,
   * plus per-entity auth/version sub-tags). Off by default: Scalar and Swagger UI
   * don't render 3.2 nested tags yet and would show a confusing flat list of group
   * names. When off, `doc.tags` is a flat list of per-entity tags with their
   * descriptions.
   * @default false
   */
  nestedTags?: boolean
  /**
   * Override the security marking per operation. Runs last, after
   * `custom.openapi.security` and the access probe, across every operation
   * group. See {@link SecurityOption}.
   */
  security?: SecurityOption
  /**
   * Cache the built document for the life of the process. The Payload config is
   * static after boot, so the spec is the same every time apart from
   * `servers`, which is set per request. Set false in dev to rebuild on
   * every request, e.g. `cache: process.env.NODE_ENV === 'production'`.
   * @default true
   */
  cache?: boolean
  /**
   * Extra paths, components and tags merged into the document, plus a final `transform`.
   * @default []
   */
  extensions?: OpenApiExtension[]
  /**
   * Anonymous usage telemetry: plugin, Payload and Node versions and the features in use. On by default.
   * It never sends secrets, IP addresses, keys, URLs, paths, hostnames or collection names.
   * The first run logs a notice.
   *
   * Off when `payload.config.telemetry` is `false`, when `DO_NOT_TRACK` or `OPENAPI_TELEMETRY_DISABLED`
   * is set, in CI or with `NODE_ENV=test`. Set `false` to turn it off. Pass `{ url }` to use your own collector.
   *
   * @see https://payload-plugin-openapi.seshuk.im/v1/configuration/telemetry
   * @default true
   */
  telemetry?:
    | boolean
    | {
        /**
         * Collector URL that receives the telemetry report.
         * @default the plugin's public collector
         */
        url?: string
      }
}

export interface UiPluginOptions {
  /**
   * Where the docs UI is served, relative to the Payload API route
   * (`routes.api`, `/api` by default). So the `/docs` default is served at
   * `/api/docs`.
   * @default '/docs'
   */
  path?: string
  /**
   * URL the UI fetches the OpenAPI document from. Any URL reference works:
   * absolute, root-relative, or relative to the docs page.
   * @default the `openapi()` spec route, `<apiRoute>/openapi.json` unless its `path` is set
   */
  specURL?: string
  /**
   * Where the UI's assets load from: the script URL for Scalar, the folder with
   * `swagger-ui-bundle.js` and `swagger-ui.css` for Swagger UI. Set it to
   * self-host the assets. The default URL is pinned to one version and loads
   * with Subresource Integrity; a custom URL loads without it.
   * @default the pinned jsDelivr URL
   */
  cdnBase?: string
  /**
   * Extra UI config, merged into the underlying library's init options (Scalar's
   * `createApiReference` config or Swagger UI's `SwaggerUIBundle`). Must be
   * JSON-serializable, functions aren't supported here.
   * @default {}
   */
  configuration?: Record<string, unknown>
  /**
   * Who may open the docs page. Runs on every request.
   * @default open to everyone
   */
  access?: AccessOption
  /**
   * Set false to skip mounting the docs UI.
   * @default true
   */
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
  excludeOperations: OperationFilter[]
}

export interface ResolvedOptions {
  info: OpenApiInfo
  openapiVersion: OpenApiVersion
  path: string
  serve: boolean
  access?: AccessOption
  servers?: ServersOption
  trustedHosts: string[]
  filters: ResolvedFilters
  interactiveAuth: { enabled: boolean; path: string; collection?: string }
  nestedTags: boolean
  security?: SecurityOption
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

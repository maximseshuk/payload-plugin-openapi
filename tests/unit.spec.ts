import { Validator } from '@seriousme/openapi-schema-validator'
import type {
  Config,
  Endpoint,
  Field,
  PayloadRequest,
  Plugin,
  SanitizedCollectionConfig,
  SanitizedConfig,
  SanitizedGlobalConfig,
} from 'payload'
import { flattenAllFields } from 'payload'
import type { I18n } from '@payloadcms/translations'
import { describe, expect, it } from 'vitest'

import { resolveOptions } from '../src/options.js'
import { PLUGIN_NAME } from '../src/constants.js'
import { buildDocument } from '../src/spec/buildDocument.js'
import { flattenFields } from '../src/spec/fields.js'
import { filterOperations, shouldIncludeCollection, shouldIncludeGlobal } from '../src/spec/filters.js'
import { rewriteRefs, schemaName } from '../src/spec/names.js'
import {
  NAV_COLLECTIONS,
  NAV_GLOBALS,
  NAV_SYSTEM,
  authTagName,
  buildTagHierarchy,
  entityTagName,
  versionsTagName,
} from '../src/spec/tags.js'
import type { Translate } from '../src/translations/types.js'
import { buildCustomEndpointPaths } from '../src/spec/paths/custom.js'
import { buildCollectionPaths } from '../src/spec/paths/collections.js'
import { buildAuthPaths } from '../src/spec/paths/auth.js'
import { applySecurityWhen, evaluateAccess, resolveEntitySecurity } from '../src/spec/security.js'
import type { Document, PathsObject, RequestBodyObject, SchemaObject } from '@scalar/openapi-types/3.2'
import type { OpenApiExtension, ResolvedFilters } from '../src/types.js'
import { baseInput, ctx, i18nStub, t } from './helpers.js'

describe('spec/names', () => {
  describe('schemaName', () => {
    it('turns a slug into PascalCase', () => {
      expect(schemaName('blog-posts')).toBe('BlogPosts')
      expect(schemaName('users')).toBe('Users')
    })
  })

  describe('rewriteRefs', () => {
    it('rewrites `definitions` and `$defs` refs to `components/schemas`', () => {
      const input = { a: { $ref: '#/definitions/Post' }, b: { $ref: '#/$defs/User' } }
      expect(rewriteRefs(input)).toEqual({
        a: { $ref: '#/components/schemas/Post' },
        b: { $ref: '#/components/schemas/User' },
      })
    })

    it('leaves unrelated refs untouched', () => {
      const input = { $ref: '#/components/schemas/X' }
      expect(rewriteRefs(input)).toEqual(input)
    })
  })
})

describe('spec/fields', () => {
  describe('flattenFields', () => {
    it('reads through `row` and `collapsible` containers', () => {
      const fields = [
        { name: 'title', type: 'text' },
        {
          type: 'row',
          fields: [
            { name: 'a', type: 'text' },
            { name: 'b', type: 'number' },
          ],
        },
      ] as Field[]
      const names = flattenFields(fields)
        .map((f) => ('name' in f ? f.name : undefined))
        .filter(Boolean)
      expect(names).toEqual(['title', 'a', 'b'])
    })

    it('drops `ui` fields', () => {
      const fields = [
        { name: 'title', type: 'text' },
        { name: 'preview', type: 'ui' },
      ] as Field[]
      const names = flattenFields(fields).map((f) => ('name' in f ? f.name : undefined))
      expect(names).toEqual(['title'])
    })
  })
})

const baseFilters: ResolvedFilters = {
  include: [],
  exclude: [],
  includeHidden: false,
  includeSystem: false,
  includeCustom: true,
  includeAuth: true,
  includeAdminAuth: false,
  includeVersions: true,
  includeJobs: true,
  excludeOperations: [],
}
const f = (over: Partial<ResolvedFilters> = {}): ResolvedFilters => ({ ...baseFilters, ...over })
const coll = (slug: string, extra: Partial<SanitizedCollectionConfig> = {}): SanitizedCollectionConfig =>
  ({ slug, ...extra }) as SanitizedCollectionConfig

describe('spec/filters', () => {
  describe('shouldIncludeCollection', () => {
    it('hides system `payload-` collections unless `includeSystem` is set', () => {
      expect(shouldIncludeCollection(coll('payload-preferences'), f())).toBe(false)
      expect(shouldIncludeCollection(coll('payload-preferences'), f({ includeSystem: true }))).toBe(true)
      expect(shouldIncludeCollection(coll('posts'), f())).toBe(true)
    })

    it('hides hidden collections unless `includeHidden` is set', () => {
      const hidden = coll('drafts', { admin: { hidden: true } })
      expect(shouldIncludeCollection(hidden, f())).toBe(false)
      expect(shouldIncludeCollection(hidden, f({ includeHidden: true }))).toBe(true)
    })

    it('probes a function-valued `admin.hidden` as anonymous: true hides, false documents', () => {
      const hiddenFromAnon = coll('drafts', { admin: { hidden: () => true } })
      const visibleToAnon = coll('drafts', { admin: { hidden: () => false } })
      expect(shouldIncludeCollection(hiddenFromAnon, f())).toBe(false)
      expect(shouldIncludeCollection(visibleToAnon, f())).toBe(true)
      expect(shouldIncludeCollection(hiddenFromAnon, f({ includeHidden: true }))).toBe(true)
    })

    it('hides the `payload-kv` and `payload-query-presets` collections unless `includeSystem` is set', () => {
      expect(shouldIncludeCollection(coll('payload-kv'), f())).toBe(false)
      expect(shouldIncludeCollection(coll('payload-query-presets'), f())).toBe(false)
      expect(shouldIncludeCollection(coll('payload-kv'), f({ includeSystem: true }))).toBe(true)
    })

    it('keeps a collection whose `admin.hidden` function throws', () => {
      const thrower = coll('drafts', {
        admin: {
          hidden: () => {
            throw new Error('boom')
          },
        },
      })
      expect(shouldIncludeCollection(thrower, f())).toBe(true)
    })

    it('honors an allowlist and excludes by string, regex, and kind', () => {
      expect(shouldIncludeCollection(coll('posts'), f({ include: ['users'] }))).toBe(false)
      expect(shouldIncludeCollection(coll('posts'), f({ exclude: ['posts'] }))).toBe(false)
      expect(shouldIncludeCollection(coll('temp-x'), f({ exclude: [/^temp-/] }))).toBe(false)
      expect(shouldIncludeCollection(coll('posts'), f({ exclude: [{ kind: 'global', slug: 'posts' }] }))).toBe(true)
    })
  })

  describe('shouldIncludeGlobal', () => {
    it('excludes a global by kind without touching the collection', () => {
      const filters = f({ exclude: [{ kind: 'global', slug: 'posts' }] })
      expect(shouldIncludeGlobal(coll('posts') as unknown as Parameters<typeof shouldIncludeGlobal>[0], filters)).toBe(
        false,
      )
      expect(shouldIncludeCollection(coll('posts'), filters)).toBe(true)
    })
  })

  describe('filterOperations', () => {
    const paths = (): PathsObject => ({
      '/api/posts': { get: {}, post: {}, patch: {}, delete: {} },
      '/api/posts/{id}': { get: {}, patch: {}, delete: {} },
    })

    it('drops a method across all paths and removes the emptied paths', () => {
      const out = filterOperations({
        paths: paths(),
        slug: 'posts',
        kind: 'collection',
        filters: f({ excludeOperations: [{ method: 'delete' }] }),
      })
      expect(out['/api/posts']?.delete).toBeUndefined()
      expect(out['/api/posts/{id}']?.delete).toBeUndefined()
      expect(out['/api/posts']?.get).toBeDefined()
    })

    it('targets a single entity by slug', () => {
      const out = filterOperations({
        paths: paths(),
        slug: 'tags',
        kind: 'collection',
        filters: f({ excludeOperations: [{ method: 'post', slug: 'posts' }] }),
      })
      expect(out['/api/posts']?.post).toBeDefined()
    })

    it('matches a path by regex to tell list from by-id', () => {
      const out = filterOperations({
        paths: paths(),
        slug: 'posts',
        kind: 'collection',
        filters: f({ excludeOperations: [{ method: 'get', path: /\/\{id\}$/ }] }),
      })
      expect(out['/api/posts']?.get).toBeDefined()
      expect(out['/api/posts/{id}']?.get).toBeUndefined()
    })

    it('removes a path entirely when all of its methods are excluded', () => {
      const out = filterOperations({
        paths: paths(),
        slug: 'posts',
        kind: 'collection',
        filters: f({ excludeOperations: [{ path: /\/posts\/\{id\}$/ }] }),
      })
      expect(out['/api/posts/{id}']).toBeUndefined()
      expect(out['/api/posts']).toBeDefined()
    })

    it('respects `kind` so globals and collections do not collide', () => {
      const out = filterOperations({
        paths: paths(),
        slug: 'posts',
        kind: 'collection',
        filters: f({ excludeOperations: [{ slug: 'posts', kind: 'global' }] }),
      })
      expect(out['/api/posts']?.get).toBeDefined()
    })

    it('applies the `excludeWhen` predicate', () => {
      const out = filterOperations({
        paths: paths(),
        slug: 'posts',
        kind: 'collection',
        filters: f({ excludeWhen: ({ method }) => method === 'patch' }),
      })
      expect(out['/api/posts']?.patch).toBeUndefined()
      expect(out['/api/posts']?.get).toBeDefined()
    })
  })
})

describe('spec/tags', () => {
  it('builds the entity, auth, and versions tag names', () => {
    expect(entityTagName('Posts')).toBe('Posts')
    expect(authTagName('Users')).toBe('Users Auth')
    expect(versionsTagName('Posts')).toBe('Posts Versions')
  })

  it('builds a nested tag tree with parents and translated summaries', () => {
    const tt = ((key: string) => key) as Translate
    const tags = buildTagHierarchy({
      collections: [{ base: 'Posts', hasAuth: false, hasVersions: true, description: 'Blog posts' }],
      globals: [{ base: 'GlobalSettings', hasVersions: false }],
      hasJobs: true,
      t: tt,
      nested: true,
    })
    const byName = Object.fromEntries(tags.map((tag) => [tag.name, tag]))

    expect(byName[NAV_COLLECTIONS]?.kind).toBe('nav')
    expect(byName[NAV_GLOBALS]?.kind).toBe('nav')
    expect(byName[NAV_SYSTEM]?.kind).toBe('nav')

    expect(byName['Posts']?.parent).toBe(NAV_COLLECTIONS)
    expect(byName['Posts']?.description).toBe('Blog posts')
    expect(byName['GlobalSettings']?.parent).toBe(NAV_GLOBALS)

    expect(byName['Posts Versions']?.parent).toBe('Posts')
    expect(byName['Posts Auth']).toBeUndefined()
    expect(byName['Jobs']?.parent).toBe(NAV_SYSTEM)
  })

  it('builds a flat list of entity tags with descriptions when not nested', () => {
    const tt = ((key: string) => key) as Translate
    const tags = buildTagHierarchy({
      collections: [{ base: 'Posts', hasAuth: true, hasVersions: true, description: 'Blog posts' }],
      globals: [{ base: 'GlobalSettings', hasVersions: true, description: 'Site config' }],
      hasJobs: true,
      t: tt,
      nested: false,
    })
    const byName = Object.fromEntries(tags.map((tag) => [tag.name, tag]))

    expect(tags.map((tag) => tag.name)).toEqual(['Posts', 'GlobalSettings'])
    expect(byName['Posts']?.description).toBe('Blog posts')
    expect(byName['GlobalSettings']?.description).toBe('Site config')

    expect(byName[NAV_COLLECTIONS]).toBeUndefined()
    expect(byName[NAV_GLOBALS]).toBeUndefined()
    expect(byName[NAV_SYSTEM]).toBeUndefined()
    expect(byName['Posts Auth']).toBeUndefined()
    expect(byName['Posts Versions']).toBeUndefined()
    expect(byName['Jobs']).toBeUndefined()
    expect(byName['Posts']?.kind).toBeUndefined()
    expect(byName['Posts']?.parent).toBeUndefined()
  })
})

describe('spec/buildDocument', () => {
  it('builds a minimal valid document', async () => {
    const doc = await buildDocument(baseInput())
    expect(doc.openapi).toBe('3.2.0')
    expect(doc.info.title).toBe('Test API')
    expect(doc.info.version).toBe('1.0.0')
    expect(doc.components?.securitySchemes?.PayloadToken).toBeDefined()
    const result = await new Validator().validate(structuredClone(doc))
    expect(result.valid).toBe(true)
  })

  it('merges extension paths and applies the `transform`', async () => {
    const doc = await buildDocument(
      baseInput({
        options: resolveOptions({
          metadata: { title: 'T', version: '1.0.0' },
          extensions: [
            { paths: { '/api/custom': { get: { responses: { '200': { description: 'ok' } } } } } },
            { transform: (d) => ({ ...d, info: { ...d.info, title: 'Transformed' } }) },
          ],
        }),
      }),
    )
    expect(doc.paths?.['/api/custom']).toBeDefined()
    expect(doc.info.title).toBe('Transformed')
  })

  it('keeps building when an extension throws', async () => {
    const doc = await buildDocument(
      baseInput({
        options: resolveOptions({
          metadata: { title: 'T', version: '1.0.0' },
          extensions: [
            {
              transform: () => {
                throw new Error('boom')
              },
            },
          ],
        }),
      }),
    )
    expect(doc.info.title).toBe('T')
  })
})

describe('spec/paths/jobs', () => {
  describe('buildJobsPaths', () => {
    it('adds the run endpoint only when tasks or workflows are set up', async () => {
      const { buildJobsPaths } = await import('../src/spec/paths/jobs.js')
      const jobsCtx = { defaultIDType: 'text' as const, locales: [], apiRoute: '/api', i18n: i18nStub }
      const cfg = (jobs: SanitizedConfig['jobs']): SanitizedConfig => ({ jobs }) as SanitizedConfig
      expect(buildJobsPaths({ config: cfg({} as SanitizedConfig['jobs']), ctx: jobsCtx })).toEqual({})
      const withJobs = buildJobsPaths({
        config: cfg({ tasks: [{}] } as SanitizedConfig['jobs']),
        ctx: jobsCtx,
      })
      expect(withJobs['/api/payload-jobs/run']?.get).toBeDefined()
    })
  })
})

describe('spec/paths/custom', () => {
  describe('buildCustomEndpointPaths', () => {
    it('keeps only endpoints with `custom.openapi` and turns params into placeholders', () => {
      const config = {
        endpoints: [
          {
            path: '/health',
            method: 'get',
            handler: () => new Response(),
            custom: { openapi: { responses: { '200': { description: 'ok' } } } },
          },
          { path: '/secret', method: 'get', handler: () => new Response() },
        ],
      } as unknown as SanitizedConfig

      const collection = {
        slug: 'posts',
        endpoints: [
          {
            path: '/:id/tracking',
            method: 'get',
            handler: () => new Response(),
            custom: { openapi: { responses: { '200': { description: 'ok' } } } },
          },
        ],
      } as unknown as SanitizedCollectionConfig

      const paths = buildCustomEndpointPaths({ config, collections: [collection], globals: [], ctx })
      expect(paths['/health']).toBeDefined()
      expect(paths['/secret']).toBeUndefined()
      expect(paths['/api/posts/{id}/tracking']).toBeDefined()
    })
  })
})

describe('spec/paths/collections', () => {
  const postsColl = (extra: Partial<SanitizedCollectionConfig> = {}): SanitizedCollectionConfig =>
    ({ slug: 'posts', fields: [], ...extra }) as unknown as SanitizedCollectionConfig

  it('documents bulk ops and duplicate by default', () => {
    const paths = buildCollectionPaths({ collection: postsColl(), ctx })
    expect(paths['/api/posts']?.patch).toBeDefined()
    expect(paths['/api/posts']?.delete).toBeDefined()
    expect(paths['/api/posts/{id}/duplicate']?.post).toBeDefined()
  })

  it('drops bulk update/delete when `disableBulkEdit` is set, keeping by-id ops', () => {
    const paths = buildCollectionPaths({ collection: postsColl({ disableBulkEdit: true }), ctx })
    expect(paths['/api/posts']?.patch).toBeUndefined()
    expect(paths['/api/posts']?.delete).toBeUndefined()
    expect(paths['/api/posts']?.post).toBeDefined()
    expect(paths['/api/posts/{id}']?.patch).toBeDefined()
    expect(paths['/api/posts/{id}']?.delete).toBeDefined()
  })

  it('drops the duplicate route when `disableDuplicate` is set', () => {
    const paths = buildCollectionPaths({ collection: postsColl({ disableDuplicate: true }), ctx })
    expect(paths['/api/posts/{id}/duplicate']).toBeUndefined()
    expect(paths['/api/posts/{id}']?.get).toBeDefined()
  })

  it('lists `limit` and `sort` on bulk update only', () => {
    const paths = buildCollectionPaths({ collection: postsColl(), ctx })
    const names = (op?: { parameters?: unknown[] }) => ((op?.parameters ?? []) as { name: string }[]).map((p) => p.name)
    expect(names(paths['/api/posts']?.patch)).toEqual(expect.arrayContaining(['limit', 'sort']))
    expect(names(paths['/api/posts']?.patch)).not.toContain('page')
    expect(names(paths['/api/posts']?.delete)).not.toContain('limit')
    expect(names(paths['/api/posts']?.delete)).not.toContain('sort')
  })

  it('describes the responses as Payload sends them', async () => {
    const { buildGlobalPaths } = await import('../src/spec/paths/globals.js')
    const { buildVersionPaths } = await import('../src/spec/paths/versions.js')
    const body = (op?: { responses?: Record<string, unknown> }, code = '200') => {
      const response = op?.responses?.[code] as { content: Record<string, { schema: SchemaObject }> } | undefined
      return response?.content['application/json']?.schema
    }
    const doc = { $ref: '#/components/schemas/Posts' }

    const create = buildCollectionPaths({ collection: postsColl(), ctx })['/api/posts']?.post
    expect(create?.responses?.['200']).toBeUndefined()
    expect(body(create, '201')?.properties).toEqual({ message: { type: 'string' }, doc })

    const site = buildGlobalPaths({
      global: { slug: 'site', fields: [] } as unknown as SanitizedGlobalConfig,
      ctx,
    })['/api/globals/site']
    expect(body(site?.get)).toEqual({ $ref: '#/components/schemas/GlobalSite' })
    expect(body(site?.post)?.properties).toEqual({
      message: { type: 'string' },
      result: { $ref: '#/components/schemas/GlobalSite' },
    })

    const entity = { slug: 'posts', fields: [], versions: {} } as unknown as SanitizedCollectionConfig
    const restore = (isGlobal?: boolean) =>
      body(
        buildVersionPaths({ entity, pathBase: '/x', ctx, nestedTags: false, global: isGlobal })['/x/versions/{id}']
          ?.post,
      )
    expect(restore()?.allOf?.[0]).toEqual(doc)
    expect(restore(true)?.properties).toEqual({ message: { type: 'string' }, doc })
  })
})

describe('spec/paths/auth', () => {
  const users = (auth: Record<string, unknown>): SanitizedCollectionConfig =>
    ({ slug: 'users', fields: [], auth }) as unknown as SanitizedCollectionConfig

  const build = (auth: Record<string, unknown>): PathsObject =>
    buildAuthPaths({ collection: users(auth), ctx, includeAdmin: true, nestedTags: true })

  const body = (paths: PathsObject, route: string): SchemaObject => {
    const requestBody = paths[`/api/users/${route}`]?.post?.requestBody as RequestBodyObject
    return requestBody.content['application/json'].schema as SchemaObject
  }

  it('asks for `email` in login, forgot-password and unlock bodies by default', () => {
    const paths = build({})
    for (const route of ['login', 'forgot-password', 'unlock']) {
      expect(Object.keys(body(paths, route).properties ?? {})).not.toContain('username')
      expect(body(paths, route).required).toContain('email')
    }
    expect(body(paths, 'login').required).toEqual(['email', 'password'])
  })

  it('asks for `username` only when `loginWithUsername` does not allow email login', () => {
    for (const loginWithUsername of [true, { allowEmailLogin: false, requireEmail: true }]) {
      const paths = build({ loginWithUsername })
      for (const route of ['login', 'forgot-password', 'unlock']) {
        expect(Object.keys(body(paths, route).properties ?? {})).not.toContain('email')
        expect(body(paths, route).required).toContain('username')
      }
    }
  })

  it('accepts `email` or `username` when `allowEmailLogin` is on', () => {
    const paths = build({ loginWithUsername: { allowEmailLogin: true, requireEmail: false } })
    for (const route of ['login', 'forgot-password', 'unlock']) {
      const schema = body(paths, route)
      expect(Object.keys(schema.properties ?? {})).toEqual(expect.arrayContaining(['email', 'username']))
      expect(schema.anyOf).toEqual([{ required: ['email'] }, { required: ['username'] }])
    }
    expect(body(paths, 'login').required).toEqual(['password'])
    expect(body(paths, 'unlock').required).toBeUndefined()
  })

  it('documents unlock for every auth collection, without `maxLoginAttempts`', () => {
    expect(build({})['/api/users/unlock']?.post).toBeDefined()
  })
})

describe('spec/security', () => {
  const secured = [{ PayloadToken: [] }]

  describe('evaluateAccess', () => {
    it('treats a missing access fn as secured', async () => {
      expect(await evaluateAccess(undefined)).toBe(false)
    })

    it('marks a sync `() => true` as public and `() => false` as secured', async () => {
      expect(await evaluateAccess(() => true)).toBe(true)
      expect(await evaluateAccess(() => false)).toBe(false)
    })

    it('marks the default authenticated-only access (reads req.user) as secured', async () => {
      const access = ({ req }: { req: { user: unknown } }) => Boolean(req.user)
      expect(await evaluateAccess(access as never)).toBe(false)
    })

    it('awaits an async `() => true` and marks it public', async () => {
      expect(await evaluateAccess(async () => true)).toBe(true)
    })

    it('runs an async fn that reads req.user and returns true for the anonymous role', async () => {
      const access = async ({ req }: { req: { user?: { role?: string } } }) => {
        const role = req.user?.role ?? 'anonymous'
        return role === 'anonymous'
      }
      expect(await evaluateAccess(access as never)).toBe(true)
    })

    it('treats a Where-returning access fn as secured', async () => {
      const access = () => ({ id: { equals: 1 } })
      expect(await evaluateAccess(access as never)).toBe(false)
    })

    it('treats a throwing access fn as secured', async () => {
      const access = () => {
        throw new Error('boom')
      }
      expect(await evaluateAccess(access as never)).toBe(false)
    })

    it('treats access that reaches into req.payload as secured', async () => {
      const access = async ({ req }: { req: { payload: { find: (a: unknown) => unknown } } }) =>
        Boolean(await req.payload.find({}))
      expect(await evaluateAccess(access as never)).toBe(false)
    })

    it('treats a never-settling promise as secured once the timeout elapses', async () => {
      const access = () => new Promise<boolean>(() => {})
      expect(await evaluateAccess(access as never, { timeoutMs: 10 })).toBe(false)
    })
  })

  describe('resolveEntitySecurity', () => {
    it('probes each operation independently', async () => {
      const entity = {
        slug: 'posts',
        access: { read: () => true, create: ({ req }: { req: { user: unknown } }) => Boolean(req.user) },
      } as unknown as SanitizedCollectionConfig
      const sec = await resolveEntitySecurity({ entity, operations: ['read', 'create'] })
      expect(sec.read).toBeUndefined()
      expect(sec.create).toEqual(secured)
    })

    it('lets a boolean custom.openapi.security override the probe for all operations', async () => {
      const entity = {
        slug: 'posts',
        access: { read: () => true },
        custom: { openapi: { security: false } },
      } as unknown as SanitizedCollectionConfig
      const sec = await resolveEntitySecurity({ entity, operations: ['read'] })
      expect(sec.read).toEqual(secured)
    })

    it('lets a per-operation override win over the probe in both directions', async () => {
      const entity = {
        slug: 'posts',
        access: { read: () => false, create: () => true },
        custom: { openapi: { security: { read: true, create: false } } },
      } as unknown as SanitizedCollectionConfig
      const sec = await resolveEntitySecurity({ entity, operations: ['read', 'create'] })
      expect(sec.read).toBeUndefined()
      expect(sec.create).toEqual(secured)
    })

    it('falls back to the probe for operations the override omits', async () => {
      const entity = {
        slug: 'posts',
        access: { read: () => true, create: () => true },
        custom: { openapi: { security: { read: false } } },
      } as unknown as SanitizedCollectionConfig
      const sec = await resolveEntitySecurity({ entity, operations: ['read', 'create'] })
      expect(sec.read).toEqual(secured)
      expect(sec.create).toBeUndefined()
    })
  })

  describe('applySecurityWhen', () => {
    const paths = (): PathsObject => ({
      '/api/posts': { get: { security: undefined }, post: { security: [{ PayloadToken: [] }] } },
    })

    it('is a no-op when securityWhen is not set', () => {
      const p = paths()
      expect(applySecurityWhen({ paths: p, slug: 'posts', kind: 'collection' })).toBe(p)
    })

    it('opens an operation when the predicate returns true', () => {
      const out = applySecurityWhen({ paths: paths(), slug: 'posts', kind: 'collection', securityWhen: () => true })
      expect(out['/api/posts']?.post?.security).toBeUndefined()
    })

    it('closes an operation when the predicate returns false', () => {
      const out = applySecurityWhen({ paths: paths(), slug: 'posts', kind: 'collection', securityWhen: () => false })
      expect(out['/api/posts']?.get?.security).toEqual(secured)
    })

    it('leaves an operation untouched when the predicate returns undefined', () => {
      const out = applySecurityWhen({
        paths: paths(),
        slug: 'posts',
        kind: 'collection',
        securityWhen: () => undefined,
      })
      expect(out['/api/posts']?.get?.security).toBeUndefined()
      expect(out['/api/posts']?.post?.security).toEqual(secured)
    })
  })

  describe('per-operation marking in path builders', () => {
    it('marks collection ops per operation from resolved security', async () => {
      const collection = {
        slug: 'posts',
        fields: [],
        access: { read: () => true, create: ({ req }: { req: { user: unknown } }) => Boolean(req.user) },
      } as unknown as SanitizedCollectionConfig
      const security = await resolveEntitySecurity({
        entity: collection,
        operations: ['read', 'create', 'update', 'delete'],
      })
      const paths = buildCollectionPaths({ collection, ctx, security })
      expect(paths['/api/posts']?.get?.security).toBeUndefined()
      expect(paths['/api/posts']?.post?.security).toEqual(secured)
    })

    it('marks global get/post from read/update security', async () => {
      const { buildGlobalPaths } = await import('../src/spec/paths/globals.js')
      const global = {
        slug: 'settings',
        fields: [],
        access: { read: () => true, update: ({ req }: { req: { user: unknown } }) => Boolean(req.user) },
      } as unknown as SanitizedGlobalConfig
      const security = await resolveEntitySecurity({ entity: global, operations: ['read', 'update'] })
      const paths = buildGlobalPaths({ global, ctx, security })
      expect(paths['/api/globals/settings']?.get?.security).toBeUndefined()
      expect(paths['/api/globals/settings']?.post?.security).toEqual(secured)
    })
  })
})

describe('spec/entitySchemas', () => {
  it('writes relationships as ids at any depth and keeps the populated shape on read', async () => {
    const { buildEntitySchemas } = await import('../src/spec/entitySchemas.js')
    const fields = [
      { name: 'cover', type: 'upload', relationTo: 'media' },
      { name: 'meta', type: 'group', fields: [{ name: 'image', type: 'upload', relationTo: 'media' }] },
      {
        name: 'rows',
        type: 'array',
        fields: [
          { name: 'tags', type: 'relationship', relationTo: 'tags', hasMany: true },
          { name: 'link', type: 'relationship', relationTo: ['media', 'tags'] },
        ],
      },
      {
        name: 'content',
        type: 'blocks',
        blocks: [{ slug: 'quote', fields: [{ name: 'source', type: 'relationship', relationTo: 'tags' }] }],
      },
    ] as Field[]
    const collection = (slug: string, own: Field[] = []) => ({
      slug,
      fields: own,
      flattenedFields: flattenAllFields({ fields: own }),
    })
    const entity = collection('posts', fields) as unknown as SanitizedCollectionConfig
    const config = { collections: [collection('media'), collection('tags')], blocks: [] } as unknown as SanitizedConfig
    const { read, create, update } = await buildEntitySchemas({ entity, config, ctx })

    const id = { type: 'string' }
    const optionalId = { type: ['string', 'null'] }
    const props = create.properties ?? {}
    expect(props.cover).toEqual(optionalId)
    expect((props.meta as SchemaObject).properties?.image).toEqual(optionalId)
    const row = ((props.rows as SchemaObject).items as SchemaObject).properties ?? {}
    expect(row.tags).toEqual({ type: ['array', 'null'], items: id })
    const link = (row.link as SchemaObject).oneOf as SchemaObject[]
    expect(link.map((b) => [b.properties?.relationTo, b.properties?.value])).toEqual([
      [{ const: 'media' }, id],
      [{ const: 'tags' }, id],
    ])
    const quote = ((props.content as SchemaObject).items as SchemaObject).oneOf?.[0] as SchemaObject
    expect(quote.properties?.source).toEqual(optionalId)
    expect(update.properties?.meta).toEqual(props.meta)

    const readMeta = read.properties?.meta as SchemaObject
    const readImage = readMeta.properties?.image as SchemaObject
    expect(readImage.oneOf?.[1]).toEqual({ $ref: '#/components/schemas/Media' })
  })
})

describe('spec/params', () => {
  it('uses `ctx.t` for descriptions so a custom translation flows through', async () => {
    const { buildSelectSchema } = await import('../src/spec/params.js')
    const custom = { ...ctx, i18n: { ...ctx.i18n, t: (() => 'ÜBERSETZT') as unknown as I18n['t'] } }
    const schema = buildSelectSchema({ fields: [{ name: 'title', type: 'text' }] as Field[], ctx: custom })
    expect(schema.description).toBe('ÜBERSETZT')
  })

  it('adds draft, locale and lock params by entity config and operation', async () => {
    const { writeParams } = await import('../src/spec/params.js')
    const refs = { select: true, populate: false, joins: false }
    const entity = (versions: unknown, lockDocuments?: false) =>
      ({ slug: 'x', fields: [], versions, lockDocuments }) as unknown as SanitizedCollectionConfig
    const names = (e: SanitizedCollectionConfig, operation: Parameters<typeof writeParams>[0]['operation']) =>
      writeParams({ base: 'X', entity: e, ctx, refs, operation }).map((p) => p.name)

    const full = entity({ drafts: { autosave: { interval: 800 }, localizeStatus: true } })
    expect(names(full, 'create')).toEqual(expect.arrayContaining(['autosave', 'publishAllLocales']))
    expect(names(full, 'create')).not.toContain('overrideLock')
    expect(names(full, 'update')).toEqual(
      expect.arrayContaining(['publishAllLocales', 'unpublishAllLocales', 'overrideLock']),
    )
    expect(names(full, 'update')).not.toContain('autosave')
    expect(names(full, 'updateByID')).toEqual(
      expect.arrayContaining(['autosave', 'publishAllLocales', 'unpublishAllLocales', 'overrideLock']),
    )
    expect(names(full, 'delete')).toContain('overrideLock')
    expect(names(full, 'duplicate')).toContain('selectedLocales[]')
    expect(names(full, 'globalUpdate')).not.toContain('overrideLock')

    const plain = entity({ drafts: { autosave: false } }, false)
    for (const operation of ['create', 'update', 'updateByID', 'delete', 'globalUpdate'] as const) {
      const list = names(plain, operation)
      for (const name of ['autosave', 'publishAllLocales', 'unpublishAllLocales', 'overrideLock']) {
        expect(list).not.toContain(name)
      }
    }
    expect(names(entity(false), 'create')).not.toContain('autosave')
    expect(
      writeParams({ base: 'X', entity: plain, ctx: { ...ctx, locales: [] }, refs, operation: 'duplicate' }).map(
        (p) => p.name,
      ),
    ).not.toContain('selectedLocales[]')
  })
})

type Loose = Record<string, unknown>

describe('spec/downconvert', () => {
  describe('toOpenApi30', () => {
    it('rewrites the version and nullable type arrays, leaving non-null types alone', async () => {
      const { toOpenApi30 } = await import('../src/spec/downconvert.js')
      const doc: Document = {
        openapi: '3.1.2',
        info: { title: 'T', version: '1' },
        paths: {},
        components: {
          schemas: {
            A: {
              type: 'object',
              properties: {
                title: { type: ['string', 'null'] },
                count: { type: 'integer' },
                tag: { const: 'x' },
              },
            },
          },
        },
      }
      const out = toOpenApi30(doc)
      expect(out.openapi).toBe('3.0.4')
      const schemaA = out.components!.schemas!.A as { properties: Record<string, SchemaObject & Loose> }
      const props = schemaA.properties
      expect(props.title).toEqual({ type: 'string', nullable: true })
      expect(props.count).toEqual({ type: 'integer' })
      expect(props.tag).toEqual({ enum: ['x'] })
    })

    it('converts content and example keywords and drops the ones 3.0 rejects', async () => {
      const { toOpenApi30 } = await import('../src/spec/downconvert.js')
      const doc: Document = {
        openapi: '3.1.2',
        info: { title: 'T', version: '1' },
        paths: {},
        components: {
          schemas: {
            A: {
              $schema: 'https://json-schema.org/draft/2020-12/schema',
              type: 'object',
              properties: {
                file: { type: 'string', contentMediaType: 'application/octet-stream' },
                data: { type: 'string', contentEncoding: 'base64' },
                status: { type: 'string', examples: ['active', 'archived'] },
              },
            },
          },
        },
      }
      const out = toOpenApi30(doc)
      const a = out.components!.schemas!.A as {
        $schema?: unknown
        properties: Record<string, SchemaObject & Loose>
      }
      expect(a.$schema).toBeUndefined()
      expect(a.properties.file).toEqual({ type: 'string', format: 'binary' })
      expect(a.properties.data).toEqual({ type: 'string', format: 'byte' })
      expect(a.properties.status.example).toBe('active')
      expect(a.properties.status['x-examples']).toEqual(['active', 'archived'])
      expect(a.properties.status.contentMediaType).toBeUndefined()
    })

    it('leaves a 3.0 examples map untouched when it is already an object', async () => {
      const { toOpenApi30 } = await import('../src/spec/downconvert.js')
      const doc: Document = {
        openapi: '3.1.2',
        info: { title: 'T', version: '1' },
        paths: {
          '/x': {
            get: {
              responses: {
                '200': {
                  description: 'ok',
                  content: {
                    'application/json': { examples: { sample: { value: { ok: true } } } },
                  },
                },
              },
            },
          },
        },
      }
      const out = toOpenApi30(doc)
      const xPath = out.paths!['/x'] as Loose
      const media = xPath.get as {
        responses: { '200': { content: { 'application/json': { examples?: unknown } } } }
      }
      expect(media.responses['200'].content['application/json'].examples).toEqual({
        sample: { value: { ok: true } },
      })
    })
  })

  describe('toOpenApi30 required', () => {
    it('drops an empty `required` array and keeps a filled one', async () => {
      const { toOpenApi30 } = await import('../src/spec/downconvert.js')
      const doc: Document = {
        openapi: '3.2.0',
        info: { title: 'T', version: '1' },
        paths: {},
        components: {
          schemas: {
            A: { type: 'object', properties: { x: { type: 'string' } }, required: [] },
            B: { type: 'object', properties: { x: { type: 'string' } }, required: ['x'] },
          },
        },
      }
      const out = toOpenApi30(doc)
      expect(out.components!.schemas!.A).not.toHaveProperty('required')
      expect((out.components!.schemas!.B as SchemaObject).required).toEqual(['x'])
    })

    it('turns several types into `anyOf` and keeps `null` in each branch', async () => {
      const { toOpenApi30 } = await import('../src/spec/downconvert.js')
      const doc: Document = {
        openapi: '3.2.0',
        info: { title: 'T', version: '1' },
        paths: {},
        components: {
          schemas: {
            J: { type: ['object', 'integer', 'number', 'null'] },
            K: { type: ['string', 'null'] },
          },
        },
      }
      const out = toOpenApi30(doc)
      expect(out.components!.schemas!.J).toEqual({
        anyOf: [
          { type: 'object', nullable: true },
          { type: 'integer', nullable: true },
          { type: 'number', nullable: true },
        ],
      })
      expect(out.components!.schemas!.K).toEqual({ type: 'string', nullable: true })
    })
  })

  describe('toOpenApi31', () => {
    it('rewrites the `openapi` version field to 3.1.2', async () => {
      const { toOpenApi31 } = await import('../src/spec/downconvert.js')
      const doc: Document = { openapi: '3.2.0', info: { title: 'Test', version: '1.0' }, paths: {} }
      const result = toOpenApi31(doc)
      expect(result.openapi).toBe('3.1.2')
      expect(result.info).toEqual({ title: 'Test', version: '1.0' })
    })

    it('returns a new document instead of mutating the input', async () => {
      const { toOpenApi31 } = await import('../src/spec/downconvert.js')
      const doc: Document = { openapi: '3.2.0', info: { title: 'T', version: '1' }, paths: {} }
      expect(toOpenApi31(doc)).not.toBe(doc)
    })

    it('strips the 3.2-only `kind`, `parent` and `summary` fields from tags', async () => {
      const { toOpenApi31 } = await import('../src/spec/downconvert.js')
      const doc: Document = {
        openapi: '3.2.0',
        info: { title: 'T', version: '1' },
        paths: {},
        tags: [
          { name: 'Collections', kind: 'nav', summary: 'Collections' },
          { name: 'Posts', parent: 'Collections', description: 'Blog posts' },
        ],
      }
      const result = toOpenApi31(doc)
      expect(result.tags).toEqual([{ name: 'Collections' }, { name: 'Posts', description: 'Blog posts' }])
    })
  })

  describe('OpenApiExtension', () => {
    it('accepts the 3.2 tag fields', () => {
      const ext: OpenApiExtension = {
        tags: [
          { name: 'users', summary: 'User operations', kind: 'nav' },
          { name: 'admin', parent: 'users', kind: 'nav' },
        ],
      }
      expect(ext.tags).toHaveLength(2)
    })
  })
})

describe('endpoints/spec', () => {
  describe('specHandler caching', () => {
    const makeReq = (host: string): PayloadRequest =>
      ({
        headers: new Headers({ host }),
        i18n: { language: 'en', fallbackLanguage: 'en', t: (k: string) => k },
        payload: {
          config: { localization: false, globals: [], routes: { api: '/api' } },
          db: { defaultIDType: 'text' },
          collections: {},
          logger: { warn() {} },
        },
      }) as unknown as PayloadRequest

    const optionsBase = () => resolveOptions({ metadata: { title: 'T', version: '1.0.0' } })

    it('injects a fresh server URL per request from the cached doc', async () => {
      const { specHandler } = await import('../src/endpoints/spec.js')
      const handler = specHandler(optionsBase())
      const a = await (await handler(makeReq('localhost:3000'))).json()
      const b = await (await handler(makeReq('api.example.com'))).json()
      expect(a.servers[0].url).toBe('http://localhost:3000')
      expect(b.servers[0].url).toBe('https://api.example.com')
      expect({ ...a, servers: [] }).toEqual({ ...b, servers: [] })
    })

    it('rebuilds on every request when the cache is off', async () => {
      const { specHandler } = await import('../src/endpoints/spec.js')
      const handler = specHandler(resolveOptions({ metadata: { title: 'T', version: '1.0.0' }, cache: false }))
      const res = await (await handler(makeReq('localhost:3000'))).json()
      expect(res.openapi).toBe('3.2.0')
    })

    it('serves 3.0 when `openapiVersion` is `3.0`', async () => {
      const { specHandler } = await import('../src/endpoints/spec.js')
      const handler = specHandler(resolveOptions({ metadata: { title: 'T', version: '1.0.0' }, openapiVersion: '3.0' }))
      const res = await (await handler(makeReq('localhost:3000'))).json()
      expect(res.openapi).toBe('3.0.4')
    })

    it('serves 3.1 when `openapiVersion` is `3.1`', async () => {
      const { specHandler } = await import('../src/endpoints/spec.js')
      const handler = specHandler(resolveOptions({ metadata: { title: 'T', version: '1.0.0' }, openapiVersion: '3.1' }))
      const res = await (await handler(makeReq('localhost:3000'))).json()
      expect(res.openapi).toBe('3.1.2')
    })

    it('defaults to 3.2 when `openapiVersion` is not set', async () => {
      const { specHandler } = await import('../src/endpoints/spec.js')
      const handler = specHandler(optionsBase())
      const res = await (await handler(makeReq('localhost:3000'))).json()
      expect(res.openapi).toBe('3.2.0')
    })
  })
})

describe('ui/html', () => {
  const renderHtml = async (plugin: Plugin): Promise<string> => {
    const out = await plugin({ routes: { api: '/api' } } as unknown as Config)
    const endpoint = (out.endpoints ?? []).at(-1) as Endpoint
    const handler = endpoint.handler as () => Response | Promise<Response>
    return (await handler()).text()
  }

  it('passes Scalar configuration into the init call', async () => {
    const { scalar } = await import('../src/ui/scalar.js')
    const html = await renderHtml(scalar({ configuration: { theme: 'purple', hideModels: true } }))
    expect(html).toContain('Scalar.createApiReference')
    expect(html).toContain('"theme":"purple"')
    expect(html).toContain('"hideModels":true')
  })

  it('passes Swagger UI configuration into `SwaggerUIBundle`', async () => {
    const { swaggerUi } = await import('../src/ui/swagger.js')
    const html = await renderHtml(swaggerUi({ configuration: { docExpansion: 'none' } }))
    expect(html).toContain('SwaggerUIBundle')
    expect(html).toContain('"docExpansion":"none"')
  })

  it('escapes `<` in configuration so a string value cannot break out of the script', async () => {
    const { swaggerUi } = await import('../src/ui/swagger.js')
    const html = await renderHtml(swaggerUi({ configuration: { x: '</script>' } }))
    expect(html).not.toContain('</script>"')
    expect(html).toContain('\\u003c/script\\u003e')
  })

  it('escapes `specEndpoint` so it cannot break out of the script', async () => {
    const { scalar } = await import('../src/ui/scalar.js')
    const html = await renderHtml(scalar({ specEndpoint: '/spec.json</script><script>alert(1)</script>' }))
    expect(html).not.toContain('<script>alert(1)')
    expect(html).toContain('/spec.json\\u003c/script\\u003e')
  })

  it('forwards the docs page `?lang=` onto the spec URL it loads', async () => {
    const { scalar } = await import('../src/ui/scalar.js')
    const { swaggerUi } = await import('../src/ui/swagger.js')
    for (const html of [await renderHtml(scalar()), await renderHtml(swaggerUi())]) {
      expect(html).toContain("new URLSearchParams(location.search).get('lang')")
      expect(html).toContain("'lang='+encodeURIComponent(l)")
    }
  })
})

describe('translations', () => {
  describe('registration', () => {
    const NS = PLUGIN_NAME

    type Translations = Record<string, Record<string, Record<string, string>>>

    it('registers plugin defaults over the user namespace and keeps sibling namespaces', async () => {
      const { openapi } = await import('../src/index.js')
      const plugin = openapi({ metadata: { title: 'T', version: '1.0.0' } })
      const applied = await plugin({
        i18n: {
          translations: {
            en: { [NS]: { paramDraft: 'MINE' }, general: { hello: 'world' } },
          },
        },
      } as unknown as Config)
      const translations = applied.i18n?.translations as unknown as Translations
      const enNs = translations.en[NS]
      expect(enNs.paramDraft).not.toBe('MINE')
      expect(enNs.paramSort).toContain('sort by')
      expect(translations.en.general.hello).toBe('world')
    })

    it('registers only the languages the config supports', async () => {
      const { openapi } = await import('../src/index.js')
      const plugin = openapi({ metadata: { title: 'T', version: '1.0.0' } })
      const applied = await plugin({
        i18n: { supportedLanguages: { de: {} }, translations: {} },
      } as unknown as Config)
      const translations = applied.i18n?.translations as unknown as Translations
      expect(translations.en).toBeUndefined()
    })
  })

  describe('resolveLocalizedStrings', () => {
    const deI18n = { ...i18nStub, language: 'de' }
    const deCtx = { ...ctx, i18n: deI18n }

    it('resolves a locale-keyed string under a text key to the active language', async () => {
      const { resolveLocalizedStrings } = await import('../src/spec/entitySchemas.js')
      const override = { description: { en: 'Phone', de: 'Telefon' } }
      expect(resolveLocalizedStrings(override, ctx)).toEqual({ description: 'Phone' })
      expect(resolveLocalizedStrings(override, deCtx)).toEqual({ description: 'Telefon' })
    })

    it('resolves locale maps under every whitelisted text key (description, title, summary)', async () => {
      const { resolveLocalizedStrings } = await import('../src/spec/entitySchemas.js')
      const override = {
        title: { en: 'Title', de: 'Titel' },
        summary: { en: 'Summary', de: 'Zusammenfassung' },
        description: { en: 'Desc', de: 'Beschreibung' },
      }
      expect(resolveLocalizedStrings(override, deCtx)).toEqual({
        title: 'Titel',
        summary: 'Zusammenfassung',
        description: 'Beschreibung',
      })
    })

    it('leaves plain strings under text keys alone', async () => {
      const { resolveLocalizedStrings } = await import('../src/spec/entitySchemas.js')
      const override = { type: 'string', example: 'x', description: 'A plain string' }
      expect(resolveLocalizedStrings(override, ctx)).toEqual(override)
    })

    it('resolves only the whitelisted text key in a mixed object', async () => {
      const { resolveLocalizedStrings } = await import('../src/spec/entitySchemas.js')
      const override = { type: 'string', example: 'x', description: { en: 'A', de: 'B' } }
      expect(resolveLocalizedStrings(override, ctx)).toEqual({
        type: 'string',
        example: 'x',
        description: 'A',
      })
    })

    it('only resolves under whitelisted keys, never under arbitrary locale-named keys', async () => {
      const { resolveLocalizedStrings } = await import('../src/spec/entitySchemas.js')
      const override = { example: { en: 'A', de: 'B' } }
      expect(resolveLocalizedStrings(override, ctx)).toEqual(override)
    })

    it('recurses into nested structures and resolves text keys at any depth', async () => {
      const { resolveLocalizedStrings } = await import('../src/spec/entitySchemas.js')
      const override = {
        properties: {
          phone: { type: 'string', description: { en: 'Phone', de: 'Telefon' } },
        },
        items: { description: { en: 'Item', de: 'Eintrag' } },
      }
      expect(resolveLocalizedStrings(override, deCtx)).toEqual({
        properties: { phone: { type: 'string', description: 'Telefon' } },
        items: { description: 'Eintrag' },
      })
    })

    it('calls a function under a text key with { t, i18n } and uses its return value', async () => {
      const { resolveLocalizedStrings } = await import('../src/spec/entitySchemas.js')
      const description = ({ i18n }: { i18n: { language: string } }) =>
        i18n.language === 'de' ? 'Aus Funktion' : 'From function'
      expect(resolveLocalizedStrings({ description }, ctx)).toEqual({ description: 'From function' })
      expect(resolveLocalizedStrings({ description }, deCtx)).toEqual({ description: 'Aus Funktion' })
    })

    it('does not call a function under a non-whitelisted key', async () => {
      const { resolveLocalizedStrings } = await import('../src/spec/entitySchemas.js')
      const fn = () => 'should not run'
      const override = { example: fn }
      expect(resolveLocalizedStrings(override, ctx)).toEqual(override)
    })

    it('drops the key when a text-key function throws', async () => {
      const { resolveLocalizedStrings } = await import('../src/spec/entitySchemas.js')
      const description = () => {
        throw new Error('boom')
      }
      expect(resolveLocalizedStrings({ type: 'string', description }, ctx)).toEqual({ type: 'string' })
    })

    it('drops the key when a text-key function returns a non-string or empty string', async () => {
      const { resolveLocalizedStrings } = await import('../src/spec/entitySchemas.js')
      const nonString = { description: () => 42 as unknown as string, type: 'string' }
      expect(resolveLocalizedStrings(nonString, ctx)).toEqual({ type: 'string' })
      const empty = { description: () => '', type: 'string' }
      expect(resolveLocalizedStrings(empty, ctx)).toEqual({ type: 'string' })
    })

    it('passes locale maps through untouched when no locales are configured', async () => {
      const { resolveLocalizedStrings } = await import('../src/spec/entitySchemas.js')
      const noLocales = { ...ctx, locales: [] }
      const override = { description: { en: 'A', de: 'B' } }
      expect(resolveLocalizedStrings(override, noLocales)).toEqual(override)
    })
  })

  describe('translate helper', () => {
    it('fills `{{var}}` placeholders, such as the jobs queue list', () => {
      expect(t('jobsQueue', { queues: '`default`, `email`' })).toContain('`default`, `email`')
      expect(t('jobsQueue', { queues: 'x' })).not.toContain('{{queues}}')
    })
  })
})

describe('bin/generateSpec', () => {
  describe('parseArgs', () => {
    it('reads `--lang`, `--out`, and `--server` in both spaced and `=` forms', async () => {
      const { parseArgs } = await import('../src/bin/generateSpec.js')
      expect(parseArgs(['--lang', 'de', '--out', 'spec.json', '--server', 'https://api.example.com'])).toEqual({
        lang: 'de',
        out: 'spec.json',
        server: 'https://api.example.com',
      })
      expect(parseArgs(['--lang=all'])).toEqual({ lang: 'all' })
      expect(parseArgs(['--server=https://api.example.com'])).toEqual({ server: 'https://api.example.com' })
      expect(parseArgs(['node', 'script.js'])).toEqual({})
    })
  })

  describe('auto-registering the CLI bin entry', () => {
    it('adds a bin entry and stashes resolved options on `config.custom`', async () => {
      const { openapi } = await import('../src/index.js')
      const existingBin = { key: 'seed', scriptPath: '/abs/seed.ts' }
      const incoming = {
        collections: [],
        bin: [existingBin],
        custom: { user: { keep: 'me' } },
      } as unknown as Config

      const result = await openapi({ metadata: { title: 'API', version: '1.0.0' } })(incoming)

      const stashed = result.custom?.[PLUGIN_NAME] as ReturnType<typeof resolveOptions>
      expect(stashed).toEqual(resolveOptions({ metadata: { title: 'API', version: '1.0.0' } }))
      expect(result.custom?.user).toEqual({ keep: 'me' })

      const ours = result.bin?.find((entry) => entry.key === 'openapi:generate')
      expect(ours).toBeDefined()
      expect(ours?.scriptPath).toMatch(/[\\/]bin[\\/]generateSpec\.(ts|js)$/)
      expect(result.bin).toContainEqual(existingBin)
    })

    it('skips registration when `enabled` is false', async () => {
      const { openapi } = await import('../src/index.js')
      const incoming = { collections: [] } as unknown as Config
      const result = await openapi({
        metadata: { title: 'API', version: '1.0.0' },
        enabled: false,
      })(incoming)
      expect(result.bin).toBeUndefined()
      expect(result.custom?.[PLUGIN_NAME]).toBeUndefined()
    })

    it('registers the CLI bin but mounts no endpoints when `serve` is false', async () => {
      const { openapi } = await import('../src/index.js')
      const incoming = {
        collections: [],
        i18n: { supportedLanguages: { de: {} }, translations: {} },
      } as unknown as Config
      const result = await openapi({
        metadata: { title: 'API', version: '1.0.0' },
        serve: false,
        interactiveAuth: true,
      })(incoming)

      // bin + stashed options stay, so `payload openapi:generate` still works…
      expect(result.bin?.some((entry) => entry.key === 'openapi:generate')).toBe(true)
      expect(result.custom?.[PLUGIN_NAME]).toBeDefined()
      // …including its multi-language output: translations are merged regardless of `serve`.
      const translations = result.i18n?.translations as unknown as Record<string, Record<string, unknown>>
      expect(translations.de[PLUGIN_NAME]).toBeDefined()
      // …but nothing is served at runtime, not even the interactive-auth endpoint.
      expect(result.endpoints ?? []).toEqual([])
    })

    it('mounts the spec endpoint by default (`serve` defaults to true)', async () => {
      const { openapi } = await import('../src/index.js')
      const incoming = { collections: [] } as unknown as Config
      const result = await openapi({ metadata: { title: 'API', version: '1.0.0' } })(incoming)
      const paths = (result.endpoints ?? []).map((e) => e.path)
      expect(paths).toContain('/openapi.json')
    })
  })
})

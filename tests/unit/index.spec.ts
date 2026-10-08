import type { I18n } from '@payloadcms/translations'
import type { Document, MediaTypeObject, PathsObject, RequestBodyObject } from '@scalar/openapi-types/3.2'
import { Validator } from '@seriousme/openapi-schema-validator'
import type {
  CollectionConfig,
  Config,
  Endpoint,
  Field,
  GlobalConfig,
  PayloadRequest,
  Plugin,
  SanitizedCollectionConfig,
  SanitizedConfig,
  SanitizedGlobalConfig,
  TextField,
} from 'payload'
import { flattenAllFields } from 'payload'
import { describe, expect, expectTypeOf, it } from 'vitest'

import { resolveOptions } from '@/server/options/resolveOptions.js'
import { buildDocument } from '@/server/spec/buildDocument.js'
import { flattenFields } from '@/server/spec/fields.js'
import { filterOperations, shouldIncludeCollection, shouldIncludeGlobal } from '@/server/spec/filters.js'
import { rewriteRefs, schemaName } from '@/server/spec/names.js'
import { buildAuthPaths } from '@/server/spec/paths/auth.js'
import { buildCollectionPaths } from '@/server/spec/paths/collections.js'
import { buildCustomEndpointPaths } from '@/server/spec/paths/custom.js'
import { buildSystemPaths } from '@/server/spec/paths/system.js'
import { applySecurity, evaluateAccess, resolveEntitySecurity } from '@/server/spec/security.js'
import {
  NAV_COLLECTIONS,
  NAV_GLOBALS,
  NAV_SYSTEM,
  authTagName,
  buildTagHierarchy,
  entityTagName,
  versionsTagName,
} from '@/server/spec/tags.js'
import { PLUGIN_NAME } from '@/shared/constants.js'
import type { Translate } from '@/shared/translations/types.js'
import type {
  EntityOpenApiMeta,
  FieldOpenApiMeta,
  OpenApiExtension,
  ResolvedFilters,
  Schema,
} from '@/shared/types/index.js'

import { baseInput, ctx, i18nStub, t } from '../helpers/context.js'

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

    it('inlines collected `$defs` but keeps refs to config-level blocks', () => {
      const defs = new Map<string, unknown>([
        ['Hero', { type: 'object', properties: { blockType: { const: 'hero' } } }],
        ['CallToAction', { type: 'object' }],
      ])
      const input = { oneOf: [{ $ref: '#/$defs/Hero' }, { $ref: '#/$defs/CallToAction' }] }
      expect(rewriteRefs(input, new Set(['callToAction']), defs)).toEqual({
        oneOf: [
          { type: 'object', properties: { blockType: { const: 'hero' } } },
          { $ref: '#/components/schemas/BlockCallToAction' },
        ],
      })
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

    it('hides the `payload-kv`, `payload-llm-instructions` and `payload-query-presets` collections unless `includeSystem` is set', () => {
      expect(shouldIncludeCollection(coll('payload-kv'), f())).toBe(false)
      expect(shouldIncludeCollection(coll('payload-query-presets'), f())).toBe(false)
      expect(shouldIncludeCollection(coll('payload-llm-instructions'), f())).toBe(false)
      expect(shouldIncludeCollection(coll('payload-kv'), f({ includeSystem: true }))).toBe(true)
    })

    it('documents a `payload-folders` collection, which Payload 4 no longer creates', () => {
      expect(shouldIncludeCollection(coll('payload-folders'), f())).toBe(true)
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

    it('hides the `payload-jobs-stats` global unless `includeSystem` is on', () => {
      const stats = coll('payload-jobs-stats') as unknown as Parameters<typeof shouldIncludeGlobal>[0]
      expect(shouldIncludeGlobal(stats, f())).toBe(false)
      expect(shouldIncludeGlobal(stats, f({ includeSystem: true }))).toBe(true)
    })
  })

  describe('filterOperations', () => {
    const paths = (): PathsObject => ({
      '/api/posts': { get: {}, post: {}, patch: {}, delete: {} },
      '/api/posts/{id}': { get: {}, patch: {}, delete: {} },
    })

    it('drops a method across all paths and removes the emptied paths', async () => {
      const out = await filterOperations({
        paths: paths(),
        slug: 'posts',
        kind: 'collection',
        filters: f({ excludeOperations: [{ method: 'delete' }] }),
      })
      expect(out['/api/posts']?.delete).toBeUndefined()
      expect(out['/api/posts/{id}']?.delete).toBeUndefined()
      expect(out['/api/posts']?.get).toBeDefined()
    })

    it('targets a single entity by slug', async () => {
      const out = await filterOperations({
        paths: paths(),
        slug: 'tags',
        kind: 'collection',
        filters: f({ excludeOperations: [{ method: 'post', slug: 'posts' }] }),
      })
      expect(out['/api/posts']?.post).toBeDefined()
    })

    it('matches a path by regex to tell list from by-id', async () => {
      const out = await filterOperations({
        paths: paths(),
        slug: 'posts',
        kind: 'collection',
        filters: f({ excludeOperations: [{ method: 'get', path: /\/\{id\}$/ }] }),
      })
      expect(out['/api/posts']?.get).toBeDefined()
      expect(out['/api/posts/{id}']?.get).toBeUndefined()
    })

    it('removes a path entirely when all of its methods are excluded', async () => {
      const out = await filterOperations({
        paths: paths(),
        slug: 'posts',
        kind: 'collection',
        filters: f({ excludeOperations: [{ path: /\/posts\/\{id\}$/ }] }),
      })
      expect(out['/api/posts/{id}']).toBeUndefined()
      expect(out['/api/posts']).toBeDefined()
    })

    it('respects `kind` so globals and collections do not collide', async () => {
      const out = await filterOperations({
        paths: paths(),
        slug: 'posts',
        kind: 'collection',
        filters: f({ excludeOperations: [{ slug: 'posts', kind: 'global' }] }),
      })
      expect(out['/api/posts']?.get).toBeDefined()
    })

    it('applies a function entry next to the rules', async () => {
      const out = await filterOperations({
        paths: paths(),
        slug: 'posts',
        kind: 'collection',
        filters: f({ excludeOperations: [{ method: 'delete' }, ({ method }) => method === 'patch'] }),
      })
      expect(out['/api/posts']?.patch).toBeUndefined()
      expect(out['/api/posts']?.delete).toBeUndefined()
      expect(out['/api/posts']?.get).toBeDefined()
    })

    it('awaits an async function and excludes only on `true`', async () => {
      const out = await filterOperations({
        paths: paths(),
        slug: 'posts',
        kind: 'collection',
        filters: f({
          excludeOperations: [async ({ method }) => method === 'patch', (() => 'yes') as unknown as () => boolean],
        }),
      })
      expect(out['/api/posts']?.patch).toBeUndefined()
      expect(out['/api/posts']?.get).toBeDefined()
      expect(out['/api/posts/{id}']?.delete).toBeDefined()
    })

    it('never matches a `slug` rule against an operation without a slug', async () => {
      const out = await filterOperations({
        paths: paths(),
        kind: 'custom',
        filters: f({ excludeOperations: [{ slug: /.*/ }, { kind: 'custom', method: 'delete' }] }),
      })
      expect(out['/api/posts']?.get).toBeDefined()
      expect(out['/api/posts']?.delete).toBeUndefined()
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
      systemTags: ['Jobs'],
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

  it('puts the Uploads and Access tags under the System group', () => {
    const tt = ((key: string) => key) as Translate
    const tags = buildTagHierarchy({
      collections: [],
      globals: [],
      systemTags: ['Uploads', 'Access'],
      t: tt,
      nested: true,
    })
    const byName = Object.fromEntries(tags.map((tag) => [tag.name, tag]))
    expect(byName['Uploads']?.parent).toBe(NAV_SYSTEM)
    expect(byName['Uploads']?.summary).toBe('tagUploads')
    expect(byName['Access']?.parent).toBe(NAV_SYSTEM)
    expect(byName['Jobs']).toBeUndefined()
  })

  it('builds a flat list of entity tags with descriptions when not nested', () => {
    const tt = ((key: string) => key) as Translate
    const tags = buildTagHierarchy({
      collections: [{ base: 'Posts', hasAuth: true, hasVersions: true, description: 'Blog posts' }],
      globals: [{ base: 'GlobalSettings', hasVersions: true, description: 'Site config' }],
      systemTags: ['Jobs'],
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
          info: { title: 'T', version: '1.0.0' },
          extensions: [
            { paths: { '/api/custom': { get: { responses: { '200': { description: 'ok' } } } } } },
            { transform: ({ doc: d }) => ({ ...d, info: { ...d.info, title: 'Transformed' } }) },
          ],
        }),
      }),
    )
    expect(doc.paths?.['/api/custom']).toBeDefined()
    expect(doc.info.title).toBe('Transformed')
  })

  it('fails closed when an extension `transform` throws', async () => {
    const build = buildDocument(
      baseInput({
        options: resolveOptions({
          info: { title: 'T', version: '1.0.0' },
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
    await expect(build).rejects.toThrow('boom')
  })

  it('fails closed when an extension `transform` returns the context, not the document', async () => {
    const build = buildDocument(
      baseInput({
        options: resolveOptions({
          info: { title: 'T', version: '1.0.0' },
          extensions: [{ transform: (d) => ({ ...d }) as never }],
        }),
      }),
    )
    await expect(build).rejects.toThrow('extensions[].transform must return the document')
  })

  it('awaits an async `transform` and passes it `payload` and the resolved options', async () => {
    let seen: { payload: unknown; title: unknown; locales: unknown } | undefined
    const input = baseInput({
      options: resolveOptions({
        info: { title: 'T', version: '1.0.0' },
        extensions: [
          {
            transform: async ({ doc: d, payload, options, locales }) => {
              seen = { payload, title: options.info.title, locales }
              return { ...d, info: { ...d.info, title: 'Async' } }
            },
          },
        ],
      }),
    })
    const doc = await buildDocument(input)
    expect(doc.info.title).toBe('Async')
    expect(seen).toEqual({ payload: input.payload, title: 'T', locales: input.ctx.locales })
  })

  it('copies every `info` field and resolves a localized `info.description`', async () => {
    const info = {
      title: 'T',
      version: '1.0.0',
      summary: 'Short',
      termsOfService: 'https://example.com/terms',
      contact: { name: 'Team', email: 'team@example.com' },
      license: { name: 'MIT', identifier: 'MIT' },
    }
    const doc = await buildDocument(
      baseInput({ options: resolveOptions({ info: { ...info, description: { en: 'English', de: 'Deutsch' } } }) }),
    )
    expect(doc.info).toMatchObject(info)
    expect(doc.info.description).toMatch(/^English\n\n## /)
    const fromFn = await buildDocument(
      baseInput({ options: resolveOptions({ info: { ...info, description: ({ i18n }) => `Lang ${i18n.language}` } }) }),
    )
    expect(fromFn.info.description).toMatch(/^Lang en\n/)
    const result = await new Validator().validate(structuredClone(doc))
    expect(result.valid).toBe(true)
  })

  it('drops `info.summary` and `license.identifier` from a 3.0 document', async () => {
    const { toOpenApi30 } = await import('@/server/spec/downconvert.js')
    const doc = await buildDocument(
      baseInput({
        options: resolveOptions({
          info: { title: 'T', version: '1.0.0', summary: 'Short', license: { name: 'MIT', identifier: 'MIT' } },
        }),
      }),
    )
    const converted = toOpenApi30(doc)
    expect(converted.info.summary).toBeUndefined()
    expect(converted.info.license).toEqual({ name: 'MIT' })
    expect(doc.info.summary).toBe('Short')
  })

  describe('interactive auth', () => {
    const securedPaths = {
      endpoints: [
        {
          path: '/private',
          method: 'get',
          handler: () => new Response(),
          custom: { openapi: { responses: { '200': { description: 'ok' } }, security: [{ PayloadToken: [] }] } },
        },
      ],
    } as unknown as SanitizedConfig
    const build = (over: Partial<Parameters<typeof resolveOptions>[0]>) =>
      buildDocument(
        baseInput({
          config: securedPaths,
          options: resolveOptions({ info: { title: 'T', version: '1.0.0' }, ...over }),
        }),
      )

    it('references `PayloadLogin` from secured operations so "Try it" sends the token', async () => {
      const doc = await build({ interactiveAuth: true })
      expect(doc.components?.securitySchemes?.PayloadLogin).toBeDefined()
      expect(doc.paths?.['/api/private']?.get?.security).toEqual([{ PayloadToken: [] }, { PayloadLogin: [] }])
      const result = await new Validator().validate(structuredClone(doc))
      expect(result.valid).toBe(true)
    })

    it('advertises no `tokenUrl` when `serve` is false', async () => {
      const doc = await build({ interactiveAuth: true, serve: false })
      expect(doc.components?.securitySchemes?.PayloadLogin).toBeUndefined()
      expect(doc.paths?.['/api/private']?.get?.security).toEqual([{ PayloadToken: [] }])
    })

    it("does not change the user's endpoint metadata", async () => {
      await build({ interactiveAuth: true })
      const meta = (securedPaths.endpoints as unknown as Array<{ custom: { openapi: { security: unknown } } }>)[0]
      expect(meta?.custom.openapi.security).toEqual([{ PayloadToken: [] }])
    })
  })

  describe('custom, jobs and system operations', () => {
    const config = {
      endpoints: [
        {
          path: '/health',
          method: 'get',
          handler: () => new Response(),
          custom: { openapi: { responses: { '200': { description: 'ok' } } } },
        },
      ],
      jobs: { tasks: [{}] },
    } as unknown as SanitizedConfig
    const upload = coll('media', { upload: {} as never, fields: [] })

    it('applies `excludeOperations` to every group', async () => {
      const doc = await buildDocument(
        baseInput({
          config,
          collections: [upload],
          options: resolveOptions({
            info: { title: 'T', version: '1.0.0' },
            filters: {
              excludeOperations: [
                { kind: 'custom' },
                ({ kind }) => kind === 'jobs',
                { kind: 'system', method: 'delete' },
              ],
            },
          }),
        }),
      )
      expect(doc.paths?.['/api/health']).toBeUndefined()
      expect(doc.paths?.['/api/payload-jobs/run']).toBeUndefined()
      expect(doc.paths?.['/api/upload-instructions/{uploadId}']?.delete).toBeUndefined()
      expect(doc.paths?.['/api/upload-instructions/{uploadId}']?.put).toBeDefined()
    })

    it('passes custom, jobs and system operations to `security`', async () => {
      const kinds = new Set<string>()
      const doc = await buildDocument(
        baseInput({
          config,
          collections: [upload],
          options: resolveOptions({
            info: { title: 'T', version: '1.0.0' },
            security: ({ kind }) => {
              kinds.add(kind)
              return kind === 'custom' ? 'secured' : undefined
            },
          }),
        }),
      )
      expect([...kinds].toSorted()).toEqual(['custom', 'jobs', 'system'])
      expect(doc.paths?.['/api/health']?.get?.security).toEqual([{ PayloadToken: [] }])
    })

    it('marks jobs secured unless `jobs.access.run` is public', async () => {
      const secured = await buildDocument(baseInput({ config }))
      expect(secured.paths?.['/api/payload-jobs/run']?.get?.security).toEqual([{ PayloadToken: [] }])
      expect(secured.paths?.['/api/payload-jobs/handle-schedules']?.get?.security).toEqual([{ PayloadToken: [] }])
      const open = await buildDocument(
        baseInput({ config: { ...config, jobs: { tasks: [{}], access: { run: () => true } } } }),
      )
      expect(open.paths?.['/api/payload-jobs/run']?.get?.security).toBeUndefined()
    })
  })
})

describe('spec/paths/jobs', () => {
  describe('buildJobsPaths', () => {
    it('adds the run endpoint only when tasks or workflows are set up', async () => {
      const { buildJobsPaths } = await import('@/server/spec/paths/jobs.js')
      const jobsCtx = {
        defaultIDType: 'text' as const,
        locales: [],
        apiRoute: '/api',
        docLanguages: ['en'],
        i18n: i18nStub,
      }
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

describe('spec/paths/system', () => {
  describe('buildSystemPaths', () => {
    it('adds the upload instructions endpoints only when an upload collection exists', () => {
      expect(buildSystemPaths({ ctx, access: false, uploadSlugs: [] })).toEqual({})
      const paths = buildSystemPaths({ ctx, access: false, uploadSlugs: ['media'] })
      expect(paths['/api/upload-instructions']?.post?.operationId).toBe('getUploadInstructions')
      expect(paths['/api/upload-instructions/{uploadId}']?.put?.responses?.['204']).toBeDefined()
      expect(paths['/api/upload-instructions/{uploadId}']?.delete?.responses?.['204']).toBeDefined()
      expect(paths['/api/access']).toBeUndefined()
    })

    it('marks the staged upload `PUT` and `DELETE` as secured', () => {
      const paths = buildSystemPaths({ ctx, access: false, uploadSlugs: ['media'] })
      expect(paths['/api/upload-instructions/{uploadId}']?.put?.security).toEqual([{ PayloadToken: [] }])
      expect(paths['/api/upload-instructions/{uploadId}']?.delete?.security).toEqual([{ PayloadToken: [] }])
    })

    it('adds the root access endpoint only when `access` is on', () => {
      expect(buildSystemPaths({ ctx, access: true, uploadSlugs: [] })['/api/access']?.get).toBeDefined()
    })
  })
})

describe('spec/paths/auth', () => {
  const users = (auth: Record<string, unknown>): SanitizedCollectionConfig =>
    ({ slug: 'users', fields: [], auth }) as unknown as SanitizedCollectionConfig
  const build = (auth: Record<string, unknown>): PathsObject =>
    buildAuthPaths({ collection: users(auth), ctx, includeAdmin: true, nestedTags: true })

  const body = (paths: PathsObject, route: string): Schema => {
    const requestBody = paths[`/api/users/${route}`]?.post?.requestBody as RequestBodyObject
    return (requestBody.content['application/json'] as MediaTypeObject).schema as Schema
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

  it('adds the API key reveal endpoint only when `useAPIKey.reveal` is on', () => {
    expect(build({ useAPIKey: true })['/api/users/{id}/api-key/reveal']).toBeUndefined()
    expect(build({ useAPIKey: { reveal: true } })['/api/users/{id}/api-key/reveal']?.post).toBeDefined()
  })

  it('keeps me, logout, refresh-token and init but drops login routes when `disableLocalStrategy` is set', () => {
    const paths = build({ disableLocalStrategy: true })
    expect(paths['/api/users/me']?.get).toBeDefined()
    expect(paths['/api/users/logout']?.post).toBeDefined()
    expect(paths['/api/users/refresh-token']?.post).toBeDefined()
    expect(paths['/api/users/init']?.get).toBeDefined()
    expect(paths['/api/users/login']).toBeUndefined()
    expect(paths['/api/users/forgot-password']).toBeUndefined()
    expect(paths['/api/users/first-register']).toBeUndefined()
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
      expect(paths['/api/health']).toBeDefined()
      expect(paths['/api/secret']).toBeUndefined()
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

  it('lists `limit` and `sort` on bulk update only', () => {
    const paths = buildCollectionPaths({ collection: postsColl(), ctx })
    const names = (op?: { parameters?: unknown[] }) => ((op?.parameters ?? []) as { name: string }[]).map((p) => p.name)
    expect(names(paths['/api/posts']?.patch)).toEqual(expect.arrayContaining(['limit', 'sort']))
    expect(names(paths['/api/posts']?.patch)).not.toContain('page')
    expect(names(paths['/api/posts']?.delete)).not.toContain('limit')
    expect(names(paths['/api/posts']?.delete)).not.toContain('sort')
  })

  it('documents the file endpoint only for upload collections', () => {
    expect(buildCollectionPaths({ collection: postsColl(), ctx })['/api/posts/file/{filename}']).toBeUndefined()
    const paths = buildCollectionPaths({ collection: postsColl({ upload: {} as never }), ctx })
    expect(paths['/api/posts/file/{filename}']?.get?.responses?.['206']).toBeDefined()
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

  it('describes the responses as Payload sends them', async () => {
    const { buildGlobalPaths } = await import('@/server/spec/paths/globals.js')
    const { buildVersionPaths } = await import('@/server/spec/paths/versions.js')
    const body = (op?: { responses?: Record<string, unknown> }, code = '200') => {
      const response = op?.responses?.[code] as { content: Record<string, { schema: Schema }> } | undefined
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

  it('adds the document access endpoints with the operations Payload checks', async () => {
    const { buildGlobalPaths } = await import('@/server/spec/paths/globals.js')
    const operations = (op?: { responses?: Record<string, unknown> }) => {
      const ok = op?.responses?.['200'] as { content: Record<string, { schema: Schema }> }
      return Object.keys(ok.content['application/json']?.schema.properties ?? {})
    }
    expect(buildCollectionPaths({ collection: postsColl(), ctx })['/api/posts/access/{id}']).toBeUndefined()

    const plain = buildCollectionPaths({ collection: postsColl(), ctx, access: true })
    expect(operations(plain['/api/posts/access']?.post)).toEqual([
      'create',
      'read',
      'update',
      'delete',
      'validate',
      'fields',
    ])
    expect(plain['/api/posts/access/{id}']?.post?.operationId).toBe('accessPostsById')

    const users = buildCollectionPaths({
      collection: postsColl({ auth: { maxLoginAttempts: 5 } as never, versions: { drafts: false } as never }),
      ctx,
      access: true,
    })
    expect(operations(users['/api/posts/access/{id}']?.post)).toEqual([
      'create',
      'read',
      'update',
      'delete',
      'validate',
      'unlock',
      'readVersions',
      'fields',
    ])

    const global = { slug: 'site', fields: [], versions: false } as unknown as SanitizedGlobalConfig
    expect(buildGlobalPaths({ global, ctx })['/api/globals/site/access']).toBeUndefined()
    expect(operations(buildGlobalPaths({ global, ctx, access: true })['/api/globals/site/access']?.post)).toEqual([
      'read',
      'update',
      'validate',
      'fields',
    ])
  })

  it('adds the validate endpoints with a locale list and the validation result', async () => {
    const { buildGlobalPaths } = await import('@/server/spec/paths/globals.js')
    const paths = buildCollectionPaths({ collection: postsColl(), ctx })
    const create = paths['/api/posts/validate']?.post
    const byId = paths['/api/posts/{id}/validate']?.post
    expect(create?.operationId).toBe('validatePosts')
    expect(create?.requestBody).toMatchObject({
      required: true,
      content: { 'application/json': { schema: { $ref: '#/components/schemas/PostsCreate' } } },
    })
    expect(byId?.operationId).toBe('validatePostsById')
    expect(byId?.requestBody).not.toHaveProperty('required')
    expect(byId?.requestBody).toMatchObject({
      content: { 'application/json': { schema: { $ref: '#/components/schemas/PostsUpdate' } } },
    })
    expect(paths['/api/posts/{id}/validate']?.parameters?.[0]).toMatchObject({ name: 'id', in: 'path' })
    expect(create?.responses?.['200']).toMatchObject({
      content: { 'application/json': { schema: { required: ['valid', 'errors'] } } },
    })
    expect(
      buildCollectionPaths({ collection: postsColl(), ctx: { ...ctx, locales: [] } })['/api/posts/validate']?.post
        ?.parameters,
    ).toEqual([])

    const localized = buildCollectionPaths({ collection: postsColl(), ctx: { ...ctx, locales: ['en', 'de'] } })
    expect(localized['/api/posts/validate']?.post?.parameters).toMatchObject([
      { name: 'locale', in: 'query', explode: true, schema: { type: 'array', items: { enum: ['en', 'de', 'all'] } } },
    ])

    const global = { slug: 'site', fields: [] } as unknown as SanitizedGlobalConfig
    expect(buildGlobalPaths({ global, ctx })['/api/globals/site/validate']?.post?.operationId).toBe(
      'validateGlobalSite',
    )
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

    it('reads `baseAccess` from the config the way Payload wraps access', async () => {
      const wrapped = async ({ req }: { req: { payload: { config: { baseAccess?: { read?: () => boolean } } } } }) => {
        const base = req.payload.config.baseAccess?.read
        return base ? base() : true
      }
      expect(await evaluateAccess(wrapped as never)).toBe(true)
      expect(await evaluateAccess(wrapped as never, { baseAccess: { read: () => true } as never })).toBe(true)
      expect(await evaluateAccess(wrapped as never, { baseAccess: { read: () => false } as never })).toBe(false)
    })

    it('treats access that reads other config keys as secured', async () => {
      const access = ({ req }: { req: { payload: { config: { custom?: { private?: boolean } } } } }) =>
        !req.payload.config.custom?.private
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

    it("lets 'public' or 'secured' in custom.openapi.security override the probe for all operations", async () => {
      const entity = (security: string, allowed: boolean) =>
        ({
          slug: 'posts',
          access: { read: () => allowed, create: () => allowed },
          custom: { openapi: { security } },
        }) as unknown as SanitizedCollectionConfig
      const secured_ = await resolveEntitySecurity({ entity: entity('secured', true), operations: ['read', 'create'] })
      expect(secured_).toEqual({ read: secured, create: secured })
      const open = await resolveEntitySecurity({ entity: entity('public', false), operations: ['read', 'create'] })
      expect(open).toEqual({ read: undefined, create: undefined })
    })

    it('throws on the removed true/false form, also inside a per-operation object', async () => {
      const message = `[${PLUGIN_NAME}] custom.openapi.security true/false on "posts" was removed, use 'public' or 'secured'`
      for (const security of [false, true, { read: true }, { read: 'public', create: false }]) {
        const entity = { slug: 'posts', custom: { openapi: { security } } } as unknown as SanitizedCollectionConfig
        await expect(resolveEntitySecurity({ entity, operations: ['read'] })).rejects.toThrow(message)
      }
    })

    it('lets a per-operation override win over the probe in both directions', async () => {
      const entity = {
        slug: 'posts',
        access: { read: () => false, create: () => true },
        custom: { openapi: { security: { read: 'public', create: 'secured' } } },
      } as unknown as SanitizedCollectionConfig
      const sec = await resolveEntitySecurity({ entity, operations: ['read', 'create'] })
      expect(sec.read).toBeUndefined()
      expect(sec.create).toEqual(secured)
    })

    it('falls back to the probe for operations the override omits', async () => {
      const entity = {
        slug: 'posts',
        access: { read: () => true, create: () => true },
        custom: { openapi: { security: { read: 'secured' } } },
      } as unknown as SanitizedCollectionConfig
      const sec = await resolveEntitySecurity({ entity, operations: ['read', 'create'] })
      expect(sec.read).toEqual(secured)
      expect(sec.create).toBeUndefined()
    })
  })

  it('types `custom.openapi` on collections, globals and fields', () => {
    expectTypeOf<NonNullable<CollectionConfig['custom']>['openapi']>().toEqualTypeOf<EntityOpenApiMeta | undefined>()
    expectTypeOf<NonNullable<GlobalConfig['custom']>['openapi']>().toEqualTypeOf<EntityOpenApiMeta | undefined>()
    expectTypeOf<NonNullable<TextField['custom']>['openapi']>().toEqualTypeOf<FieldOpenApiMeta | undefined>()
    expectTypeOf<{ security: 'public' }>().toExtend<EntityOpenApiMeta>()
    expectTypeOf<{ security: { read: 'public'; update: 'secured' } }>().toExtend<EntityOpenApiMeta>()
    expectTypeOf<{ security: true }>().not.toExtend<EntityOpenApiMeta>()
  })

  describe('applySecurity', () => {
    const paths = (): PathsObject => ({
      '/api/posts': { get: { security: undefined }, post: { security: [{ PayloadToken: [] }] } },
    })
    const withLogin = [{ PayloadToken: [] }, { PayloadLogin: [] }]

    it('is a no-op when neither `security` nor login is set', async () => {
      const p = paths()
      expect(await applySecurity({ paths: p, slug: 'posts', kind: 'collection' })).toBe(p)
    })

    it("opens an operation on 'public'", async () => {
      const out = await applySecurity({ paths: paths(), slug: 'posts', kind: 'collection', security: () => 'public' })
      expect(out['/api/posts']?.post?.security).toBeUndefined()
    })

    it("closes an operation on 'secured'", async () => {
      const out = await applySecurity({ paths: paths(), slug: 'posts', kind: 'collection', security: () => 'secured' })
      expect(out['/api/posts']?.get?.security).toEqual(secured)
    })

    it('keeps the detected marking on undefined and passes it as `detected`', async () => {
      const seen: string[] = []
      const out = await applySecurity({
        paths: paths(),
        slug: 'posts',
        kind: 'collection',
        security: ({ method, detected }) => {
          seen.push(`${method}:${detected}`)
          return undefined
        },
      })
      expect(seen).toEqual(['get:public', 'post:secured'])
      expect(out['/api/posts']?.get?.security).toBeUndefined()
      expect(out['/api/posts']?.post?.security).toEqual(secured)
    })

    it('sets a returned requirement array as is and awaits a Promise', async () => {
      const apiKey = [{ ApiKey: [] }]
      const out = await applySecurity({
        paths: paths(),
        slug: 'posts',
        kind: 'collection',
        security: async ({ method }) => (method === 'get' ? apiKey : 'public'),
      })
      expect(out['/api/posts']?.get?.security).toEqual(apiKey)
      expect(out['/api/posts']?.post?.security).toBeUndefined()
    })

    it('adds the `PayloadLogin` requirement next to `PayloadToken` when login is on', async () => {
      const out = await applySecurity({ paths: paths(), slug: 'posts', kind: 'collection', login: true })
      expect(out['/api/posts']?.post?.security).toEqual(withLogin)
      expect(out['/api/posts']?.get?.security).toBeUndefined()
      const closed = await applySecurity({
        paths: paths(),
        kind: 'custom',
        login: true,
        security: () => 'secured',
      })
      expect(closed['/api/posts']?.get?.security).toEqual(withLogin)
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

    it('marks version reads from `readVersions` and restore from `update`', async () => {
      const { buildVersionPaths } = await import('@/server/spec/paths/versions.js')
      const entity = {
        slug: 'posts',
        fields: [],
        versions: {},
        access: { read: () => true, readVersions: async () => true, update: () => false },
      } as unknown as SanitizedCollectionConfig
      const security = await resolveEntitySecurity({ entity, operations: ['readVersions', 'update'] })
      const paths = buildVersionPaths({ entity, pathBase: '/api/posts', ctx, nestedTags: false, security })
      expect(paths['/api/posts/versions']?.get?.security).toBeUndefined()
      expect(paths['/api/posts/versions/{id}']?.get?.security).toBeUndefined()
      expect(paths['/api/posts/versions/{id}']?.post?.security).toEqual(secured)
      const closed = await resolveEntitySecurity({
        entity: { ...entity, access: {} } as SanitizedCollectionConfig,
        operations: ['readVersions'],
      })
      expect(closed.readVersions).toEqual(secured)
    })

    it('marks global get/post from read/update security', async () => {
      const { buildGlobalPaths } = await import('@/server/spec/paths/globals.js')
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

    it('marks validate from `validate` access, its own override and the `update` override', async () => {
      const { buildGlobalPaths } = await import('@/server/spec/paths/globals.js')
      const global = {
        slug: 'settings',
        fields: [],
        access: { update: () => false, validate: () => true },
      } as unknown as SanitizedGlobalConfig
      const probed = await resolveEntitySecurity({ entity: global, operations: ['update', 'validate'] })
      const paths = buildGlobalPaths({ global, ctx, security: probed })
      expect(paths['/api/globals/settings']?.post?.security).toEqual(secured)
      expect(paths['/api/globals/settings/validate']?.post?.security).toBeUndefined()
      const overridden = await resolveEntitySecurity({
        entity: { ...global, custom: { openapi: { security: { update: 'secured' } } } } as SanitizedGlobalConfig,
        operations: ['validate'],
      })
      expect(overridden.validate).toEqual(secured)
      const ownKey = await resolveEntitySecurity({
        entity: {
          ...global,
          custom: { openapi: { security: { update: 'secured', validate: 'public' } } },
        } as SanitizedGlobalConfig,
        operations: ['update', 'validate'],
      })
      expect(ownKey).toEqual({ update: secured, validate: undefined })
    })
  })
})

describe('spec/entitySchemas', () => {
  it('writes relationships as ids at any depth and keeps the populated shape on read', async () => {
    const { buildEntitySchemas } = await import('@/server/spec/entitySchemas.js')
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

    const id = { type: ['string', 'null'] }
    const props = create.properties ?? {}
    expect(props.cover).toEqual(id)
    expect((props.meta as Schema).properties?.image).toEqual(id)
    const row = ((props.rows as Schema).items as Schema).properties ?? {}
    expect(row.tags).toEqual({ type: ['array', 'null'], items: { type: 'string' } })
    const link = (row.link as Schema).oneOf as Schema[]
    expect(link.map((b) => [b.properties?.relationTo, b.properties?.value])).toEqual([
      [{ const: 'media' }, { type: 'string' }],
      [{ const: 'tags' }, { type: 'string' }],
    ])
    const quote = ((props.content as Schema).items as Schema).oneOf?.[0] as Schema
    expect(quote.properties?.source).toEqual(id)
    expect(update.properties?.meta).toEqual(props.meta)

    const readMeta = read.properties?.meta as Schema
    const readImage = readMeta.properties?.image as Schema
    expect(readImage.oneOf?.[1]).toEqual({ $ref: '#/components/schemas/Media' })
  })

  it('leaves fields whose write access is always false out of the matching write body', async () => {
    const { buildEntitySchemas } = await import('@/server/spec/entitySchemas.js')
    const fields = [
      { name: 'stamp', type: 'text', access: { create: () => false, update: () => false } },
      { name: 'lockedLater', type: 'text', access: { update: () => false } },
      {
        name: 'maybe',
        type: 'text',
        access: { create: (args?: { req?: { user?: { admin?: boolean } } }) => args?.req?.user?.admin === true },
      },
      {
        name: 'adminOnly',
        type: 'text',
        access: { create: ({ req }: { req: { user: unknown } }) => Boolean(req.user) },
      },
      { type: 'row', fields: [{ name: 'nested', type: 'text', access: { create: () => false } }] },
    ] as Field[]
    const entity = {
      slug: 'posts',
      fields,
      flattenedFields: flattenAllFields({ fields }),
    } as unknown as SanitizedCollectionConfig
    const config = { collections: [entity], blocks: [] } as unknown as SanitizedConfig
    const { read, create, update } = await buildEntitySchemas({ entity, config, ctx })
    expect(Object.keys(read.properties ?? {})).toEqual(
      expect.arrayContaining(['stamp', 'lockedLater', 'adminOnly', 'nested']),
    )
    expect(Object.keys(create.properties ?? {})).toEqual(expect.arrayContaining(['lockedLater', 'adminOnly', 'maybe']))
    expect(create.properties).not.toHaveProperty('stamp')
    expect(create.properties).not.toHaveProperty('nested')
    expect(update.properties).not.toHaveProperty('stamp')
    expect(update.properties).not.toHaveProperty('lockedLater')
    expect(update.properties).toHaveProperty('adminOnly')
  })
})

describe('spec/params', () => {
  it('uses `ctx.t` for descriptions so a custom translation flows through', async () => {
    const { buildSelectSchema } = await import('@/server/spec/params.js')
    const custom = { ...ctx, i18n: { ...ctx.i18n, t: (() => 'ÜBERSETZT') as unknown as I18n['t'] } }
    const schema = buildSelectSchema({ fields: [{ name: 'title', type: 'text' }] as Field[], ctx: custom }) as Schema
    expect(schema.description).toBe('ÜBERSETZT')
  })

  it('adds draft, locale and lock params by entity config and operation', async () => {
    const { writeParams } = await import('@/server/spec/params.js')
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
      const { toOpenApi30 } = await import('@/server/spec/downconvert.js')
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
      const schemaA = out.components!.schemas!.A as { properties: Record<string, Schema & Loose> }
      const props = schemaA.properties
      expect(props.title).toEqual({ type: 'string', nullable: true })
      expect(props.count).toEqual({ type: 'integer' })
      expect(props.tag).toEqual({ enum: ['x'] })
    })

    it('converts content and example keywords and drops the ones 3.0 rejects', async () => {
      const { toOpenApi30 } = await import('@/server/spec/downconvert.js')
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
        properties: Record<string, Schema & Loose>
      }
      expect(a.$schema).toBeUndefined()
      expect(a.properties.file).toEqual({ type: 'string', format: 'binary' })
      expect(a.properties.data).toEqual({ type: 'string', format: 'byte' })
      expect(a.properties.status!.example).toBe('active')
      expect(a.properties.status!['x-examples']).toEqual(['active', 'archived'])
      expect(a.properties.status!.contentMediaType).toBeUndefined()
    })

    it('leaves a 3.0 examples map untouched when it is already an object', async () => {
      const { toOpenApi30 } = await import('@/server/spec/downconvert.js')
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

    it('drops an empty `required` array and keeps a filled one', async () => {
      const { toOpenApi30 } = await import('@/server/spec/downconvert.js')
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
      expect((out.components!.schemas!.B as Schema).required).toEqual(['x'])
    })

    it('turns several types into `anyOf` and keeps `null` in each branch', async () => {
      const { toOpenApi30 } = await import('@/server/spec/downconvert.js')
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
      const { toOpenApi31 } = await import('@/server/spec/downconvert.js')
      const doc: Document = { openapi: '3.2.0', info: { title: 'Test', version: '1.0' }, paths: {} }
      const result = toOpenApi31(doc)
      expect(result.openapi).toBe('3.1.2')
      expect(result.info).toEqual({ title: 'Test', version: '1.0' })
    })

    it('returns a new document instead of mutating the input', async () => {
      const { toOpenApi31 } = await import('@/server/spec/downconvert.js')
      const doc: Document = { openapi: '3.2.0', info: { title: 'T', version: '1' }, paths: {} }
      expect(toOpenApi31(doc)).not.toBe(doc)
    })

    it('strips the 3.2-only `kind`, `parent` and `summary` fields from tags', async () => {
      const { toOpenApi31 } = await import('@/server/spec/downconvert.js')
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

    const optionsBase = () => resolveOptions({ info: { title: 'T', version: '1.0.0' } })
    const serversFor = async (options: ReturnType<typeof resolveOptions>, host: string, serverURL?: string) => {
      const { specHandler } = await import('@/server/endpoints/spec.js')
      const req = makeReq(host)
      Object.assign(req.payload.config, { serverURL })
      return (await (await specHandler(options)(req)).json()).servers
    }

    it('never reads servers from an untrusted Host header', async () => {
      expect(await serversFor(optionsBase(), 'evil.example.com')).toEqual([])
      expect(await serversFor(optionsBase(), 'evil.example.com', 'https://api.example.com')).toEqual([
        { url: 'https://api.example.com' },
      ])
    })

    it('uses the Host header only when it is in `trustedHosts`', async () => {
      const options = resolveOptions({
        info: { title: 'T', version: '1.0.0' },
        trustedHosts: ['API.example.com', 'localhost:3000'],
      })
      expect(await serversFor(options, 'api.example.com')).toEqual([{ url: 'https://api.example.com' }])
      expect(await serversFor(options, 'localhost:3000')).toEqual([{ url: 'http://localhost:3000' }])
      expect(await serversFor(options, 'evil.example.com', 'https://api.example.com')).toEqual([
        { url: 'https://api.example.com' },
      ])
    })

    it('prefers a `servers` array over `trustedHosts` and `serverURL`', async () => {
      const servers = [{ url: 'https://a.example.com', description: 'A' }]
      const options = resolveOptions({
        info: { title: 'T', version: '1.0.0' },
        servers,
        trustedHosts: ['b.example.com'],
      })
      expect(await serversFor(options, 'b.example.com', 'https://c.example.com')).toEqual(servers)
    })

    it('calls a `servers` function per request with `req` and keeps the cached doc', async () => {
      const options = resolveOptions({
        info: { title: 'T', version: '1.0.0' },
        servers: async ({ req }) => [{ url: `https://${req.headers.get('host')}` }],
      })
      const { specHandler } = await import('@/server/endpoints/spec.js')
      const handler = specHandler(options)
      const a = await (await handler(makeReq('a.example.com'))).json()
      const b = await (await handler(makeReq('b.example.com'))).json()
      expect(a.servers).toEqual([{ url: 'https://a.example.com' }])
      expect(b.servers).toEqual([{ url: 'https://b.example.com' }])
      expect({ ...a, servers: [] }).toEqual({ ...b, servers: [] })
    })

    it('answers 403 when `access` denies the request', async () => {
      const { specHandler } = await import('@/server/endpoints/spec.js')
      const handler = specHandler(
        resolveOptions({ info: { title: 'T', version: '1.0.0' }, access: async ({ req }) => Boolean(req.user) }),
      )
      await expect(handler(makeReq('localhost:3000'))).rejects.toMatchObject({ status: 403 })
      const req = Object.assign(makeReq('localhost:3000'), { user: { id: 1 } })
      expect((await handler(req)).status).toBe(200)
    })

    it('rebuilds on every request when the cache is off', async () => {
      const { specHandler } = await import('@/server/endpoints/spec.js')
      const handler = specHandler(resolveOptions({ info: { title: 'T', version: '1.0.0' }, cache: false }))
      const res = await (await handler(makeReq('localhost:3000'))).json()
      expect(res.openapi).toBe('3.2.0')
    })

    it('serves 3.0 when `openapiVersion` is `3.0`', async () => {
      const { specHandler } = await import('@/server/endpoints/spec.js')
      const handler = specHandler(resolveOptions({ info: { title: 'T', version: '1.0.0' }, openapiVersion: '3.0' }))
      const res = await (await handler(makeReq('localhost:3000'))).json()
      expect(res.openapi).toBe('3.0.4')
    })

    it('serves 3.1 when `openapiVersion` is `3.1`', async () => {
      const { specHandler } = await import('@/server/endpoints/spec.js')
      const handler = specHandler(resolveOptions({ info: { title: 'T', version: '1.0.0' }, openapiVersion: '3.1' }))
      const res = await (await handler(makeReq('localhost:3000'))).json()
      expect(res.openapi).toBe('3.1.2')
    })

    it('defaults to 3.2 when `openapiVersion` is not set', async () => {
      const { specHandler } = await import('@/server/endpoints/spec.js')
      const handler = specHandler(optionsBase())
      const res = await (await handler(makeReq('localhost:3000'))).json()
      expect(res.openapi).toBe('3.2.0')
    })
  })
})

describe('ui/html', () => {
  const uiRequest = (custom: Record<string, unknown> = {}, user: unknown = null) =>
    ({
      user,
      t: (k: string) => k,
      payload: { config: { routes: { api: '/api' }, custom } },
    }) as unknown as PayloadRequest
  const renderHtml = async (plugin: Plugin, req = uiRequest()): Promise<string> => {
    const out = await plugin({ routes: { api: '/api' } } as unknown as Config)
    const endpoint = (out.endpoints ?? []).at(-1) as Endpoint
    return (await endpoint.handler(req)).text()
  }

  it('loads the spec from the `openapi()` route, including a custom `path`', async () => {
    const { scalar } = await import('@/server/ui/scalar.js')
    expect(await renderHtml(scalar())).toContain('"/api/openapi.json"')
    const resolved = resolveOptions({ info: { title: 'Shop API', version: '1.0.0' }, path: '/spec.json' })
    const html = await renderHtml(scalar(), uiRequest({ [PLUGIN_NAME]: resolved }))
    expect(html).toContain('"/api/spec.json"')
    expect(html).toContain('<title>Shop API</title>')
  })

  it('uses `specURL` when set', async () => {
    const { swaggerUi } = await import('@/server/ui/swagger.js')
    expect(await renderHtml(swaggerUi({ specURL: '/static/openapi.json' }))).toContain('"/static/openapi.json"')
  })

  it('answers 403 when `access` denies the request', async () => {
    const { scalar } = await import('@/server/ui/scalar.js')
    const plugin = scalar({ access: ({ req }) => Boolean(req.user) })
    await expect(renderHtml(plugin)).rejects.toMatchObject({ status: 403 })
    expect(await renderHtml(plugin, uiRequest({}, { id: 1 }))).toContain('Scalar.createApiReference')
  })

  it('throws on the removed `specEndpoint`', async () => {
    const { scalar } = await import('@/server/ui/scalar.js')
    const plugin = scalar({ specEndpoint: '/x' } as never)
    expect(() => plugin({} as Config)).toThrow(`[${PLUGIN_NAME}] specEndpoint was renamed to specURL`)
  })

  it('passes Scalar configuration into the init call', async () => {
    const { scalar } = await import('@/server/ui/scalar.js')
    const html = await renderHtml(scalar({ configuration: { theme: 'purple', hideModels: true } }))
    expect(html).toContain('Scalar.createApiReference')
    expect(html).toContain('"theme":"purple"')
    expect(html).toContain('"hideModels":true')
  })

  it('passes Swagger UI configuration into `SwaggerUIBundle`', async () => {
    const { swaggerUi } = await import('@/server/ui/swagger.js')
    const html = await renderHtml(swaggerUi({ configuration: { docExpansion: 'none' } }))
    expect(html).toContain('SwaggerUIBundle')
    expect(html).toContain('"docExpansion":"none"')
  })

  it('escapes `<` in configuration so a string value cannot break out of the script', async () => {
    const { swaggerUi } = await import('@/server/ui/swagger.js')
    const html = await renderHtml(swaggerUi({ configuration: { x: '</script>' } }))
    expect(html).not.toContain('</script>"')
    expect(html).toContain('\\u003c/script\\u003e')
  })

  it('escapes `specURL` so it cannot break out of the script', async () => {
    const { scalar } = await import('@/server/ui/scalar.js')
    const html = await renderHtml(scalar({ specURL: '/spec.json</script><script>alert(1)</script>' }))
    expect(html).not.toContain('<script>alert(1)')
    expect(html).toContain('/spec.json\\u003c/script\\u003e')
  })

  it('loads pinned CDN assets with SRI, and a custom `cdnBase` without it', async () => {
    const { scalar } = await import('@/server/ui/scalar.js')
    const { swaggerUi } = await import('@/server/ui/swagger.js')
    const scalarHtml = await renderHtml(scalar())
    expect(scalarHtml).toMatch(
      /<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/@scalar\/api-reference@1\.72\.4\/dist\/browser\/standalone\.js" integrity="sha384-[\w+/=]+" crossorigin="anonymous">/,
    )
    const swaggerHtml = await renderHtml(swaggerUi())
    expect(swaggerHtml).toMatch(
      /swagger-ui-dist@5\.33\.1\/swagger-ui\.css" integrity="sha384-[\w+/=]+" crossorigin="anonymous"/,
    )
    expect(swaggerHtml).toMatch(
      /swagger-ui-dist@5\.33\.1\/swagger-ui-bundle\.js" integrity="sha384-[\w+/=]+" crossorigin="anonymous"/,
    )
    const custom = await renderHtml(swaggerUi({ cdnBase: '/static/swagger' }))
    expect(custom).toContain('<script src="/static/swagger/swagger-ui-bundle.js">')
    expect(custom).not.toContain('integrity=')
    expect(await renderHtml(scalar({ cdnBase: '/static/scalar.js' }))).not.toContain('integrity=')
  })

  it('forwards the docs page `?lang=` onto the spec URL it loads', async () => {
    const { scalar } = await import('@/server/ui/scalar.js')
    const { swaggerUi } = await import('@/server/ui/swagger.js')
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
      const { openapi } = await import('@/index.js')
      const plugin = openapi({ info: { title: 'T', version: '1.0.0' } })
      const applied = await plugin({
        i18n: {
          translations: {
            en: { [NS]: { paramDraft: 'MINE' }, general: { hello: 'world' } },
          },
        },
      } as unknown as Config)
      const translations = applied.i18n?.translations as unknown as Translations
      const enNs = translations.en?.[NS]
      expect(enNs?.paramDraft).not.toBe('MINE')
      expect(enNs?.paramSort).toContain('sort by')
      expect(translations.en?.general?.hello).toBe('world')
    })

    it('registers only the languages the config supports', async () => {
      const { openapi } = await import('@/index.js')
      const plugin = openapi({ info: { title: 'T', version: '1.0.0' } })
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
      const { resolveLocalizedStrings } = await import('@/server/spec/entitySchemas.js')
      const override = { description: { en: 'Phone', de: 'Telefon' } }
      expect(resolveLocalizedStrings(override, ctx)).toEqual({ description: 'Phone' })
      expect(resolveLocalizedStrings(override, deCtx)).toEqual({ description: 'Telefon' })
    })

    it('resolves locale maps under every whitelisted text key (description, title, summary)', async () => {
      const { resolveLocalizedStrings } = await import('@/server/spec/entitySchemas.js')
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
      const { resolveLocalizedStrings } = await import('@/server/spec/entitySchemas.js')
      const override = { type: 'string', example: 'x', description: 'A plain string' }
      expect(resolveLocalizedStrings(override, ctx)).toEqual(override)
    })

    it('resolves only the whitelisted text key in a mixed object', async () => {
      const { resolveLocalizedStrings } = await import('@/server/spec/entitySchemas.js')
      const override = { type: 'string', example: 'x', description: { en: 'A', de: 'B' } }
      expect(resolveLocalizedStrings(override, ctx)).toEqual({
        type: 'string',
        example: 'x',
        description: 'A',
      })
    })

    it('only resolves under whitelisted keys, never under arbitrary locale-named keys', async () => {
      const { resolveLocalizedStrings } = await import('@/server/spec/entitySchemas.js')
      const override = { example: { en: 'A', de: 'B' } }
      expect(resolveLocalizedStrings(override, ctx)).toEqual(override)
    })

    it('recurses into nested structures and resolves text keys at any depth', async () => {
      const { resolveLocalizedStrings } = await import('@/server/spec/entitySchemas.js')
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
      const { resolveLocalizedStrings } = await import('@/server/spec/entitySchemas.js')
      const description = ({ i18n }: { i18n: { language: string } }) =>
        i18n.language === 'de' ? 'Aus Funktion' : 'From function'
      expect(resolveLocalizedStrings({ description }, ctx)).toEqual({ description: 'From function' })
      expect(resolveLocalizedStrings({ description }, deCtx)).toEqual({ description: 'Aus Funktion' })
    })

    it('does not call a function under a non-whitelisted key', async () => {
      const { resolveLocalizedStrings } = await import('@/server/spec/entitySchemas.js')
      const fn = () => 'should not run'
      const override = { example: fn }
      expect(resolveLocalizedStrings(override, ctx)).toEqual(override)
    })

    it('drops the key when a text-key function throws', async () => {
      const { resolveLocalizedStrings } = await import('@/server/spec/entitySchemas.js')
      const description = () => {
        throw new Error('boom')
      }
      expect(resolveLocalizedStrings({ type: 'string', description }, ctx)).toEqual({ type: 'string' })
    })

    it('drops the key when a text-key function returns a non-string or empty string', async () => {
      const { resolveLocalizedStrings } = await import('@/server/spec/entitySchemas.js')
      const nonString = { description: () => 42 as unknown as string, type: 'string' }
      expect(resolveLocalizedStrings(nonString, ctx)).toEqual({ type: 'string' })
      const empty = { description: () => '', type: 'string' }
      expect(resolveLocalizedStrings(empty, ctx)).toEqual({ type: 'string' })
    })

    it('passes locale maps through untouched when no locales are configured', async () => {
      const { resolveLocalizedStrings } = await import('@/server/spec/entitySchemas.js')
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

describe('cli/generateSpec', () => {
  describe('generateSpecCommand', () => {
    it('accepts `lang`, `out`, and `server` and rejects unknown input', async () => {
      const { generateSpecCommand } = await import('@/cli/generateSpec.js')
      const validate = (value: unknown) => generateSpecCommand.input['~standard'].validate(value)
      const ok = await validate({ lang: 'de', out: 'spec.json', server: 'https://api.example.com' })
      expect(ok).toEqual({ value: { lang: 'de', out: 'spec.json', server: 'https://api.example.com' } })
      expect(await validate({})).toEqual({ value: {} })
      expect('issues' in (await validate({ nope: 1 }))).toBe(true)
    })
  })

  describe('auto-registering the CLI command', () => {
    it('adds a CLI command and stashes resolved options on `config.custom`', async () => {
      const { openapi } = await import('@/index.js')
      const incoming = {
        collections: [],
        cli: { commands: { seed: '/abs/seed.ts#seed' } },
        custom: { user: { keep: 'me' } },
      } as unknown as Config

      const result = await openapi({ info: { title: 'API', version: '1.0.0' } })(incoming)

      const stashed = result.custom?.[PLUGIN_NAME] as ReturnType<typeof resolveOptions>
      expect(stashed).toEqual(resolveOptions({ info: { title: 'API', version: '1.0.0' } }))
      expect(result.custom?.user).toEqual({ keep: 'me' })

      const commands = result.cli === false ? undefined : result.cli?.commands
      expect(commands?.['openapi:generate']).toMatch(/[\\/]cli[\\/]generateSpec\.(ts|js)#generateSpecCommand$/)
      expect(commands?.seed).toBe('/abs/seed.ts#seed')
    })

    it('keeps the CLI disabled when `cli` is false', async () => {
      const { openapi } = await import('@/index.js')
      const incoming = { collections: [], cli: false } as unknown as Config
      const result = await openapi({ info: { title: 'API', version: '1.0.0' } })(incoming)
      expect(result.cli).toBe(false)
    })

    it('skips registration when `enabled` is false', async () => {
      const { openapi } = await import('@/index.js')
      const incoming = { collections: [] } as unknown as Config
      const result = await openapi({
        info: { title: 'API', version: '1.0.0' },
        enabled: false,
      })(incoming)
      expect(result.cli).toBeUndefined()
      expect(result.custom?.[PLUGIN_NAME]).toBeUndefined()
    })

    it('throws on removed v3 keys, even when `enabled` is false', async () => {
      const { openapi } = await import('@/index.js')
      const info = { title: 'API', version: '1.0.0' }
      const cases: Array<[Record<string, unknown>, string]> = [
        [{ specEndpoint: '/x' }, 'specEndpoint was renamed to path'],
        [{ securityWhen: () => true }, 'securityWhen was removed, use security'],
        [
          { filters: { excludeWhen: () => true } },
          'filters.excludeWhen was removed, use a function in filters.excludeOperations',
        ],
        [{ interactiveAuth: { endpoint: '/login' } }, 'interactiveAuth.endpoint was renamed to interactiveAuth.path'],
        [{ metadata: { title: 'API', version: '1.0.0' } }, 'metadata was renamed to info'],
        [
          { extensions: [{ transform: (doc: unknown, _ctx: unknown) => doc }] },
          'extensions[].transform takes one object now, use ({ doc, payload }) instead of (doc, ctx)',
        ],
      ]
      for (const [extra, message] of cases) {
        expect(() => openapi({ info, ...extra } as never)({} as Config)).toThrow(`[${PLUGIN_NAME}] ${message}`)
        expect(() => openapi({ info, enabled: false, ...extra } as never)({} as Config)).toThrow(message)
      }
    })

    it('mounts the token endpoint at `interactiveAuth.path` against `interactiveAuth.collection`', async () => {
      const { openapi } = await import('@/index.js')
      const result = await openapi({
        info: { title: 'API', version: '1.0.0' },
        interactiveAuth: { path: '/login', collection: 'admins' },
      })({ collections: [{ slug: 'users', auth: true, fields: [] }] } as unknown as Config)
      const endpoint = (result.endpoints ?? []).find((e) => e.path === '/login')!
      let collection: unknown
      const exp = Math.floor(Date.now() / 1000) + 7200
      const form = new FormData()
      form.set('username', 'a@b.c')
      form.set('password', 'pw')
      const res = await endpoint.handler({
        formData: async () => form,
        payload: {
          login: async (args: { collection: string }) => {
            collection = args.collection
            return { token: 'jwt', exp }
          },
        },
      } as unknown as PayloadRequest)
      const body = await res.json()
      expect(collection).toBe('admins')
      expect(body.expires_in).toBeGreaterThan(7100)
      expect(body.expires_in).toBeLessThanOrEqual(7200)
    })

    it('registers the CLI command but mounts no endpoints when `serve` is false', async () => {
      const { openapi } = await import('@/index.js')
      const incoming = {
        collections: [],
        i18n: { supportedLanguages: { de: {} }, translations: {} },
      } as unknown as Config
      const result = await openapi({
        info: { title: 'API', version: '1.0.0' },
        serve: false,
        interactiveAuth: true,
      })(incoming)

      expect(result.cli === false ? undefined : result.cli?.commands?.['openapi:generate']).toBeDefined()
      expect(result.custom?.[PLUGIN_NAME]).toBeDefined()
      const translations = result.i18n?.translations as unknown as Record<string, Record<string, unknown>>
      expect(translations.de?.[PLUGIN_NAME]).toBeDefined()
      expect(result.endpoints ?? []).toEqual([])
    })

    it('throws at boot on the removed true/false entity security, even when `enabled` is false', async () => {
      const { openapi } = await import('@/index.js')
      const info = { title: 'API', version: '1.0.0' }
      const config = {
        collections: [{ slug: 'posts', fields: [], custom: { openapi: { security: true } } }],
      } as unknown as Config
      const message = `custom.openapi.security true/false on "posts" was removed, use 'public' or 'secured'`
      expect(() => openapi({ info })(config)).toThrow(message)
      expect(() => openapi({ info, enabled: false })(config)).toThrow(message)
      const globals = { globals: [{ slug: 'site', fields: [], custom: { openapi: { security: { update: false } } } }] }
      expect(() => openapi({ info })(globals as unknown as Config)).toThrow('on "site" was removed')
    })

    it('mounts the spec endpoint by default (`serve` defaults to true)', async () => {
      const { openapi } = await import('@/index.js')
      const incoming = { collections: [] } as unknown as Config
      const result = await openapi({ info: { title: 'API', version: '1.0.0' } })(incoming)
      const paths = (result.endpoints ?? []).map((e) => e.path)
      expect(paths).toContain('/openapi.json')
    })
  })
})

import { getPayload } from 'payload'
import type { Access, SanitizedCollectionConfig } from 'payload'
import type {
  Document,
  ParameterObject,
  ReferenceObject,
  RequestBodyObject,
  ResponseObject,
  SchemaObject,
  TagObject,
} from '@scalar/openapi-types/3.2'
import { beforeAll, describe, expect, it } from 'vitest'

import { buildDocument } from '../src/spec/buildDocument.js'
import { toOpenApi30, toOpenApi31 } from '../src/spec/downconvert.js'
import { specHandler } from '../src/endpoints/spec.js'
import { resolveOptions } from '../src/options.js'
import type { BuildContext, FilterOptions } from '../src/types.js'
import { i18nStub } from './helpers.js'
import configPromise from './payload.config.js'

let doc: Document
let nestedDoc: Document
let idType: 'string' | 'integer'

beforeAll(async () => {
  process.env.USE_MEMORY_DB = '1'
  const config = await configPromise
  const payload = await getPayload({ config })
  idType = payload.db.defaultIDType === 'number' ? 'integer' : 'string'

  const ctx: BuildContext = {
    defaultIDType: payload.db.defaultIDType,
    locales: payload.config.localization === false ? [] : payload.config.localization.locales.map((l) => l.code),
    apiRoute: '/api',
    docLanguages: Object.keys(payload.config.i18n?.supportedLanguages ?? { en: true }),
    i18n: i18nStub,
  }
  const collections = Object.values(payload.collections).map((c) => c.config)
  doc = await buildDocument({
    options: resolveOptions({ metadata: { title: 'T', version: '1.0.0' } }),
    servers: [{ url: 'http://localhost' }],
    collections,
    globals: payload.config.globals,
    config: payload.config,
    ctx,
    logger: payload.logger,
  })
  nestedDoc = await buildDocument({
    options: resolveOptions({ metadata: { title: 'T', version: '1.0.0' }, nestedTags: true }),
    servers: [{ url: 'http://localhost' }],
    collections,
    globals: payload.config.globals,
    config: payload.config,
    ctx,
    logger: payload.logger,
  })
}, 60_000)

const schema = (name: string) => doc.components?.schemas?.[name] as SchemaObject

describe('generated document', () => {
  describe('document validity', () => {
    it.each([
      ['3.2', (d: typeof doc) => d],
      ['3.1', toOpenApi31],
      ['3.0', toOpenApi30],
    ])('validates as a well-formed OpenAPI %s document', async (_version, convert) => {
      const { Validator } = await import('@seriousme/openapi-schema-validator')
      const result = await new Validator().validate(convert(structuredClone(doc)))
      expect(result.valid).toBe(true)
    })

    it('leaves no broken `$ref` to a lowercased slug', () => {
      const json = JSON.stringify(doc)
      expect(json).not.toContain('#/components/schemas/users"')
      expect(json).not.toContain('#/components/schemas/tags"')
    })

    it('registers `SupportedTimezones` and leaves no broken `$ref`', () => {
      expect(schema('SupportedTimezones')).toBeDefined()
      const json = JSON.stringify(doc)
      const refs = [...new Set(json.match(/#\/components\/schemas\/[A-Za-z]+/g) ?? [])]
      const missing = refs.filter((r) => !doc.components?.schemas?.[r.split('/').pop()!])
      expect(missing).toEqual([])
    })

    it('adds a localization note to `info.description` when locales are configured', async () => {
      const payload = await getPayload({ config: await configPromise })
      const localized = await buildDocument({
        options: resolveOptions({ metadata: { title: 'T', version: '1.0.0', description: 'Base.' } }),
        servers: [{ url: 'http://localhost' }],
        collections: [],
        globals: [],
        config: payload.config,
        ctx: { defaultIDType: 'text', locales: ['en', 'de'], apiRoute: '/api', docLanguages: ['en'], i18n: i18nStub },
        logger: payload.logger,
      })
      expect(localized.info.description).toContain('Base.')
      expect(localized.info.description).toContain('locale=all')
      expect(localized.info.description).toContain('`en`')

      const noLocale = await buildDocument({
        options: resolveOptions({ metadata: { title: 'T', version: '1.0.0' } }),
        servers: [{ url: 'http://localhost' }],
        collections: [],
        globals: [],
        config: payload.config,
        ctx: { defaultIDType: 'text', locales: [], apiRoute: '/api', docLanguages: ['en'], i18n: i18nStub },
        logger: payload.logger,
      })
      expect(noLocale.info.description ?? '').not.toContain('locale=all')
    })
  })

  describe('entity schemas', () => {
    it('registers read, create, update, and list schemas per collection', () => {
      const names = Object.keys(doc.components?.schemas ?? {})
      expect(names).toEqual(
        expect.arrayContaining([
          'Posts',
          'PostsCreate',
          'PostsUpdate',
          'PostsList',
          'Users',
          'GlobalSettings',
          'GlobalSettingsUpdate',
        ]),
      )
    })

    describe('read', () => {
      it('hides auth-managed and internal fields from the `Users` read schema', () => {
        const props = schema('Users').properties ?? {}
        expect(props.salt).toBeUndefined()
        expect(props.hash).toBeUndefined()
        expect(props.password).toBeUndefined()
        expect(props.sessions).toBeUndefined()
        expect(props.collection).toBeUndefined()
      })

      it('shows Payload-managed upload fields on the `Media` read schema', () => {
        const props = schema('Media').properties ?? {}
        expect(props.filename).toBeDefined()
        expect(props.mimeType).toBeDefined()
        expect(props.filesize).toBeDefined()
        expect(props.url).toBeDefined()
      })
    })

    describe('create', () => {
      it('keeps `password` on the auth create schema and marks it required', () => {
        const create = schema('UsersCreate')
        expect((create.properties?.password as SchemaObject)?.type).toBe('string')
        expect(create.required ?? []).toContain('password')
      })

      it('makes `id`, `createdAt`, and `updatedAt` optional on create', () => {
        const create = schema('PostsCreate')
        expect(create.required ?? []).not.toContain('id')
        expect(create.required ?? []).not.toContain('createdAt')
        expect(create.required ?? []).toContain('title')
      })

      it('writes relationships as ids in create bodies', () => {
        const author = schema('PostsCreate').properties?.author as SchemaObject
        expect(author.type).toBe(idType)
        const tags = schema('PostsCreate').properties?.tags as SchemaObject
        expect(tags.type).toBe('array')
        expect((tags.items as SchemaObject).type).toBe(idType)
      })

      it('writes an upload field as an id in create bodies', () => {
        const featured = schema('PostsCreate').properties?.featuredImage as SchemaObject
        expect(featured.type).toBe(idType)
      })
    })

    describe('update', () => {
      it('omits `id` from update bodies', () => {
        expect(schema('PostsUpdate').properties?.id).toBeUndefined()
      })

      it('makes every field optional on update', () => {
        expect(schema('PostsUpdate').required).toBeUndefined()
      })
    })
  })

  describe('fields', () => {
    it('applies `field.custom.openapi` to the phone property', () => {
      const phone = schema('Posts').properties?.phone as SchemaObject
      expect(phone.format).toBe('phone')
      expect(phone.example).toBe('+14155552671')
      expect(phone.pattern).toBeDefined()
      expect(phone.description).toBe('E.164 formatted phone number')
    })

    it('marks a field deprecated from `custom.openapi.deprecated`', () => {
      const legacy = schema('Posts').properties?.legacyField as SchemaObject
      expect(legacy.deprecated).toBe(true)
    })

    it('sets a `blockType` discriminator on block unions', () => {
      const callouts = schema('Posts').properties?.callouts as SchemaObject
      const refItems = callouts.items as SchemaObject
      expect(refItems.oneOf).toBeDefined()
      expect(refItems.discriminator?.propertyName).toBe('blockType')

      const layout = schema('Posts').properties?.layout as SchemaObject
      const inlineItems = layout.items as SchemaObject
      expect(inlineItems.oneOf).toBeDefined()
      expect(inlineItems.discriminator?.propertyName).toBe('blockType')
    })

    it('does not add a discriminator to the localized `oneOf`', () => {
      const title = schema('Posts').properties?.title as SchemaObject
      expect(title.oneOf).toBeDefined()
      expect(title.discriminator).toBeUndefined()
    })

    it('registers a component schema for `blockReferences` blocks with a `blockType` discriminator', () => {
      const cta = schema('BlockCallToAction')
      expect(cta).toBeDefined()
      const blockType = cta.properties?.blockType as SchemaObject
      expect(blockType.enum).toEqual(['callToAction'])
      expect(cta.required).toContain('blockType')
    })

    it('embeds inline block definitions inside the blocks field schema', () => {
      const layout = schema('Posts').properties?.layout as SchemaObject
      expect(layout.type).toEqual(['array', 'null'])
      expect(schema('BlockCallToAction')).toBeDefined()
      expect(schema('BlockMedia')).toBeDefined()
    })

    it('models a localized field as a single value or a per-locale object (#69)', () => {
      const title = schema('Posts').properties?.title as SchemaObject
      expect(title.oneOf).toHaveLength(2)
      const perLocale = title.oneOf?.[1] as SchemaObject
      expect(perLocale.properties?.en).toBeDefined()
      expect(perLocale.properties?.de).toBeDefined()
    })

    it('keeps localized write bodies as single values, with no per-locale object', () => {
      const createTitle = schema('PostsCreate').properties?.title as SchemaObject
      expect(createTitle.oneOf).toBeUndefined()
      expect(createTitle.type).toBe('string')
    })

    it('handles timezone-enabled date fields without crashing (#34)', () => {
      expect(schema('Posts').properties?.publishedAt).toBeDefined()
    })
  })

  describe('uploads', () => {
    it('offers both a multipart body (with binary file) and a json body (no file) for upload collections', () => {
      const body = doc.paths?.['/api/media']?.post?.requestBody as RequestBodyObject
      expect((body.content['application/json'].schema as ReferenceObject).$ref).toBe('#/components/schemas/MediaCreate')
      const multipart = body.content['multipart/form-data']
      expect(multipart).toBeDefined()
      const mpSchema = multipart.schema as SchemaObject
      expect(((mpSchema.properties ?? {}).file as SchemaObject).format).toBe('binary')
      const payloadPart = mpSchema.properties?._payload as { allOf?: ReferenceObject[] }
      expect(payloadPart.allOf?.[0]?.$ref).toBe('#/components/schemas/MediaCreate')
      expect(mpSchema.required).toContain('file')
    })

    it('makes the file optional on upload update, alongside the fields', () => {
      const body = doc.paths?.['/api/media/{id}']?.patch?.requestBody as RequestBodyObject
      const mpSchema = body.content['multipart/form-data']?.schema as SchemaObject
      expect(mpSchema.required).toBeUndefined()
      expect(body.required).toBe(false)
    })
  })

  describe('query params', () => {
    it('exposes a `QueryOperations` schema with per-field operators and recursive `and`/`or`', () => {
      const q = schema('PostsQueryOperations')
      expect(q).toBeDefined()
      expect(q.properties?.title).toBeDefined()
      expect(q.properties?.and).toBeDefined()
      expect(q.properties?.or).toBeDefined()
      const params = (doc.paths?.['/api/posts']?.get?.parameters ?? []) as ParameterObject[]
      const whereParam = params.find((p) => p.name === 'where')
      expect(whereParam).toBeDefined()
      expect(whereParam?.content?.['application/json']?.schema).toEqual({
        $ref: '#/components/schemas/PostsQueryOperations',
      })
    })

    it('describes the `where` param with a content schema so the UI shows one row', () => {
      const params = (doc.paths['/api/posts']?.get?.parameters ?? []) as ParameterObject[]
      const where = params.find((p) => p.name === 'where')
      expect(where).toBeDefined()
      expect(where?.content?.['application/json']?.schema).toEqual({
        $ref: '#/components/schemas/PostsQueryOperations',
      })
      expect(where?.style).toBeUndefined()
      expect(schema('PostsQueryOperations').description).toContain('where[field]')
    })

    it('builds a `Select` schema with the entity fields as boolean keys', () => {
      const sel = schema('PostsSelect')
      expect(sel.properties?.title).toEqual({ type: 'boolean' })
      expect(sel.properties?.author).toEqual({ type: 'boolean' })
    })

    it('builds a `Populate` schema keyed by related collections', () => {
      const pop = schema('PostsPopulate')
      expect(pop.properties?.users).toBeDefined()
      expect(pop.properties?.media).toBeDefined()
    })

    it('builds a `Joins` schema for collections with join fields', () => {
      const joins = schema('UsersJoins')
      expect(joins).toBeDefined()
      const posts = joins.properties?.posts as SchemaObject
      expect(posts.properties?.limit).toEqual({ type: 'integer' })
      expect(posts.properties?.where).toBeDefined()
    })

    it('documents the query params that write operations read', () => {
      const names = (op?: { parameters?: unknown[] }) =>
        ((op?.parameters ?? []) as ParameterObject[]).map((p) => p.name)
      const create = names(doc.paths['/api/posts']?.post)
      expect(create).toEqual(expect.arrayContaining(['depth', 'locale', 'select', 'populate', 'draft']))
      expect(create).not.toContain('trash')
      expect(names(doc.paths['/api/posts/{id}']?.patch)).toEqual(expect.arrayContaining(['depth', 'draft', 'trash']))
      expect(names(doc.paths['/api/posts/{id}']?.delete)).toEqual(expect.arrayContaining(['depth', 'trash']))
      expect(names(doc.paths['/api/posts/{id}']?.delete)).not.toContain('draft')
      expect(names(doc.paths['/api/posts']?.patch)).toEqual(
        expect.arrayContaining(['where', 'limit', 'sort', 'depth', 'draft']),
      )
      expect(names(doc.paths['/api/posts']?.delete)).not.toContain('limit')
      expect(names(doc.paths['/api/posts']?.delete)).not.toContain('sort')
      expect(names(doc.paths['/api/globals/settings']?.post)).toEqual(expect.arrayContaining(['depth', 'draft']))
    })

    it('documents the draft, locale and lock params only where Payload reads them', () => {
      const names = (op?: { parameters?: unknown[] }) =>
        ((op?.parameters ?? []) as ParameterObject[]).map((p) => p.name)
      const posts = doc.paths['/api/posts']
      const post = doc.paths['/api/posts/{id}']
      expect(names(posts?.post)).toContain('publishAllLocales')
      expect(names(posts?.post)).not.toContain('unpublishAllLocales')
      expect(names(posts?.post)).not.toContain('autosave')
      expect(names(posts?.patch)).toEqual(
        expect.arrayContaining(['publishAllLocales', 'unpublishAllLocales', 'overrideLock']),
      )
      expect(names(post?.patch)).toEqual(
        expect.arrayContaining(['publishAllLocales', 'unpublishAllLocales', 'overrideLock']),
      )
      expect(names(post?.delete)).toContain('overrideLock')
      expect(names(post?.delete)).not.toContain('publishAllLocales')
      expect(names(doc.paths['/api/tags/{id}']?.patch)).not.toContain('overrideLock')
      expect(names(doc.paths['/api/tags/{id}']?.delete)).not.toContain('overrideLock')

      const settings = names(doc.paths['/api/globals/settings']?.post)
      expect(settings).toContain('autosave')
      expect(settings).not.toContain('publishAllLocales')
      expect(settings).not.toContain('overrideLock')

      const duplicate = (doc.paths['/api/posts/{id}/duplicate']?.post?.parameters ?? []) as ParameterObject[]
      expect(duplicate.find((p) => p.name === 'selectedLocales[]')).toMatchObject({
        style: 'form',
        explode: true,
        schema: { type: 'array', items: { type: 'string', enum: ['en', 'de', 'fr'] } },
      })
      expect(names(doc.paths['/api/posts/{id}/duplicate']?.post)).not.toContain('publishAllLocales')
    })
  })

  describe('paths/auth', () => {
    it('documents the auth endpoints for auth collections', () => {
      expect(doc.paths['/api/users/login']?.post).toBeDefined()
      expect(doc.paths['/api/users/logout']?.post).toBeDefined()
      expect(doc.paths['/api/users/me']?.get).toBeDefined()
      expect(doc.paths['/api/users/refresh-token']?.post).toBeDefined()
      expect(doc.paths['/api/users/forgot-password']?.post).toBeDefined()
      expect(doc.paths['/api/users/reset-password']?.post).toBeDefined()
      expect(doc.paths['/api/users/verify/{token}']).toBeUndefined()
    })

    it('omits the admin and bootstrap auth endpoints by default', () => {
      expect(doc.paths['/api/users/first-register']).toBeUndefined()
      expect(doc.paths['/api/users/init']).toBeUndefined()
      expect(doc.paths['/api/users/access']).toBeUndefined()
    })

    it('documents the admin and bootstrap auth endpoints when `adminAuthEndpoints` is on', async () => {
      const payload = await getPayload({ config: await configPromise })
      const adminDoc = await buildDocument({
        options: resolveOptions({
          metadata: { title: 'T', version: '1.0.0' },
          filters: { includeAdminAuth: true },
        }),
        servers: [{ url: 'http://localhost' }],
        collections: Object.values(payload.collections).map((c) => c.config),
        globals: [],
        config: payload.config,
        ctx: { defaultIDType: 'text', locales: [], apiRoute: '/api', docLanguages: ['en'], i18n: i18nStub },
        logger: payload.logger,
      })
      expect(adminDoc.paths['/api/users/first-register']?.post).toBeDefined()
      expect(adminDoc.paths['/api/users/init']?.get).toBeDefined()
      expect(adminDoc.paths['/api/users/access']?.get).toBeDefined()
    })

    it('does not document auth endpoints for non-auth collections', () => {
      expect(doc.paths['/api/posts/login']).toBeUndefined()
    })
  })

  describe('paths/versions', () => {
    it('documents the version endpoints for versioned collections', () => {
      expect(doc.paths['/api/posts/versions']?.get).toBeDefined()
      expect(doc.paths['/api/posts/versions/{id}']?.get).toBeDefined()
      expect(doc.paths['/api/posts/versions/{id}']?.post).toBeDefined()
      const version = schema('PostsVersion')
      expect(version.properties?.version).toEqual({ $ref: '#/components/schemas/Posts' })
    })

    it('does not document version endpoints for non-versioned collections', () => {
      expect(doc.paths['/api/users/versions']).toBeUndefined()
    })

    it('documents the version endpoints for versioned globals', () => {
      expect(doc.paths['/api/globals/settings/versions']?.get).toBeDefined()
      expect(doc.paths['/api/globals/settings/versions/{id}']?.get).toBeDefined()
      expect(doc.paths['/api/globals/settings/versions/{id}']?.post).toBeDefined()
      expect(schema('GlobalSettingsVersion')).toBeDefined()
    })

    it('describes a restored global as `{ doc, message }` and a restored document as the document plus `message`', () => {
      const body = (path: string) => {
        const ok = doc.paths[path]?.post?.responses?.['200'] as ResponseObject
        return ok.content?.['application/json']?.schema as SchemaObject
      }
      expect(body('/api/globals/settings/versions/{id}').properties).toEqual({
        message: { type: 'string' },
        doc: { $ref: '#/components/schemas/GlobalSettings' },
      })
      expect(body('/api/posts/versions/{id}').allOf?.[0]).toEqual({ $ref: '#/components/schemas/Posts' })
    })
  })

  describe('responses', () => {
    it('describes create as 201 and the global update as `{ message, result }`', () => {
      const create = doc.paths['/api/posts']?.post?.responses ?? {}
      expect(create['200']).toBeUndefined()
      const created = (create['201'] as ResponseObject).content?.['application/json']?.schema as SchemaObject
      expect(created.properties?.doc).toEqual({ $ref: '#/components/schemas/Posts' })

      const update = doc.paths['/api/globals/settings']?.post?.responses?.['200'] as ResponseObject
      const updated = update.content?.['application/json']?.schema as SchemaObject
      expect(updated.properties).toEqual({
        message: { type: 'string' },
        result: { $ref: '#/components/schemas/GlobalSettings' },
      })
      const read = doc.paths['/api/globals/settings']?.get?.responses?.['200'] as ResponseObject
      expect(read.content?.['application/json']?.schema).toEqual({ $ref: '#/components/schemas/GlobalSettings' })
    })
  })

  describe('paths/jobs', () => {
    it('documents the jobs `run` and `handle-schedules` endpoints when jobs are configured (#43)', () => {
      const run = doc.paths['/api/payload-jobs/run']?.get
      expect(run).toBeDefined()
      const runParams = ((run?.parameters ?? []) as ParameterObject[]).map((p) => p.name)
      expect(runParams).toEqual(expect.arrayContaining(['queue', 'allQueues', 'limit', 'disableScheduling', 'silent']))
      expect(doc.paths['/api/payload-jobs/handle-schedules']?.get).toBeDefined()
      const queue = ((run?.parameters ?? []) as ParameterObject[]).find((p) => p.name === 'queue')
      expect(queue).toBeDefined()
      const queueSchema = queue?.schema as SchemaObject | undefined
      expect(queueSchema?.enum).toEqual(expect.arrayContaining(['default', 'nightly']))
    })
  })

  describe('bulk operations', () => {
    it('documents bulk update, bulk delete, count, and duplicate (#50)', () => {
      expect(doc.paths['/api/posts']?.patch).toBeDefined()
      expect(doc.paths['/api/posts']?.delete).toBeDefined()
      expect(doc.paths['/api/posts/count']?.get).toBeDefined()
      expect(doc.paths['/api/posts/{id}/duplicate']?.post).toBeDefined()
      const count = doc.paths['/api/posts/count']?.get?.responses['200'] as ResponseObject
      const countSchema = count.content?.['application/json']?.schema as SchemaObject
      expect(countSchema.properties?.totalDocs).toEqual({ type: 'integer' })
    })
  })

  describe('tags', () => {
    it('emits a flat list of entity tags with descriptions by default', () => {
      const tags: TagObject[] = doc.tags ?? []
      const byName = Object.fromEntries(tags.map((tag) => [tag.name, tag]))

      expect(byName['Posts']?.description).toBe('Blog posts and articles')
      expect(byName['Posts']?.kind).toBeUndefined()
      expect(byName['Posts']?.parent).toBeUndefined()

      expect(byName['Collections']).toBeUndefined()
      expect(byName['Globals']).toBeUndefined()
      expect(byName['System']).toBeUndefined()
      expect(byName['Users Auth']).toBeUndefined()
      expect(byName['Posts Versions']).toBeUndefined()
    })

    it('emits a 3.2 nested tag tree with entity descriptions when `nestedTags` is on', () => {
      const tags: TagObject[] = nestedDoc.tags ?? []
      const byName = Object.fromEntries(tags.map((tag) => [tag.name, tag]))

      expect(byName['Collections']?.kind).toBe('nav')
      expect(byName['Globals']?.kind).toBe('nav')

      expect(byName['Posts']?.parent).toBe('Collections')
      expect(byName['Posts']?.description).toBe('Blog posts and articles')
      expect(byName['GlobalSettings']?.parent).toBe('Globals')

      expect(byName['Posts Versions']?.parent).toBe('Posts')
    })

    it('validates the nested-tag document as well-formed OpenAPI', async () => {
      const { Validator } = await import('@seriousme/openapi-schema-validator')
      const result = await new Validator().validate(structuredClone(nestedDoc))
      expect(result.valid).toBe(true)
    })

    it('tags auth operations with the entity name by default and the Auth tag when nested', () => {
      expect(doc.paths['/api/users/login']?.post?.tags).toContain('Users')
      expect(doc.paths['/api/users/login']?.post?.tags).not.toContain('Users Auth')
      expect(nestedDoc.paths['/api/users/login']?.post?.tags).toContain('Users Auth')
    })

    it('tags version operations with the entity name by default and the Versions tag when nested', () => {
      expect(doc.paths['/api/posts/versions']?.get?.tags).toContain('Posts')
      expect(doc.paths['/api/posts/versions']?.get?.tags).not.toContain('Posts Versions')
      expect(nestedDoc.paths['/api/posts/versions']?.get?.tags).toContain('Posts Versions')
    })
  })

  describe('doc languages', () => {
    it('advertises supported languages in the description and `x-doc-languages`', () => {
      expect((doc as Record<string, unknown>)['x-doc-languages']).toEqual(['en', 'de', 'fr'])
      expect(doc.info.description).toContain('This documentation is available in')
      expect(doc.info.description).toContain('`de`')
      expect(doc.info.description).toContain('?lang=<code>')
    })

    const listDesc = (served: Document): string | undefined => {
      const ok = served.paths['/api/posts']?.get?.responses['200'] as ResponseObject | undefined
      return ok?.description
    }
    const serveSpec = async (url: string): Promise<Document> => {
      const payload = await getPayload({ config: await configPromise })
      const handler = specHandler(resolveOptions({ metadata: { title: 'T', version: '1.0.0' }, cache: false }))
      const res = await handler({ url, payload, headers: new Headers(), i18n: i18nStub } as never)
      return (await res.json()) as Document
    }

    it('serves the spec in the language requested via `?lang=`, overriding the request i18n', async () => {
      const enDesc = listDesc(await serveSpec('http://x/api/openapi.json'))
      const deDesc = listDesc(await serveSpec('http://x/api/openapi.json?lang=de'))
      expect(enDesc).toBe('Paginated list of documents')
      expect(deDesc).not.toBe(enDesc)
      expect(deDesc).toBeTruthy()
    })

    it('ignores an unsupported `?lang=` and falls back', async () => {
      expect(listDesc(await serveSpec('http://x/api/openapi.json?lang=zz'))).toBe('Paginated list of documents')
    })
  })

  describe('error responses', () => {
    it('registers a shared `ErrorResponse` schema', () => {
      const err = schema('ErrorResponse')
      expect(err.required).toContain('errors')
      const items = ((err.properties ?? {}).errors as SchemaObject).items as SchemaObject
      expect(items.properties?.message).toBeDefined()
    })

    it('documents per-operation error responses, not just 200', () => {
      const list = doc.paths['/api/posts']?.get?.responses ?? {}
      expect(Object.keys(list)).toEqual(expect.arrayContaining(['200', '400', '403', '500']))
      const findById = doc.paths['/api/posts/{id}']?.get?.responses ?? {}
      expect(findById['404']).toBeDefined()
      expect(findById['400']).toBeUndefined()
      const login = doc.paths['/api/users/login']?.post?.responses ?? {}
      expect(login['401']).toBeDefined()
    })

    it('points error responses at the `ErrorResponse` schema', () => {
      const r404 = doc.paths['/api/posts/{id}']?.get?.responses['404'] as ResponseObject
      expect(r404.content?.['application/json']?.schema).toEqual({
        $ref: '#/components/schemas/ErrorResponse',
      })
    })
  })
})

describe('filters', () => {
  const build = async (filters: Partial<FilterOptions>): Promise<Document> => {
    const payload = await getPayload({ config: await configPromise })
    return buildDocument({
      options: resolveOptions({ metadata: { title: 'T', version: '1.0.0' }, filters }),
      servers: [{ url: 'http://localhost' }],
      collections: Object.values(payload.collections).map((c) => c.config),
      globals: payload.config.globals,
      config: payload.config,
      ctx: { defaultIDType: 'text', locales: [], apiRoute: '/api', docLanguages: ['en'], i18n: i18nStub },
      logger: payload.logger,
    })
  }

  it('excludes an entity entirely, both its paths and schemas', async () => {
    const d = await build({ exclude: ['tags'] })
    expect(d.paths['/api/tags']).toBeUndefined()
    expect(d.components?.schemas?.Tags).toBeUndefined()
  })

  it('drops DELETE across all collections via `excludeOperations`', async () => {
    const d = await build({ excludeOperations: [{ method: 'delete' }] })
    expect(d.paths['/api/posts']?.delete).toBeUndefined()
    expect(d.paths['/api/posts/{id}']?.delete).toBeUndefined()
    expect(d.paths['/api/posts']?.get).toBeDefined()
  })

  it('drops POST for a single collection only', async () => {
    const d = await build({ excludeOperations: [{ method: 'post', slug: 'posts' }] })
    expect(d.paths['/api/posts']?.post).toBeUndefined()
    expect(d.paths['/api/tags']?.post).toBeDefined()
  })

  it('turns off the jobs and version endpoints by flag', async () => {
    const d = await build({ includeJobs: false, includeVersions: false })
    expect(d.paths['/api/payload-jobs/run']).toBeUndefined()
    expect(d.paths['/api/globals/settings/versions']).toBeUndefined()
  })
})

describe('security marking', () => {
  const secured = [{ PayloadToken: [] }]

  const buildWithReadAccess = async (
    read: Access,
    options = resolveOptions({ metadata: { title: 'T', version: '1.0.0' } }),
  ): Promise<Document> => {
    const payload = await getPayload({ config: await configPromise })
    const base = Object.values(payload.collections).find((c) => c.config.slug === 'tags')!.config
    const collection = { ...base, access: { ...base.access, read } } as SanitizedCollectionConfig
    return buildDocument({
      options,
      servers: [{ url: 'http://localhost' }],
      collections: [collection],
      globals: [],
      config: payload.config,
      ctx: { defaultIDType: 'text', locales: [], apiRoute: '/api', docLanguages: ['en'], i18n: i18nStub },
      logger: payload.logger,
    })
  }

  it('marks a collection whose read access hits the DB as secured', async () => {
    const dbRead: Access = async ({ req }) => {
      const { totalDocs } = await req.payload.count({ collection: 'tags' })
      return totalDocs >= 0
    }
    const d = await buildWithReadAccess(dbRead)
    expect(d.paths?.['/api/tags']?.get?.security).toEqual(secured)
  })

  it('marks a plain public read function as public, leaving other operations secured', async () => {
    const d = await buildWithReadAccess(() => true)
    expect(d.paths?.['/api/tags']?.get?.security).toBeUndefined()
    expect(d.paths?.['/api/tags']?.post?.security).toEqual(secured)
    expect(d.paths?.['/api/tags/{id}']?.delete?.security).toEqual(secured)
  })

  it('lets securityWhen override the marking per operation in both directions', async () => {
    const options = resolveOptions({
      metadata: { title: 'T', version: '1.0.0' },
      securityWhen: ({ method }) => {
        if (method === 'get') return false
        if (method === 'post') return true
        return undefined
      },
    })
    const d = await buildWithReadAccess(() => true, options)
    expect(d.paths?.['/api/tags']?.get?.security).toEqual(secured)
    expect(d.paths?.['/api/tags']?.post?.security).toBeUndefined()
    expect(d.paths?.['/api/tags/{id}']?.delete?.security).toEqual(secured)
  })
})

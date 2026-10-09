import type { Document, MediaTypeObject, ReferenceObject, TagObject } from '@scalar/openapi-types/3.2'
import { getPayload } from 'payload'
import type { Access, SanitizedCollectionConfig } from 'payload'
import { beforeAll, describe, expect, it } from 'vitest'

import { specHandler } from '@/server/endpoints/spec.js'
import { resolveOptions } from '@/server/options/resolveOptions.js'
import { buildDocument } from '@/server/spec/buildDocument.js'
import { toOpenApi30, toOpenApi31 } from '@/server/spec/downconvert.js'
import type { BuildContext, FilterOptions, Schema } from '@/shared/types/index.js'

import { i18nStub } from '../helpers/context.js'
import configPromise from '../payload.config.js'

type Doc = Document & { paths: NonNullable<Document['paths']> }
type Media = Record<string, MediaTypeObject>
type Body = { required?: boolean; content: Media }
type Resp = { description?: string; content?: Media }
type Param = { name: string; style?: string; content?: Media; schema?: Schema }

const buildDoc = (args: Parameters<typeof buildDocument>[0]) => buildDocument(args) as Promise<Doc>

let doc: Doc
let nestedDoc: Doc
let adminDoc: Doc
let idType: 'string' | 'number'

beforeAll(async () => {
  const config = await configPromise
  const payload = await getPayload({ config })
  idType = payload.db.defaultIDType === 'number' ? 'number' : 'string'

  const ctx: BuildContext = {
    defaultIDType: payload.db.defaultIDType,
    locales: payload.config.localization === false ? [] : payload.config.localization.locales.map((l) => l.code),
    apiRoute: '/api',
    docLanguages: Object.keys(payload.config.i18n?.supportedLanguages ?? { en: true }),
    i18n: i18nStub,
  }
  const collections = Object.values(payload.collections).map((c) => c.config)
  doc = await buildDoc({
    options: resolveOptions({ info: { title: 'T', version: '1.0.0' } }),
    servers: [{ url: 'http://localhost' }],
    collections,
    globals: payload.config.globals,
    config: payload.config,
    ctx,
    payload,
  })
  adminDoc = await buildDoc({
    options: resolveOptions({ info: { title: 'T', version: '1.0.0' }, filters: { includeAdminAuth: true } }),
    servers: [{ url: 'http://localhost' }],
    collections,
    globals: payload.config.globals,
    config: payload.config,
    ctx,
    payload,
  })
  nestedDoc = await buildDoc({
    options: resolveOptions({ info: { title: 'T', version: '1.0.0' }, nestedTags: true }),
    servers: [{ url: 'http://localhost' }],
    collections,
    globals: payload.config.globals,
    config: payload.config,
    ctx,
    payload,
  })
}, 60_000)

const schema = (name: string) => doc.components?.schemas?.[name] as Schema

describe('generated document', () => {
  describe('document validity', () => {
    it.each([
      ['3.2', (d: Document) => d],
      ['3.1', toOpenApi31],
      ['3.0', toOpenApi30],
    ])('validates as a well-formed OpenAPI %s document', async (_version, convert) => {
      const { Validator } = await import('@seriousme/openapi-schema-validator')
      for (const d of [doc, nestedDoc, adminDoc]) {
        const result = await new Validator().validate(convert(structuredClone(d)))
        expect(result.errors).toBeUndefined()
        expect(result.valid).toBe(true)
      }
    })

    it('drops empty `required` arrays in 3.0, which needs at least one item', () => {
      expect(JSON.stringify(toOpenApi30(structuredClone(doc)))).not.toContain('"required":[]')
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
      const localized = await buildDoc({
        options: resolveOptions({ info: { title: 'T', version: '1.0.0', description: 'Base.' } }),
        servers: [{ url: 'http://localhost' }],
        collections: [],
        globals: [],
        config: payload.config,
        ctx: { defaultIDType: 'text', locales: ['en', 'de'], apiRoute: '/api', docLanguages: ['en'], i18n: i18nStub },
        payload,
      })
      expect(localized.info.description).toContain('Base.')
      expect(localized.info.description).toContain('locale=all')
      expect(localized.info.description).toContain('`en`')

      const noLocale = await buildDoc({
        options: resolveOptions({ info: { title: 'T', version: '1.0.0' } }),
        servers: [{ url: 'http://localhost' }],
        collections: [],
        globals: [],
        config: payload.config,
        ctx: { defaultIDType: 'text', locales: [], apiRoute: '/api', docLanguages: ['en'], i18n: i18nStub },
        payload,
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
        expect((create.properties?.password as Schema)?.type).toBe('string')
        expect(create.required ?? []).toContain('password')
      })

      it('makes `id`, `createdAt`, and `updatedAt` optional on create', () => {
        const create = schema('PostsCreate')
        expect(create.required ?? []).not.toContain('id')
        expect(create.required ?? []).not.toContain('createdAt')
        expect(create.required ?? []).toContain('title')
      })

      it('writes relationships as ids in create bodies', () => {
        const author = schema('PostsCreate').properties?.author as Schema
        expect(author).toEqual({ type: [idType, 'null'] })
        const tags = schema('PostsCreate').properties?.tags as Schema
        expect(tags.type).toEqual(['array', 'null'])
        expect((tags.items as Schema).type).toBe(idType)
      })

      it('writes polymorphic relationships as `{ relationTo, value }` in create bodies', () => {
        const related = schema('PostsCreate').properties?.related as Schema
        expect(related.type).toEqual(['array', 'null'])
        const branches = (related.items as Schema).oneOf as Schema[]
        expect(branches.map((b) => b.properties?.relationTo)).toEqual([{ const: 'posts' }, { const: 'tags' }])
        for (const branch of branches) {
          expect(branch.required).toEqual(['value', 'relationTo'])
          expect(branch.properties?.value).toEqual({ type: idType })
        }
      })

      it('writes an upload field as an id in create bodies', () => {
        const featured = schema('PostsCreate').properties?.featuredImage as Schema
        expect(featured).toEqual({ type: [idType, 'null'] })
      })

      it('writes relationships nested in groups, named tabs, arrays and blocks as ids', () => {
        const create = schema('PostsCreate').properties ?? {}
        const hero = (create.hero as Schema).properties ?? {}
        expect(hero.image).toEqual({ type: [idType, 'null'] })
        const link = ((hero.links as Schema).items as Schema).properties?.doc as Schema
        expect((link.oneOf as Schema[]).map((b) => b.properties?.value)).toEqual([{ type: idType }, { type: idType }])
        expect((create.og as Schema).properties?.image).toEqual({ type: [idType, 'null'] })

        const row = ((create.sections as Schema).items as Schema).properties ?? {}
        expect(row.tags).toEqual({ type: ['array', 'null'], items: { type: idType } })
        const blocks = ((row.content as Schema).items as Schema).oneOf as Schema[]
        expect(blocks[0]?.properties?.media).toEqual({ type: idType })
        expect(blocks[1]).toEqual({ $ref: '#/components/schemas/BlockCallToAction' })

        const layout = ((create.layout as Schema).items as Schema).oneOf as Schema[]
        const gallery = layout.find((b) => (b.properties?.blockType as Schema | undefined)?.const === 'gallery')
        expect(gallery?.properties?.images).toEqual({ type: ['array', 'null'], items: { type: idType } })
        expect(schema('PostsUpdate').properties?.hero).toEqual(create.hero)
      })

      it('keeps the populated document in nested read shapes', () => {
        const read = schema('Posts').properties ?? {}
        const hero = (read.hero as Schema).properties ?? {}
        const image = hero.image as Schema
        expect(image.oneOf?.[1]).toEqual({ $ref: '#/components/schemas/Media' })
        const row = ((read.sections as Schema).items as Schema).properties ?? {}
        const blocks = ((row.content as Schema).items as Schema).oneOf as Schema[]
        expect(blocks[0]).toEqual({ $ref: '#/components/schemas/BlockMedia' })
      })

      it('leaves join fields and timestamps out of create bodies', () => {
        expect(schema('UsersCreate').properties?.posts).toBeUndefined()
        expect(schema('PostsCreate').properties?.createdAt).toBeUndefined()
        expect(schema('PostsCreate').properties?.updatedAt).toBeUndefined()
      })

      it('leaves `createdBy` and `updatedBy` out of write bodies and keeps them on read', () => {
        for (const field of ['createdBy', 'updatedBy']) {
          expect(schema('Posts').properties?.[field]).toBeDefined()
          expect(schema('PostsCreate').properties?.[field]).toBeUndefined()
          expect(schema('PostsUpdate').properties?.[field]).toBeUndefined()
          expect(schema('GlobalSettingsUpdate').properties?.[field]).toBeUndefined()
        }
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
      const phone = schema('Posts').properties?.phone as Schema
      expect(phone.format).toBe('phone')
      expect(phone.example).toBe('+14155552671')
      expect(phone.pattern).toBeDefined()
      expect(phone.description).toBe('E.164 formatted phone number')
    })

    it('marks a field deprecated from `custom.openapi.deprecated`', () => {
      const legacy = schema('Posts').properties?.legacyField as Schema
      expect(legacy.deprecated).toBe(true)
    })

    it('sets a `blockType` discriminator on block unions', () => {
      const callouts = schema('Posts').properties?.callouts as Schema
      const refItems = callouts.items as Schema
      expect(refItems.oneOf).toBeDefined()
      expect(refItems.discriminator?.propertyName).toBe('blockType')

      const layout = schema('Posts').properties?.layout as Schema
      const inlineItems = layout.items as Schema
      expect(inlineItems.oneOf).toBeDefined()
      expect(inlineItems.discriminator?.propertyName).toBe('blockType')
    })

    it('does not add a discriminator to the localized `oneOf`', () => {
      const title = schema('Posts').properties?.title as Schema
      expect(title.oneOf).toBeDefined()
      expect(title.discriminator).toBeUndefined()
    })

    it('registers a component schema for `blockReferences` blocks with a `blockType` discriminator', () => {
      const cta = schema('BlockCallToAction')
      expect(cta).toBeDefined()
      const blockType = cta.properties?.blockType as Schema
      expect(blockType.enum).toEqual(['callToAction'])
      expect(cta.required).toContain('blockType')
    })

    it('embeds inline block definitions inside the blocks field schema', () => {
      const layout = schema('Posts').properties?.layout as Schema
      expect(layout.type).toEqual(['array', 'null'])
      expect(schema('BlockCallToAction')).toBeDefined()
      expect(schema('BlockMedia')).toBeDefined()
    })

    it('models a localized field as a single value or a per-locale object (#69)', () => {
      const title = schema('Posts').properties?.title as Schema
      expect(title.oneOf).toHaveLength(2)
      const perLocale = title.oneOf?.[1] as Schema
      expect(perLocale.properties?.en).toBeDefined()
      expect(perLocale.properties?.de).toBeDefined()
    })

    it('keeps localized write bodies as single values, with no per-locale object', () => {
      const createTitle = schema('PostsCreate').properties?.title as Schema
      expect(createTitle.oneOf).toBeUndefined()
      expect(createTitle.type).toBe('string')
    })

    it('handles timezone-enabled date fields without crashing (#34)', () => {
      expect(schema('Posts').properties?.publishedAt).toBeDefined()
    })
  })

  describe('uploads', () => {
    it('offers both a multipart body (with binary file) and a json body (no file) for upload collections', () => {
      const body = doc.paths?.['/api/media']?.post?.requestBody as Body
      expect((body.content['application/json']!.schema as ReferenceObject).$ref).toBe(
        '#/components/schemas/MediaCreate',
      )
      const multipart = body.content['multipart/form-data']!
      expect(multipart).toBeDefined()
      const mpSchema = multipart.schema as Schema
      expect(((mpSchema.properties ?? {}).file as Schema).format).toBe('binary')
      const payloadPart = mpSchema.properties?._payload as { allOf?: ReferenceObject[] }
      expect(payloadPart.allOf?.[0]?.$ref).toBe('#/components/schemas/MediaCreate')
      expect(mpSchema.required).toContain('file')
    })

    it('makes the file optional on upload update, alongside the fields', () => {
      const body = doc.paths?.['/api/media/{id}']?.patch?.requestBody as Body
      const mpSchema = body.content['multipart/form-data']?.schema as Schema
      expect(mpSchema.required).toBeUndefined()
      expect(body.required).toBe(false)
    })

    it('documents the file and upload instructions endpoints for upload collections', () => {
      expect(doc.paths['/api/media/file/{filename}']?.get).toBeDefined()
      expect(doc.paths['/api/users/file/{filename}']).toBeUndefined()
      expect(doc.paths['/api/media/{id}/rename']?.post).toBeDefined()
      expect(doc.paths['/api/users/{id}/rename']).toBeUndefined()
      const body = doc.paths['/api/upload-instructions']?.post?.requestBody as Body
      const bodySchema = body.content['application/json']!.schema as Schema
      const slug = bodySchema.properties?.collectionSlug as Schema
      expect(slug.enum).toEqual(['media', 'exports', 'imports'])
      expect(doc.paths['/api/upload-instructions/{uploadId}']?.put).toBeDefined()
      expect(doc.paths['/api/upload-instructions/{uploadId}']?.delete).toBeDefined()
    })
  })

  describe('query params', () => {
    it('exposes a `QueryOperations` schema with per-field operators and recursive `and`/`or`', () => {
      const q = schema('PostsQueryOperations')
      expect(q).toBeDefined()
      expect(q.properties?.title).toBeDefined()
      expect(q.properties?.and).toBeDefined()
      expect(q.properties?.or).toBeDefined()
      const params = (doc.paths?.['/api/posts']?.get?.parameters ?? []) as Param[]
      const whereParam = params.find((p) => p.name === 'where')
      expect(whereParam).toBeDefined()
      expect(whereParam?.content?.['application/json']?.schema).toEqual({
        $ref: '#/components/schemas/PostsQueryOperations',
      })
    })

    it('describes the `where` param with a content schema so the UI shows one row', () => {
      const params = (doc.paths['/api/posts']?.get?.parameters ?? []) as Param[]
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
      const posts = joins.properties?.posts as Schema
      expect(posts.properties?.limit).toEqual({ type: 'integer' })
      expect(posts.properties?.where).toBeDefined()
    })

    it('documents the query params that write operations read', () => {
      const names = (op?: { parameters?: unknown[] }) => ((op?.parameters ?? []) as Param[]).map((p) => p.name)
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
      const names = (op?: { parameters?: unknown[] }) => ((op?.parameters ?? []) as Param[]).map((p) => p.name)
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

      const duplicate = (doc.paths['/api/posts/{id}/duplicate']?.post?.parameters ?? []) as Param[]
      expect(duplicate.find((p) => p.name === 'selectedLocales[]')).toMatchObject({
        style: 'form',
        explode: true,
        schema: { type: 'array', items: { type: 'string', enum: ['en', 'de', 'fr'] } },
      })
      expect(names(doc.paths['/api/posts/{id}/duplicate']?.post)).not.toContain('publishAllLocales')
    })
  })

  describe('hierarchy', () => {
    const paramNames = (op?: { parameters?: unknown[] }) => ((op?.parameters ?? []) as Param[]).map((p) => p.name)

    it('documents a folders collection with the standard collection endpoints only', () => {
      const folderPaths = Object.keys(doc.paths).filter((p) => p.startsWith('/api/folders'))
      expect(folderPaths.toSorted()).toEqual([
        '/api/folders',
        '/api/folders/count',
        '/api/folders/validate',
        '/api/folders/versions',
        '/api/folders/versions/{id}',
        '/api/folders/{id}',
        '/api/folders/{id}/duplicate',
        '/api/folders/{id}/validate',
      ])
      expect(Object.keys(doc.paths).some((p) => p.includes('payload-folders'))).toBe(false)
    })

    it('adds the parent, scope and join fields to the folder read schema', () => {
      const props = schema('Folders').properties ?? {}
      expect(props._h_folders).toBeDefined()
      expect((props.hierarchyType as Schema).items).toEqual({ type: 'string', enum: ['media'] })
      const children = (props.children as Schema).properties?.docs as Schema
      for (const branch of ((children.items as Schema).oneOf ?? []) as Schema[]) {
        expect(branch.required).toEqual(['relationTo', 'value'])
      }
    })

    it('marks the computed path fields read-only and keeps them out of bodies and `where`', () => {
      for (const name of ['_h_slugPath', '_h_titlePath']) {
        const field = schema('Folders').properties?.[name] as Schema
        expect(field.readOnly).toBe(true)
        expect(field.description).toContain('computeHierarchyPaths=true')
        expect(schema('FoldersCreate').properties?.[name]).toBeUndefined()
        expect(schema('FoldersUpdate').properties?.[name]).toBeUndefined()
        expect(schema('FoldersQueryOperations').properties?.[name]).toBeUndefined()
        expect(schema('FoldersSelect').properties?.[name]).toEqual({ type: 'boolean' })
      }
      expect(schema('FoldersQueryOperations').properties?._h_folders).toBeDefined()
    })

    it('lists `computeHierarchyPaths` on the folder reads only', () => {
      expect(paramNames(doc.paths['/api/folders']?.get)).toContain('computeHierarchyPaths')
      expect(paramNames(doc.paths['/api/folders/{id}']?.get)).toContain('computeHierarchyPaths')
      expect(paramNames(doc.paths['/api/folders']?.post)).not.toContain('computeHierarchyPaths')
      expect(paramNames(doc.paths['/api/folders/{id}']?.patch)).not.toContain('computeHierarchyPaths')
      expect(paramNames(doc.paths['/api/media']?.get)).not.toContain('computeHierarchyPaths')
    })

    it('adds the folder field to a related collection', () => {
      expect(schema('Media').properties?._h_folders).toBeDefined()
      expect(schema('MediaCreate').properties?._h_folders).toMatchObject({ type: [idType, 'null'] })
      expect(schema('MediaQueryOperations').properties?._h_folders).toBeDefined()
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
      expect(doc.paths['/api/access']).toBeUndefined()
      expect(doc.paths['/api/users/access']).toBeUndefined()
    })

    it('documents the admin and bootstrap auth endpoints when `adminAuthEndpoints` is on', () => {
      expect(adminDoc.paths['/api/users/first-register']?.post).toBeDefined()
      expect(adminDoc.paths['/api/users/init']?.get).toBeDefined()
      expect(adminDoc.paths['/api/access']?.get).toBeDefined()
      expect(adminDoc.paths['/api/users/access']?.get).toBeUndefined()
    })

    it('does not document auth endpoints for non-auth collections', () => {
      expect(doc.paths['/api/posts/login']).toBeUndefined()
    })
  })

  describe('paths/access', () => {
    it('documents the per-document access endpoints only with `includeAdminAuth`', () => {
      expect(doc.paths['/api/posts/access/{id}']).toBeUndefined()
      expect(doc.paths['/api/globals/settings/access']).toBeUndefined()

      const props = (op?: { responses?: Record<string, unknown> }) => {
        const ok = op?.responses?.['200'] as Resp
        const body = ok.content?.['application/json']?.schema as Schema
        return Object.keys(body.properties ?? {})
      }
      const byId = adminDoc.paths['/api/posts/access/{id}']?.post
      expect(byId?.operationId).toBe('accessPostsById')
      expect(byId?.security).toBeUndefined()
      const requestBody = byId?.requestBody as Body
      expect(requestBody.content?.['application/json']?.schema).toEqual({
        $ref: '#/components/schemas/PostsUpdate',
      })
      expect(props(byId)).toEqual(['create', 'read', 'update', 'delete', 'validate', 'readVersions', 'fields'])
      expect(byId?.responses?.['404']).toBeDefined()
      expect(adminDoc.paths['/api/posts/access']?.post?.operationId).toBe('accessPosts')
      expect(props(adminDoc.paths['/api/users/access/{id}']?.post)).toEqual([
        'create',
        'read',
        'update',
        'delete',
        'validate',
        'unlock',
        'fields',
      ])
      expect(props(adminDoc.paths['/api/globals/settings/access']?.post)).toEqual([
        'read',
        'update',
        'validate',
        'readVersions',
        'fields',
      ])
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
        const ok = doc.paths[path]?.post?.responses?.['200'] as Resp
        return ok.content?.['application/json']?.schema as Schema
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
      const created = (create['201'] as Resp).content?.['application/json']?.schema as Schema
      expect(created.properties?.doc).toEqual({ $ref: '#/components/schemas/Posts' })

      const update = doc.paths['/api/globals/settings']?.post?.responses?.['200'] as Resp
      const updated = update.content?.['application/json']?.schema as Schema
      expect(updated.properties).toEqual({
        message: { type: 'string' },
        result: { $ref: '#/components/schemas/GlobalSettings' },
      })
      const read = doc.paths['/api/globals/settings']?.get?.responses?.['200'] as Resp
      expect(read.content?.['application/json']?.schema).toEqual({ $ref: '#/components/schemas/GlobalSettings' })
    })
  })

  describe('paths/jobs', () => {
    it('documents the jobs `run` and `handle-schedules` endpoints when jobs are configured (#43)', () => {
      const run = doc.paths['/api/payload-jobs/run']?.get
      expect(run).toBeDefined()
      const runParams = ((run?.parameters ?? []) as Param[]).map((p) => p.name)
      expect(runParams).toEqual(expect.arrayContaining(['queue', 'allQueues', 'limit', 'disableScheduling', 'silent']))
      expect(doc.paths['/api/payload-jobs/handle-schedules']?.get).toBeDefined()
      const queue = ((run?.parameters ?? []) as Param[]).find((p) => p.name === 'queue')
      expect(queue).toBeDefined()
      const queueSchema = queue?.schema as Schema | undefined
      expect(queueSchema?.enum).toEqual(expect.arrayContaining(['default', 'nightly']))
    })
  })

  describe('bulk operations', () => {
    it('documents bulk update, bulk delete, count, and duplicate (#50)', () => {
      expect(doc.paths['/api/posts']?.patch).toBeDefined()
      expect(doc.paths['/api/posts']?.delete).toBeDefined()
      expect(doc.paths['/api/posts/count']?.get).toBeDefined()
      expect(doc.paths['/api/posts/{id}/duplicate']?.post).toBeDefined()
      const count = doc.paths['/api/posts/count']?.get?.responses?.['200'] as Resp
      const countSchema = count.content?.['application/json']?.schema as Schema
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

  describe('official plugins', () => {
    it.each([
      ['/api/plugin-seo/generate-title', 'post', 'SEO', true],
      ['/api/plugin-seo/generate-image', 'post', 'SEO', true],
      ['/api/search/reindex', 'post', 'Search', true],
      ['/api/tenants/populate-tenant-options', 'get', 'Multi-tenant', true],
      ['/api/exports/download', 'post', 'Import/Export', true],
      ['/api/exports/export-preview', 'post', 'Import/Export', false],
      ['/api/imports/preview-data', 'post', 'Import/Export', false],
      ['/api/mcp', 'post', 'MCP', false],
      ['/api/mcp', 'get', 'MCP', false],
      ['/api/stripe/webhooks', 'post', 'Stripe', false],
      ['/api/stripe/rest', 'post', 'Stripe', true],
      ['/api/carts/{id}/add-item', 'post', 'Ecommerce', false],
      ['/api/carts/{id}/merge', 'post', 'Ecommerce', true],
      ['/api/payments/stripe/initiate', 'post', 'Ecommerce', false],
      ['/api/payments/stripe/confirm-order', 'post', 'Ecommerce', false],
      ['/api/payments/stripe/webhooks', 'post', 'Ecommerce', false],
      ['/api/storage-r2-multi-part-upload', 'post', 'Storage R2', true],
    ] as const)('documents %s %s under the %s tag', (path, method, tag, isSecured) => {
      const operation = doc.paths[path]?.[method]
      expect(operation?.tags).toEqual([tag])
      expect(Boolean(operation?.security)).toBe(isSecured)
    })

    it('reads options from the installed plugin', () => {
      const body = doc.paths['/api/search/reindex']?.post?.requestBody as Body
      const bodySchema = body.content['application/json']!.schema as Schema
      expect(bodySchema.properties?.collections).toMatchObject({ items: { enum: ['posts'] } })
    })

    it('groups the plugin tags under Plugins when `nestedTags` is on', () => {
      const tags: TagObject[] = nestedDoc.tags ?? []
      const children = tags.filter((tag) => tag.parent === 'Plugins').map((tag) => tag.name)
      expect(tags.find((tag) => tag.name === 'Plugins')?.kind).toBe('nav')
      expect(children.toSorted()).toEqual(
        ['Ecommerce', 'Import/Export', 'MCP', 'Multi-tenant', 'SEO', 'Storage R2', 'Stripe'].toSorted(),
      )
      const names = tags.map((tag) => tag.name)
      expect(names).toHaveLength(new Set(names).size)
      expect(tags.find((tag) => tag.name === 'Search')?.parent).toBe('Collections')
    })
  })

  describe('doc languages', () => {
    it('advertises supported languages in the description and `x-doc-languages`', () => {
      expect((doc as Record<string, unknown>)['x-doc-languages']).toEqual(['en', 'de', 'fr'])
      expect(doc.info.description).toContain('This documentation is available in')
      expect(doc.info.description).toContain('`de`')
      expect(doc.info.description).toContain('?lang=<code>')
    })

    const listDesc = (served: Doc): string | undefined => {
      const ok = served.paths['/api/posts']?.get?.responses?.['200'] as Resp | undefined
      return ok?.description
    }
    const serveSpec = async (url: string): Promise<Doc> => {
      const payload = await getPayload({ config: await configPromise })
      const handler = specHandler(resolveOptions({ info: { title: 'T', version: '1.0.0' }, cache: false }))
      const res = await handler({ url, payload, headers: new Headers(), i18n: i18nStub } as never)
      return (await res.json()) as Doc
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
      const items = ((err.properties ?? {}).errors as Schema).items as Schema
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
      const r404 = doc.paths['/api/posts/{id}']?.get?.responses?.['404'] as Resp
      expect(r404.content?.['application/json']?.schema).toEqual({
        $ref: '#/components/schemas/ErrorResponse',
      })
    })
  })
})

describe('filters', () => {
  const build = async (filters: Partial<FilterOptions>): Promise<Doc> => {
    const payload = await getPayload({ config: await configPromise })
    return buildDoc({
      options: resolveOptions({ info: { title: 'T', version: '1.0.0' }, filters }),
      servers: [{ url: 'http://localhost' }],
      collections: Object.values(payload.collections).map((c) => c.config),
      globals: payload.config.globals,
      config: payload.config,
      ctx: { defaultIDType: 'text', locales: [], apiRoute: '/api', docLanguages: ['en'], i18n: i18nStub },
      payload,
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
    options = resolveOptions({ info: { title: 'T', version: '1.0.0' } }),
  ): Promise<Doc> => {
    const payload = await getPayload({ config: await configPromise })
    const base = Object.values(payload.collections).find((c) => c.config.slug === 'tags')!.config
    const collection = { ...base, access: { ...base.access, read } } as SanitizedCollectionConfig
    return buildDoc({
      options,
      servers: [{ url: 'http://localhost' }],
      collections: [collection],
      globals: [],
      config: payload.config,
      ctx: { defaultIDType: 'text', locales: [], apiRoute: '/api', docLanguages: ['en'], i18n: i18nStub },
      payload,
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

  it('marks a public read from the collection config as public after Payload sanitizes it', () => {
    expect(doc.paths['/api/tags']?.get?.security).toBeUndefined()
    expect(doc.paths['/api/tags/{id}']?.get?.security).toBeUndefined()
    expect(doc.paths['/api/tags']?.post?.security).toEqual(secured)
    expect(doc.paths['/api/tags/{id}/validate']?.post?.security).toEqual(secured)
  })

  it('marks version endpoints from `readVersions` and `update`, not as public', () => {
    expect(doc.paths['/api/posts/versions']?.get?.security).toEqual(secured)
    expect(doc.paths['/api/posts/versions/{id}']?.get?.security).toEqual(secured)
    expect(doc.paths['/api/posts/versions/{id}']?.post?.security).toEqual(secured)
    expect(doc.paths['/api/globals/settings/versions']?.get?.security).toEqual(secured)
  })

  it('marks the jobs endpoints as secured by default', () => {
    expect(doc.paths['/api/payload-jobs/run']?.get?.security).toEqual(secured)
    expect(doc.paths['/api/payload-jobs/handle-schedules']?.get?.security).toEqual(secured)
  })

  it('marks a plain public read function as public, leaving other operations secured', async () => {
    const d = await buildWithReadAccess(() => true)
    expect(d.paths?.['/api/tags']?.get?.security).toBeUndefined()
    expect(d.paths?.['/api/tags']?.post?.security).toEqual(secured)
    expect(d.paths?.['/api/tags/{id}']?.delete?.security).toEqual(secured)
  })

  it('lets `security` override the marking per operation in both directions', async () => {
    const options = resolveOptions({
      info: { title: 'T', version: '1.0.0' },
      security: ({ method }) => {
        if (method === 'get') return 'secured'
        if (method === 'post') return 'public'
        return undefined
      },
    })
    const d = await buildWithReadAccess(() => true, options)
    expect(d.paths?.['/api/tags']?.get?.security).toEqual(secured)
    expect(d.paths?.['/api/tags']?.post?.security).toBeUndefined()
    expect(d.paths?.['/api/tags/{id}']?.delete?.security).toEqual(secured)
  })
})

import type { Document, OperationObject, ParameterObject } from '@scalar/openapi-types/3.2'
import { Validator } from '@seriousme/openapi-schema-validator'
import type { Endpoint, SanitizedCollectionConfig, SanitizedConfig } from 'payload'
import { describe, expect, it } from 'vitest'

import { resolveOptions } from '@/server/options/resolveOptions.js'
import { buildDocument } from '@/server/spec/buildDocument.js'
import { buildTagHierarchy, NAV_PLUGINS } from '@/server/spec/tags.js'
import type { OpenApiPluginOptions, Schema } from '@/shared/types/index.js'

import { baseInput } from '../helpers/context.js'

const secured = [{ PayloadToken: [] }]

const plugin = (slug: string, options?: Record<string, unknown>) =>
  Object.assign(() => ({}), { slug, ...(options ? { options } : {}) })

const ep = (method: Endpoint['method'], path: string, extra: Partial<Endpoint> = {}): Endpoint =>
  ({ method, path, handler: () => new Response(), ...extra }) as Endpoint

const coll = (slug: string, extra: Partial<SanitizedCollectionConfig> = {}): SanitizedCollectionConfig =>
  ({ slug, fields: [], ...extra }) as SanitizedCollectionConfig

const build = (
  config: Record<string, unknown>,
  collections: SanitizedCollectionConfig[] = [],
  options: Partial<OpenApiPluginOptions> = {},
): Promise<Document> =>
  buildDocument(
    baseInput({
      config: config as unknown as SanitizedConfig,
      collections,
      options: resolveOptions({ info: { title: 'T', version: '1.0.0' }, ...options }),
    }),
  )

const op = (doc: Document, path: string, method: 'get' | 'post'): OperationObject | undefined =>
  doc.paths?.[path]?.[method] as OperationObject | undefined

const bodySchema = (operation: OperationObject | undefined): Schema =>
  (operation?.requestBody as { content: Record<string, { schema: Schema }> } | undefined)?.content['application/json']
    ?.schema ?? {}

const tagNames = (doc: Document) => (doc.tags ?? []).map((tag) => tag.name)

describe('spec/plugins', () => {
  it('documents nothing when the plugin is not installed', async () => {
    const doc = await build({ endpoints: [ep('post', '/plugin-seo/generate-title'), ep('post', '/mcp')] })
    expect(doc.paths?.['/api/plugin-seo/generate-title']).toBeUndefined()
    expect(doc.paths?.['/api/mcp']).toBeUndefined()
  })

  it('documents only the endpoints that are mounted', async () => {
    const doc = await build({
      plugins: [plugin('@payloadcms/plugin-seo')],
      endpoints: [ep('post', '/plugin-seo/generate-title')],
    })
    expect(op(doc, '/api/plugin-seo/generate-title', 'post')?.operationId).toBe('seoGenerateTitle')
    expect(doc.paths?.['/api/plugin-seo/generate-description']).toBeUndefined()
  })

  it('documents the SEO generate endpoints as secured', async () => {
    const doc = await build({
      plugins: [plugin('@payloadcms/plugin-seo')],
      endpoints: ['title', 'description', 'url', 'image'].map((name) => ep('post', `/plugin-seo/generate-${name}`)),
    })
    for (const name of ['title', 'description', 'url', 'image']) {
      const operation = op(doc, `/api/plugin-seo/generate-${name}`, 'post')
      expect(operation?.tags).toEqual(['SEO'])
      expect(operation?.security).toEqual(secured)
    }
  })

  it('skips a plugin endpoint that carries `custom.openapi`', async () => {
    const doc = await build({
      plugins: [plugin('@payloadcms/plugin-seo')],
      endpoints: [
        ep('post', '/plugin-seo/generate-title', {
          custom: { openapi: { operationId: 'mine', responses: { '200': { description: 'ok' } } } },
        }),
      ],
    })
    expect(op(doc, '/api/plugin-seo/generate-title', 'post')?.operationId).toBe('mine')
    expect(tagNames(doc)).not.toContain('SEO')
  })

  it('lets an operation in `extensions.paths` replace the generated one', async () => {
    const mine = { operationId: 'mine', responses: { '200': { description: 'ok' } } }
    const doc = await build(
      {
        plugins: [plugin('@payloadcms/plugin-mcp')],
        endpoints: [ep('post', '/mcp'), ep('get', '/mcp')],
      },
      [],
      { extensions: [{ paths: { '/api/mcp': { summary: 'MCP', post: mine } } }] },
    )
    expect(op(doc, '/api/mcp', 'post')).toEqual(mine)
    expect(op(doc, '/api/mcp', 'get')?.operationId).toBe('mcpStream')
    expect(doc.paths?.['/api/mcp']?.summary).toBe('MCP')
  })

  it('documents the Stripe webhook as public and the REST proxy as secured', async () => {
    const doc = await build({
      plugins: [
        plugin('@payloadcms/plugin-stripe', { rest: { allowedMethods: ['customers.list', 'customers.list'] } }),
      ],
      endpoints: [ep('post', '/stripe/webhooks'), ep('post', '/stripe/rest')],
    })
    const webhook = op(doc, '/api/stripe/webhooks', 'post')
    expect(webhook?.security).toBeUndefined()
    expect((webhook?.parameters as ParameterObject[] | undefined)?.[0]?.name).toBe('stripe-signature')
    const rest = op(doc, '/api/stripe/rest', 'post')
    expect(rest?.security).toEqual(secured)
    expect(bodySchema(rest).properties?.stripeMethod).toEqual({ type: 'string', enum: ['customers.list'] })
  })

  it('documents the MCP POST route and the GET route that answers 405', async () => {
    const doc = await build({
      plugins: [plugin('@payloadcms/plugin-mcp')],
      endpoints: [ep('post', '/mcp'), ep('get', '/mcp')],
    })
    expect(op(doc, '/api/mcp', 'post')?.operationId).toBe('mcp')
    expect(Object.keys(op(doc, '/api/mcp', 'post')?.responses ?? {}).toSorted()).toEqual([
      '200',
      '202',
      '400',
      '401',
      '404',
      '406',
      '413',
      '415',
      '500',
    ])
    expect(Object.keys(op(doc, '/api/mcp', 'get')?.responses ?? {})).toEqual(['405'])
  })

  it('skips a plugin whose detection throws and keeps the others', async () => {
    const doc = await build({
      storage: 'broken',
      plugins: [plugin('@payloadcms/plugin-seo')],
      endpoints: [ep('post', '/plugin-seo/generate-title'), ep('post', '/storage-r2-multi-part-upload')],
    })
    expect(op(doc, '/api/plugin-seo/generate-title', 'post')).toBeDefined()
    expect(doc.paths?.['/api/storage-r2-multi-part-upload']).toBeUndefined()
  })

  it('documents search reindex on the configured search collection only', async () => {
    const reindex = ep('post', '/reindex')
    const doc = await build(
      {
        plugins: [
          plugin('@payloadcms/plugin-search', { collections: ['posts', 'hidden'], searchOverrides: { slug: 'find' } }),
        ],
      },
      [coll('find', { endpoints: [reindex] }), coll('other', { endpoints: [reindex] }), coll('posts')],
    )
    const operation = op(doc, '/api/find/reindex', 'post')
    expect(operation?.operationId).toBe('reindexFind')
    expect(operation?.security).toEqual(secured)
    expect(bodySchema(operation).properties?.collections).toMatchObject({ items: { enum: ['posts'] } })
    expect(doc.paths?.['/api/other/reindex']).toBeUndefined()
  })

  it('documents collection mounts only for collections that pass the filters', async () => {
    const doc = await build(
      { plugins: [plugin('@payloadcms/plugin-search')] },
      [coll('search', { endpoints: [ep('post', '/reindex')] })],
      { filters: { exclude: ['search'] } },
    )
    expect(doc.paths?.['/api/search/reindex']).toBeUndefined()
  })

  it('documents the tenant options route on the tenants collection', async () => {
    const doc = await build({ plugins: [plugin('@payloadcms/plugin-multi-tenant', { tenantsSlug: 'orgs' })] }, [
      coll('orgs', { endpoints: [ep('get', '/populate-tenant-options')] }),
    ])
    expect(op(doc, '/api/orgs/populate-tenant-options', 'get')?.operationId).toBe('populateOrgsOptions')
  })

  it('documents import/export routes on the collections the plugin marks', async () => {
    const endpoints = [ep('post', '/download'), ep('post', '/export-preview'), ep('post', '/preview-data')]
    const doc = await build({ plugins: [plugin('@payloadcms/plugin-import-export')] }, [
      coll('exports', {
        endpoints,
        admin: { custom: { 'plugin-import-export': { collectionSlugs: ['posts'] } } } as never,
      }),
      coll('posts', { endpoints }),
    ])
    const download = op(doc, '/api/exports/download', 'post')
    expect(download?.security).toEqual(secured)
    expect(bodySchema(download).properties?.data).toMatchObject({
      properties: { collectionSlug: { enum: ['posts'] } },
    })
    expect(op(doc, '/api/exports/export-preview', 'post')?.security).toBeUndefined()
    expect(op(doc, '/api/exports/preview-data', 'post')?.operationId).toBe('previewExportsData')
    expect(doc.paths?.['/api/posts/download']).toBeUndefined()
  })

  it('documents the ecommerce cart and payment routes', async () => {
    const doc = await build(
      {
        plugins: [plugin('@payloadcms/plugin-ecommerce')],
        endpoints: [
          ep('post', '/payments/stripe/initiate'),
          ep('post', '/payments/stripe/confirm-order'),
          ep('post', '/payments/stripe/webhooks'),
          ep('post', '/payments/bank-transfer/initiate'),
        ],
      },
      [
        coll('carts', {
          endpoints: ['add-item', 'remove-item', 'update-item', 'clear', 'merge'].map((name) =>
            ep('post', `/:id/${name}`),
          ),
        }),
      ],
    )
    const addItem = op(doc, '/api/carts/{id}/add-item', 'post')
    expect(addItem?.operationId).toBe('addItemCarts')
    expect(addItem?.security).toBeUndefined()
    expect(Object.keys(addItem?.responses ?? {})).toEqual(expect.arrayContaining(['403', '404']))
    expect(op(doc, '/api/carts/{id}/merge', 'post')?.security).toEqual(secured)
    expect(op(doc, '/api/payments/stripe/initiate', 'post')?.operationId).toBe('initiatePaymentStripe')
    expect(bodySchema(op(doc, '/api/payments/stripe/confirm-order', 'post')).required).toEqual(['paymentIntentID'])
    expect(op(doc, '/api/payments/stripe/webhooks', 'post')?.tags).toEqual(['Ecommerce'])
    expect(op(doc, '/api/payments/bank-transfer/initiate', 'post')?.operationId).toBe('initiatePaymentBankTransfer')
  })

  it('keeps ecommerce payment operation ids unique', async () => {
    const doc = await build({
      plugins: [plugin('@payloadcms/plugin-ecommerce')],
      endpoints: [ep('post', '/payments/bank-transfer/initiate'), ep('post', '/payments/bank_transfer/initiate')],
    })
    expect(op(doc, '/api/payments/bank-transfer/initiate', 'post')?.operationId).toBe('initiatePaymentBankTransfer')
    expect(op(doc, '/api/payments/bank_transfer/initiate', 'post')?.operationId).toBe('initiatePaymentBankTransfer2')
  })

  it('keeps a custom operation on the same path as a plugin operation', async () => {
    const doc = await build({
      plugins: [plugin('@payloadcms/plugin-mcp')],
      endpoints: [
        ep('post', '/mcp'),
        ep('get', '/mcp', {
          custom: { openapi: { operationId: 'mine', responses: { '200': { description: 'ok' } } } },
        }),
      ],
    })
    expect(op(doc, '/api/mcp', 'get')?.operationId).toBe('mine')
    expect(op(doc, '/api/mcp', 'post')?.operationId).toBe('mcp')
  })

  it('does not leak a transform mutation into the next build', async () => {
    const config = { plugins: [plugin('@payloadcms/plugin-mcp')], endpoints: [ep('post', '/mcp')] }
    await build(config, [], {
      extensions: [
        {
          transform: ({ doc }) => {
            const schema = bodySchema(op(doc, '/api/mcp', 'post'))
            schema.oneOf?.push({ type: 'null' })
            return doc
          },
        },
      ],
    })
    const doc = await build(config)
    expect(bodySchema(op(doc, '/api/mcp', 'post')).oneOf).toHaveLength(2)
  })

  it('detects the R2 adapter from `storage` and keeps the route suffix', async () => {
    const doc = await build({
      storage: [{ name: 'r2' }],
      endpoints: [ep('post', '/storage-r2-multi-part-upload-2')],
    })
    const operation = op(doc, '/api/storage-r2-multi-part-upload-2', 'post')
    expect(operation?.operationId).toBe('r2MultipartUpload2')
    expect(operation?.security).toEqual(secured)
    const none = await build({ endpoints: [ep('post', '/storage-r2-multi-part-upload')] })
    expect(none.paths?.['/api/storage-r2-multi-part-upload']).toBeUndefined()
  })

  describe('filters and security', () => {
    const config = {
      plugins: [plugin('@payloadcms/plugin-seo'), plugin('@payloadcms/plugin-search')],
      endpoints: [
        ep('post', '/plugin-seo/generate-title'),
        ep('get', '/health', {
          custom: { openapi: { 'x-payload-plugin': 'my-plugin', responses: { '200': { description: 'ok' } } } },
        }),
        ep('get', '/plain', { custom: { openapi: { responses: { '200': { description: 'ok' } } } } }),
      ],
    }
    const collections = [coll('search', { endpoints: [ep('post', '/reindex')] })]

    it('drops plugin operations through `excludeOperations` by `plugin`', async () => {
      const doc = await build(config, collections, {
        filters: { excludeOperations: [{ plugin: /plugin-seo$/ }, { kind: 'plugin', slug: 'search' }] },
      })
      expect(doc.paths?.['/api/plugin-seo/generate-title']).toBeUndefined()
      expect(doc.paths?.['/api/search/reindex']).toBeUndefined()
      expect(doc.paths?.['/api/plain']).toBeDefined()
    })

    it('never matches a `plugin` rule against an operation without a plugin', async () => {
      const doc = await build(config, collections, { filters: { excludeOperations: [{ plugin: /.*/ }] } })
      expect(doc.paths?.['/api/plain']).toBeDefined()
      expect(doc.paths?.['/api/health']).toBeUndefined()
      expect(doc.paths?.['/api/search/reindex']).toBeUndefined()
    })

    it('passes `kind` and `plugin` to `security`', async () => {
      const seen = new Set<string>()
      await build(config, collections, {
        security: ({ kind, plugin: name, slug, path }) => {
          if (kind !== 'system') seen.add(`${kind}:${name ?? '-'}:${slug ?? '-'}:${path}`)
          return undefined
        },
      })
      expect([...seen].toSorted()).toEqual([
        'custom:-:-:/api/plain',
        'custom:my-plugin:-:/api/health',
        'plugin:@payloadcms/plugin-search:search:/api/search/reindex',
        'plugin:@payloadcms/plugin-seo:-:/api/plugin-seo/generate-title',
      ])
    })

    it('strips `x-payload-plugin` from the document', async () => {
      const doc = await build(config, collections)
      expect(op(doc, '/api/health', 'get')).toEqual({ responses: { '200': { description: 'ok' } } })
    })
  })

  describe('tags', () => {
    const config = {
      plugins: [plugin('@payloadcms/plugin-seo'), plugin('@payloadcms/plugin-mcp')],
      endpoints: [ep('post', '/plugin-seo/generate-title'), ep('post', '/plugin-seo/generate-url')],
    }

    it('adds one tag per documented plugin under the Plugins group', async () => {
      const doc = await build(config, [], { nestedTags: true })
      const byName = Object.fromEntries((doc.tags ?? []).map((tag) => [tag.name, tag]))
      expect(byName[NAV_PLUGINS]?.kind).toBe('nav')
      expect(byName['SEO']?.parent).toBe(NAV_PLUGINS)
      expect(byName['MCP']).toBeUndefined()
      expect(tagNames(doc).filter((name) => name === 'SEO')).toHaveLength(1)
    })

    it('puts a plugin under the collection tag of the same name', () => {
      const names = buildTagHierarchy({
        collections: [{ base: 'Search', hasAuth: false, hasVersions: false }],
        globals: [],
        systemTags: [],
        pluginTags: ['Search', 'SEO'],
        t: (key) => key,
        nested: true,
      }).map((tag) => tag.name)
      expect(names).toEqual(['Collections', 'Search', NAV_PLUGINS, 'SEO'])
    })

    it('emits no plugin tag objects in flat mode', async () => {
      const doc = await build(config, [], { nestedTags: false })
      expect(tagNames(doc)).not.toContain('SEO')
      expect(tagNames(doc)).not.toContain(NAV_PLUGINS)
    })
  })

  it('produces a valid document with every plugin installed', async () => {
    const doc = await build(
      {
        plugins: [
          plugin('@payloadcms/plugin-ecommerce'),
          plugin('@payloadcms/plugin-stripe'),
          plugin('@payloadcms/plugin-mcp'),
          plugin('@payloadcms/plugin-seo'),
          plugin('@payloadcms/plugin-search'),
          plugin('@payloadcms/plugin-multi-tenant'),
          plugin('@payloadcms/plugin-import-export'),
        ],
        storage: [{ name: 'r2' }],
        endpoints: [
          ep('post', '/payments/stripe/initiate'),
          ep('post', '/payments/stripe/confirm-order'),
          ep('post', '/payments/stripe/webhooks'),
          ep('post', '/stripe/webhooks'),
          ep('post', '/stripe/rest'),
          ep('post', '/mcp'),
          ep('get', '/mcp'),
          ep('post', '/plugin-seo/generate-image'),
          ep('post', '/storage-r2-multi-part-upload'),
        ],
      },
      [
        coll('carts', { endpoints: [ep('post', '/:id/add-item'), ep('post', '/:id/update-item')] }),
        coll('search', { endpoints: [ep('post', '/reindex')] }),
        coll('tenants', { endpoints: [ep('get', '/populate-tenant-options')] }),
        coll('exports', {
          endpoints: [ep('post', '/download'), ep('post', '/preview-data')],
          admin: { custom: { 'plugin-import-export': { collectionSlugs: [] } } } as never,
        }),
      ],
    )
    const result = await new Validator().validate(JSON.parse(JSON.stringify(doc)))
    expect(result.errors).toBeUndefined()
    expect(result.valid).toBe(true)
  })
})

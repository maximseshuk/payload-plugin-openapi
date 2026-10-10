import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { ecommercePlugin } from '@payloadcms/plugin-ecommerce'
import { stripeAdapter } from '@payloadcms/plugin-ecommerce/payments/stripe'
import { importExportPlugin } from '@payloadcms/plugin-import-export'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { searchPlugin } from '@payloadcms/plugin-search'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { stripePlugin } from '@payloadcms/plugin-stripe'
import { r2Storage } from '@payloadcms/storage-r2'
import { de } from '@payloadcms/translations/languages/de'
import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'
import { testDatabase } from '@seshuk/payload-plugin-tooling/test-database'
import { type Access, buildConfig } from 'payload'

import { openapi, scalar, swaggerUi } from '@/index.js'

import { CallToAction } from './blocks/CallToAction.js'
import { MediaBlock } from './blocks/MediaBlock.js'
import { Folders, Media, Posts, Tags, Tenants, Users } from './collections/index.js'
import { Settings } from './globals/Settings.js'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const devUser = { email: 'dev@example.com', password: 'dev' }

const loggedIn: Access = ({ req }) => Boolean(req.user)
const stripeSecretKey = process.env.STRIPE_SECRET_KEY ?? ''

const buildConfigAsync = async () =>
  buildConfig({
    secret: process.env.PAYLOAD_SECRET || 'dev-secret',
    telemetry: false,
    typescript: { autoGenerate: false },
    admin: { user: 'users', importMap: { baseDir: path.resolve(dirname) } },
    i18n: {
      supportedLanguages: { en, de, fr },
    },
    localization: {
      locales: ['en', 'de', 'fr'],
      defaultLocale: 'en',
    },
    db: await testDatabase(),
    blocks: [CallToAction, MediaBlock],
    jobs: {
      tasks: [
        {
          slug: 'sendEmail',
          inputSchema: [{ name: 'to', type: 'text', required: true }],
          schedule: [{ cron: '0 0 * * *', queue: 'nightly', hooks: {} }],
          handler: () => ({ output: {} }),
        },
      ],
    },
    collections: [Users, Posts, Media, Tags, Folders, Tenants],
    globals: [Settings],
    plugins: [
      openapi({
        info: { title: 'Dev API', version: '1.0.0' },
        filters: { includeAdminAuth: true },
        interactiveAuth: true,
        cache: process.env.NODE_ENV === 'production',
      }),
      scalar(),
      swaggerUi({ path: '/swagger' }),
      seoPlugin({ collections: ['posts'], uploadsCollection: 'media' }),
      searchPlugin({ collections: ['posts'] }),
      multiTenantPlugin({ collections: {}, tenantsSlug: 'tenants' }),
      importExportPlugin({ collections: [{ slug: 'posts' }] }),
      mcpPlugin({}),
      stripePlugin({ stripeSecretKey, rest: { allowedMethods: ['customers.list'] } }),
      ecommercePlugin({
        access: {
          adminOnlyFieldAccess: ({ req }) => Boolean(req.user),
          adminOrPublishedStatus: () => true,
          isAdmin: loggedIn,
          isDocumentOwner: loggedIn,
        },
        customers: { slug: 'users' },
        products: true,
        payments: {
          paymentMethods: [
            stripeAdapter({
              publishableKey: process.env.STRIPE_PUBLISHABLE_KEY ?? '',
              secretKey: stripeSecretKey,
              webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
            }),
          ],
        },
      }),
    ],
    storage: [r2Storage({ bucket: {} as never, collections: { media: true }, clientUploads: true })],
    onInit: async (payload) => {
      const existing = await payload.find({
        collection: 'users',
        overrideAccess: true,
        where: { email: { equals: devUser.email } },
      })
      if (existing.docs.length === 0) {
        await payload.create({ collection: 'users', data: devUser, overrideAccess: true })
      }
    },
  })

export default buildConfigAsync()

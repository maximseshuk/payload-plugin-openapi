import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { de } from '@payloadcms/translations/languages/de'
import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'
import { testDatabase } from '@seshuk/payload-plugin-tooling/test-database'
import { buildConfig } from 'payload'

import { openapi, scalar, swaggerUi } from '@/index.js'

import { CallToAction } from './blocks/CallToAction.js'
import { MediaBlock } from './blocks/MediaBlock.js'
import { Folders, Media, Posts, Tags, Users } from './collections/index.js'
import { Settings } from './globals/Settings.js'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const devUser = { email: 'dev@example.com', password: 'dev' }

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
    collections: [Users, Posts, Media, Tags, Folders],
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
    ],
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

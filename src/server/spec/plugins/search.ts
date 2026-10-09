import { jsonBody, jsonResponse } from '@/server/spec/components.js'
import { schemaName } from '@/server/spec/names.js'
import { securedRequirement } from '@/server/spec/security.js'

import { type OfficialPlugin, collectionGroups, messageErrors, messageSchema } from './shared.js'

const TAG = 'Search'

export const search: OfficialPlugin = {
  slug: '@payloadcms/plugin-search',
  tag: TAG,
  build: ({ collections, ctx, options, t }) => {
    const overrides = options?.searchOverrides as { slug?: string } | undefined
    const searchSlug = overrides?.slug || 'search'
    const indexed = Array.isArray(options?.collections) ? (options.collections as string[]) : []
    return collectionGroups(
      collections.filter((c) => c.slug === searchSlug),
      ctx,
      ({ method, path }, collection) =>
        method === 'post' && path === '/reindex'
          ? {
              tags: [TAG],
              operationId: `reindex${schemaName(collection.slug)}`,
              summary: t('searchReindex'),
              requestBody: jsonBody({
                type: 'object',
                properties: {
                  collections: {
                    type: 'array',
                    minItems: 1,
                    items: { type: 'string', ...(indexed.length > 0 ? { enum: indexed } : {}) },
                  },
                },
                required: ['collections'],
              }),
              responses: {
                '200': jsonResponse(t('searchReindexResult'), messageSchema),
                ...messageErrors(['400', '401', '500'], t),
              },
              security: securedRequirement(),
            }
          : undefined,
    )
  },
}

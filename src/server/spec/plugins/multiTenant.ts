import { errorResponses, jsonResponse } from '@/server/spec/components.js'
import { schemaName } from '@/server/spec/names.js'
import { securedRequirement } from '@/server/spec/security.js'

import { type OfficialPlugin, collectionGroups } from './shared.js'

const TAG = 'Multi-tenant'

export const multiTenant: OfficialPlugin = {
  slug: '@payloadcms/plugin-multi-tenant',
  tag: TAG,
  build: ({ collections, ctx, options, t }) => {
    const tenantsSlug = (options?.tenantsSlug as string | undefined) || 'tenants'
    return collectionGroups(
      collections.filter((c) => c.slug === tenantsSlug),
      ctx,
      ({ method, path }, collection) =>
        method === 'get' && path === '/populate-tenant-options'
          ? {
              tags: [TAG],
              operationId: `populate${schemaName(collection.slug)}Options`,
              summary: t('tenantOptions'),
              responses: {
                '200': jsonResponse(t('tenantOptionsResult'), {
                  type: 'object',
                  properties: {
                    tenantOptions: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          label: { type: 'string' },
                          value: { oneOf: [{ type: 'string' }, { type: 'number' }] },
                        },
                        required: ['label', 'value'],
                      },
                    },
                  },
                  required: ['tenantOptions'],
                }),
                ...errorResponses(['401'], t),
              },
              security: securedRequirement(),
            }
          : undefined,
    )
  },
}

import type { OperationObject, SchemaObject } from '@scalar/openapi-types/3.2'
import type { SanitizedCollectionConfig } from 'payload'

import { errorResponses, jsonBody, jsonResponse } from '@/server/spec/components.js'
import { schemaName } from '@/server/spec/names.js'
import { securedRequirement } from '@/server/spec/security.js'

import { type OfficialPlugin, collectionGroups, messageErrors } from './shared.js'

const TAG = 'Import/Export'

const targetSlugs = (collection: SanitizedCollectionConfig): string[] | undefined => {
  const meta = (collection.admin?.custom as Record<string, { collectionSlugs?: unknown } | undefined> | undefined)?.[
    'plugin-import-export'
  ]
  return Array.isArray(meta?.collectionSlugs) ? (meta.collectionSlugs as string[]) : undefined
}

const errorSchema: SchemaObject = { type: 'object', properties: { error: { type: 'string' } }, required: ['error'] }

const pageProperties: Record<string, SchemaObject> = {
  docs: { type: 'array', items: { type: 'object', additionalProperties: true } },
  hasNextPage: { type: 'boolean' },
  hasPrevPage: { type: 'boolean' },
  limit: { type: 'integer' },
  maxLimit: { type: 'integer' },
  page: { type: 'integer' },
  totalDocs: { type: 'integer' },
  totalPages: { type: 'integer' },
}

const previewPaging: Record<string, SchemaObject> = {
  previewLimit: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
  previewPage: { type: 'integer', minimum: 1, default: 1 },
}

const format: SchemaObject = { type: 'string', enum: ['csv', 'json'] }
const drafts: SchemaObject = { type: 'string', enum: ['yes', 'no'] }

const query: Record<string, SchemaObject> = {
  fields: { type: 'array', items: { type: 'string' } },
  limit: { type: 'integer', minimum: 0 },
  locale: { type: 'string' },
  sort: { type: 'string' },
  where: { type: 'object', additionalProperties: true },
}

export const importExport: OfficialPlugin = {
  slug: '@payloadcms/plugin-import-export',
  tag: TAG,
  build: ({ collections, ctx, t }) => {
    const visible = new Set(collections.map((c) => c.slug))
    return collectionGroups(collections, ctx, ({ method, path }, collection): OperationObject | undefined => {
      const slugs = targetSlugs(collection)?.filter((slug) => visible.has(slug))
      if (!slugs || method !== 'post') return undefined
      const name = schemaName(collection.slug)
      const collectionSlug: SchemaObject = { type: 'string', ...(slugs.length > 0 ? { enum: slugs } : {}) }
      if (path === '/download') {
        return {
          tags: [TAG],
          operationId: `download${name}`,
          summary: t('exportDownload'),
          requestBody: jsonBody({
            type: 'object',
            properties: {
              data: {
                type: 'object',
                additionalProperties: true,
                properties: {
                  collectionSlug,
                  format,
                  name: { type: 'string' },
                  ...query,
                  page: { type: 'integer' },
                  drafts,
                },
                required: ['collectionSlug', 'format'],
              },
            },
            required: ['data'],
          }),
          responses: {
            '200': {
              description: t('exportDownloadResult'),
              headers: { 'Content-Disposition': { schema: { type: 'string' } } },
              content: {
                'text/csv': { schema: { type: 'string' } },
                'application/json': {
                  schema: { type: 'array', items: { type: 'object', additionalProperties: true } },
                },
              },
            },
            ...errorResponses(['400'], t),
          },
          security: securedRequirement(),
        }
      }
      if (path === '/export-preview') {
        return {
          tags: [TAG],
          operationId: `preview${name}`,
          summary: t('exportPreview'),
          requestBody: jsonBody({
            type: 'object',
            additionalProperties: true,
            properties: { collectionSlug, format, ...query, ...previewPaging, draft: drafts },
            required: ['collectionSlug'],
          }),
          responses: {
            '200': jsonResponse(t('previewResult'), {
              type: 'object',
              properties: {
                columns: { type: 'array', items: { type: 'string' } },
                exportTotalDocs: { type: 'integer' },
                ...pageProperties,
              },
              required: ['docs', 'page', 'limit', 'totalDocs', 'totalPages'],
            }),
            ...messageErrors(['400'], t, errorSchema),
          },
        }
      }
      if (path === '/preview-data') {
        return {
          tags: [TAG],
          operationId: `preview${name}Data`,
          summary: t('importPreview'),
          requestBody: jsonBody({
            type: 'object',
            additionalProperties: true,
            properties: {
              collectionSlug,
              fileData: { type: 'string', contentEncoding: 'base64', description: t('importFileData') },
              format,
              ...previewPaging,
            },
            required: ['collectionSlug', 'fileData'],
          }),
          responses: {
            '200': jsonResponse(t('previewResult'), {
              type: 'object',
              properties: { ...pageProperties, limitExceeded: { type: 'boolean' } },
              required: ['docs', 'page', 'limit', 'totalDocs', 'totalPages', 'limitExceeded'],
            }),
            ...messageErrors(['400', '500'], t, errorSchema),
          },
        }
      }
      return undefined
    })
  },
}

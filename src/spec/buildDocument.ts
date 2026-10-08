import type { Field, PayloadLogger, SanitizedCollectionConfig, SanitizedConfig, SanitizedGlobalConfig } from 'payload'
import type {
  ComponentsObject,
  Document,
  PathsObject,
  SchemaObject,
  SecuritySchemeObject,
  TagObject,
} from '@scalar/openapi-types/3.2'
import { getTranslation } from '@payloadcms/translations'

import type { BuildContext, ResolvedOptions } from '../types.js'
import { PLUGIN_NAME } from '../constants.js'
import { deepMerge } from '../utils.js'
import { makeT } from '../translations/index.js'
import {
  ERROR_SCHEMA_NAME,
  INTERACTIVE_SCHEME_NAME,
  SECURITY_SCHEME_NAME,
  buildErrorResponseSchema,
  buildListEnvelopeSchema,
  interactiveSecurityScheme,
  securityScheme,
} from './components.js'
import { buildBlockSchema, buildEntitySchemas } from './entitySchemas.js'
import { filterOperations, shouldIncludeCollection, shouldIncludeGlobal } from './filters.js'
import {
  blockSchemaName,
  createSchemaName,
  globalSchemaName,
  joinsSchemaName,
  listSchemaName,
  populateSchemaName,
  querySchemaName,
  schemaName,
  selectSchemaName,
  updateSchemaName,
} from './names.js'
import { buildParamSchemas, buildQueryOperationsSchema, collectionHasFilters } from './params.js'
import { applySecurityWhen, resolveEntitySecurity } from './security.js'
import { buildTagHierarchy, type CollectionTagInfo, type GlobalTagInfo } from './tags.js'
import { buildAuthPaths } from './paths/auth.js'
import { buildCollectionPaths } from './paths/collections.js'
import { buildCustomEndpointPaths } from './paths/custom.js'
import { buildGlobalPaths } from './paths/globals.js'
import { buildJobsPaths } from './paths/jobs.js'
import { buildVersionPaths, versionComponentSchemas } from './paths/versions.js'

const resolveDescription = (description: unknown, ctx: BuildContext): string | undefined => {
  if (description == null) return undefined
  const resolved: unknown = getTranslation(description as string, ctx.i18n)
  return typeof resolved === 'string' && resolved.length > 0 ? resolved : undefined
}

const registerParamSchemas = (
  schemas: Record<string, SchemaObject>,
  base: string,
  fields: Field[],
  ctx: BuildContext,
): void => {
  const { select, populate, joins } = buildParamSchemas({ fields, ctx })
  schemas[selectSchemaName(base)] = select
  if (populate) schemas[populateSchemaName(base)] = populate
  if (joins) schemas[joinsSchemaName(base)] = joins
}

export interface BuildInput {
  options: ResolvedOptions
  servers: { url: string }[]
  collections: SanitizedCollectionConfig[]
  globals: SanitizedGlobalConfig[]
  config: SanitizedConfig
  ctx: BuildContext
  logger: PayloadLogger
}

export const buildDocument = async (input: BuildInput): Promise<Document> => {
  const { options, ctx, config, logger } = input
  const t = makeT(ctx.i18n)
  const paths: PathsObject = {}
  const schemas: Record<string, SchemaObject> = {}

  const { filters } = options
  const collections = input.collections.filter((c) => shouldIncludeCollection(c, filters))
  const globals = input.globals.filter((g) => shouldIncludeGlobal(g, filters))

  const collectionTagInfos: CollectionTagInfo[] = []
  const globalTagInfos: GlobalTagInfo[] = []

  for (const block of config.blocks ?? []) {
    try {
      schemas[blockSchemaName(block.slug)] = buildBlockSchema(block, config)
    } catch (error) {
      logger.warn(`${PLUGIN_NAME}: skipped block "${block.slug}": ${(error as Error).message}`)
    }
  }

  for (const collection of collections) {
    try {
      const { read, create, update } = await buildEntitySchemas({ entity: collection, config, ctx })
      const base = schemaName(collection.slug)
      collectionTagInfos.push({
        base,
        hasAuth: filters.includeAuth && Boolean(collection.auth),
        hasVersions: Boolean(filters.includeVersions && collection.versions),
        description: resolveDescription(collection.admin?.description, ctx),
      })
      schemas[base] = read
      schemas[createSchemaName(base)] = create
      schemas[updateSchemaName(base)] = update
      schemas[listSchemaName(base)] = buildListEnvelopeSchema(base)
      if (collectionHasFilters(collection.fields)) {
        schemas[querySchemaName(base)] = buildQueryOperationsSchema({ base, fields: collection.fields, ctx })
      }
      registerParamSchemas(schemas, base, collection.fields, ctx)

      const security = await resolveEntitySecurity({
        entity: collection,
        operations: ['read', 'create', 'update', 'delete'],
        locale: ctx.locales[0],
      })
      const collectionPaths: PathsObject = { ...buildCollectionPaths({ collection, ctx, security }) }

      if (filters.includeAuth) {
        Object.assign(
          collectionPaths,
          buildAuthPaths({
            collection,
            ctx,
            includeAdmin: filters.includeAdminAuth,
            nestedTags: options.nestedTags,
          }),
        )
      }

      if (filters.includeVersions && collection.versions) {
        const { version, versionList } = versionComponentSchemas({ docBase: base, base, idType: ctx.defaultIDType })
        schemas[`${base}Version`] = version
        schemas[`${base}VersionList`] = versionList
        Object.assign(
          collectionPaths,
          buildVersionPaths({
            entity: collection,
            pathBase: `${ctx.apiRoute}/${collection.slug}`,
            ctx,
            schemaBase: base,
            nestedTags: options.nestedTags,
          }),
        )
      }

      const filteredCollectionPaths = filterOperations({
        paths: collectionPaths,
        slug: collection.slug,
        kind: 'collection',
        filters,
      })
      Object.assign(
        paths,
        applySecurityWhen({
          paths: filteredCollectionPaths,
          slug: collection.slug,
          kind: 'collection',
          securityWhen: options.securityWhen,
        }),
      )
    } catch (error) {
      logger.warn(`${PLUGIN_NAME}: skipped collection "${collection.slug}": ${(error as Error).message}`)
    }
  }

  for (const global of globals) {
    try {
      const { read, update } = await buildEntitySchemas({ entity: global, config, ctx })
      const gbase = globalSchemaName(global.slug)
      globalTagInfos.push({
        base: gbase,
        hasVersions: Boolean(filters.includeVersions && global.versions),
        description: resolveDescription(global.admin?.description, ctx),
      })
      schemas[gbase] = read
      schemas[updateSchemaName(gbase)] = update
      registerParamSchemas(schemas, gbase, global.fields, ctx)

      const security = await resolveEntitySecurity({
        entity: global,
        operations: ['read', 'update'],
        locale: ctx.locales[0],
      })
      const globalPaths: PathsObject = { ...buildGlobalPaths({ global, ctx, security }) }

      if (filters.includeVersions && global.versions) {
        const { version, versionList } = versionComponentSchemas({
          docBase: gbase,
          base: gbase,
          idType: ctx.defaultIDType,
        })
        schemas[`${gbase}Version`] = version
        schemas[`${gbase}VersionList`] = versionList
        Object.assign(
          globalPaths,
          buildVersionPaths({
            entity: global,
            pathBase: `${ctx.apiRoute}/globals/${global.slug}`,
            ctx,
            schemaBase: gbase,
            nestedTags: options.nestedTags,
            global: true,
          }),
        )
      }

      const filteredGlobalPaths = filterOperations({ paths: globalPaths, slug: global.slug, kind: 'global', filters })
      Object.assign(
        paths,
        applySecurityWhen({
          paths: filteredGlobalPaths,
          slug: global.slug,
          kind: 'global',
          securityWhen: options.securityWhen,
        }),
      )
    } catch (error) {
      logger.warn(`${PLUGIN_NAME}: skipped global "${global.slug}": ${(error as Error).message}`)
    }
  }

  if (filters.includeCustom) {
    try {
      Object.assign(paths, buildCustomEndpointPaths({ config, collections, globals, ctx }))
    } catch (error) {
      logger.warn(`${PLUGIN_NAME}: failed to collect custom endpoints: ${(error as Error).message}`)
    }
  }

  const jobsConfig = config.jobs as Record<string, unknown> | undefined
  const hasJobs =
    filters.includeJobs &&
    Boolean((jobsConfig?.tasks as unknown[])?.length || (jobsConfig?.workflows as unknown[])?.length)

  if (filters.includeJobs) {
    try {
      Object.assign(paths, buildJobsPaths({ config, ctx }))
    } catch (error) {
      logger.warn(`${PLUGIN_NAME}: failed to add jobs endpoint: ${(error as Error).message}`)
    }
  }

  const supportedTimezones = config.admin?.timezones?.supportedTimezones
  if (Array.isArray(supportedTimezones) && supportedTimezones.length > 0) {
    schemas[schemaName('supportedTimezones')] = {
      type: 'string',
      description: t('schemaSupportedTimezones'),
      enum: supportedTimezones.map((tz) => (typeof tz === 'string' ? tz : tz.value)),
    }
  }

  schemas[ERROR_SCHEMA_NAME] = buildErrorResponseSchema()

  const cookiePrefix = config.cookiePrefix || 'payload'
  const securitySchemes: Record<string, SecuritySchemeObject> = {
    [SECURITY_SCHEME_NAME]: securityScheme({ cookiePrefix, t }),
  }
  if (options.interactiveAuth.enabled) {
    securitySchemes[INTERACTIVE_SCHEME_NAME] = interactiveSecurityScheme({
      tokenUrl: `${ctx.apiRoute}${options.interactiveAuth.endpoint}`,
      t,
    })
  }

  const localeNote =
    ctx.locales.length > 0
      ? `\n\n## ${t('localizationHeading')}\n\n` +
        t('localizationNote', {
          locales: ctx.locales.map((l) => `\`${l}\``).join(', '),
        })
      : ''
  const docLanguagesNote =
    ctx.docLanguages.length > 1
      ? `\n\n${t('docLanguagesNote', { languages: ctx.docLanguages.map((l) => `\`${l}\``).join(', ') })}`
      : ''
  const info = {
    ...options.metadata,
    description: `${options.metadata.description ?? ''}${localeNote}${docLanguagesNote}`.trim() || undefined,
  }

  let doc = {
    openapi: '3.2.0',
    info,
    servers: input.servers,
    paths,
    components: {
      schemas,
      securitySchemes,
    },
    tags: buildTagHierarchy({
      collections: collectionTagInfos,
      globals: globalTagInfos,
      hasJobs,
      t,
      nested: options.nestedTags,
    }),
    'x-doc-languages': ctx.docLanguages,
  } as Document

  for (const ext of options.extensions) {
    try {
      if (ext.paths) {
        doc.paths = deepMerge(doc.paths ?? {}, ext.paths) as PathsObject
      }
      if (ext.components) {
        doc.components = deepMerge(
          (doc.components ?? {}) as Record<string, unknown>,
          ext.components as Record<string, unknown>,
        ) as ComponentsObject
      }
      if (ext.tags) {
        const seen = new Set((doc.tags ?? []).map((tag: TagObject) => tag.name))
        doc.tags = [...(doc.tags ?? []), ...ext.tags.filter((tag: TagObject) => !seen.has(tag.name))]
      }
      if (ext.transform) doc = ext.transform(doc, ctx)
    } catch (error) {
      logger.warn(`${PLUGIN_NAME}: extension failed and was skipped: ${(error as Error).message}`)
    }
  }

  return doc
}

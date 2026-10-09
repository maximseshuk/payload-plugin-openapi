import { getTranslation } from '@payloadcms/translations'
import type {
  ComponentsObject,
  Document,
  PathsObject,
  SchemaObject,
  SecuritySchemeObject,
  TagObject,
} from '@scalar/openapi-types/3.2'
import type {
  Access,
  BasePayload,
  Field,
  SanitizedCollectionConfig,
  SanitizedConfig,
  SanitizedGlobalConfig,
} from 'payload'

import { buildAuthPaths } from '@/server/spec/paths/auth.js'
import { buildCollectionPaths } from '@/server/spec/paths/collections.js'
import { buildCustomEndpointPaths } from '@/server/spec/paths/custom.js'
import { buildGlobalPaths } from '@/server/spec/paths/globals.js'
import { buildJobsPaths } from '@/server/spec/paths/jobs.js'
import { buildSystemPaths } from '@/server/spec/paths/system.js'
import { buildVersionPaths, versionComponentSchemas } from '@/server/spec/paths/versions.js'
import { OFFICIAL_PLUGINS } from '@/server/spec/plugins/index.js'
import { PLUGIN_NAME } from '@/shared/constants.js'
import { makeT } from '@/shared/translations/index.js'
import type { BuildContext, OperationKind, ResolvedOptions } from '@/shared/types/index.js'
import { deepMerge } from '@/shared/utils.js'

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
import { filterOperations, shouldIncludeCollection, shouldIncludeGlobal, stripPluginKeys } from './filters.js'
import { applyHierarchy } from './hierarchy.js'
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
import { applySecurity, evaluateAccess, resolveEntitySecurity, securedRequirement } from './security.js'
import { buildTagHierarchy, type CollectionTagInfo, type GlobalTagInfo, type SystemTag } from './tags.js'

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
  payload: BasePayload
}

export const buildDocument = async (input: BuildInput): Promise<Document> => {
  const { options, ctx, config, payload } = input
  const { logger } = payload
  const t = makeT(ctx.i18n)
  const paths: PathsObject = {}
  const schemas: Record<string, SchemaObject> = {}

  const { filters } = options
  const login = options.serve && options.interactiveAuth.enabled
  const finalize = async (
    group: PathsObject,
    kind: OperationKind,
    slug?: string,
    plugin?: string,
  ): Promise<PathsObject> =>
    applySecurity({
      paths: await filterOperations({ paths: group, slug, kind, filters, plugin }),
      slug,
      kind,
      plugin,
      security: options.security,
      login,
    })
  const access = filters.includeAuth && filters.includeAdminAuth
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
        operations: ['read', 'create', 'update', 'delete', 'validate', 'readVersions'],
        locale: ctx.locales[0],
        baseAccess: config.baseAccess,
      })
      const collectionPaths: PathsObject = { ...buildCollectionPaths({ collection, ctx, security, access }) }

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
            security,
          }),
        )
      }

      applyHierarchy({ collection, base, paths: collectionPaths, schemas, ctx })
      Object.assign(paths, await finalize(collectionPaths, 'collection', collection.slug))
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
        operations: ['read', 'update', 'validate', 'readVersions'],
        locale: ctx.locales[0],
        baseAccess: config.baseAccess,
      })
      const globalPaths: PathsObject = { ...buildGlobalPaths({ global, ctx, security, access }) }

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
            security,
            global: true,
          }),
        )
      }

      Object.assign(paths, await finalize(globalPaths, 'global', global.slug))
    } catch (error) {
      logger.warn(`${PLUGIN_NAME}: skipped global "${global.slug}": ${(error as Error).message}`)
    }
  }

  if (filters.includeCustom) {
    try {
      Object.assign(
        paths,
        stripPluginKeys(await finalize(buildCustomEndpointPaths({ config, collections, globals, ctx }), 'custom')),
      )
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
      const runAccess = (jobsConfig?.access as { run?: Access } | undefined)?.run
      const jobsSecurity = (await evaluateAccess(runAccess, { baseAccess: config.baseAccess }))
        ? undefined
        : securedRequirement()
      Object.assign(paths, await finalize(buildJobsPaths({ config, ctx, security: jobsSecurity }), 'jobs'))
    } catch (error) {
      logger.warn(`${PLUGIN_NAME}: failed to add jobs endpoint: ${(error as Error).message}`)
    }
  }

  const uploadSlugs = collections.filter((c) => c.upload).map((c) => c.slug)
  Object.assign(paths, await finalize(buildSystemPaths({ ctx, access, uploadSlugs }), 'system'))

  const pluginTags: string[] = []
  for (const plugin of OFFICIAL_PLUGINS) {
    try {
      const installed = config.plugins?.find((p) => p.slug === plugin.slug)
      if (!(plugin.installed?.(config) ?? installed)) continue
      const groups = plugin.build({ config, collections, ctx, options: installed?.options, schemas, t })
      for (const group of groups) {
        const finalized = await finalize(group.paths, 'plugin', group.slug, plugin.slug)
        if (Object.keys(finalized).length === 0) continue
        Object.assign(paths, finalized)
        if (!pluginTags.includes(plugin.tag)) pluginTags.push(plugin.tag)
      }
    } catch (error) {
      logger.warn(`${PLUGIN_NAME}: skipped plugin "${plugin.slug}": ${(error as Error).message}`)
    }
  }

  const systemTags: SystemTag[] = []
  if (hasJobs) systemTags.push('Jobs')
  if (uploadSlugs.length > 0) systemTags.push('Uploads')
  if (access) systemTags.push('Access')

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
  if (login) {
    securitySchemes[INTERACTIVE_SCHEME_NAME] = interactiveSecurityScheme({
      tokenUrl: `${ctx.apiRoute}${options.interactiveAuth.path}`,
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
    ...options.info,
    description:
      `${resolveDescription(options.info.description, ctx) ?? ''}${localeNote}${docLanguagesNote}`.trim() || undefined,
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
      systemTags,
      pluginTags,
      t,
      nested: options.nestedTags,
    }),
    'x-doc-languages': ctx.docLanguages,
  } as Document

  for (const ext of options.extensions) {
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
    if (ext.transform) {
      doc = await ext.transform({ ...ctx, doc, payload, options })
      if (typeof doc?.openapi !== 'string' || 'payload' in doc) {
        throw new Error(`[${PLUGIN_NAME}] extensions[].transform must return the document, it gets ({ doc, payload })`)
      }
    }
  }

  return doc
}

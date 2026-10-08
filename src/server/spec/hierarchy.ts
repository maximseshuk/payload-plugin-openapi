import type { OperationObject, ParameterObject, PathsObject, SchemaObject } from '@scalar/openapi-types/3.2'
import type { SanitizedCollectionConfig } from 'payload'

import { createSchemaName, querySchemaName, updateSchemaName } from '@/server/spec/names.js'
import { makeT } from '@/shared/translations/index.js'
import type { BuildContext } from '@/shared/types/index.js'

export const applyHierarchy = ({
  collection,
  base,
  paths,
  schemas,
  ctx,
}: {
  collection: SanitizedCollectionConfig
  base: string
  paths: PathsObject
  schemas: Record<string, SchemaObject>
  ctx: BuildContext
}): void => {
  const { hierarchy } = collection
  if (!hierarchy) return
  const t = makeT(ctx.i18n)
  const pathFields = {
    [hierarchy.slugPathFieldName]: t('schemaHierarchySlugPath'),
    [hierarchy.titlePathFieldName]: t('schemaHierarchyTitlePath'),
  }

  const read = schemas[base]?.properties
  for (const [name, description] of Object.entries(pathFields)) {
    if (read?.[name]) read[name] = { ...read[name], readOnly: true, description }
    for (const other of [createSchemaName(base), updateSchemaName(base), querySchemaName(base)]) {
      delete schemas[other]?.properties?.[name]
    }
  }

  const param: ParameterObject = {
    name: 'computeHierarchyPaths',
    in: 'query',
    description: t('paramComputeHierarchyPaths', {
      slugPath: hierarchy.slugPathFieldName,
      titlePath: hierarchy.titlePathFieldName,
    }),
    schema: { type: 'boolean' },
  }
  const route = `${ctx.apiRoute}/${collection.slug}`
  for (const op of [paths[route]?.get, paths[`${route}/{id}`]?.get] as (OperationObject | undefined)[]) {
    op?.parameters?.push(param)
  }
}

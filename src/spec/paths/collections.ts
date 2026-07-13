import type { SanitizedCollectionConfig } from 'payload'
import type {
  PathsObject,
  ReferenceObject,
  RequestBodyObject,
  ResponsesObject,
  SchemaObject,
} from '@scalar/openapi-types/3.2'

import type { BuildContext } from '../../types.js'
import { makeT } from '../../translations/index.js'
import { ERRORS, errorResponses, jsonOk, uploadRequestBody } from '../components.js'
import { createSchemaName, listSchemaName, refTo, schemaName, updateSchemaName } from '../names.js'
import { buildListParams, buildParamSchemas, commonReadParams, type ReadParamRefs } from '../params.js'
import type { EntitySecurity } from '../security.js'

export const buildCollectionPaths = ({
  collection,
  ctx,
  security = {},
}: {
  collection: SanitizedCollectionConfig
  ctx: BuildContext
  security?: EntitySecurity
}): PathsObject => {
  const t = makeT(ctx.i18n)
  const name = schemaName(collection.slug)
  const base = `${ctx.apiRoute}/${collection.slug}`
  const docRef: ReferenceObject = { $ref: refTo(name) }
  const listRef: ReferenceObject = { $ref: refTo(listSchemaName(name)) }
  const createRef: ReferenceObject = { $ref: refTo(createSchemaName(name)) }
  const updateRef: ReferenceObject = { $ref: refTo(updateSchemaName(name)) }
  const idType = ctx.defaultIDType === 'number' ? 'integer' : 'string'
  const { read: secRead, create: secCreate, update: secUpdate, delete: secDelete } = security

  const allowBulk = collection.disableBulkEdit !== true
  const allowDuplicate = collection.disableDuplicate !== true

  const paramSchemas = buildParamSchemas({ fields: collection.fields, ctx })
  const refs: ReadParamRefs = {
    select: true,
    populate: Boolean(paramSchemas.populate),
    joins: Boolean(paramSchemas.joins),
  }

  const isUpload = Boolean(collection.upload)
  const fileRequiredOnCreate =
    typeof collection.upload === 'object' ? collection.upload.filesRequiredOnCreate !== false : true

  const requestBody = (ref: ReferenceObject, fileRequired: boolean): RequestBodyObject =>
    isUpload
      ? uploadRequestBody({ bodyRef: ref, fileRequired, t })
      : { content: { 'application/json': { schema: ref } } }

  const mutationSchema: SchemaObject = {
    type: 'object',
    properties: { message: { type: 'string' }, doc: docRef },
  }

  const listResponse: ResponsesObject = {
    ...jsonOk(t('collectionList'), listRef),
    ...errorResponses(ERRORS.list, t),
  }
  const findByIdResponse: ResponsesObject = {
    ...jsonOk(t('collectionDoc'), docRef),
    ...errorResponses(ERRORS.read, t),
  }
  const createResponse: ResponsesObject = {
    ...jsonOk(t('collectionCreated'), mutationSchema),
    ...errorResponses(ERRORS.create, t),
  }
  const updateResponse: ResponsesObject = {
    ...jsonOk(t('collectionUpdated'), mutationSchema),
    ...errorResponses(ERRORS.update, t),
  }
  const deleteResponse: ResponsesObject = {
    ...jsonOk(t('collectionDeleted'), mutationSchema),
    ...errorResponses(ERRORS.delete, t),
  }

  const bulkSchema: SchemaObject = {
    type: 'object',
    properties: {
      message: { type: 'string' },
      docs: { type: 'array', items: docRef },
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: { message: { type: 'string' }, id: { type: idType } },
        },
      },
    },
  }
  const bulkUpdateResponse: ResponsesObject = {
    ...jsonOk(t('collectionBulkUpdate'), bulkSchema),
    ...errorResponses(ERRORS.update, t),
  }
  const bulkDeleteResponse: ResponsesObject = {
    ...jsonOk(t('collectionBulkDelete'), bulkSchema),
    ...errorResponses(ERRORS.delete, t),
  }
  const countResponse: ResponsesObject = {
    ...jsonOk(t('collectionCount'), { type: 'object', properties: { totalDocs: { type: 'integer' } } }),
    ...errorResponses(ERRORS.list, t),
  }

  const whereParameter = buildListParams({ base: name, fields: collection.fields, ctx, refs }).find(
    (p) => p.name === 'where',
  )
  const bulkParams = whereParameter ? [whereParameter] : []

  const bulkOps = allowBulk
    ? {
        patch: {
          tags: [name],
          operationId: `update${name}`,
          parameters: bulkParams,
          requestBody: requestBody(updateRef, false),
          responses: bulkUpdateResponse,
          security: secUpdate,
        },
        delete: {
          tags: [name],
          operationId: `delete${name}`,
          parameters: bulkParams,
          responses: bulkDeleteResponse,
          security: secDelete,
        },
      }
    : {}

  const paths: PathsObject = {
    [base]: {
      get: {
        tags: [name],
        operationId: `find${name}`,
        parameters: buildListParams({ base: name, fields: collection.fields, ctx, refs }),
        responses: listResponse,
        security: secRead,
      },
      post: {
        tags: [name],
        operationId: `create${name}`,
        requestBody: requestBody(createRef, fileRequiredOnCreate),
        responses: createResponse,
        security: secCreate,
      },
      ...bulkOps,
    },
    [`${base}/count`]: {
      get: {
        tags: [name],
        operationId: `count${name}`,
        parameters: bulkParams,
        responses: countResponse,
        security: secRead,
      },
    },
    [`${base}/{id}`]: {
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: idType } }],
      get: {
        tags: [name],
        operationId: `find${name}ById`,
        parameters: commonReadParams({ base: name, ctx, refs }),
        responses: findByIdResponse,
        security: secRead,
      },
      patch: {
        tags: [name],
        operationId: `update${name}ById`,
        requestBody: requestBody(updateRef, false),
        responses: updateResponse,
        security: secUpdate,
      },
      delete: { tags: [name], operationId: `delete${name}ById`, responses: deleteResponse, security: secDelete },
    },
  }

  if (allowDuplicate) {
    paths[`${base}/{id}/duplicate`] = {
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: idType } }],
      post: {
        tags: [name],
        operationId: `duplicate${name}`,
        responses: { ...jsonOk(t('collectionDuplicated'), mutationSchema), ...errorResponses(ERRORS.create, t) },
        security: secCreate,
      },
    }
  }

  return paths
}

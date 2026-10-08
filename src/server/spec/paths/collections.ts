import type {
  PathsObject,
  ReferenceObject,
  RequestBodyObject,
  ResponsesObject,
  SchemaObject,
} from '@scalar/openapi-types/3.2'
import type { SanitizedCollectionConfig } from 'payload'

import {
  ERRORS,
  docAccessOperation,
  errorResponses,
  jsonOk,
  jsonResponse,
  uploadRequestBody,
  validateOperation,
} from '@/server/spec/components.js'
import { createSchemaName, listSchemaName, refTo, schemaName, updateSchemaName } from '@/server/spec/names.js'
import {
  buildListParams,
  buildParamSchemas,
  commonReadParams,
  type ReadParamRefs,
  validateParams,
  writeParams,
  type WriteOperation,
} from '@/server/spec/params.js'
import type { EntitySecurity } from '@/server/spec/security.js'
import { makeT } from '@/shared/translations/index.js'
import type { BuildContext } from '@/shared/types/index.js'

export const buildCollectionPaths = ({
  collection,
  ctx,
  security = {},
  access = false,
}: {
  collection: SanitizedCollectionConfig
  ctx: BuildContext
  security?: EntitySecurity
  access?: boolean
}): PathsObject => {
  const t = makeT(ctx.i18n)
  const name = schemaName(collection.slug)
  const base = `${ctx.apiRoute}/${collection.slug}`
  const docRef: ReferenceObject = { $ref: refTo(name) }
  const listRef: ReferenceObject = { $ref: refTo(listSchemaName(name)) }
  const createRef: ReferenceObject = { $ref: refTo(createSchemaName(name)) }
  const updateRef: ReferenceObject = { $ref: refTo(updateSchemaName(name)) }
  const idType = ctx.defaultIDType === 'number' ? 'integer' : 'string'
  const { read: secRead, create: secCreate, update: secUpdate, delete: secDelete, validate: secValidate } = security

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
    '201': jsonResponse(t('collectionCreated'), mutationSchema),
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

  const listParams = buildListParams({ base: name, fields: collection.fields, ctx, refs })
  const bulkParams = listParams.filter((p) => p.name === 'where')
  const bulkUpdateParams = listParams.filter((p) => ['limit', 'sort', 'where'].includes(p.name))
  const write = (operation: WriteOperation) => writeParams({ base: name, entity: collection, ctx, refs, operation })
  const deleteParams = write('delete')

  const bulkOps = allowBulk
    ? {
        patch: {
          tags: [name],
          operationId: `update${name}`,
          parameters: [...bulkUpdateParams, ...write('update')],
          requestBody: requestBody(updateRef, false),
          responses: bulkUpdateResponse,
          security: secUpdate,
        },
        delete: {
          tags: [name],
          operationId: `delete${name}`,
          parameters: [...bulkParams, ...deleteParams],
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
        parameters: write('create'),
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
    [`${base}/validate`]: {
      post: validateOperation({
        tag: name,
        operationId: `validate${name}`,
        parameters: validateParams(ctx),
        requestBody: { ...requestBody(createRef, false), required: true },
        errors: ERRORS.create,
        security: secValidate,
        t,
      }),
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
        parameters: write('updateByID'),
        requestBody: requestBody(updateRef, false),
        responses: updateResponse,
        security: secUpdate,
      },
      delete: {
        tags: [name],
        operationId: `delete${name}ById`,
        parameters: deleteParams,
        responses: deleteResponse,
        security: secDelete,
      },
    },
  }

  paths[`${base}/{id}/validate`] = {
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: idType } }],
    post: validateOperation({
      tag: name,
      operationId: `validate${name}ById`,
      parameters: validateParams(ctx),
      requestBody: requestBody(updateRef, false),
      errors: ERRORS.update,
      security: secValidate,
      t,
    }),
  }

  if (allowDuplicate) {
    paths[`${base}/{id}/duplicate`] = {
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: idType } }],
      post: {
        tags: [name],
        operationId: `duplicate${name}`,
        parameters: write('duplicate'),
        responses: { ...jsonOk(t('collectionDuplicated'), mutationSchema), ...errorResponses(ERRORS.create, t) },
        security: secCreate,
      },
    }
  }

  if (access) {
    const auth = collection.auth
    const operations = [
      'create',
      'read',
      'update',
      'delete',
      'validate',
      ...(auth && auth.maxLoginAttempts ? ['unlock'] : []),
      ...(collection.versions ? ['readVersions'] : []),
    ]
    const accessOp = (operationId: string, errors: typeof ERRORS.read) =>
      docAccessOperation({ tag: name, operationId, operations, bodyRef: updateRef, errors, t })
    paths[`${base}/access`] = { post: accessOp(`access${name}`, ['500']) }
    paths[`${base}/access/{id}`] = {
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: idType } }],
      post: accessOp(`access${name}ById`, ['404', '500']),
    }
  }

  if (isUpload) {
    const file = { content: { '*/*': { schema: { type: 'string', format: 'binary' } } } } as const
    paths[`${base}/file/{filename}`] = {
      parameters: [{ name: 'filename', in: 'path', required: true, schema: { type: 'string' } }],
      get: {
        tags: [name],
        operationId: `get${name}File`,
        responses: {
          '200': { description: t('fileServe'), ...file },
          '206': { description: t('filePartial'), ...file },
          ...errorResponses(['400', '403', '404', '500'], t),
        },
        security: secRead,
      },
    }
  }

  return paths
}

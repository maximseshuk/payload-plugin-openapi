import type { OperationObject, SchemaObject } from '@scalar/openapi-types/3.2'

import { ERROR_SCHEMA_NAME, errorResponses, jsonBody, jsonResponse } from '@/server/spec/components.js'
import { refTo } from '@/server/spec/names.js'

import { type OfficialPlugin, mountEndpoints } from './shared.js'

const TAG = 'MCP'

const jsonRpcId: SchemaObject = { type: ['string', 'integer', 'null'] }

const jsonRpc: SchemaObject = {
  type: 'object',
  additionalProperties: true,
  properties: {
    jsonrpc: { type: 'string', enum: ['2.0'] },
    id: jsonRpcId,
    method: { type: 'string' },
    params: { type: 'object', additionalProperties: true },
    result: {},
    error: { type: 'object', additionalProperties: true },
  },
  required: ['jsonrpc'],
}

const jsonRpcBatch: SchemaObject = { oneOf: [jsonRpc, { type: 'array', items: jsonRpc }] }

const jsonRpcError: SchemaObject = {
  type: 'object',
  properties: {
    jsonrpc: { type: 'string', enum: ['2.0'] },
    error: {
      type: 'object',
      properties: { code: { type: 'integer' }, message: { type: 'string' }, data: {} },
      required: ['code', 'message'],
    },
    id: jsonRpcId,
  },
  required: ['jsonrpc', 'error', 'id'],
}

export const mcp: OfficialPlugin = {
  slug: '@payloadcms/plugin-mcp',
  tag: TAG,
  build: ({ config, ctx, t }) => {
    const rpcError = (description: string) => jsonResponse(description, jsonRpcError)
    const post: OperationObject = {
      tags: [TAG],
      operationId: 'mcp',
      summary: t('mcp'),
      description: t('mcpDesc'),
      parameters: [
        {
          name: 'overrideAccess',
          in: 'query',
          description: t('mcpOverrideAccess'),
          schema: { type: 'string', enum: ['true', 'false'] },
        },
        {
          name: 'MCP-Protocol-Version',
          in: 'header',
          description: t('mcpProtocolVersion'),
          schema: { type: 'string' },
        },
      ],
      requestBody: jsonBody(jsonRpcBatch),
      responses: {
        '200': jsonResponse(t('mcpResult'), jsonRpcBatch),
        '202': { description: t('mcpResult202') },
        '400': jsonResponse(t('errorPlugin400'), { oneOf: [jsonRpcError, { $ref: refTo(ERROR_SCHEMA_NAME) }] }),
        ...errorResponses(['401'], t),
        '404': rpcError(t('errorPluginMcp404')),
        '406': rpcError(t('errorPluginMcp406')),
        '413': rpcError(t('errorPluginMcp413')),
        '415': rpcError(t('errorPluginMcp415')),
        '500': rpcError(t('errorPlugin500')),
      },
    }
    const get: OperationObject = {
      tags: [TAG],
      operationId: 'mcpStream',
      summary: t('mcpGet'),
      responses: {
        '405': {
          description: t('errorPluginMcpGet405'),
          headers: { Allow: { schema: { type: 'string', enum: ['POST'] } } },
        },
      },
    }
    return [
      {
        paths: mountEndpoints(config.endpoints, ctx.apiRoute, ({ method, path }) => {
          if (path !== '/mcp') return undefined
          if (method === 'post') return post
          return method === 'get' ? get : undefined
        }),
      },
    ]
  },
}

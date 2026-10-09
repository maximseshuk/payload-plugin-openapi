import type { OperationObject, SchemaObject } from '@scalar/openapi-types/3.2'

import { errorResponses, jsonBody, jsonResponse } from '@/server/spec/components.js'

import { type OfficialPlugin, mountEndpoints } from './shared.js'

const TAG = 'MCP'

const jsonRpc: SchemaObject = {
  type: 'object',
  additionalProperties: true,
  properties: {
    jsonrpc: { type: 'string', enum: ['2.0'] },
    id: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
    method: { type: 'string' },
    params: { type: 'object', additionalProperties: true },
    result: {},
    error: { type: 'object', additionalProperties: true },
  },
  required: ['jsonrpc'],
}

const jsonRpcBatch: SchemaObject = { oneOf: [jsonRpc, { type: 'array', items: jsonRpc }] }

export const mcp: OfficialPlugin = {
  slug: '@payloadcms/plugin-mcp',
  tag: TAG,
  build: ({ config, ctx, t }) => {
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
      ],
      requestBody: jsonBody(jsonRpcBatch),
      responses: {
        '200': jsonResponse(t('mcpResult'), jsonRpcBatch),
        ...errorResponses(['400', '401'], t),
      },
    }
    const get: OperationObject = {
      tags: [TAG],
      operationId: 'mcpStream',
      summary: t('mcpGet'),
      responses: {
        '405': { description: t('mcpGetResult'), headers: { Allow: { schema: { type: 'string', enum: ['POST'] } } } },
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

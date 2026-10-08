import type { ParameterObject, PathsObject, SchemaObject } from '@scalar/openapi-types/3.2'
import type { SanitizedCollectionConfig } from 'payload'
import { describe, expect, it } from 'vitest'

import { applyHierarchy } from '@/server/spec/hierarchy.js'

import { ctx } from '../helpers/context.js'

const text: SchemaObject = { type: 'string' }

const setup = (hierarchy: SanitizedCollectionConfig['hierarchy']) => {
  const paths: PathsObject = {
    '/api/folders': { get: { parameters: [] }, post: { parameters: [] } },
    '/api/folders/{id}': { get: { parameters: [] }, patch: { parameters: [] } },
  }
  const props = () => ({ name: text, crumbs: text, titles: text })
  const schemas: Record<string, SchemaObject> = {
    Folders: { type: 'object', properties: props() },
    FoldersCreate: { type: 'object', properties: props() },
    FoldersUpdate: { type: 'object', properties: props() },
    FoldersQueryOperations: { type: 'object', properties: props() },
    FoldersSelect: { type: 'object', properties: props() },
  }
  const collection = { slug: 'folders', hierarchy } as unknown as SanitizedCollectionConfig
  applyHierarchy({ collection, base: 'Folders', paths, schemas, ctx })
  return { paths, schemas }
}

const names = (op: unknown) => ((op as { parameters: ParameterObject[] }).parameters ?? []).map((p) => p.name)

describe('applyHierarchy', () => {
  it('uses the configured path field names', () => {
    const { paths, schemas } = setup({
      slugPathFieldName: 'crumbs',
      titlePathFieldName: 'titles',
    } as SanitizedCollectionConfig['hierarchy'])

    for (const name of ['crumbs', 'titles']) {
      expect(schemas.Folders.properties?.[name]).toMatchObject({ type: 'string', readOnly: true })
      expect(schemas.FoldersCreate.properties?.[name]).toBeUndefined()
      expect(schemas.FoldersUpdate.properties?.[name]).toBeUndefined()
      expect(schemas.FoldersQueryOperations.properties?.[name]).toBeUndefined()
      expect(schemas.FoldersSelect.properties?.[name]).toEqual(text)
    }
    expect(schemas.FoldersCreate.properties?.name).toEqual(text)

    const param = paths['/api/folders']?.get?.parameters?.[0] as ParameterObject
    expect(param).toMatchObject({ name: 'computeHierarchyPaths', in: 'query', schema: { type: 'boolean' } })
    expect(param.description).toContain('`crumbs`')
    expect(names(paths['/api/folders/{id}']?.get)).toEqual(['computeHierarchyPaths'])
    expect(names(paths['/api/folders']?.post)).toEqual([])
    expect(names(paths['/api/folders/{id}']?.patch)).toEqual([])
  })

  it('leaves a collection without hierarchy untouched', () => {
    const { paths, schemas } = setup(false)
    expect(schemas.Folders.properties?.crumbs).toEqual(text)
    expect(schemas.FoldersCreate.properties?.crumbs).toEqual(text)
    expect(names(paths['/api/folders']?.get)).toEqual([])
  })
})

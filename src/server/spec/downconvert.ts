import type { Document, TagObject } from '@scalar/openapi-types/3.2'

const NULL = 'null'

const UNSUPPORTED_KEYWORDS = [
  '$schema',
  '$id',
  '$comment',
  'unevaluatedProperties',
  'patternProperties',
  'propertyNames',
]

const isStringType = (type: unknown): boolean => type === 'string' || (Array.isArray(type) && type.includes('string'))

const downconvertTo30 = (node: unknown): unknown => {
  if (Array.isArray(node)) return node.map(downconvertTo30)
  if (!node || typeof node !== 'object') return node

  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
    out[key] = downconvertTo30(value)
  }

  if (isStringType(out.type) && out.contentMediaType === 'application/octet-stream') {
    if (out.format === undefined) out.format = 'binary'
    delete out.contentMediaType
  }
  if (isStringType(out.type) && out.contentEncoding === 'base64') {
    if (out.format === undefined) out.format = 'byte'
    delete out.contentEncoding
  }

  if (Array.isArray(out.type)) {
    const types = out.type as string[]
    const nullable = types.includes(NULL)
    const rest = types.filter((t) => t !== NULL)
    if (rest.length === 1) {
      out.type = rest[0]
      if (nullable) out.nullable = true
    } else if (rest.length > 1) {
      delete out.type
      const union = rest.map((type) => (nullable ? { type, nullable: true } : { type }))
      if (out.anyOf) out.allOf = [...((out.allOf as unknown[]) ?? []), { anyOf: union }]
      else out.anyOf = union
    }
  }

  if ('const' in out) {
    out.enum = [out.const]
    delete out.const
  }

  if (Array.isArray(out.examples)) {
    const examples = out.examples
    if (examples.length > 0) out.example = examples[0]
    if (examples.length > 1) out['x-examples'] = examples
    delete out.examples
  }

  if (Array.isArray(out.required) && out.required.length === 0) delete out.required

  for (const keyword of UNSUPPORTED_KEYWORDS) delete out[keyword]

  return out
}

export const toOpenApi31 = (doc: Document): Document => ({
  ...doc,
  openapi: '3.1.2',
  tags: doc.tags?.map(({ kind: _kind, parent: _parent, summary: _summary, ...rest }: TagObject) => rest),
})

export const toOpenApi30 = (doc: Document): Document => {
  const converted = downconvertTo30(toOpenApi31(doc)) as Document
  converted.openapi = '3.0.4'
  delete converted.info.summary
  delete converted.info.license?.identifier
  return converted
}

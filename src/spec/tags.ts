import type { TagObject } from '@scalar/openapi-types/3.2'
import type { Translate } from '../translations/types.js'

export const NAV_COLLECTIONS = 'Collections'
export const NAV_GLOBALS = 'Globals'
export const NAV_SYSTEM = 'System'

export const entityTagName = (base: string): string => base
export const authTagName = (base: string): string => `${base} Auth`
export const versionsTagName = (base: string): string => `${base} Versions`

export interface CollectionTagInfo {
  base: string
  hasAuth: boolean
  hasVersions: boolean
  description?: string
}

export interface GlobalTagInfo {
  base: string
  hasVersions: boolean
  description?: string
}

export interface TagHierarchyInput {
  collections: CollectionTagInfo[]
  globals: GlobalTagInfo[]
  hasJobs: boolean
  t: Translate
  nested: boolean
}

export const buildTagHierarchy = ({ collections, globals, hasJobs, t, nested }: TagHierarchyInput): TagObject[] => {
  if (!nested) {
    return [
      ...collections.map((c) => ({ name: entityTagName(c.base), description: c.description })),
      ...globals.map((g) => ({ name: entityTagName(g.base), description: g.description })),
    ]
  }

  const tags: TagObject[] = []

  if (collections.length > 0) {
    tags.push({
      name: NAV_COLLECTIONS,
      summary: t('tagCollections'),
      description: t('tagCollectionsDesc'),
      kind: 'nav',
    })
    for (const c of collections) {
      tags.push({ name: entityTagName(c.base), parent: NAV_COLLECTIONS, description: c.description })
      if (c.hasAuth) tags.push({ name: authTagName(c.base), parent: c.base, summary: t('tagAuth') })
      if (c.hasVersions) tags.push({ name: versionsTagName(c.base), parent: c.base, summary: t('tagVersions') })
    }
  }

  if (globals.length > 0) {
    tags.push({ name: NAV_GLOBALS, summary: t('tagGlobals'), description: t('tagGlobalsDesc'), kind: 'nav' })
    for (const g of globals) {
      tags.push({ name: entityTagName(g.base), parent: NAV_GLOBALS, description: g.description })
      if (g.hasVersions) tags.push({ name: versionsTagName(g.base), parent: g.base, summary: t('tagVersions') })
    }
  }

  if (hasJobs) {
    tags.push({ name: NAV_SYSTEM, summary: t('tagSystem'), description: t('tagSystemDesc'), kind: 'nav' })
    tags.push({ name: 'Jobs', parent: NAV_SYSTEM, summary: t('tagJobs') })
  }

  return tags
}

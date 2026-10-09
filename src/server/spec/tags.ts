import type { TagObject } from '@scalar/openapi-types/3.2'

import type { Translate } from '@/shared/translations/types.js'

export const NAV_COLLECTIONS = 'Collections'
export const NAV_GLOBALS = 'Globals'
export const NAV_SYSTEM = 'System'
export const NAV_PLUGINS = 'Plugins'

export const entityTagName = (base: string): string => base
export const authTagName = (base: string): string => `${base} Auth`
export const versionsTagName = (base: string): string => `${base} Versions`

const SYSTEM_TAG_SUMMARIES = { Jobs: 'tagJobs', Uploads: 'tagUploads', Access: 'tagAccess' } as const

export type SystemTag = keyof typeof SYSTEM_TAG_SUMMARIES

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
  systemTags: SystemTag[]
  pluginTags?: string[]
  t: Translate
  nested: boolean
}

export const buildTagHierarchy = ({
  collections,
  globals,
  systemTags,
  pluginTags = [],
  t,
  nested,
}: TagHierarchyInput): TagObject[] => {
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

  if (systemTags.length > 0) {
    tags.push({ name: NAV_SYSTEM, summary: t('tagSystem'), description: t('tagSystemDesc'), kind: 'nav' })
    for (const name of systemTags) tags.push({ name, parent: NAV_SYSTEM, summary: t(SYSTEM_TAG_SUMMARIES[name]) })
  }

  const taken = new Set(tags.map((tag) => tag.name))
  const freePluginTags = pluginTags.filter((name) => !taken.has(name))
  if (freePluginTags.length > 0) {
    tags.push({ name: NAV_PLUGINS, summary: t('tagPlugins'), description: t('tagPluginsDesc'), kind: 'nav' })
    for (const name of freePluginTags) tags.push({ name, parent: NAV_PLUGINS })
  }

  return tags
}

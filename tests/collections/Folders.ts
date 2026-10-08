import type { CollectionConfig } from 'payload'

export const Folders: CollectionConfig = {
  slug: 'folders',
  admin: { useAsTitle: 'name' },
  folders: { collectionSpecific: true, joinField: { name: 'children' } },
  fields: [{ name: 'name', type: 'text', required: true }],
}

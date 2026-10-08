import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: { useAsTitle: 'name' },
  lockDocuments: false,
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'color', type: 'text' },
  ],
}

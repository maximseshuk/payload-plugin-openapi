import { createFolderField } from 'payload'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    mimeTypes: ['image/*'],
  },
  fields: [{ name: 'alt', type: 'text' }, createFolderField({ relationTo: 'folders' })],
}

import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    mimeTypes: ['image/*'],
    imageSizes: [{ name: 'thumbnail', width: 400, height: 300 }],
  },
  fields: [{ name: 'alt', type: 'text' }],
}

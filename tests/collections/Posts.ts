import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: { description: 'Blog posts and articles' },
  versions: { drafts: { localizeStatus: true }, maxPerDoc: 10 },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        {
          slug: 'hero',
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'subheading', type: 'text' },
            { name: 'image', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          slug: 'richText',
          fields: [
            { name: 'content', type: 'textarea', required: true },
            {
              name: 'alignment',
              type: 'select',
              options: ['left', 'center', 'right'],
              defaultValue: 'left',
            },
          ],
        },
        {
          slug: 'gallery',
          fields: [
            { name: 'images', type: 'upload', relationTo: 'media', hasMany: true },
            { name: 'columns', type: 'number', defaultValue: 3 },
          ],
        },
      ],
    },
    {
      name: 'callouts',
      type: 'blocks',
      blockReferences: ['callToAction'],
      blocks: [],
    },
    { name: 'slug', type: 'text', unique: true },
    { name: 'legacyField', type: 'text', custom: { openapi: { deprecated: true } } },
    {
      name: 'phone',
      type: 'text',
      custom: {
        openapi: {
          format: 'phone',
          pattern: '^\\+[1-9]\\d{1,14}$',
          example: '+14155552671',
          description: {
            en: 'E.164 formatted phone number',
            de: 'Telefonnummer im E.164-Format',
          },
        },
      },
    },
    {
      name: 'website',
      type: 'text',
      custom: { openapi: { format: 'uri', example: 'https://example.com' } },
    },
    { name: 'body', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
    },
    {
      type: 'row',
      fields: [
        { name: 'publishedAt', type: 'date', timezone: true },
        { name: 'views', type: 'number' },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text' },
            { name: 'metaDescription', type: 'textarea' },
          ],
        },
      ],
    },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'author', type: 'relationship', relationTo: 'users' },
    { name: 'tags', type: 'relationship', relationTo: 'tags', hasMany: true },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
}

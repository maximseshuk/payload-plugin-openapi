import type { Block } from 'payload'

export const CallToAction: Block = {
  slug: 'callToAction',
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'href', type: 'text', required: true },
  ],
}

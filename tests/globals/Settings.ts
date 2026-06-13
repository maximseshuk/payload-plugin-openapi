import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  versions: { drafts: true },
  fields: [
    { name: 'siteName', type: 'text' },
    { name: 'maintenanceMode', type: 'checkbox', defaultValue: false },
  ],
}

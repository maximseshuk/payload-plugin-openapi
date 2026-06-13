import type { Field, NamedTab } from 'payload'

export const isHiddenField = (field: Field): boolean => 'hidden' in field && field.hidden === true

export const AUTH_FIELDS = new Set([
  'salt',
  'hash',
  'password',
  'resetPasswordToken',
  'resetPasswordExpiration',
  'loginAttempts',
  'lockUntil',
  'sessions',
])

const hasName = (field: object): boolean => 'name' in field && typeof (field as { name?: unknown }).name === 'string'

export const flattenFields = (fields: Field[]): Field[] => {
  const out: Field[] = []
  for (const field of fields) {
    if (field.type === 'ui') continue

    if (field.type === 'row' || field.type === 'collapsible') {
      out.push(...flattenFields(field.fields))
      continue
    }

    if (field.type === 'tabs') {
      for (const tab of field.tabs) {
        const tabName = hasName(tab) ? (tab as NamedTab).name : undefined
        if (tabName) {
          out.push({ type: 'group', name: tabName, fields: tab.fields } as unknown as Field)
        } else {
          out.push(...flattenFields(tab.fields))
        }
      }
      continue
    }

    if (field.type === 'group' && !hasName(field)) {
      out.push(...flattenFields(field.fields))
      continue
    }

    out.push(field)
  }
  return out
}

export const exposableFields = (fields: Field[]): Field[] =>
  flattenFields(fields).filter((field) => {
    const name = 'name' in field ? (field as { name?: string }).name : undefined
    return Boolean(name) && !isHiddenField(field) && !AUTH_FIELDS.has(name as string)
  })

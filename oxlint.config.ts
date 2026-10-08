import { oxlintBase } from '@seshuk/payload-plugin-tooling/oxlint'
import { defineConfig } from 'oxlint'

export default defineConfig({
  ...oxlintBase,
  ignorePatterns: [...oxlintBase.ignorePatterns, 'tests/.next', '**/next-env.d.ts', 'tests/app/(payload)/**'],
  rules: {
    ...oxlintBase.rules,
    'import/no-default-export': 'off',
    'unicorn/consistent-function-scoping': 'off',
  },
  overrides: [
    ...oxlintBase.overrides,
    {
      files: ['tests/**/*.{ts,tsx,mjs}'],
      rules: {
        'no-await-in-loop': 'off',
      },
    },
  ],
})

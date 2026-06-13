import { defineConfig } from 'oxlint'

export default defineConfig({
  plugins: ['typescript', 'unicorn', 'import', 'oxc'],
  categories: {
    correctness: 'error',
    suspicious: 'warn',
  },
  env: {
    node: true,
    es2024: true,
  },
  ignorePatterns: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/next-env.d.ts', 'tests/app/(payload)/**'],
  rules: {
    'import/no-default-export': 'off',
    'import/no-unassigned-import': 'off',
    'unicorn/consistent-function-scoping': 'off',
  },
  overrides: [
    {
      files: ['tests/**/*.{ts,tsx,mjs}'],
      rules: {
        'no-await-in-loop': 'off',
        'no-underscore-dangle': ['warn', { allow: ['_payload'] }],
      },
    },
  ],
})

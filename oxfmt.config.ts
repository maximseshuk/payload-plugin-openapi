import { defineConfig } from 'oxfmt'

export default defineConfig({
  printWidth: 120,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  ignorePatterns: [
    '**/node_modules/**',
    '**/dist/**',
    '**/.next/**',
    'pnpm-lock.yaml',
    '**/next-env.d.ts',
    'tests/app/(payload)/**',
  ],
})

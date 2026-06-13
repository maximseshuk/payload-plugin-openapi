import { defineConfig } from '@rslib/core'

export default defineConfig({
  source: {
    entry: { index: ['./src/**/*.ts'] },
  },
  lib: [
    {
      format: 'esm',
      bundle: false,
      dts: true,
    },
  ],
  output: {
    target: 'node',
  },
})

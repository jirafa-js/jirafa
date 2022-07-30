import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    shared: 'shared/index.ts',
  },
  dts: true,
  clean: true,
  format: ['cjs'],
})

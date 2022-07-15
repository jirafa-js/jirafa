import { defineConfig, loadEnv } from 'vite'
import { DIR_ROOT } from '@jirafa/cli/dist/shared'

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    server: {
      host: true,
      https: !!env.HTTPS,
      fs: {
        allow: [DIR_ROOT],
      },
    },
  }
})

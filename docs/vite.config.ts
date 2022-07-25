import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import { DIR_ROOT } from '@jirafa/cli/dist/shared'
import Components from 'unplugin-vue-components/vite'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { MdTransform } from './.vitepress/plugins/md-transform'

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
    resolve: {
      alias: [
        {
          find: '~/',
          replacement: `${resolve(__dirname, './.vitepress/theme/')}/`,
        },
      ],
    },
    plugins: [
      VueJsx(),
      Components({
        dirs: ['.vitepress/theme/components/globals'],
        allowOverrides: true,
        include: [/\.(vue|md)$/, /\.vue\?vue/],
      }),
      MdTransform(),
    ],
  }
})

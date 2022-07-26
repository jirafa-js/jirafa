import { resolve } from 'path'
import type { Alias } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import { DIR_ROOT } from '@jirafa/cli/dist/shared'
import Components from 'unplugin-vue-components/vite'
import VueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { MdTransform } from './.vitepress/plugins/md-transform'

const alias: Alias[] = [
  {
    find: '~/',
    replacement: `${resolve(__dirname, './.vitepress/theme/')}/`,
  },
]

if (process.env.NODE_ENV !== 'production') {
  alias.push(
    {
      find: /^jirafa(\/(es|lib))?$/,
      replacement: resolve(DIR_ROOT, 'packages/jirafa/index.ts'),
    },
    {
      find: /^jirafa\/(es|lib)\/(.*)$/,
      replacement: `${resolve(DIR_ROOT, 'packages')}/$2`,
    }
  )
}

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
      alias,
    },
    plugins: [
      VueJsx(),
      DefineOptions(),
      Components({
        dirs: ['.vitepress/theme/components/globals'],
        allowOverrides: true,
        include: [/\.(vue|md)$/, /\.vue\?vue/],
      }),
      MdTransform(),
    ],
  }
})

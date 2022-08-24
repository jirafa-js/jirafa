import { resolve } from 'path'
import { emptyDir } from 'fs-extra'
import type { BuildOptions, Format } from 'esbuild'
import { build } from 'esbuild'
import vue from 'unplugin-vue/esbuild'
import GlobalsPlugin from 'esbuild-plugin-globals'

import { DIR_ICONS } from '../../../cli/shared'
import { createLogger } from '../../../cli/src/utils/logger'
import { run } from '../../../cli/src/utils/precess'

const logger = createLogger()

const buildIcons = async () => {
  await emptyDir(resolve(DIR_ICONS, 'dist'))
  const log = logger.start('icon', 'Build start')
  await Promise.all([doBuild(true), doBuild(false)])
  log('Build success')
  run('pnpm run -F icons build:types')
}

async function doBuild(minify: boolean) {
  const getOptions = (format: Format) => {
    const options: BuildOptions = {
      entryPoints: [
        resolve(DIR_ICONS, 'global.ts'),
        resolve(DIR_ICONS, 'index.ts'),
      ],
      outdir: resolve(DIR_ICONS, 'dist'),
      target: 'es2018',
      platform: 'neutral',
      bundle: true,
      format,
      minifySyntax: true,
      plugins: [vue({ isProduction: true })],
    }

    if (format === 'iife') {
      options.plugins!.push(GlobalsPlugin({ vue: 'Vue' }))
      options.globalName = 'JirafaIconsVue'
    } else {
      options.external = ['vue']
    }

    return options
  }

  await Promise.all([
    build({
      ...getOptions('esm'),
      entryNames: `[name]${minify ? '.min' : ''}`,
      minify,
      // sourcemap: minify,
    }),
    build({
      ...getOptions('iife'),
      entryNames: `[name].iife${minify ? '.min' : ''}`,
      minify,
      // sourcemap: minify,
    }),
    build({
      ...getOptions('cjs'),
      entryNames: `[name]${minify ? '.min' : ''}`,
      outExtension: { '.js': '.cjs' },
      minify,
      // sourcemap: minify,
    }),
  ])
}

buildIcons()

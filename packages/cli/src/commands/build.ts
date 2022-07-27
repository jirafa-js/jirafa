import { resolve } from 'path'
import { remove } from 'fs-extra'
import fg from 'fast-glob'
import type { OutputOptions, Plugin, RollupBuild } from 'rollup'
import { rollup } from 'rollup'
import DefineOptions from 'unplugin-vue-define-options/rollup'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild'
import { PROJ_NAME } from '@jirafa/utils'
import {
  DIR_JA,
  DIR_OUTPOT_JA,
  DIR_OUTPOT_THEME,
  DIR_PKGS,
  excludeFiles,
} from '../../shared'
import { generateExternal } from '../utils/rollup'
import { createLogger } from '../utils/logger'

const looger = createLogger('build')

interface Options {
  component: boolean
  theme: boolean
}

export const release = async (opts: Options) => {
  if (opts.component) {
    await remove(DIR_OUTPOT_JA)
    buildModules()
    buildFullBundle(true)
    buildFullBundle(false)
  } else if (opts.theme) {
    await remove(DIR_OUTPOT_THEME)
  }
}

const aliasPlugin: () => Plugin = () => ({
  name: 'rollup-plugin-jirafa-alias',
  resolveId(id: string) {
    if (!id.startsWith('@jirafa/theme')) return
    return {
      id: id.replaceAll('@jirafa/theme', 'jirafa/theme'),
      external: 'absolute',
    }
  },
})

async function buildModules() {
  const log = looger.start('Modules', `Build start`)
  const input = excludeFiles(
    await fg(
      ['**/*.{js,ts,vue}', '!**/packages/cli/**/*', '!**/examples/**/*'],
      {
        cwd: DIR_PKGS,
        onlyFiles: true,
        absolute: true,
      }
    )
  )

  const bundle = await rollup({
    input,
    plugins: [
      aliasPlugin(),
      DefineOptions(),
      vue({ isProduction: false }),
      vueJsx(),
      nodeResolve({ extensions: ['.js', '.mjs', '.ts', '.json'] }),
      json(),
      commonjs(),
      esbuild({
        sourceMap: true,
        target: 'es2018',
        loaders: {
          '.vue': 'ts',
        },
      }),
    ],
    external: generateExternal({ full: false }),
    treeshake: false,
  })

  await writeBundle(bundle, [
    {
      format: 'cjs',
      dir: resolve(DIR_OUTPOT_JA, 'lib'),
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: DIR_JA,
      sourcemap: true,
      entryFileNames: '[name].js',
    },
    {
      format: 'esm',
      dir: resolve(DIR_OUTPOT_JA, 'es'),
      preserveModules: true,
      preserveModulesRoot: DIR_JA,
      sourcemap: true,
      entryFileNames: '[name].mjs',
    },
  ])

  log(`Build success`)
}

async function buildFullBundle(minify: boolean) {
  const log = looger.start(
    'full',
    `Build full-bundle ${minify ? 'minify' : ''} start`
  )

  const plugins = [
    aliasPlugin(),
    DefineOptions(),
    vue({ isProduction: true }),
    vueJsx(),
    nodeResolve({ extensions: ['.js', '.mjs', '.ts', '.json'] }),
    json(),
    commonjs(),
    esbuild({
      sourceMap: minify,
      target: 'es2018',
      loaders: {
        '.vue': 'ts',
      },
      treeShaking: true,
      define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
      },
      legalComments: 'eof',
    }),
  ]

  if (minify) {
    plugins.push(minifyPlugin())
  }

  const bundle = await rollup({
    input: resolve(DIR_JA, 'index.ts'),
    plugins,
    external: generateExternal({ full: true }),
    treeshake: true,
  })

  await writeBundle(bundle, [
    {
      format: 'umd',
      file: resolve(
        DIR_OUTPOT_JA,
        'dist',
        `index.full${minify ? '.min' : ''}.js`
      ),
      name: PROJ_NAME,
      exports: 'named',
      globals: { vue: 'Vue' },
      sourcemap: minify,
    },
    {
      format: 'esm',
      file: resolve(
        DIR_OUTPOT_JA,
        'dist',
        `index.full${minify ? '.min' : ''}.mjs`
      ),
      sourcemap: minify,
    },
  ])

  log(`Build full-bundle ${minify ? 'minify' : ''} success`)
}

function writeBundle(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)))
}

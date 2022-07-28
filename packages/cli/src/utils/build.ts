import { join, resolve } from 'path'
import { copyFile, mkdir, remove } from 'fs-extra'
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
  DIR_ROOT,
  PKG_JA,
} from '../../shared'
import { generateExternal } from './rollup'
import { createLogger } from './logger'
import { buildTheme } from './build-theme'

const looger = createLogger('build')

export async function buildComponents() {
  const log = looger.start('component', `Build start`)
  await remove(DIR_OUTPOT_JA)
  await mkdir(DIR_OUTPOT_JA, { recursive: true })
  buildModules()
  buildFullBundle(true)
  buildFullBundle(false)
  await buildTheme()
  copyFullStyle()
  copyFiles()
  log('Build success')
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
  const input = await fg('**/*.{js,ts}', {
    cwd: DIR_PKGS,
    onlyFiles: true,
    absolute: true,
    ignore: [
      '**/cli',
      '**/examples',
      '**/__tests__',
      '**/node_modules',
      '**/dist',
    ],
  })

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
    `Build full-bundle${minify ? ' minify' : ''} start`
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

  log(`Build full-bundle${minify ? ' minify' : ''} success`)
}

function writeBundle(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)))
}

async function copyFullStyle() {
  looger.info('full', 'Copy full style')

  await mkdir(resolve(DIR_OUTPOT_JA, 'dist'), { recursive: true })
  await copyFile(
    resolve(DIR_OUTPOT_THEME, 'index.css'),
    resolve(DIR_OUTPOT_JA, 'dist/index.css')
  )
}

function copyFiles() {
  looger.info('component', 'Copy files')
  return Promise.all([
    copyFile(PKG_JA, join(DIR_OUTPOT_JA, 'package.json')),
    copyFile(
      resolve(DIR_ROOT, 'README.md'),
      resolve(DIR_OUTPOT_JA, 'README.md')
    ),
    // copyFile(
    //   resolve(DIR_ROOT, 'global.d.ts'),
    //   resolve(DIR_OUTPOT_JA, 'global.d.ts')
    // ),
  ])
}

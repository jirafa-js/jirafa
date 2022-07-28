import { resolve } from 'path'
import { mkdir, remove } from 'fs-extra'
import dartSass from 'sass'
import type { TaskFunction } from 'gulp'
import { dest, src } from 'gulp'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCss from 'gulp-clean-css'
import rename from 'gulp-rename'
import chalk from 'chalk'

import { PREFIX } from '@jirafa/utils'
import { DIR_OUTPOT_THEME, DIR_THEME } from '../../shared'
import { createLogger } from './logger'

const looger = createLogger('build')

export async function buildTheme() {
  await remove(DIR_OUTPOT_THEME)
  await mkdir(DIR_OUTPOT_THEME, { recursive: true })
  copyThemeSource()
  await buildScss()
}

function buildScss() {
  const log = looger.start('scss', 'Build start')
  const sass = gulpSass(dartSass)
  return new Promise<void>((resolve) => {
    src('src/*.scss', { cwd: DIR_THEME })
      .pipe(sass.sync())
      .pipe(autoprefixer({ cascade: true }))
      .pipe(
        cleanCss({}, (details) => {
          looger.success(
            'scss',
            `${chalk.cyan(details.name)}: ${chalk.yellow(
              details.stats.originalSize / 1000
            )} KB -> ${chalk.green(details.stats.minifiedSize / 1000)} KB`
          )
        })
      )
      .pipe(
        rename((path) => {
          if (!/index/.test(path.basename)) {
            path.basename = `${PREFIX}-${path.basename}`
          }
        })
      )
      .pipe(dest(DIR_OUTPOT_THEME, {}))
      .on('end', () => {
        log('Build success')
        resolve()
      })
  })
}

function copyThemeSource() {
  looger.info('scss', 'Copy theme source')
  return src('src/**', { cwd: DIR_THEME }).pipe(
    dest(resolve(DIR_OUTPOT_THEME, 'src'))
  )
}

export function withTaskName<T extends TaskFunction>(name: string, fn: T) {
  return Object.assign(fn, { displayName: name })
}

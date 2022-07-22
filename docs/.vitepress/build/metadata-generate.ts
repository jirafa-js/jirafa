import { resolve } from 'path'
import { DIR_COMPS, DIR_DOCS } from '@jirafa/cli/dist/shared'
import fs from 'fs-extra'
import consola from 'consola'
import chalk from 'chalk'
import fg from 'fast-glob'

const dirMetadata = resolve(DIR_DOCS, '.vitepress/metadata')
const localeOutput = resolve(DIR_DOCS, '.vitepress/i18n')

async function main() {
  const locales = await genLocales()
  await symlinkComponent(locales)
  await traverseDir(
    resolve(dirMetadata, 'en-US'),
    locales
      .filter((locale) => locale !== 'en-US')
      .map((locale) => ({ locale, pathname: resolve(dirMetadata, locale) })),
    localeOutput
  )
}

async function symlinkComponent(locales: string[]) {
  await emptydir([
    resolve(DIR_DOCS, 'examples'),
    ...locales.map((locale) => resolve(DIR_DOCS, locale, 'component')),
  ])

  const comps = await fg('*', { cwd: DIR_COMPS, onlyDirectories: true })
  for (const comp of comps) {
    await fs.symlink(
      resolve(DIR_COMPS, comp, 'examples'),
      resolve(DIR_DOCS, `examples/${comp}`)
    )

    for (const locale of locales) {
      let localeDoc = resolve(DIR_COMPS, comp, `docs/${locale}.md`)
      if (!fs.pathExistsSync(localeDoc)) {
        localeDoc = resolve(DIR_COMPS, comp, `docs/en-US.md`)
      }
      await fs.symlink(
        localeDoc,
        resolve(DIR_DOCS, `${locale}/component/${comp}.md`)
      )
    }
  }
}

async function genLocales() {
  await emptydir(localeOutput)

  consola.trace(chalk.cyan('Starting for build doc for developing.'))

  const locales = await fg('*', { cwd: dirMetadata, onlyDirectories: true })

  await fs.mkdir(localeOutput, { recursive: true })
  await fs.writeFile(
    resolve(localeOutput, 'lang.json'),
    JSON.stringify(locales),
    {}
  )

  return locales
}

async function traverseDir(
  dir: string,
  paths: { locale: string; pathname: string }[],
  output: string
) {
  const contents = await fs.readdir(dir, { withFileTypes: true })
  await Promise.all(
    contents.map(async (c) => {
      if (c.isDirectory()) {
        await fs.mkdir(resolve(output, c.name), { recursive: true })

        return traverseDir(
          resolve(dir, c.name),
          paths.map((p) => ({ ...p, pathname: resolve(p.pathname, c.name) })),
          resolve(output, c.name)
        )
      } else if (c.isFile()) {
        const content = await fs.readJSON(resolve(dir, c.name))
        const contentToWrite = {
          'en-US': content,
        }

        await Promise.all(
          paths.map(async ({ locale, pathname }) => {
            contentToWrite[locale] = await fs.readJSON(
              resolve(pathname, c.name)
            )
          })
        )

        await fs.writeFile(
          resolve(output, c.name),
          `${JSON.stringify(contentToWrite, null, 2)}\n`,
          {
            encoding: 'utf-8',
          }
        )
      }
    })
  )
}

async function emptydir(paths: string | string[]) {
  paths = ([] as string[]).concat(paths)
  for (const p of paths) {
    await fs.rm(p, { recursive: true })
    await fs.mkdir(p, { recursive: true })
  }
}

main()

import { resolve } from 'path'
import { DIR_DOCS } from '@jirafa/cli/dist/shared'
import fs from 'fs-extra'
import consola from 'consola'
import chalk from 'chalk'
import fg from 'fast-glob'

const dirMetadata = resolve(DIR_DOCS, '.vitepress/metadata')

async function main() {
  const localeOutput = resolve(DIR_DOCS, '.vitepress/i18n')
  if (fs.existsSync(localeOutput)) {
    throw new Error('File already exists.')
  }

  consola.trace(chalk.cyan('Starting for build doc for developing.'))

  const locales = await fg('*', { cwd: dirMetadata, onlyDirectories: true })

  await fs.mkdir(localeOutput)
  await fs.writeFile(resolve(localeOutput, 'lang.json'), JSON.stringify(locales), {})

  await traverseDir(
    resolve(dirMetadata, 'en-US'),
    locales
      .filter((locale) => locale !== 'en-US')
      .map((locale) => ({ locale, pathname: resolve(localeOutput, locale) })),
    localeOutput
  )
}

async function traverseDir(dir: string, paths: { locale: string; pathname: string }[], output: string) {
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
            contentToWrite[locale] = await fs.readJSON(resolve(pathname, c.name))
          })
        )

        await fs.writeFile(resolve(output, c.name), `${JSON.stringify(contentToWrite, null, 2)}\n`, {
          encoding: 'utf-8',
        })
      }
    })
  )
}

main()

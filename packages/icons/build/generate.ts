import { resolve } from 'path'
import fg from 'fast-glob'
import { emptyDir, ensureDir, readFile, writeFile } from 'fs-extra'

import { pascalCase } from '@jirafa/utils'
import { DIR_ICONS } from '../../../cli/shared'
import { formatCode } from '../../../cli/src/utils/formatCode'
import { createLogger } from '../../../cli/src/utils/logger'

const logger = createLogger()
const componentDir = resolve(DIR_ICONS, 'components')

async function generate() {
  const log = logger.start('icon', 'Generating vue components')
  await ensureDir(componentDir)
  await emptyDir(componentDir)
  const files = await fg('*.svg', {
    cwd: resolve(DIR_ICONS, 'svg'),
    onlyFiles: true,
  })

  logger.info('icon', 'Generating vue files')
  await Promise.all(files.map(transformToVue))

  logger.info('icon', 'Generating entry files')
  const entry = formatCode(`
  ${files
    .map((filename) => {
      const name = filename.slice(0, -4)
      const componentName = pascalCase(name)
      return `export { default as ${componentName} } from './${name}.vue'`
    })
    .join('\n')}
    `)
  await writeFile(resolve(componentDir, 'index.ts'), entry, 'utf-8')
  log('Generate vue components success')
}

async function transformToVue(filename: string) {
  const componentName = pascalCase(filename.slice(0, -4))
  const content = await readFile(resolve(DIR_ICONS, 'svg', filename), 'utf-8')
  const vue = formatCode(
    `
  <script lang="ts">
    import type { DefineComponent } from 'vue'
    export default ({
      name: "${componentName}",
    }) as DefineComponent
  </script>

  <template>
    ${content}
  </template>
  `,
    'vue'
  )
  await writeFile(
    resolve(componentDir, `${filename.slice(0, -4)}.vue`),
    vue,
    'utf-8'
  )
}

generate()

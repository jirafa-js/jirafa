import { resolve } from 'path'
import { appendFile, ensureDir, pathExists, writeFile } from 'fs-extra'
import prompt from 'prompts'
import { camelCase, kebabCase, pascalCase } from '../utils/strings'
import { DIR_COMPS, DIR_DOCS, DIR_HOOKS, DIR_THEME } from '../../shared'
import { createLogger } from '../utils/logger'
import { formatCode } from '../utils/format-code'

interface CreateOptions {
  hook: boolean
}
const PREFIX = 'j'
const logger = createLogger()

export const create = async (filename: string, options: CreateOptions) => {
  if (options.hook) {
    await createHook(filename)
    return
  }

  await createComponent(filename)
}

async function createHook(filename: string) {
  const name = filename.startsWith('use')
    ? kebabCase(filename)
    : `use-${kebabCase(filename)}`

  const hookPath = resolve(DIR_HOOKS, name)
  const hookTestPath = resolve(DIR_HOOKS, '__tests__')

  const exists = await pathExists(hookPath)

  if (exists) {
    logger.error('gen', `Hook '${name}' exists!`)
    process.exit(0)
  }
  const hookName = camelCase(name)

  await Promise.all([ensureDir(hookPath), ensureDir(hookTestPath)])
  await Promise.all([
    // ts
    writeFile(
      resolve(hookPath, 'index.ts'),
      formatCode(
        `export const ${hookName} = () => {
          // inner code
        }`,
        'typescript'
      )
    ),
    // test
    writeFile(
      resolve(hookTestPath, `${name}.spec.ts`),
      formatCode(
        `import { defineComponent } from 'vue'
        import { mount } from '@vue/test-utils'
        import { ${hookName} } from '..'

        const TestComp = defineComponent({
          setup() {
            ${hookName}()
          }
        })

        describe('${name}', () => {
          it('should work', () => {
            const wrapper = mount(TestComp)
            // test code here
            expect(wrapper).toBeDefined()
          })
        })`,
        'typescript'
      )
    ),
    // export
    appendFile(resolve(DIR_HOOKS, 'index.ts'), `export * from './${name}'\n`),
  ])

  logger.success('gen', `Create hook ${name} success`)
}

async function createComponent(filename: string) {
  const name = kebabCase(filename)

  const dirComp = resolve(DIR_COMPS, name)

  if (await pathExists(dirComp)) {
    logger.error('gen', `Component '${name}' exists!`)
    process.exit(0)
  }

  await promptComponentMetadata(name)
  await Promise.all([createPackage(name), createTheme(name)])

  logger.success('gen', `Create component ${name} success`)
}

function getNames(name: string) {
  return {
    /** eg. `JButtonGroup` */
    compName: pascalCase(`${PREFIX}-${name}`),
    /** eg. `ButtonGroup` */
    typeName: pascalCase(name),
    /** eg. `buttonGroup` */
    camelName: camelCase(name),
  }
}

async function createTheme(name: string) {
  await Promise.all([
    // style
    writeFile(
      resolve(DIR_THEME, `src/${name}.scss`),
      formatCode(
        `
      @use './settings' as *;
      @use './tools' as *;
      @use './components/${name}' as *;

      @include b(${name}) {
        //
      }
    `,
        'scss'
      )
    ),
    // style variable
    appendFile(
      resolve(DIR_THEME, `src/components/_${name}.scss`),
      `\n$${name}: () !default;\n$${name}: map-merge(\n(),\n$${name}\n);\n`
    ),
    // export
    appendFile(
      resolve(DIR_THEME, 'src/index.scss'),
      `@use './${name}.scss';\n`
    ),
  ])
}

async function createPackage(name: string) {
  const { typeName, camelName, compName } = getNames(name)
  const dirComp = resolve(DIR_COMPS, name)
  const dirCompTest = resolve(dirComp, '__tests__')
  const dirCompSrc = resolve(dirComp, 'src')
  const dirCompDoc = resolve(dirComp, 'docs')
  const dirCompExamples = resolve(dirComp, 'examples')

  await Promise.all([
    ensureDir(dirCompTest),
    ensureDir(dirCompSrc),
    ensureDir(dirCompDoc),
    ensureDir(dirCompExamples),
  ])

  await Promise.all([
    // ts
    writeFile(
      resolve(dirCompSrc, `${name}.ts`),
      formatCode(
        `import { buildProps } from '@jirafa/utils'
        import type { ExtractPropTypes } from 'vue'
        import type ${typeName} from './${name}.vue'

        export type ${typeName}Instance = InstanceType<typeof ${typeName}>
        export const ${camelName}Props = buildProps({} as const)
        export type ${typeName}Props = ExtractPropTypes<typeof ${camelName}Props>`,
        'typescript'
      )
    ),
    // vue
    writeFile(
      resolve(dirCompSrc, `${name}.vue`),
      formatCode(
        `<script lang="ts" setup>
          import { useNamespace } from '@jirafa/hooks'
          import { ${camelName}Props } from './${name}'

          defineProps(${camelName}Props)
          defineOptions({ name: '${compName}' })

          const ns = useNamespace('${name}')
        </script>

        <template>
          <div :class="[ns.b()]">
            <slot></slot>
          </div>
        </template>`,
        'vue'
      )
    ),
    // doc
    writeFile(
      resolve(dirCompDoc, 'en-US.md'),
      formatCode(
        `
---
title: ${typeName}
lang: en-US
---

# ${typeName}

## Basic Usage

::: demo
${name}/basic
:::

## ${typeName} Props
| Name       | Description  | Type  | Default |
| ---------- | ------------ | ----- | ------- |
|            |              |       |         |

## ${typeName} Slots

| Name | Description               |
| ---- | ------------------------- |
| -    | customize default content |
`,
        'markdown'
      )
    ),
    // example
    writeFile(
      resolve(dirCompExamples, 'basic.vue'),
      formatCode(
        `<template>
          <${compName}>
            ${compName}
          </${compName}>
        </template>`,
        'vue'
      )
    ),
    // test
    writeFile(
      resolve(dirCompTest, `${name}.spec.tsx`),
      formatCode(
        `
        import { mount } from '@vue/test-utils'
        import ${compName} from '../src/${name}.vue'

        const JIRAFA = 'J I R A F A'

        describe('${compName}.vue', () => {
          it('render test', () => {
            const wrapper = mount(() => <${compName} v-slots={{ default: JIRAFA }} />)

            expect(wrapper.text()).toEqual(JIRAFA)
          })
        })`,
        'typescript'
      )
    ),
    // entry
    writeFile(
      resolve(dirComp, 'index.ts'),
      formatCode(
        `import { withInstall } from '@jirafa/utils'
        import ${typeName} from './src/${name}.vue'

        export * from './src/${name}'

        export const ${compName} = withInstall(${typeName})

        export default ${compName}`,
        'typescript'
      )
    ),
    // export
    appendFile(resolve(DIR_COMPS, 'index.ts'), `export * from './${name}'\n`),
  ])
}

async function promptComponentMetadata(name: string) {
  try {
    const { type } = await prompt(
      {
        name: 'type',
        message: 'Please select the component type',
        type: 'select',
        choices: [
          { title: 'Layout', value: 'layout', description: '' },
          { title: 'Basic', value: 'basic', description: '' },
          { title: 'Data Input', value: 'data-input' },
          { title: 'Data Display', value: 'data-display' },
          { title: 'Navigator', value: 'navigator' },
          { title: 'Feedback', value: 'feedback' },
          { title: 'Others', value: 'others' },
        ],
      },
      {
        onCancel() {
          throw new Error('Operation canceled!')
        },
      }
    )

    const metadataPath = resolve(
      DIR_DOCS,
      '.vitepress/metadata/en-US/pages/component.json'
    )
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const compMetadata = require(metadataPath)

    compMetadata[type].children.push({
      text: pascalCase(name),
      link: `/component/${name}`,
    })

    await writeFile(metadataPath, JSON.stringify(compMetadata, null, 2))
  } catch (e) {
    logger.error('comp', (e as Error).message)
    process.exit(0)
  }
}

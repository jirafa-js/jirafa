import { resolve } from 'path'
import { appendFile, mkdir, pathExists, writeFile } from 'fs-extra'
import consola from 'consola'
import chalk from 'chalk'
import prompt from 'prompts'
import { camelCase, capitalize, kebabCase } from '@jirafa/utils'
import { DIR_COMPS, DIR_DOCS, DIR_HOOKS, PREFIX } from '../../shared'
interface CreateOptions {
  hook: boolean
}

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
    consola.error(`Hook ${chalk.green(`'${name}'`)} exists!`)
    process.exit(1)
  }

  await mkdir(hookPath, { recursive: true })
  await mkdir(hookTestPath, { recursive: true })
  const { template, test } = hookTemplate(name)
  await writeFile(resolve(hookPath, 'index.ts'), template)
  await writeFile(resolve(hookTestPath, `${name}.spec.ts`), test)
  await appendFile(
    resolve(DIR_HOOKS, 'index.ts'),
    `export * from './${name}'\n`
  )

  consola.success(`Create hook ${chalk.green(name)} success!`)
}

async function createComponent(filename: string) {
  const name = kebabCase(filename)

  const dirComp = resolve(DIR_COMPS, name)
  const dirCompTest = resolve(dirComp, '__tests__')
  const dirCompSrc = resolve(dirComp, 'src')
  const dirCompDoc = resolve(dirComp, 'docs')
  const dirCompExamples = resolve(dirComp, 'examples')

  if (await pathExists(dirComp)) {
    consola.error(`Component ${chalk.green(`'${name}'`)} exists!`)
    process.exit(1)
  }

  await promptComponentMetadata(name)

  const { vue, entry, ts, test, doc, example } = componentTemplate(name)
  await mkdir(dirCompTest, { recursive: true })
  await mkdir(dirCompSrc, { recursive: true })
  await mkdir(dirCompDoc, { recursive: true })
  await mkdir(dirCompExamples, { recursive: true })

  await writeFile(resolve(dirCompTest, `${name}.spec.ts`), test)
  await writeFile(resolve(dirCompSrc, `${name}.ts`), ts)
  await writeFile(resolve(dirCompSrc, `${name}.vue`), vue)
  await writeFile(resolve(dirCompDoc, `en-US.md`), doc)
  await writeFile(resolve(dirCompExamples, `basic.vue`), example)
  await writeFile(resolve(dirComp, 'index.ts'), entry)
  await appendFile(
    resolve(DIR_COMPS, 'index.ts'),
    `export * from './${name}'\n`
  )

  consola.success(`Create component ${chalk.green(name)} success!`)
}

function hookTemplate(name: string) {
  const exportName = camelCase(name)
  return {
    template: `
export const ${camelCase(name)} = () => {
  // inner code
}\n`.trimStart(),
    test: `
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { ${exportName} } from '..'

const TestComp = defineComponent({
  setup() {
    ${exportName}()
  }
})

describe('${name}', () => {
  it('should work', () => {
    const wrapper = mount(TestComp)
    // test code here
    expect(wrapper).toBeDefined()
  })
})\n`.trimStart(),
  }
}

function componentTemplate(name: string) {
  const compName = capitalize(camelCase(`${PREFIX}-${name}`))
  const typeName = capitalize(camelCase(name))
  return {
    vue: `
<script lang="ts" setup>
defineOptions({ name: '${compName}' })
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
`.trimStart(),

    entry: `
import { withInstall } from '@jirafa/utils'
import ${typeName} from './src/${name}.vue'

export * from './src/${name}'

export const ${compName} = withInstall(${typeName})

export default ${compName}
`.trimStart(),

    ts: `
import type ${typeName} from './${name}.vue'

export type ${typeName}Instance = InstanceType<typeof ${typeName}>
`.trimStart(),

    test: `
import { mount } from '@vue/test-utils'
import ${compName} from '../src/button.vue'

const JIRAFA = 'J I R A FA'

describe('${compName}.vue', () => {
  it('render test', () => {
    const wrapper = mount(${compName}, {
      slots: { default: JIRAFA },
    })

    expect(wrapper.text()).toEqual(JIRAFA)
  })
})
`.trimStart(),

    doc: `
---
title: ${typeName}
lang: en-US
---

# ${typeName}

## Basic Usage

::: demo
${name}/basic
:::

## Attributes
| Name       | Description  | Type  | Default | Required |
| ---------- | ------------ | ----- | ------- | -------- |
|            |              |       |         |          |
`.trimStart(),

    example: `
<template>
  <${compName}>
    ${compName}
  </${compName}>
</template>
`.trimStart(),
  }
}

async function promptComponentMetadata(name: string) {
  try {
    const { type } = await prompt(
      {
        name: 'type',
        message: 'Please select the component type',
        type: 'select',
        choices: [
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
      text: capitalize(camelCase(name)),
      link: `/component/${name}`,
    })

    await writeFile(metadataPath, JSON.stringify(compMetadata, null, 2))
  } catch (e) {
    consola.error((e as Error).message)
    process.exit(1)
  }
}

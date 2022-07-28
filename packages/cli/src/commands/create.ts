import { resolve } from 'path'
import { appendFile, mkdir, pathExists, writeFile } from 'fs-extra'
import prompt from 'prompts'
import { PREFIX, camelCase, kebabCase, pascalCase } from '@jirafa/utils'
import { DIR_COMPS, DIR_DOCS, DIR_HOOKS, DIR_THEME } from '../../shared'
import { createLogger } from '../utils/logger'
interface CreateOptions {
  hook: boolean
}

const logger = createLogger('create')

export const create = async (filename: string, options: CreateOptions) => {
  if (options.hook) {
    await createHook(filename)
    return
  }

  await createComponent(filename)
}

async function createHook(filename: string) {
  const log = logger.start('hook', 'Create start')

  const name = filename.startsWith('use')
    ? kebabCase(filename)
    : `use-${kebabCase(filename)}`

  const hookPath = resolve(DIR_HOOKS, name)
  const hookTestPath = resolve(DIR_HOOKS, '__tests__')

  const exists = await pathExists(hookPath)

  if (exists) {
    logger.error('hook', `Hook '${name}' exists!`)
    process.exit(0)
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

  log(`Create ${name} success`)
}

async function createComponent(filename: string) {
  const log = logger.start('comp', 'Create start')

  const name = kebabCase(filename)

  const dirComp = resolve(DIR_COMPS, name)
  const dirCompTest = resolve(dirComp, '__tests__')
  const dirCompSrc = resolve(dirComp, 'src')
  const dirCompDoc = resolve(dirComp, 'docs')
  const dirCompExamples = resolve(dirComp, 'examples')
  const pathCss = resolve(DIR_THEME, `src/${name}.scss`)
  const pathCssVar = resolve(DIR_THEME, 'src/settings/_components.scss')

  if (await pathExists(dirComp)) {
    logger.error('comp', `Component '${name}' exists!`)
    process.exit(0)
  }

  await promptComponentMetadata(name)

  const { vue, entry, ts, test, doc, example, css, cssVar } =
    componentTemplate(name)
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
  await writeFile(pathCss, css)
  await appendFile(
    resolve(DIR_COMPS, 'index.ts'),
    `export * from './${name}'\n`
  )
  await appendFile(pathCssVar, cssVar)

  log(`Create ${name} success`)
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
  const compName = pascalCase(`${PREFIX}-${name}`)
  const typeName = pascalCase(name)
  const camelName = camelCase(name)
  return {
    vue: `
<script lang="ts" setup>
import { ${camelName}Props } from './${name}'

defineProps(${camelName}Props)
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
import type { ExtractPropTypes } from 'vue'
import type ${typeName} from './${name}.vue'

export type ${typeName}Instance = InstanceType<typeof ${typeName}>
export const ${camelName}Props = {}
export type ${typeName}Props = ExtractPropTypes<typeof ${camelName}Props>
`.trimStart(),

    css: `
@use './settings' as *;
@use './tools' as *;

@include b(${name}) {

}
`.trimStart(),
    cssVar: `\n$${name}: () !default;
$${name}: map-merge(
  (),
  $${name}
);
`,

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
      text: pascalCase(name),
      link: `/component/${name}`,
    })

    await writeFile(metadataPath, JSON.stringify(compMetadata, null, 2))
  } catch (e) {
    logger.error('comp', (e as Error).message)
    process.exit(0)
  }
}

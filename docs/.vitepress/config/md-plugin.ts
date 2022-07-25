import { relative, resolve } from 'path'
import container from 'markdown-it-container'
import { readFileSync, realpathSync } from 'fs-extra'
import type MarkdownIt from 'markdown-it'
import type Renderer from 'markdown-it/lib/renderer'
import type Token from 'markdown-it/lib/token'
import { DIR_DOCS, DIR_ROOT } from '@jirafa/cli/dist/shared'

interface ContainerOpts {
  marker?: string | undefined
  validate?(params: string): boolean
  render?(
    tokens: Token[],
    index: number,
    options: any,
    env: any,
    self: Renderer
  ): string
}

const demoRe = /^demo\s*(.*)$/

export const mdPlugin = (md: MarkdownIt) => {
  md.use(container, 'demo', {
    validate(params) {
      return demoRe.test(params.trim())
    },
    render(tokens, index) {
      const token = tokens[index]
      const info = token.info.trim().slice(4).trim()
      if (token.nesting === 1) {
        const sourceToken = tokens[index + 2]
        const sourceFile = sourceToken.children?.[0].content ?? ''
        let source = ''
        let realpath = ''

        if (sourceToken.type === 'inline') {
          const sourceFilePath = resolve(
            DIR_DOCS,
            'examples',
            `${sourceFile}.vue`
          )

          realpath = relative(DIR_ROOT, realpathSync(sourceFilePath))
          source = readFileSync(sourceFilePath, 'utf-8')
        }

        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)

        const highlight = md.options.highlight!

        // call md.render will reset md.__data
        const data = (md as any).__data
        const description = md.render(info)
        ;(md as any).__data = data

        return `<SiteDemo :demos="demos" source="${encodeURIComponent(
          highlight(source, 'vue', '')
        )}" raw-source="${encodeURIComponent(
          source
        )}" path="${sourceFile}" realpath="${realpath}" description="${encodeURIComponent(
          description
        )}" >`
      } else {
        return '</SiteDemo>'
      }
    },
  } as ContainerOpts)
}

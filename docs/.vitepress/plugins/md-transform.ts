import type { Plugin } from 'vite'

interface Append {
  headers: string[]
  footers: string[]
  scriptSetups: string[]
}

const componentRE = /packages\/components\/([^\/]*)/

export function MdTransform(): Plugin {
  return {
    name: 'jirafa-inject-md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.md')) return

      const matches = id.match(componentRE)
      if (!matches) return

      // const componentId = matches[1]

      const append: Append = {
        headers: [],
        footers: [],
        scriptSetups: [
          `const demos = import.meta.globEager('../examples/*.vue')`,
        ],
      }

      code = transformVpScriptSetup(code, append)

      code = combineCode(
        code,
        [combineScript(append.scriptSetups), ...append.headers],
        append.footers
      )

      return code
    },
  }
}

const vpScriptSetupRE = /<vp-script\s(.*\s)?setup(\s.*)?>([\s\S]*)<\/vp-script>/

function transformVpScriptSetup(code: string, append: Append) {
  const matches = code.match(vpScriptSetupRE)
  if (matches) code = code.replace(matches[0], '')
  const scriptSetup = matches?.[3] ?? ''
  if (scriptSetup) append.scriptSetups.push(scriptSetup)

  return code
}

function combineCode(code: string, headers: string[], footers: string[]) {
  if (headers.length) {
    const frontmatterEnds = code.indexOf('---\n\n') + 4
    const firstSubheader = code.search(/\n## \w/)
    const sliceIndex = firstSubheader < 0 ? frontmatterEnds : firstSubheader

    code =
      code.slice(0, sliceIndex) + headers.join('\n') + code.slice(sliceIndex)
  }

  code += footers.join('\n')

  code += '\n'

  return code
}

function combineScript(codes: string[]) {
  return `
<script setup>
  ${codes.join('\n')}
</script>`
}

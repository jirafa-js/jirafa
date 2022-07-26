import {
  camelize as camelCase,
  capitalize,
  hyphenate as kebabCase,
} from '@vue/shared'

export { capitalize, camelCase, kebabCase }

export const pascalCase = (str: string) => capitalize(camelCase(str))

export const camelCase = (str: string) =>
  str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const pascalCase = (str: string) => capitalize(camelCase(str))

export const kebabCase = (str: string) =>
  str.replace(/\B([A-Z])/g, '-$1').toLowerCase()

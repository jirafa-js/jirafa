export const camelCase = (input: string) => {
  return input.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}

export const capitalize = (input: string) => {
  return input.charAt(0).toUpperCase() + input.slice(1)
}

export const kebabCase = (input: string) => {
  return input.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}

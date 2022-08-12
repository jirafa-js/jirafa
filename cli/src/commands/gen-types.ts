import { genTypesAll, genTypesVolar } from '../utils/type-definitions'

interface Options {
  type: 'all' | 'volar'
}

export const genTypes = async (opts: Options) => {
  if (opts.type === 'volar') {
    await genTypesVolar()
    return
  }

  await Promise.all([genTypesAll(), genTypesVolar()])
}

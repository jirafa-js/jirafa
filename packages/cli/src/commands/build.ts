import { buildComponents } from '../utils/build'
import { buildTheme } from '../utils/build-theme'

interface Options {
  type: 'theme' | 'all'
}

export const build = async (opts: Options) => {
  if (opts.type === 'theme') {
    buildTheme()
  } else {
    buildComponents()
  }
}

// build({ type: 'all' })

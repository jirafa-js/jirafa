import { buildComponents } from '../utils/build'
import { buildTheme } from '../utils/build-theme'
import { run } from '../utils/precess'

interface Options {
  type: 'icons' | 'theme' | 'all'
}

export const build = async (opts: Options) => {
  switch (opts.type) {
    case 'theme':
      buildTheme()
      break
    case 'icons':
      run('pnpm -F icons run build')
      break
    case 'all':
    default:
      buildComponents()
      break
  }
}

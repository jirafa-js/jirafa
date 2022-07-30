import { INSTALLED_KEY } from '@jirafa/utils'
import type { App, Plugin } from 'vue'
import Component from './component'
import { version } from './version'

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App) => {
    if (app[INSTALLED_KEY]) return

    app[INSTALLED_KEY] = true
    components.forEach((c) => app.use(c))
  }

  return {
    version,
    install,
  }
}

export default makeInstaller(Component)

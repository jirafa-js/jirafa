import type { App, Plugin } from 'vue'
import Component from './component'
import { version } from './package.json'

export const INSTALLED_KEY = Symbol('INSTALLED_KEY')

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App) => {
    // @ts-expect-error symbol index in type any
    if (app[INSTALLED_KEY]) return

    // @ts-expect-error symbol index in type any
    app[INSTALLED_KEY] = true
    components.forEach((c) => app.use(c))
  }

  return {
    version,
    install,
  }
}

export default makeInstaller(Component)

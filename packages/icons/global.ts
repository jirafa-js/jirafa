import type { App } from 'vue'
import * as icons from './components'

export interface InstallOptions {
  /** @default `JIcon` */
  prefix?: string
}

export default (app: App, { prefix = 'JIcon' }: InstallOptions = {}) => {
  for (const [key, component] of Object.entries(icons)) {
    app.component(prefix + key, component)
  }
}

export * from './components'

import { NOOP } from '@vue/shared'
import type { SFCWithInstall } from './typescript'

export const withInstall = <T, E extends Record<string, any>>(
  main: T,
  extra?: E
) => {
  ;(main as SFCWithInstall<T>).install = (app) => {
    ;[main, ...Object.values(extra ?? {})].forEach((comp) => {
      app.component(comp.name, comp)
    })
  }

  if (extra) {
    Object.entries(extra).forEach(([key, comp]) => {
      ;(main as any)[key] = comp
    })
  }

  return main as SFCWithInstall<T>
}

export const withNoopInstall = <T>(comp: T) => {
  ;(comp as SFCWithInstall<T>).install = NOOP

  return comp as SFCWithInstall<T>
}

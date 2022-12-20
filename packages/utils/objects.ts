import { get, set } from 'lodash-unified'
import type { Arrayable } from './typescript'
export { hasOwn, hasChanged } from '@vue/shared'

export const keysOf = <T extends any[] | Record<string, unknown>>(obj: T) =>
  Object.keys(obj) as (keyof T)[]

export const getProp = <T = any>(
  obj: Record<string, any>,
  path: Arrayable<string>,
  defaultValue?: T
): { value: T } => {
  return {
    get value() {
      return get(obj, path, defaultValue)
    },
    set value(val: T) {
      set(obj, path, val)
    },
  }
}

export { hasOwn, hasChanged } from '@vue/shared'

export const keysOf = <T>(obj: T) => Object.keys(obj) as (keyof T)[]

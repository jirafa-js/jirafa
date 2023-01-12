import type { Arrayable } from './typescript'
import { isArray } from './types'

export const ensureArray = <T>(val: Arrayable<T>): T[] => {
  if (!val && (val as any) !== 0) return []
  return isArray(val) ? val : [val]
}

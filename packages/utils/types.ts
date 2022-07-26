export {
  isArray,
  isObject,
  isPlainObject,
  isFunction,
  isDate,
  isSymbol,
  isString,
} from '@vue/shared'

export const isNil = (val: unknown): val is null | undefined => {
  return val == null
}

export const isNumber = (val: unknown): val is number => typeof val === 'number'

export const isBoolean = (val: unknown): val is boolean =>
  typeof val === 'boolean'

export const isDef = <T = any>(val: T): val is T => typeof val !== 'undefined'

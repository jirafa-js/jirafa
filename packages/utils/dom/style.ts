import { isNumber, isString } from '../types'

export const suffixUnit = (val?: number | string, unit = 'px') => {
  if (!val) return ''
  if (isString(val)) {
    return val
  } else if (isNumber(val)) {
    return `${val}${unit}`
  }
}

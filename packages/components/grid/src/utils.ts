import { isArray } from '@jirafa/utils'

export const formatGap = (gap: number | [number, number]) => {
  return isArray(gap) ? gap : (new Array(2).fill(gap) as [number, number])
}

import { isNumber } from '../types'

export const spaceSizes = ['mini', 'small', 'large'] as const

export type SpaceSizes = typeof spaceSizes[number] | number

export const formatSpace = (space: SpaceSizes) => {
  if (isNumber(space)) return `${space}px`

  switch (space) {
    case 'mini':
      return '4px'
    case 'small':
      return '8px'
    case 'large':
      return '24px'
    default:
      return '16px'
  }
}

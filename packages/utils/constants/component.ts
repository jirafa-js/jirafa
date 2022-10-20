export const componentSizes = ['mini', 'small', 'large'] as const

export type ComponentSizes = typeof componentSizes[number]

export const componentSizesMap = {
  large: 36,
  default: 32,
  small: 28,
  mini: 24,
} as const

export const componentStatus = ['warning', 'danger', 'success'] as const

export type ComponentStatus = typeof componentStatus[number]

export const componentSizes = ['mini', 'small', '', 'large'] as const

export type ComponentSizes = typeof componentSizes[number]

export const componentStatus = ['warning', 'danger', 'success'] as const

export type ComponentStatus = typeof componentStatus[number]

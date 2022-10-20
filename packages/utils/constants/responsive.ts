// !order is important
export const responsiveArray = ['max', 'xl', 'lg', 'md', 'sm', 'xs'] as const

export type BreakPoint = typeof responsiveArray[number]

export const responsivePointMap = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  max: 1920,
} as const

export const responsiveMediaQueryMap = {
  xs: `(max-width: ${responsivePointMap.sm - 1}px)`,
  sm: `(min-width: ${responsivePointMap.sm}px)`,
  md: `(min-width: ${responsivePointMap.md}px)`,
  lg: `(min-width: ${responsivePointMap.lg}px)`,
  xl: `(min-width: ${responsivePointMap.xl}px)`,
  max: `(min-width: ${responsivePointMap.max}px)`,
} as const

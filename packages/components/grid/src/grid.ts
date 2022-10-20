import { buildProps, definePropType, isArray, isNumber } from '@jirafa/utils'
import type { ExtractPropTypes } from 'vue'
import type Grid from './grid.vue'

export type GridInstance = InstanceType<typeof Grid>

export interface GridResponsiveObject {
  cols?: number
  gap?: number | [number, number]
}

export type GridResponsiveValue = number | GridResponsiveObject

export const gridProps = buildProps({
  tag: {
    type: String,
    default: 'div',
  },
  cols: {
    type: Number,
    default: 24,
  },
  gap: {
    type: definePropType<number | [number, number]>([Number, Array]),
    validator: (val: unknown): val is number | [number, number] =>
      isNumber(val) ||
      (isArray(val) && val.length === 2 && val.every(isNumber)),
    default: 0,
  },
  xs: {
    type: definePropType<GridResponsiveValue>([Number, Object]),
    default: () => ({} as const),
  },
  sm: {
    type: definePropType<GridResponsiveValue>([Number, Object]),
    default: () => ({} as const),
  },
  md: {
    type: definePropType<GridResponsiveValue>([Number, Object]),
    default: () => ({} as const),
  },
  lg: {
    type: definePropType<GridResponsiveValue>([Number, Object]),
    default: () => ({} as const),
  },
  xl: {
    type: definePropType<GridResponsiveValue>([Number, Object]),
    default: () => ({} as const),
  },
  max: {
    type: definePropType<GridResponsiveValue>([Number, Object]),
    default: () => ({} as const),
  },
} as const)
export type GridProps = ExtractPropTypes<typeof gridProps>

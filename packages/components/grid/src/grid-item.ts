import { buildProps, definePropType } from '@jirafa/utils'
import type { ExtractPropTypes } from 'vue'
import type GridItem from './grid-item.vue'

export type GridItemInstance = InstanceType<typeof GridItem>

export interface GridItemSizeObject {
  span?: number
  offset?: number
}

export type GridItemSize = number | GridItemSizeObject

export const gridItemProps = buildProps({
  tag: {
    type: String,
    default: 'div',
  },
  span: {
    type: Number,
    default: 1,
  },
  offset: {
    type: Number,
    default: 0,
  },
  xs: {
    type: definePropType<GridItemSize>([Number, Object]),
    default: () => ({} as const),
  },
  sm: {
    type: definePropType<GridItemSize>([Number, Object]),
    default: () => ({} as const),
  },
  md: {
    type: definePropType<GridItemSize>([Number, Object]),
    default: () => ({} as const),
  },
  lg: {
    type: definePropType<GridItemSize>([Number, Object]),
    default: () => ({} as const),
  },
  xl: {
    type: definePropType<GridItemSize>([Number, Object]),
    default: () => ({} as const),
  },
  max: {
    type: definePropType<GridItemSize>([Number, Object]),
    default: () => ({} as const),
  },
} as const)
export type GridItemProps = ExtractPropTypes<typeof gridItemProps>

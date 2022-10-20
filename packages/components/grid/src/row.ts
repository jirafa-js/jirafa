import { buildProps } from '@jirafa/utils'
import type { ExtractPropTypes } from 'vue'
import type Row from './row.vue'

export type RowInstance = InstanceType<typeof Row>

export const RowJustify = [
  'start',
  'center',
  'end',
  'space-around',
  'space-bettween',
  'space-evenly',
] as const

export const RowAlign = ['start', 'center', 'end', 'stretch'] as const

export const rowProps = buildProps({
  tag: {
    type: String,
    default: 'div',
  },
  justify: {
    type: String,
    values: RowJustify,
    default: 'start',
  },
  align: {
    type: String,
    values: RowAlign,
    default: 'start',
  },
  gutter: {
    type: Number,
    default: 0,
  },
} as const)
export type RowProps = ExtractPropTypes<typeof rowProps>

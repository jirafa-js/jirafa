import {
  buildProps,
  componentSizes,
  definePropType,
  isBoolean,
  isString,
} from '@jirafa/utils'
import type { ExtractPropTypes } from 'vue'
import type Tag from './tag.vue'

export const tagPresetColores = [
  'red',
  'pink',
  'purple',
  'deep-purple',
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deep-orange',
  'brown',
  'blue-grey',
  'grey',
  'primary',
  'success',
  'warning',
  'danger',
] as const

export type TagPresetColor = typeof tagPresetColores[number]

export type TagInstance = InstanceType<typeof Tag>
export const tagProps = buildProps({
  color: {
    type: definePropType<TagPresetColor | string>(String),
    values: tagPresetColores,
    validator: (val: unknown): val is TagPresetColor | string => isString(val),
  },
  size: {
    type: String,
    values: componentSizes,
  },
  closable: Boolean,
  loading: Boolean,
  checkable: Boolean,
  checked: Boolean,
  border: Boolean,
} as const)
export type TagProps = ExtractPropTypes<typeof tagProps>

export const tagEmits = {
  close: (evt: MouseEvent) => evt instanceof MouseEvent,
  change: (checked: boolean, evt: MouseEvent) => ![checked, evt],
  'update:checked': (checked: boolean) => isBoolean(checked),
}
export type TagEmits = typeof tagEmits

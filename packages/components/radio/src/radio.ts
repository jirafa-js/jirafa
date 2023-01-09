import { useSizeProp } from '@jirafa/hooks'
import {
  UPDATE_MODEL_EVENT,
  buildProps,
  isBoolean,
  isNumber,
  isString,
} from '@jirafa/utils'
import type { ExtractPropTypes } from 'vue'
import type Radio from './radio.vue'

export type RadioInstance = InstanceType<typeof Radio>

export const radioProps = buildProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  name: String,
  value: {
    type: [String, Number, Boolean],
    default: '',
  },
  disabled: Boolean,
  size: useSizeProp,
  type: {
    type: String,
    values: ['radio', 'button'] as const,
    default: 'radio',
  },
  border: Boolean,
} as const)
export type RadioProps = ExtractPropTypes<typeof radioProps>

export const radioEmits = {
  [UPDATE_MODEL_EVENT]: (val: string | number | boolean) =>
    isString(val) || isNumber(val) || isBoolean(val),
  change: (val: string | number | boolean) =>
    isString(val) || isNumber(val) || isBoolean(val),
}
export type RadioEmits = typeof radioEmits

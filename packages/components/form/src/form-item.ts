import type { Arrayable } from '@jirafa/utils'
import { buildProps, componentSizes, definePropType } from '@jirafa/utils'
import type { RuleItem } from 'async-validator'
import type { ExtractPropTypes } from 'vue'
import type FormItem from './form-item.vue'

const validateStatus = [
  'success',
  'warning',
  'error',
  'validating',
  '',
] as const

export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string>
}
export type FormItemValidateStatus = typeof validateStatus[number]
export type FormItemProp = Arrayable<string>

export type FormItemInstance = InstanceType<typeof FormItem>
export const formItemProps = buildProps({
  size: {
    type: String,
    values: componentSizes,
  },
  label: String,
  labelWidth: {
    type: [String, Number],
    default: '',
  },
  prop: {
    type: definePropType<FormItemProp>([String, Array]),
  },
  for: String,
  required: { type: Boolean, default: undefined },
  rules: {
    type: definePropType<Arrayable<FormItemRule>>([Object, Array]),
  },
  validateStatus: {
    type: String,
    values: validateStatus,
    default: '',
  },
  extra: String,
  help: String,
} as const)
export type FormItemProps = ExtractPropTypes<typeof formItemProps>

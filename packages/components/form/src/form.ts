import { useSizeProp } from '@jirafa/hooks'
import type { Arrayable } from '@jirafa/utils'
import {
  buildProps,
  definePropType,
  isBoolean,
  isObject,
  isString,
} from '@jirafa/utils'
import type { RuleItem, ValidateFieldsError } from 'async-validator'
import type { ExtractPropTypes } from 'vue'
import type { FormItemProp } from './form-item'
import type Form from './form.vue'

export interface FormRule extends RuleItem {
  trigger?: Arrayable<string>
}

export type FormRules = Partial<Record<string, Arrayable<FormRule>>>

export const formProps = buildProps({
  model: Object,
  rules: {
    type: definePropType<FormRules>(Object),
  },
  layout: {
    type: String,
    values: ['horizontal', 'vertical', 'inline'],
    default: 'horizontal',
  },
  size: useSizeProp,
  labelWidth: {
    type: [String, Number],
    default: '',
  },
  labelPosition: {
    type: String,
    values: ['left', 'right'],
    default: 'right',
  },
  disabled: Boolean,
  hideRequireAsterisk: Boolean,
  requireAsteriskPosition: {
    type: String,
    values: ['left', 'right'],
    default: 'left',
  },
  scrollToFirstError: Boolean,
  statusIcon: Boolean,
} as const)
export type FormProps = ExtractPropTypes<typeof formProps>

export const formEmits = {
  validate: (prop: FormItemProp, isValid: boolean, message: string) =>
    isString(prop) && isBoolean(isValid) && isString(message),
  submit: (evt: Event) => evt instanceof Event,
  submitSuccess: (model: object, evt: Event) =>
    isObject(model) && evt instanceof Event,
  submitFail: (
    data: { values: object; errors: ValidateFieldsError },
    evt: Event
  ) => isObject(data) && evt instanceof Event,
}

export type FormEmits = typeof formEmits

export type FormInstance = InstanceType<typeof Form>

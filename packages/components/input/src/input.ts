import {
  buildProps,
  componentSizes,
  iconPropType,
  isString,
} from '@jirafa/utils'
import type { ExtractPropTypes } from 'vue'
import type Input from './input.vue'

export type InputInstance = InstanceType<typeof Input>
export const inputProps = buildProps({
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    values: ['text', 'password'],
    default: 'text',
  },
  size: {
    type: String,
    values: componentSizes,
  },
  disabled: Boolean,
  readonly: Boolean,
  clearable: Boolean,
  showPassword: Boolean,
  showWordLimit: Boolean,
  prefixIcon: {
    type: iconPropType,
  },
  suffixIcon: {
    type: iconPropType,
  },
  form: {
    type: String,
    default: '',
  },
  id: String,
  maxlength: {
    type: [String, Number],
    default: undefined,
  },
  containerAttrs: {
    type: Object,
    default: () => ({}),
  },
  inputStyle: {
    type: Object,
    default: () => ({}),
  },
} as const)

export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmit = {
  'update:modelValue': (val: string) => isString(val),
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  change: (val: string) => isString(val),
  input: (val: string) => isString(val),
  clear: () => true,

  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  compositionstart: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionupdate: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionend: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  keydown: (evt: KeyboardEvent) => evt instanceof KeyboardEvent,
}

export type InputEmit = typeof inputEmit

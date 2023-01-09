import { useSizeProp } from '@jirafa/hooks'
import { buildProps, definePropType } from '@jirafa/utils'
import type { ExtractPropTypes, RenderFunction } from 'vue'
import { radioEmits } from './radio'
import type RadioGroup from './radio-group.vue'

export interface RadioOption {
  value: string | number
  label?: string | number | RenderFunction
  disabled?: boolean
}

export type RadioGroupInstance = InstanceType<typeof RadioGroup>
export const radioGroupProps = buildProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  name: String,
  disabled: Boolean,
  size: useSizeProp,
  type: {
    type: String,
    values: ['radio', 'button'] as const,
    default: 'radio',
  },
  border: Boolean,
  validateEvent: { type: Boolean, default: true },
  direction: {
    type: String,
    values: ['horizontal', 'vertical'] as const,
    default: 'horizontal',
  },
  options: {
    type: definePropType<Array<string | number | RadioOption>>([Array]),
  },
} as const)
export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export const radioGroupEmits = radioEmits
export type RadioGroupEmits = typeof radioGroupEmits

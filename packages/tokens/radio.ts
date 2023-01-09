import type { RadioGroupProps } from '@jirafa/components/radio/src/radio-group'
import type { InjectionKey } from 'vue'

export interface RadioGroupContext extends RadioGroupProps {
  handleChange: (value: string | number | boolean) => void
}

export const radioGroupInjectKey = Symbol(
  'radioGroup'
) as InjectionKey<RadioGroupContext>

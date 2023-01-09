import type { InjectionKey } from 'vue'
import type { ButtonProps } from '@jirafa/components/button'

export const ButtonGroupContextInjectKey: InjectionKey<ButtonGroupContext> =
  Symbol('ButtonGroupContextInjectKey')

export interface ButtonGroupContext {
  disabled?: boolean
  size?: ButtonProps['size']
  type?: ButtonProps['type']
  status?: ButtonProps['status']
  shape?: ButtonProps['shape']
}

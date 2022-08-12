import { buildProps, definePropType } from '@jirafa/utils'
import type { Component, ExtractPropTypes } from 'vue'
import type Button from './button.vue'

const iconProp = definePropType<string | Component>([String, Object, Function])

export type ButtonInstance = InstanceType<typeof Button>
export const buttonProps = buildProps({
  variant: {
    type: String,
    values: ['block', 'solid', 'outline', 'text'],
    default: 'outline',
  },
  color: {
    type: String,
    values: ['primary', 'warning', 'danger', 'info', 'success', ''],
    default: '',
  },
  size: { type: String, values: ['xs', 'sm', 'md', 'lg', ''], default: 'md' },
  shape: { values: ['round', 'circle', ''], default: '' },
  icon: { type: iconProp, default: '' },
  loadingIcon: { type: iconProp, default: '' },
  disabled: Boolean,
  loading: Boolean,
  type: {
    type: String,
    values: ['button', 'submit', 'reset'],
    default: 'button',
  },
  autofocus: Boolean,
} as const)

export type ButtonProps = ExtractPropTypes<typeof buttonProps>

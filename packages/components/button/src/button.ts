import {
  buildProps,
  componentSizes,
  componentStatus,
  definePropType,
} from '@jirafa/utils'
import { Loading } from '@jirafa/icons'
import type { Component, ExtractPropTypes } from 'vue'
import type Button from './button.vue'

const iconProp = definePropType<string | Component>([String, Object, Function])

export type ButtonInstance = InstanceType<typeof Button>
export const buttonProps = buildProps({
  type: {
    type: String,
    values: ['primary', 'secondary', 'outline', 'dashed', 'text'] as const,
  },
  status: {
    type: String,
    values: componentStatus,
  },
  size: { type: String, values: componentSizes },
  shape: { values: ['round', 'circle'] },
  block: Boolean,
  icon: { type: iconProp },
  loadingIcon: { type: iconProp, default: () => Loading },
  disabled: Boolean,
  loading: Boolean,
  htmlType: {
    type: String,
    values: ['button', 'submit', 'reset'],
    default: 'button',
  },
  autofocus: Boolean,
} as const)

export type ButtonProps = ExtractPropTypes<typeof buttonProps>

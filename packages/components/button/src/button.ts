import { buildProps, componentStatus, iconPropType } from '@jirafa/utils'
import { Loading } from '@jirafa/icons'
import type { ExtractPropTypes } from 'vue'
import { useSizeProp } from '@jirafa/hooks'
import type Button from './button.vue'

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
  size: useSizeProp,
  shape: { values: ['round', 'circle'] },
  block: Boolean,
  icon: { type: iconPropType },
  loadingIcon: { type: iconPropType, default: () => Loading },
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

import type { ExtractPropTypes } from 'vue'
import { buttonProps } from './button'

import type buttonGroup from './button-group.vue'

export const buttonGroupProps = {
  size: buttonProps.size,
} as const
export type ButtonGroupProps = ExtractPropTypes<typeof buttonGroupProps>

export type ButtonGroupInstance = InstanceType<typeof buttonGroup>

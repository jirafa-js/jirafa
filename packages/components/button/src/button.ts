import type { ExtractPropTypes } from 'vue'
import type Button from './button.vue'

export type ButtonInstance = InstanceType<typeof Button>
export const buttonProps = {}
export type ButtonProps = ExtractPropTypes<typeof buttonProps>

import type { ExtractPropTypes } from 'vue'
import type Button from './button.vue'

export type ButtonInstance = InstanceType<typeof Button>
export const buttonProps = { type: { type: String } }
export type ButtonProps = ExtractPropTypes<typeof buttonProps>

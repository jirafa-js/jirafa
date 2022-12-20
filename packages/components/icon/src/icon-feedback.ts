import { buildProps } from '@jirafa/utils'
import type { ExtractPropTypes } from 'vue'
import { iconProps } from './icon'
import type IconFeedback from './icon-feedback.vue'

export type IconFeedbackInstance = InstanceType<typeof IconFeedback>

export const iconFeedbackTypes = [
  'loading',
  'success',
  'error',
  'warning',
  'validating',
  '',
] as const

export type IconFeedbackType = typeof iconFeedbackTypes[number]

export const iconFeedbackProps = buildProps({
  size: iconProps.size,
  color: iconProps.color,
  type: {
    type: String,
    values: iconFeedbackTypes,
    default: '',
  },
})
export type IconFeedbackProps = ExtractPropTypes<typeof iconFeedbackProps>

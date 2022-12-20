import { withInstall } from '@jirafa/utils'
import Icon from './src/icon.vue'
import IconFeedback from './src/icon-feedback.vue'

export * from './src/icon'
export * from './src/icon-feedback'

export const JIcon = withInstall(Icon)

export const JIconFeedback = withInstall(IconFeedback)

export default JIcon

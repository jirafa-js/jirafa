import { withInstall, withNoopInstall } from '@jirafa/utils'
import ButtonGroup from './src/button-group.vue'
import Button from './src/button.vue'

export * from './src/button'
export * from './src/button-group'

export const JButton = withInstall(Button, { ButtonGroup })

export const JButtonGroup = withNoopInstall(ButtonGroup)

export default JButton

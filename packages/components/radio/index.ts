import { withInstall, withNoopInstall } from '@jirafa/utils'
import Radio from './src/radio.vue'
import RadioGroup from './src/radio-group.vue'

export * from './src/radio'
export * from './src/radio-group'

export const JRadio = withInstall(Radio, { RadioGroup })
export const JRadioGroup = withNoopInstall(RadioGroup)

export default JRadio

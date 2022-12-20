import { buildProps, definePropType } from '@jirafa/utils'
import type { ExtractPropTypes } from 'vue'
import type Icon from './icon.vue'

export type IconInstance = InstanceType<typeof Icon>
export const iconProps = buildProps({
  size: {
    type: definePropType<number | string>([Number, String]),
  },
  color: {
    type: String,
  },
  spining: Boolean,
})
export type IconProps = ExtractPropTypes<typeof iconProps>

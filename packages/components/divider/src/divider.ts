import type { SpaceSizes } from '@jirafa/utils'
import { buildProps, definePropType, isNumber, spaceSizes } from '@jirafa/utils'
import type { ExtractPropTypes } from 'vue'
import type { Properties } from 'csstype'
import type Divider from './divider.vue'

export type DividerInstance = InstanceType<typeof Divider>

export const dividerProps = buildProps({
  direction: {
    type: String,
    values: ['horizontal', 'vertical'],
    default: 'horizontal',
  },
  orientation: {
    type: String,
    values: ['left', 'center', 'right'],
    default: 'center',
  },
  type: {
    type: definePropType<Properties['borderStyle']>(String),
    default: 'solid',
  },
  space: {
    type: definePropType<SpaceSizes | number>([String, Number]),
    values: spaceSizes,
    default: 'default',
    validator: (val: unknown): val is SpaceSizes =>
      isNumber(val) || spaceSizes.includes(val as any),
  },
} as const)
export type DividerProps = ExtractPropTypes<typeof dividerProps>

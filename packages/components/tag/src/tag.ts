import type { ExtractPropTypes } from 'vue'
import type Tag from './tag.vue'

export type TagInstance = InstanceType<typeof Tag>
export const tagProps = {}
export type TagProps = ExtractPropTypes<typeof tagProps>

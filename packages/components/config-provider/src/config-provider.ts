import { buildProps } from '@jirafa/utils'
import { defineComponent, renderSlot } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { provideGlobalConfig, useSizeProp } from '@jirafa/hooks'

export const configProviderProps = buildProps({
  size: useSizeProp,
  namespace: { type: String, default: 'j' },
} as const)
export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

const ConfigProvider = defineComponent({
  name: 'JConfigProvider',
  props: configProviderProps,
  setup(props, { slots }) {
    const config = provideGlobalConfig(props)
    return () => renderSlot(slots, 'default', { config: config?.value })
  },
})

export type ConfigProviderInstance = InstanceType<typeof ConfigProvider>

export default ConfigProvider

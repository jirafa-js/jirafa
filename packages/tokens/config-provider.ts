import type { ConfigProviderProps } from '@jirafa/components'
import type { InjectionKey, Ref } from 'vue'

export type ConfigProviderContext = Partial<ConfigProviderProps>

export const configProviderInjectKey: InjectionKey<Ref<ConfigProviderContext>> =
  Symbol('configProviderInjectKey')

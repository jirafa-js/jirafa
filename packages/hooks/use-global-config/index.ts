import type { App, Ref } from 'vue'
import { computed, getCurrentInstance, inject, provide, ref, unref } from 'vue'
import { configProviderInjectKey } from '@jirafa/tokens'
import type { ConfigProviderContext } from '@jirafa/tokens'
import type { MaybeRef } from '@jirafa/utils'
import { debugWarn, keysOf } from '@jirafa/utils'

const globalConfig = ref<ConfigProviderContext>()

export const provideGlobalConfig = (
  config: MaybeRef<ConfigProviderContext>,
  app?: App,
  global = false
) => {
  const inSetup = !!getCurrentInstance()
  const oldConfig = inSetup ? useGlobalConfig() : undefined

  const provideFn = app?.provide ?? (inSetup ? provide : undefined)

  if (!provideFn) {
    debugWarn(
      'provideGlobalConfig',
      'provideGlobalConfig() called should be inside setup()'
    )

    return
  }

  const context = computed(() => {
    const cfg = unref(config)
    if (!oldConfig?.value) return cfg
    return mergeConfig(oldConfig.value, cfg)
  })

  provideFn(configProviderInjectKey, context)

  if (global || !globalConfig.value) {
    globalConfig.value = context.value
  }

  return context
}

export function useGlobalConfig(): Ref<ConfigProviderContext>
export function useGlobalConfig<
  K extends keyof ConfigProviderContext,
  D extends ConfigProviderContext[K]
>(
  key: K,
  defaultValue?: D
): Ref<Exclude<ConfigProviderContext[K], undefined> | D>
export function useGlobalConfig(
  key?: keyof ConfigProviderContext,
  defaultValue = undefined
) {
  const config = getCurrentInstance()
    ? inject(configProviderInjectKey, globalConfig)
    : globalConfig

  if (key) {
    return computed(() => config.value?.[key] ?? defaultValue)
  } else {
    return config
  }
}

function mergeConfig(
  a: ConfigProviderContext,
  b: ConfigProviderContext
): ConfigProviderContext {
  const keys = [...new Set([...keysOf(a), ...keysOf(b)])]

  const cfg: Record<string, any> = {}
  for (const key of keys) {
    cfg[key] = b[key] ?? a[key]
  }
  return cfg
}

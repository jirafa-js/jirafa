import { debugWarn } from '@jirafa/utils'
import type { ComputedRef } from 'vue'
import { computed, getCurrentInstance } from 'vue'

interface Options {
  excludeListeners?: boolean
  excludeKeys?: ComputedRef<string[]>
}

const DEFAULT_EXCLUDE_KEYS = ['class', 'style']
const LISTENER_PREFIX = /^on[A-Z]/

export const useAttrs = (
  options: Options = {}
): ComputedRef<Record<string, unknown>> => {
  const instance = getCurrentInstance()
  if (!instance) {
    debugWarn(
      'use-attrs',
      'getCurrentInstance() returned null. useAttrs() must be called at the top of a setup function'
    )
    return computed(() => ({}))
  }

  const { excludeListeners = false, excludeKeys } = options

  const allExcludeKeys = computed<string[]>(() => {
    return (excludeKeys?.value || []).concat(DEFAULT_EXCLUDE_KEYS)
  })

  return computed(() => {
    return Object.fromEntries(
      Object.entries(instance.proxy?.$attrs!).filter(([key]) => {
        return (
          !allExcludeKeys.value.includes(key) &&
          !(excludeListeners && LISTENER_PREFIX.test(key))
        )
      })
    )
  })
}

import type { MaybeRef } from '@jirafa/utils'
import { debugWarn } from '@jirafa/utils'
import { computed, ref, useAttrs as useRawAttrs } from 'vue'

interface Options {
  excludeListeners?: boolean
  excludeKeys?: MaybeRef<string[]>
}

const DEFAULT_EXCLUDE_KEYS = ['class', 'style']
const LISTENER_PREFIX = /^on[A-Z]/

export const useAttrs = (options: Options = {}) => {
  try {
    const { excludeListeners = false, excludeKeys = [] } = options
    const attrs = useRawAttrs()
    const allExcludeKeys = computed(() =>
      ref(excludeKeys).value.concat(DEFAULT_EXCLUDE_KEYS)
    )
    return computed(() => {
      return Object.fromEntries(
        Object.entries(attrs).filter(([key]) => {
          return (
            !allExcludeKeys.value.includes(key) &&
            !(excludeListeners && LISTENER_PREFIX.test(key))
          )
        })
      )
    })
  } catch (error) {
    debugWarn(
      'use-attrs',
      'useAttrs() must be called at the top of a setup function'
    )
    return computed(() => ({}))
  }
}

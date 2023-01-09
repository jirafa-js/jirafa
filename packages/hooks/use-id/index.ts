import type { MaybeRef } from '@jirafa/utils'
import type { InjectionKey } from 'vue'
import { computed, getCurrentInstance, inject, ref, unref } from 'vue'

export interface IdInjectionContext {
  prefix: number
  current: number
}

export const IdInjectionKey: InjectionKey<IdInjectionContext> =
  Symbol('IdInjection')

const defaultIdInjection: IdInjectionContext = {
  prefix: Math.floor(Math.random() * 10000),
  current: 0,
}

export const useIdInjection = (): IdInjectionContext => {
  return getCurrentInstance()
    ? inject(IdInjectionKey, defaultIdInjection)
    : defaultIdInjection
}

export const useId = (offeredId?: MaybeRef<string>) => {
  const idInjection = useIdInjection()
  const namespace = ref('j')

  return computed(() => {
    return (
      unref(offeredId) ||
      `${namespace.value}-id-${idInjection.prefix}-${idInjection.current++}`
    )
  })
}

import type { MaybeRef } from '@jirafa/utils'
import { PREFIX } from '@jirafa/utils'
import type { InjectionKey } from 'vue'
import { computed, getCurrentInstance, inject, unref } from 'vue'
import { useGlobalConfig } from '../use-global-config'

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
  const namespace = useGlobalConfig('namespace', PREFIX)

  return computed(() => {
    return (
      unref(offeredId) ||
      `${namespace.value}-id-${idInjection.prefix}-${idInjection.current++}`
    )
  })
}

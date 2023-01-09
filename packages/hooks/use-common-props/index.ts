import type { ComputedRef } from 'vue'
import { computed, getCurrentInstance, inject, unref } from 'vue'
import type { ComponentSizes, MaybeRef } from '@jirafa/utils'
import { buildProp, componentSizes } from '@jirafa/utils'
import { FormContextInjectKey } from '@jirafa/tokens'
import { useGlobalConfig } from '../use-global-config'
import { useForm } from '../use-form'

export const useSizeProp = buildProp({
  type: String,
  values: componentSizes,
} as const)

export const useProp = <T>(name: string): ComputedRef<T | undefined> => {
  const instance = getCurrentInstance()
  return computed(() => (instance?.proxy?.$props as any)[name] ?? undefined)
}

export const useSize = (fallback?: MaybeRef<ComponentSizes | undefined>) => {
  const size = useProp<ComponentSizes>('size')
  const globalConfig = useGlobalConfig('size')
  const { form, formItem } = useForm()

  return computed(() => {
    return (
      size.value ||
      unref(fallback) ||
      formItem?.size ||
      form?.size ||
      globalConfig.value ||
      ''
    )
  })
}

export const useDisabled = (fallback?: MaybeRef<boolean | undefined>) => {
  const disabled = useProp<boolean>('disabled')
  const form = inject(FormContextInjectKey, undefined)

  return computed(() => {
    return disabled.value || unref(fallback) || form?.disabled || false
  })
}

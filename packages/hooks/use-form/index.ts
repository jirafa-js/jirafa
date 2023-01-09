import type { FormContext, FormItemContext } from '@jirafa/tokens'
import { FormContextInjectKey, FormItemContextInjectKey } from '@jirafa/tokens'
import type { MaybeRef } from '@jirafa/utils'
import { uid } from '@jirafa/utils'
import type { WatchStopHandle } from 'vue'
import { inject, onMounted, onUnmounted, ref, watch } from 'vue'

export const useForm = (): {
  form?: FormContext
  formItem?: FormItemContext
} => {
  const form = inject(FormContextInjectKey, undefined)
  const formItem = inject(FormItemContextInjectKey, undefined)

  return { form, formItem }
}

export interface useFormInputProps {
  id?: MaybeRef<string>
  label?: MaybeRef<string | number>
}

export interface useFormInputOptions {
  formItemContext?: FormItemContext
}

export const useFormInput = (
  props: useFormInputProps,
  { formItemContext }: useFormInputOptions = {}
) => {
  const inputId = ref<string>()
  let idUnwatch: WatchStopHandle | undefined

  onMounted(() => {
    idUnwatch = watch(
      ref(props.id),
      (id) => {
        const newId = id ?? uid()
        if (newId !== inputId.value) {
          formItemContext?.addInputId(newId)
          inputId.value = newId
        }
      },
      { immediate: true }
    )
  })

  onUnmounted(() => {
    idUnwatch?.()
    inputId.value && formItemContext?.removeInputId(inputId.value)
  })

  return {
    inputId,
  }
}

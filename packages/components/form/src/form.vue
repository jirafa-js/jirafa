<script lang="ts" setup>
import { useNamespace, useSize } from '@jirafa/hooks'
import type {
  FormContext,
  FormItemContext,
  FormValidateCallback,
  FormValidationResult,
} from '@jirafa/tokens'
import { FormContextInjectKey } from '@jirafa/tokens'
import type { Arrayable } from '@jirafa/utils'
import { debugWarn, ensureArray, isFunction } from '@jirafa/utils'
import type { ValidateFieldsError } from 'async-validator'
import { computed, provide, reactive, toRefs } from 'vue'
import { formEmits, formProps } from './form'
import type { FormItemProp } from './form-item'
import { useFormItemLabelWidth } from './form-item-label'

const props = defineProps(formProps)
const emit = defineEmits(formEmits)
defineOptions({ name: 'JForm' })
const ns = useNamespace('form')
const _size = useSize()

const isValidatable = computed(() => {
  const hasModel = !!props.model
  if (!hasModel) {
    debugWarn('JFrom', 'model is required for clearValidate to work.')
  }

  return hasModel
})

const fields: FormItemContext[] = []

const filterProps = (fieldProps: Arrayable<FormItemProp>) => {
  const fileted = ensureArray(fieldProps)

  return fileted.length > 0
    ? fields.filter((field) => field.prop && fileted.includes(field.prop))
    : fields
}

const addField: FormContext['addField'] = (field) => {
  fields.push(field)
}
const removeField: FormContext['removeField'] = (field) => {
  if (field.prop) {
    fields.splice(fields.indexOf(field), 1)
  }
}
const resetFields: FormContext['resetFields'] = (fieldProps = []) => {
  if (!isValidatable.value) {
    return
  }

  filterProps(fieldProps).forEach((field) => field.resetField())
}
const clearValidate: FormContext['clearValidate'] = (fieldProps = []) => {
  if (!isValidatable.value) {
    return
  }

  filterProps(fieldProps).forEach((field) => field.clearValidate())
}

const scrollToField: FormContext['scrollToField'] = (filedProp) => {
  const field = filterProps(filedProp)[0]
  field?.$el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
}

const doValidateField = async (
  fieldProps: Arrayable<FormItemProp> = []
): Promise<boolean> => {
  if (!isValidatable.value) return false

  const fields = filterProps(fieldProps)
  if (fields.length === 0) return true

  const invalidFieldsError: ValidateFieldsError = {}

  for (const field of fields) {
    try {
      await field.validate('')
    } catch (invalidFields) {
      Object.assign(invalidFieldsError, invalidFields)
    }
  }

  if (Object.keys(invalidFieldsError).length === 0) return true

  return Promise.reject(invalidFieldsError)
}

const validateField: FormContext['validateField'] = async (
  fieldProps = [],
  callback
) => {
  try {
    const result = await doValidateField(fieldProps)
    // When result is false meaning that the fields are not validatable
    if (result === true) {
      callback?.(true)
    }
    return result
  } catch (error) {
    const invalidFields = error as ValidateFieldsError

    callback?.(false, invalidFields)
    if (props.scrollToFirstError) {
      scrollToField(Object.keys(invalidFields)[0])
    }
    return isFunction(callback) ? false : Promise.reject(invalidFields)
  }
}

const validate = (callback?: FormValidateCallback): FormValidationResult => {
  return validateField(undefined, callback)
}

const handleSubmit = async (evt: Event) => {
  try {
    const result = await validateField()
    if (result === true) {
      emit('submitSuccess', props.model!, evt)
    }
  } catch (error) {
    emit(
      'submitFail',
      { values: props.model!, errors: error as ValidateFieldsError },
      evt
    )
  }

  emit('submit', evt)
}

provide(
  FormContextInjectKey,
  reactive({
    ...toRefs(props),
    ...useFormItemLabelWidth(),
    emit,

    addField,
    removeField,
    resetFields,
    clearValidate,
  })
)

defineExpose({
  validate,
  resetFields,
  clearValidate,
  scrollToField,
})
</script>

<template>
  <form
    :class="[
      ns.b(),
      ns.m(layout),
      ns.m(_size),
      { [ns.m(`label-${labelPosition}`)]: layout === 'horizontal' },
    ]"
    @submit.prevent="handleSubmit"
  >
    <slot></slot>
  </form>
</template>

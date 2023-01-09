import type {
  FormEmits,
  FormItemLabelWidthContext,
  FormItemProp,
  FormItemProps,
  FormItemValidateStatus,
  FormProps,
} from '@jirafa/components/form'
import type { Arrayable, ComponentSizes } from '@jirafa/utils'
import type { InjectionKey, SetupContext, UnwrapRef } from 'vue'
import type { ValidateError, ValidateFieldsError } from 'async-validator'

export type FormValidationResult = Promise<boolean>
export type FormValidateCallback = (
  isValid: boolean,
  invalidFields?: ValidateFieldsError
) => void
export interface FormValidateFailure {
  errors: ValidateError[] | null
  fields: ValidateFieldsError[]
}

export interface FormItemData {
  value?: any
  status?: FormItemValidateStatus
  message?: string
}

export interface FormContext
  extends FormProps,
    UnwrapRef<FormItemLabelWidthContext> {
  emit: SetupContext<FormEmits>['emit']

  // expose
  addField: (field: FormItemContext) => void
  removeField: (field: FormItemContext) => void
  resetFields: (props?: Arrayable<FormItemProp>) => void
  clearValidate: (props?: Arrayable<FormItemProp>) => void
  validateField: (
    props?: Arrayable<FormItemProp>,
    callback?: FormValidateCallback
  ) => FormValidationResult
  scrollToField: (field: FormItemProp) => void
}

export interface FormItemContext extends FormItemProps {
  $el: HTMLDivElement | undefined
  size: ComponentSizes
  validateStatus: FormItemValidateStatus
  inputId: string | undefined

  addInputId: (id: string) => void
  removeInputId: (id: string) => void
  validate: (
    trigger?: string,
    callback?: FormValidateCallback
  ) => FormValidationResult
  resetField: () => void
  clearValidate: () => void
  setField: (data: FormItemData) => void
}

export const FormContextInjectKey: InjectionKey<FormContext> = Symbol(
  'FormContextInjectKey'
)
export const FormItemContextInjectKey: InjectionKey<FormItemContext> = Symbol(
  'FormItemContextInjectKey'
)

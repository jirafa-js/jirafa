<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import {
  computed,
  inject,
  nextTick,
  onBeforeMount,
  onMounted,
  provide,
  reactive,
  ref,
  toRefs,
  useSlots,
} from 'vue'
import AsyncValidator from 'async-validator'
import { useNamespace } from '@jirafa/hooks'
import type { FormItemContext, FormValidateFailure } from '@jirafa/token'
import { FormContextInjectKey, FormItemContextInjectKey } from '@jirafa/token'
import type { Arrayable } from '@jirafa/utils'
import { ensureArray, getProp, isArray, isFunction } from '@jirafa/utils'
import { clone } from 'lodash-unified'
import { refDebounced } from '@vueuse/core'
import type { FormItemRule, FormItemValidateStatus } from './form-item'
import { formItemProps } from './form-item'
import FormItemLabel from './form-item-label.vue'

const props = defineProps(formItemProps)
const slots = useSlots()
defineOptions({ name: 'JFormItem' })

let initialValue: any
let isResettingField = false

const formContext = inject(FormContextInjectKey, undefined)
const parentFormItemContext = inject(FormItemContextInjectKey, undefined)
const ns = useNamespace('form-item')
const formItemRef = ref<HTMLDivElement>()
const validateStatus = ref<FormItemValidateStatus>('')
const validateStatusDebounce = refDebounced(validateStatus, 100)
const validateMessage = ref('')
const _size = computed(() => {
  return props.size ?? formContext?.size ?? ''
})

const inputId = ref<string>('')
const labelWidth = computed(() => {
  return props.labelWidth || formContext?.labelWidth || ''
})
const hasLabel = computed(() => {
  return props.label || slots.label
})

const contentStyle = computed<CSSProperties>(() => {
  if (
    formContext?.layout !== 'horizontal' ||
    (!!parentFormItemContext && !props.label && !props.labelWidth) || // nest
    hasLabel.value
  ) {
    return {}
  }
  return { marginLeft: formContext.autoLabelWidth || labelWidth.value }
})

const showHelp = computed(() => {
  return (
    !!slots.help || !!props.help || validateStatusDebounce.value === 'error'
  )
})

const normalizedRules = computed(() => {
  const rules: FormItemRule[] = []

  if (props.rules) {
    rules.push(...ensureArray(props.rules))
  }

  const formRules = formContext?.rules

  if (formRules && props.prop) {
    const _rules = getProp<Arrayable<FormItemRule> | undefined>(
      formContext.rules,
      props.prop
    ).value

    if (_rules) {
      rules.push(...ensureArray(_rules))
    }
  }

  const { required } = props
  if (required !== undefined) {
    const requiredRules = rules
      .map((rule, i) => [i, rule] as const)
      .filter(([, rule]) => Object.keys(rule).includes('required'))

    // prop required control the rule required
    if (requiredRules.length > 0) {
      for (const [i, rule] of requiredRules) {
        if (rule.required === required) continue
        rules[i] = { ...rule, required }
      }
    } else {
      rules.push({ required })
    }
  }

  return rules
})

const isRequired = computed(() => {
  return props.required || normalizedRules.value.some((rule) => rule.required)
})

const propString = computed(() => {
  if (!props.prop) return ''
  return isArray(props.prop) ? props.prop.join('.') : props.prop
})
const filterRules = (trigger?: string) => {
  return trigger
    ? normalizedRules.value.filter((rule) => {
        if (!rule.trigger) return true
        if (isArray(rule.trigger)) {
          return rule.trigger.includes(trigger)
        } else {
          return rule.trigger === trigger
        }
      })
    : normalizedRules.value
}

const fieldValue = computed({
  get() {
    const model = formContext?.model
    if (!model || !props.prop) {
      return
    }

    return getProp(model, props.prop).value
  },
  set(val) {
    const model = formContext?.model
    if (!model || !props.prop) {
      return
    }
    getProp(model, props.prop).value = val
  },
})

const onValidateSuccess = () => {
  validateStatus.value = 'success'
  formContext?.emit('validate', props.prop!, true, '')
}

const onValidateFailure = (error: FormValidateFailure) => {
  const { errors, fields } = error
  if (!errors || !fields) {
    console.error(error)
  }
  validateStatus.value = 'error'
  validateMessage.value = errors
    ? errors[0]?.message ?? `${propString.value} is required`
    : ''

  formContext?.emit('validate', props.prop!, false, validateMessage.value)
}

const doValidate = async (rules: FormItemRule[]): Promise<true> => {
  const modelName = propString.value
  const validator = new AsyncValidator({ [modelName]: rules })

  return validator
    .validate({ [modelName]: fieldValue.value }, { firstFields: true })
    .then(() => {
      onValidateSuccess()
      return true as const
    })
    .catch((err: FormValidateFailure) => {
      onValidateFailure(err)
      return Promise.reject(err)
    })
}

const validate: FormItemContext['validate'] = async (trigger, callback) => {
  if (isResettingField || !props.prop) {
    return false
  }
  const rules = filterRules(trigger)
  if (rules.length === 0) {
    callback?.(false)
    return false
  }

  validateStatus.value = 'validating'

  return doValidate(rules)
    .then(() => {
      callback?.(true)
      return true
    })
    .catch((error: FormValidateFailure) => {
      const { fields } = error
      return isFunction(callback) ? false : Promise.reject(fields)
    })
}

const clearValidate: FormItemContext['clearValidate'] = () => {
  validateStatus.value = ''
  validateMessage.value = ''
  isResettingField = false
}

const resetField: FormItemContext['resetField'] = async () => {
  const model = formContext?.model
  if (!model || !props.prop) {
    return
  }

  isResettingField = true

  getProp(model, props.prop).value = clone(initialValue)

  await nextTick()
  clearValidate()

  isResettingField = false
}

const setField: FormItemContext['setField'] = (data) => {
  if ('value' in data) {
    fieldValue.value = data.value
  }

  if (data.status) {
    validateStatus.value = data.status
  }

  if (data.message) {
    validateMessage.value = data.message
  }
}

const addInputId: FormItemContext['addInputId'] = (id) => {
  inputId.value = id
}
const removeInputId: FormItemContext['addInputId'] = (id) => {
  if (id === inputId.value) {
    inputId.value = ''
  }
}

const context: FormItemContext = reactive({
  ...toRefs(props),
  size: _size,
  $el: formItemRef,
  inputId,
  validateStatus,
  validate,
  clearValidate,
  resetField,
  addInputId,
  removeInputId,
  setField,
})

provide(FormItemContextInjectKey, context)

onMounted(() => {
  formContext?.addField(context)
  if (props.prop) {
    initialValue = clone(fieldValue.value)
  }
})

onBeforeMount(() => {
  formContext?.removeField(context)
})

defineExpose({
  size: _size,
  validate,
  clearValidate,
  resetField,
  setField,
  validateStatus,
  validateMessage,
})
</script>

<template>
  <div
    ref="formItemRef"
    :class="[
      ns.b(),
      ns.m(_size),
      ns.is('required', isRequired),
      ns.is(validateStatus, !!validateStatus),
      formContext?.hideRequireAsterisk
        ? 'asterrisk-none'
        : `asterisk-${formContext?.requireAsteriskPosition || 'left'}`,
    ]"
  >
    <FormItemLabel v-if="hasLabel">
      <slot name="label">{{ label }}</slot>
    </FormItemLabel>
    <div :class="[ns.e('content')]" :style="contentStyle">
      <slot></slot>
      <transition name="j-zoom-in-top">
        <slot v-if="showHelp" name="help" :help="validateMessage">
          <div :class="[ns.e('help')]">
            {{ help || validateMessage }}
          </div>
        </slot>
      </transition>
      <div v-if="$slots.extra || extra" :class="[ns.e('extra')]">
        <slot name="extra">{{ extra }}</slot>
      </div>
    </div>
  </div>
</template>

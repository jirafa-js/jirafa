<script lang="ts" setup>
import { useForm, useId, useNamespace } from '@jirafa/hooks'
import type { RadioGroupContext } from '@jirafa/tokens'
import { radioGroupInjectKey } from '@jirafa/tokens'
import {
  UPDATE_MODEL_EVENT,
  debugWarn,
  isFunction,
  isNumber,
  isString,
} from '@jirafa/utils'
import { computed, nextTick, provide, reactive, toRefs, watch } from 'vue'
import type { RadioOption } from './radio-group'
import { radioGroupEmits, radioGroupProps } from './radio-group'
import Radio from './radio.vue'

const props = defineProps(radioGroupProps)
const emit = defineEmits(radioGroupEmits)
defineOptions({ name: 'JRadioGroup' })

const { formItem } = useForm()
const ns = useNamespace('radio-group')

const cls = computed(() => {
  return [
    ns.b(props.type === 'radio' ? '' : 'button'),
    props.type === 'radio' &&
      props.direction === 'vertical' &&
      ns.m(props.direction),
  ]
})

const radioId = useId()

const name = computed(() => props.name || radioId.value)

const handleChange: RadioGroupContext['handleChange'] = (val) => {
  emit(UPDATE_MODEL_EVENT, val)
  nextTick(() => emit('change', val))
}

const options = computed(() => {
  return (props.options ?? []).map((item) => {
    if (isString(item) || isNumber(item)) {
      return {
        label: item,
        value: item,
      } as RadioOption
    }
    return item
  })
})

provide(
  radioGroupInjectKey,
  reactive({
    ...toRefs(props),
    name,
    handleChange,
  })
)

watch(
  () => props.modelValue,
  () => {
    if (props.validateEvent) {
      formItem?.validate('change').catch((err) => debugWarn(err))
    }
  }
)
</script>

<template>
  <div :class="cls" role="radiogroup">
    <template v-if="options.length > 0">
      <Radio
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
        :model-value="modelValue"
      >
        <slot name="label" :option="option">
          {{ isFunction(option.label) ? option.label() : option.label }}
        </slot>
      </Radio>
    </template>
    <slot v-else></slot>
  </div>
</template>

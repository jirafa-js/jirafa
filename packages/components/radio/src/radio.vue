<script lang="ts" setup>
import { useForm, useNamespace } from '@jirafa/hooks'
import { radioGroupInjectKey } from '@jirafa/token'
import { UPDATE_MODEL_EVENT } from '@jirafa/utils'
import { computed, inject, nextTick, ref } from 'vue'
import type { RadioProps } from './radio'
import { radioEmits, radioProps } from './radio'

const props = defineProps(radioProps)
const emit = defineEmits(radioEmits)
defineOptions({ name: 'JRadio' })

const radioGroup = inject(radioGroupInjectKey, undefined)
const { form, formItem } = useForm()

const radioRef = ref<HTMLInputElement>()

const modelValue = computed<RadioProps['modelValue']>({
  get() {
    return radioGroup ? radioGroup.modelValue : props.modelValue
  },
  set(val) {
    if (radioGroup) {
      radioGroup.handleChange(val!)
    } else {
      emit(UPDATE_MODEL_EVENT, val!)
    }
    radioRef.value!.checked = props.modelValue === props.value
  },
})
const disabled = computed(
  () => props.disabled || radioGroup?.disabled || form?.disabled || false
)
const size = computed(
  () => props.size || radioGroup?.size || formItem?.size || form?.size || ''
)
const focus = ref(false)
const checked = computed(() => modelValue.value === props.value)
const type = computed(() => radioGroup?.type ?? props.type)
const border = computed(() => radioGroup?.border ?? props.border)

const ns = useNamespace(type.value === 'button' ? 'radio-button' : 'radio')

const handleChange = () => {
  nextTick(() => emit('change', modelValue.value))
}
</script>

<template>
  <label
    :class="[
      ns.b(),
      ns.is('disabled', disabled),
      ns.is('focus', focus),
      ns.is('checked', checked),
      ns.is('bordered', type === 'radio' && border),
      ns.m(size),
    ]"
  >
    <input
      ref="radioRef"
      v-model="modelValue"
      :class="[ns.e('native')]"
      :name="name || radioGroup?.name"
      :value="value"
      :disabled="disabled"
      type="radio"
      @change="handleChange"
      @focus="focus = true"
      @blur="focus = false"
    />
    <template v-if="type !== 'button'">
      <span :class="[ns.e('input')]"></span>
      <span :class="[ns.e('label')]">
        <slot>{{ value }}</slot>
      </span>
    </template>
    <span v-else :class="[ns.e('content')]">
      <slot>{{ value }}</slot>
    </span>
  </label>
</template>

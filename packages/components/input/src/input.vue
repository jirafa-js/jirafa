<script lang="ts" setup>
import {
  useAttrs,
  useDisabled,
  useForm,
  useNamespace,
  useSize,
} from '@jirafa/hooks'
import {
  computed,
  nextTick,
  onMounted,
  ref,
  shallowRef,
  useSlots,
  watch,
} from 'vue'
import { JIcon, JIconFeedback } from '@jirafa/components/icon'
import { UPDATE_MODEL_EVENT, debugWarn, isKorean, isNil } from '@jirafa/utils'
import { Close, View, ViewOff } from '@jirafa/icons'
import { inputEmits, inputProps } from './input'

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)
defineOptions({ name: 'JInput', inheritAttrs: false })
const ns = useNamespace('input')

const { form, formItem } = useForm()
// const { inputId } = useFormInput(props, { formItemContext: formItem })
const _size = useSize()
const _disabled = useDisabled()
const attrs = useAttrs()
const slots = useSlots()
const input = shallowRef<HTMLInputElement>()

const focused = ref(false)
const hovering = ref(false)
const isComposing = ref(false)
const passwordVisible = ref(false)

const inputType = computed(() => {
  return props.type === 'password' && props.showPassword
    ? passwordVisible.value
      ? 'text'
      : 'password'
    : props.type
})
const inputValue = computed(() => {
  return isNil(props.modelValue) ? '' : String(props.modelValue)
})

const showClear = computed(() => {
  return (
    props.clearable &&
    !_disabled.value &&
    !props.readonly &&
    !!inputValue.value &&
    (focused.value || hovering.value)
  )
})
const showPswVisible = computed(() => {
  return (
    props.showPassword &&
    !_disabled.value &&
    !props.readonly &&
    (!!inputValue.value || focused.value)
  )
})

const showFeedbackIcon = computed(() => {
  return !!form?.statusIcon && !!formItem?.validateStatus
})

const feedbackIcon = computed(() => formItem?.validateStatus || '')

const showLimitVisible = computed(() => {
  return (
    props.showWordLimit &&
    !!props.maxlength &&
    props.type === 'text' &&
    !_disabled.value &&
    !props.readonly
  )
})
const textLength = computed(() => Array.from(inputValue.value).length)
const isInputExceed = computed(
  () => showLimitVisible.value && textLength.value > Number(props.maxlength)
)
const isSuffixVisible = computed(() => {
  return (
    !!slots.suffix ||
    !!props.suffixIcon ||
    showClear.value ||
    showPswVisible.value ||
    showLimitVisible.value ||
    showFeedbackIcon.value
  )
})

const setNativeInputValue = () => {
  if (!input.value || input.value.value === inputValue.value) return
  input.value.value = inputValue.value
}

const focus = async () => {
  await nextTick()
  input.value?.focus()
}

const blur = () => {
  input.value?.blur()
}

const select = () => {
  input.value?.select()
}

const clear = async () => {
  emit('update:modelValue', '')
  emit('change', '')
  emit('input', '')
  emit('clear')
}

const handleMouseLeave = (evt: MouseEvent) => {
  hovering.value = false
  emit('mouseleave', evt)
}

const handleMouseEnter = (evt: MouseEvent) => {
  hovering.value = true
  emit('mouseenter', evt)
}

const handleMouseDown = (evt: MouseEvent) => {
  if (input.value && evt.target !== input.value) {
    evt.preventDefault()
    input.value.focus()
  }
}

const handlePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
  focus()
}

const handleInput = async (evt: Event) => {
  if (isComposing.value) return

  const { value } = evt.target as HTMLInputElement
  emit('input', value)
  emit(UPDATE_MODEL_EVENT, value)

  await nextTick()
  setNativeInputValue()
}

const handleCompositionStart = (evt: CompositionEvent) => {
  isComposing.value = true
  emit('compositionstart', evt)
}
const handleCompositionUpdate = (evt: CompositionEvent) => {
  emit('compositionupdate', evt)
  const { value } = evt.target as HTMLInputElement
  const lastCharacter = value[value.length - 1] || ''
  isComposing.value = !isKorean(lastCharacter)
}
const handleCompositionEnd = (evt: CompositionEvent) => {
  emit('compositionend', evt)
  if (isComposing.value) {
    isComposing.value = false
    handleInput(evt)
  }
}

const handleFocus = (evt: FocusEvent) => {
  focused.value = true
  emit('focus', evt)
}
const handleBlur = (evt: FocusEvent) => {
  focused.value = false
  emit('blur', evt)
  if (props.validateEvent) {
    formItem?.validate?.('blur').catch((error) => debugWarn(error))
  }
}
const handleChange = (evt: Event) => {
  emit('change', (evt.target as HTMLInputElement).value)
}
const handleKeydown = (evt: KeyboardEvent) => {
  emit('keydown', evt)
}

watch(
  () => props.modelValue,
  () => {
    if (props.validateEvent) {
      formItem?.validate?.('change').catch((error) => debugWarn(error))
    }
  }
)

watch(inputValue, () => setNativeInputValue())
onMounted(() => {
  setNativeInputValue()
})

defineExpose({
  ref: input,
  focus,
  blur,
  clear,
  select,
})
</script>

<template>
  <div
    v-bind="containerAttrs"
    :class="[
      ns.b(),
      ns.m(_size),
      ns.is('disabled', _disabled),
      ns.is('readonly', readonly),
      {
        [ns.be('group')]: $slots.append || $slots.prepend,
      },
      $attrs.class,
    ]"
    :style="[$attrs.style]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div v-if="$slots.prepend" :class="[ns.e('prepend')]">
      <slot name="prepend" />
    </div>
    <div
      :class="[
        ns.e('wrapper'),
        ns.is('focus', focused),
        ns.is('exceed', isInputExceed),
      ]"
      @mousedown="handleMouseDown"
    >
      <span :class="[ns.e('overlay')]"></span>
      <span v-if="$slots.prefix || prefixIcon" :class="[ns.e('prefix')]">
        <span v-if="$slots.prefix" :class="[ns.e('prefix-inner')]">
          <slot name="prefix" />
        </span>
        <JIcon v-if="prefixIcon" :class="[ns.e('icon')]">
          <component :is="prefixIcon" />
        </JIcon>
      </span>
      <input
        :id="id"
        ref="input"
        :class="[ns.e('inner')]"
        :placeholder="placeholder"
        :type="inputType"
        :style="inputStyle"
        :aria-disabled="_disabled"
        :disabled="_disabled"
        :maxlength="maxlength"
        :readonly="readonly"
        :autocomplete="autocomplete"
        v-bind="attrs"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        @keydown="handleKeydown"
      />
      <span v-if="isSuffixVisible" :class="[ns.e('suffix')]">
        <JIcon
          v-if="showClear"
          :class="[ns.e('icon'), ns.e('clear')]"
          role="button"
          @mousedown.prevent
          @click="clear"
        >
          <Close />
        </JIcon>

        <JIcon v-if="suffixIcon" :class="[ns.e('icon')]">
          <component :is="suffixIcon" />
        </JIcon>
        <JIcon
          v-if="showPswVisible"
          :class="[ns.e('icon'), ns.e('password')]"
          role="button"
          @mousedown.prevent
          @mouseup.prevent
          @click="handlePasswordVisible"
        >
          <component :is="passwordVisible ? ViewOff : View" />
        </JIcon>
        <span v-if="showLimitVisible" :class="[ns.e('count')]">
          {{ textLength }} / {{ maxlength }}
        </span>
        <JIconFeedback
          v-if="showFeedbackIcon"
          :class="[ns.e('icon')]"
          :type="feedbackIcon"
        />
        <span v-if="$slots.suffix" :class="[ns.e('suffix-inner')]">
          <slot name="suffix" />
        </span>
      </span>
    </div>
    <div v-if="$slots.append" :class="[ns.e('append')]">
      <slot name="append" />
    </div>
  </div>
</template>

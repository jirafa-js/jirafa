<script lang="ts" setup>
import { useDisabled, useNamespace, useSize } from '@jirafa/hooks'
import { ButtonGroupContextInjectKey } from '@jirafa/tokens'
import { computed, inject, ref } from 'vue'
import { buttonProps } from './button'

const props = defineProps(buttonProps)
defineOptions({ name: 'JButton' })

const ns = useNamespace('button')
const buttonGroupContext = inject(ButtonGroupContextInjectKey, undefined)

const _type = computed(
  () => props.type ?? buttonGroupContext?.type ?? 'secondary'
)

const _status = computed(() => props.status ?? buttonGroupContext?.status)

const _size = useSize(computed(() => buttonGroupContext?.size))

const _shape = computed(() => props.shape ?? buttonGroupContext?.shape)

const _disabled = useDisabled(computed(() => buttonGroupContext?.disabled))

const _ref = ref<HTMLButtonElement>()

defineExpose({
  ref: _ref,
  type: _type,
  size: _size,
  shape: _shape,
  status: _status,
  disabled: _disabled,
})
</script>

<template>
  <button
    :class="[
      ns.b(),
      ns.m(_type),
      ns.m(_status),
      ns.m(_size),
      ns.m(_shape),
      ns.is('block', block),
      ns.is('loading', loading),
      ns.is('disabled', _disabled),
      ns.is('only-icon', !$slots.default && (!!icon || !!loadingIcon)),
    ]"
    :aria-disabled="_disabled"
    :disabled="_disabled || loading"
    :autofocus="autofocus"
    :type="htmlType"
  >
    <span :class="ns.e('overlay')"></span>
    <span :class="ns.e('underlay')"></span>
    <template v-if="loading">
      <slot name="loading">
        <JIcon :class="ns.is('loading')">
          <component :is="loadingIcon" />
        </JIcon>
      </slot>
    </template>
    <template v-else-if="icon || $slots.icon">
      <JIcon>
        <slot name="icon">
          <component :is="icon" />
        </slot>
      </JIcon>
    </template>
    <span v-if="$slots.default" :class="ns.e('text')">
      <slot></slot>
    </span>
  </button>
</template>

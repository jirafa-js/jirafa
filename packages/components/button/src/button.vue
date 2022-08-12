<script lang="ts" setup>
import { useNamespace } from '@jirafa/hooks'
import { buttonProps } from './button'

defineProps(buttonProps)
defineOptions({ name: 'JButton' })

const ns = useNamespace('button')
</script>

<template>
  <button
    :class="[
      ns.b(),
      ns.m(variant),
      ns.m(color),
      ns.m(size),
      ns.m(shape),
      ns.is('loading', loading),
      ns.is('disabled', disabled),
    ]"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="type"
  >
    <template v-if="loading">
      <slot name="loading">
        <span :class="ns.is('loading')"></span>
      </slot>
    </template>
    <template v-else-if="icon || $slots.icon">
      <!-- Icon -->
    </template>
    <span v-if="$slots.default" :class="ns.e('text')">
      <slot></slot>
    </span>
  </button>
</template>

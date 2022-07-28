<script lang="ts" setup>
import { buttonProps } from './button'

defineProps(buttonProps)
defineOptions({ name: 'JButton' })
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>

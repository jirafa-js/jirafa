<script lang="ts" setup>
import { buttonGroupProps } from './button-group'

defineProps(buttonGroupProps)
defineOptions({ name: 'JButtonGroup' })
</script>

<template>
  <div class="j-button-group">
    <slot></slot>
  </div>
</template>

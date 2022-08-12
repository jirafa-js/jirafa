<script lang="ts" setup>
import { tagProps } from './tag'

defineProps(tagProps)
defineOptions({ name: 'JTag' })
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@jirafa/hooks'
import { isDef, suffixUnit } from '@jirafa/utils'
import { computed } from 'vue'
import { iconProps } from './icon'

const props = defineProps(iconProps)
defineOptions({ name: 'JIcon', inheritAttrs: false })

const ns = useNamespace('icon')
const style = computed(() => {
  if (!props.size && !props.color) return {}
  return {
    fontSize: isDef(props.size) ? suffixUnit(props.size) : undefined,
    '--color': props.color,
  }
})
</script>

<template>
  <i :class="[ns.b()]" :style="style" v-bind="$attrs">
    <slot></slot>
  </i>
</template>

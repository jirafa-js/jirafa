<script lang="ts" setup>
import { useNamespace } from '@jirafa/hooks'
import { RowContextInjectKey } from '@jirafa/tokens'
import { isNumber } from '@jirafa/utils'
import type { CSSProperties } from 'vue'
import { computed, provide, reactive, toRef } from 'vue'
import { rowProps } from './row'

const props = defineProps(rowProps)
defineOptions({ name: 'JRow' })
provide(RowContextInjectKey, reactive({ gutter: toRef(props, 'gutter') }))

const ns = useNamespace('row')
const styles = computed(() => {
  const styles: CSSProperties = {}

  if (props.gutter && isNumber(props.gutter)) {
    styles.marginInline = `-${props.gutter / 2}px`
  }

  return styles
})
</script>

<template>
  <Component
    :is="props.tag"
    :class="[
      ns.b(),
      ns.is(`align-${props.align}`, props.align !== 'stretch'),
      ns.is(`justify-${props.justify}`, props.justify !== 'start'),
    ]"
    :style="styles"
  >
    <slot></slot>
  </Component>
</template>

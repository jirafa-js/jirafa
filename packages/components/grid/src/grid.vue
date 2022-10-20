<script lang="ts" setup>
import { useNamespace, useResponsiveBreakpoint } from '@jirafa/hooks'
import type { GridContext } from '@jirafa/token'
import { GridContextInjectKey } from '@jirafa/token'
import { isNumber } from '@jirafa/utils'
import type { CSSProperties } from 'vue'
import { computed, provide, reactive, watchEffect } from 'vue'
import { gridProps } from './grid'
import { formatGap } from './utils'

const props = defineProps(gridProps)
defineOptions({ name: 'JGrid' })

const breakpoint = useResponsiveBreakpoint()

const gridContext: GridContext = reactive({
  cols: props.cols,
  gaps: formatGap(props.gap),
  breakpoint,
})

watchEffect(() => {
  if (!breakpoint.value) {
    return
  }

  const breakpointProp = props[breakpoint.value]
  if (isNumber(breakpointProp)) {
    gridContext.cols = breakpointProp
  } else {
    gridContext.cols = breakpointProp.cols ?? props.cols
    gridContext.gaps = formatGap(breakpointProp.gap ?? props.gap)
  }
})

const ns = useNamespace('grid')
const styles = computed(() => {
  const { cols, gaps } = gridContext
  const styles: CSSProperties = {
    'grid-template-columns': `repeat(${cols}, minmax(0, 1fr))`,
    gap: gaps.map((gap) => `${gap}px`).join(' '),
  }

  return styles
})

provide(GridContextInjectKey, gridContext)
</script>

<template>
  <Component :is="props.tag" :class="[ns.b()]" :style="styles">
    <slot></slot>
  </Component>
</template>

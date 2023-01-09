<script lang="ts" setup>
import { useNamespace } from '@jirafa/hooks'
import { GridContextInjectKey } from '@jirafa/tokens'
import { isNumber } from '@jirafa/utils'
import type { CSSProperties } from 'vue'
import { computed, inject } from 'vue'
import { gridItemProps } from './grid-item'

const props = defineProps(gridItemProps)
const gridContext = inject(GridContextInjectKey, {
  cols: 24,
  gaps: [0, 0],
  breakpoint: undefined,
})

defineOptions({ name: 'JGridItem' })

const ns = useNamespace('grid-item')
const classes = computed(() => {
  const c: string[] = []

  return c
})

const styles = computed(() => {
  const [_span, _offset] = (['span', 'offset'] as const).map((size) => {
    if (!gridContext.breakpoint) {
      return props[size]
    }

    const prop = props[gridContext.breakpoint]

    if (isNumber(prop)) {
      return size === 'span' ? prop : props[size]
    } else {
      return prop[size] ?? props[size]
    }
  })
  const { cols, gaps } = gridContext

  const offset = Math.min(cols, _offset)
  const span = Math.min(cols, offset > 0 ? _span + offset : _span)

  const [, colGap] = gaps
  const oneSpan = `(100% - ${colGap * (span - 1)}px) / ${span}`
  const styles: CSSProperties = {
    'grid-column': `span ${span} / span ${span}`,
  }

  if (offset > 0) {
    styles['margin-left'] = `calc((${oneSpan} * ${offset}) + ${
      colGap * offset
    }px)`
  }

  if (span === 0) {
    styles.display = 'none'
  }

  return styles
})
</script>

<template>
  <Component :is="props.tag" :class="[ns.b(), classes]" :style="styles">
    <slot :breakpoint="gridContext.breakpoint"></slot>
  </Component>
</template>

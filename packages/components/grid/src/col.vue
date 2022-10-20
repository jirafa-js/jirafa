<script lang="ts" setup>
import { useNamespace } from '@jirafa/hooks'
import { RowContextInjectKey } from '@jirafa/token'
import { isNumber, isObject, responsiveArray } from '@jirafa/utils'
import type { CSSProperties } from 'vue'
import { computed, inject } from 'vue'
import { colProps } from './col'

const props = defineProps(colProps)
const rowContext = inject(RowContextInjectKey, { gutter: 0 })
defineOptions({ name: 'JCol' })

const ns = useNamespace('col')
const classes = computed(() => {
  const c: string[] = []

  if (isNumber(props.span)) {
    c.push(ns.b(String(props.span)))
  }

  const pos = ['pull', 'push', 'offset'] as const
  pos.forEach((prop) => {
    if (isNumber(props[prop]) && props[prop] > 0) {
      c.push(ns.b(`${prop}-${props[prop]}`))
    }
  })

  const sizes = responsiveArray
  sizes.forEach((size) => {
    if (isNumber(props[size])) {
      c.push(ns.b(`${size}-${props[size]}`))
    } else if (isObject(props[size])) {
      Object.entries(props[size]).forEach(([prop, value]) => {
        c.push(
          prop !== 'span'
            ? ns.b(`${size}-${prop}-${value}`)
            : ns.b(`${size}-${value}`)
        )
      })
    }
  })

  return c
})

const styles = computed(() => {
  const styles: CSSProperties = {}

  if (rowContext.gutter && isNumber(rowContext.gutter)) {
    styles.paddingInline = `${rowContext.gutter / 2}px`
  }

  return styles
})
</script>

<template>
  <Component :is="props.tag" :class="[ns.b(), classes]" :style="styles">
    <slot></slot>
  </Component>
</template>

<script lang="ts" setup>
import { useNamespace } from '@jirafa/hooks'
import { formatSpace } from '@jirafa/utils'
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { dividerProps } from './divider'

const props = defineProps(dividerProps)
defineOptions({ name: 'JDivider' })

const ns = useNamespace('divider')
const dividerStyle = computed(() => {
  return ns.cssVar({
    'divider-border-style': props.type!,
    'divider-space': formatSpace(props.space),
  }) as CSSProperties
})
</script>

<template>
  <div
    role="separator"
    :class="[ns.b(), ns.m(props.direction)]"
    :style="dividerStyle"
  >
    <span
      v-if="$slots.default && props.direction !== 'vertical'"
      :class="[ns.e('text'), ns.is(props.orientation)]"
    >
      <slot></slot>
    </span>
  </div>
</template>

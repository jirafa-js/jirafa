<script lang="ts" setup>
import { useNamespace } from '@jirafa/hooks'
import type { CSSProperties } from 'vue'
import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  onBeforeMount,
  onMounted,
  onUpdated,
  ref,
  useSlots,
  watch,
} from 'vue'
import { FormContextInjectKey, FormItemContextInjectKey } from '@jirafa/token'
import { useResizeObserver } from '@vueuse/core'
import { suffixUnit } from '@jirafa/utils'

const slots = useSlots()
defineOptions({ name: 'JFormItemLabel' })

const instance = getCurrentInstance()
const formContext = inject(FormContextInjectKey, undefined)
const formItemCtx = inject(FormItemContextInjectKey, undefined)
const ns = useNamespace('form-item')

const labelWidth = computed(() => {
  return formItemCtx?.labelWidth || formContext?.labelWidth || ''
})

const isAutoWidth = computed(() => {
  return labelWidth.value === 'auto'
})

const isLayoutHorizontal = computed(() => formContext?.layout === 'horizontal')

const el = ref<HTMLElement>()
const computedWidth = ref(0)

const getLabelWidth = () => {
  if (el.value) {
    const width = window.getComputedStyle(el.value).width
    return Math.ceil(Number.parseFloat(width))
  } else {
    return 0
  }
}

const updateLabelWidth = (action: 'update' | 'remove' = 'update') => {
  nextTick(() => {
    if (slots.default && isAutoWidth.value && isLayoutHorizontal.value) {
      if (action === 'update') {
        computedWidth.value = getLabelWidth()
      } else if (action === 'remove') {
        formContext?.removeLabelWidth(instance?.uid)
      }
    }
  })
}

onMounted(() => updateLabelWidth('update'))
onUpdated(() => updateLabelWidth('update'))
onBeforeMount(() => updateLabelWidth('remove'))

watch(computedWidth, (val) => {
  formContext?.setLabelWidth(val, instance?.uid)
})

const warpStyle = computed(() => {
  const style: CSSProperties = {}

  // console.log('formContext?.layout: ', formContext?.layout)
  if (formContext?.layout !== 'horizontal') return style

  if (isAutoWidth.value) {
    const autoLabelWidth = formContext?.autoLabelWidth
    if (autoLabelWidth) {
      style.flex = `0 0 ${autoLabelWidth}`
    }
  } else {
    style.flex = `0 0 ${suffixUnit(labelWidth.value)}`
  }

  return style
})

useResizeObserver(
  computed(() => (el.value?.firstElementChild ?? null) as HTMLElement | null),
  () => updateLabelWidth('update')
)
</script>

<template>
  <div
    v-if="isLayoutHorizontal"
    :class="[ns.e('label-wrap')]"
    :style="warpStyle"
  >
    <label ref="el" :class="[ns.e('label')]">
      <slot></slot>
    </label>
  </div>
  <label v-else :class="[ns.e('label')]">
    <slot></slot>
  </label>
</template>

<script lang="ts" setup>
import { useNamespace } from '@jirafa/hooks'
import { JIcon } from '@jirafa/components/icon'
import { Close, Loading } from '@jirafa/icons'
import { computed, ref } from 'vue'
import { tagEmits, tagPresetColores, tagProps } from './tag'

const props = defineProps(tagProps)
const emit = defineEmits(tagEmits)
defineOptions({ name: 'JTag' })

const ns = useNamespace('tag')

const _checked = ref(false)

const _color = computed(
  () => !tagPresetColores.includes(props.color as any) && props.color
)

const tagStyle = computed(() =>
  _color.value ? ns.cssVarBlock({ 'text-color': _color.value }) : {}
)

const computedChecked = computed(() =>
  props.checkable ? props.checked || _checked.value : false
)

const handleClose = (ev: MouseEvent) => {
  emit('close', ev)
}

const handleChange = (ev: MouseEvent) => {
  if (props.checkable) {
    const newChecked = !computedChecked.value
    _checked.value = newChecked
    emit('change', newChecked, ev)
    emit('update:checked', newChecked)
  }
}
</script>

<template>
  <span
    :class="[
      ns.b(),
      ns.m(size),
      ns.m(!_color ? color : undefined),
      ns.is('closable', closable),
      ns.is('checkable', checkable),
      ns.is('checked', _checked),
      ns.is('loading', loading),
      ns.is('bordered', border),
    ]"
    :style="tagStyle"
    @click="handleChange"
  >
    <span :class="[ns.e('overlay')]"></span>
    <span :class="[ns.e('content')]">
      <slot></slot>
    </span>
    <JIcon v-if="loading" :class="[ns.is('loading')]">
      <Loading />
    </JIcon>
    <JIcon
      v-else-if="closable"
      :class="[ns.e('close')]"
      role="button"
      @click="handleClose"
    >
      <Close />
    </JIcon>
  </span>
</template>

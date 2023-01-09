<script lang="ts" setup>
import { useNamespace } from '@jirafa/hooks'
import { ButtonGroupContextInjectKey } from '@jirafa/tokens'
import { provide, reactive, toRefs } from 'vue'
import { buttonGroupProps } from './button-group'

const props = defineProps(buttonGroupProps)
defineOptions({ name: 'JButtonGroup' })
const ns = useNamespace('button-group')
const { size, type, shape, status, disabled } = toRefs(props)
provide(
  ButtonGroupContextInjectKey,
  reactive({ size, type, shape, status, disabled })
)
</script>

<template>
  <div :class="[ns.b()]">
    <slot></slot>
  </div>
</template>

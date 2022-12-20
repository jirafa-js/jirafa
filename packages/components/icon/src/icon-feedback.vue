<script lang="ts" setup>
import { computed } from 'vue'
import {
  CheckCircleFilled,
  CloseCircleFilled,
  Loading,
  WarnCircleFilled,
} from '@jirafa/icons'
import { useNamespace } from '@jirafa/hooks'
import JIcon from './icon.vue'
import { iconFeedbackProps } from './icon-feedback'

const props = defineProps(iconFeedbackProps)
defineOptions({ name: 'JIconFeedback' })
const ns = useNamespace('icon-feedback')

const FeedbackIcon = computed(() => {
  if (!props.type) return null

  return {
    success: CheckCircleFilled,
    error: CloseCircleFilled,
    loading: Loading,
    validating: Loading,
    warning: WarnCircleFilled,
  }[props.type]
})
</script>

<template>
  <JIcon
    v-if="FeedbackIcon"
    :class="[ns.b(), ns.m(type)]"
    :spining="['loading', 'validating'].includes(type)"
  >
    <component :is="FeedbackIcon" />
  </JIcon>
</template>

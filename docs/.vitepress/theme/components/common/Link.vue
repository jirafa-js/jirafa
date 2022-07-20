<script lang="ts" setup>
import { computed } from 'vue'
import { isExternal as _isExternal } from '../../../utils/url'

const { href } = defineProps<{ href?: string }>()

const isExternal = computed(() => href && _isExternal(href))
</script>

<template>
  <component
    :is="href ? 'a' : 'span'"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noreferrer noopener' : undefined"
    :href="href"
    class="link-item"
    :class="{ link: !!href }"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.link-item {
  display: inline-flex;
  align-items: center;
}
</style>

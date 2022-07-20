<script lang="ts" setup>
import IconToggleButton from './icons/IconToggleButton.vue'
import Link from './common/Link.vue'
import { useSidebar } from '~/composables/useSidebar'
import { useBackTop } from '~/composables/useBackTop'
defineEmits(['openMenu'])
const { hasSidebar } = useSidebar()
const { show, backToTop } = useBackTop()
</script>

<template>
  <div class="menu-bar">
    <div
      v-if="hasSidebar"
      class="menu-bar__sidebar-toggle"
      @click="$emit('openMenu')"
    >
      <IconToggleButton />
      <span>Menu</span>
    </div>
    <Link class="menu-bar__back-top" :class="{ show }" @click="backToTop"
      >Back to top</Link
    >
  </div>
</template>

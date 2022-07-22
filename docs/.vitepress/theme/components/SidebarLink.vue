<script lang="ts" setup>
import { useRoute } from 'vitepress'
import { isActive } from '../../utils/url'
import type { SidebarItem } from '~/types/theme-config'
defineProps<{ item: SidebarItem }>()
defineEmits(['close'])

const route = useRoute()
</script>

<template>
  <a
    class="sidebar-link"
    :class="{ active: isActive(route.path, item.link) }"
    :href="item.link"
    @click="$emit('close')"
  >
    {{ item.text }}
  </a>
</template>

<script lang="ts" setup>
import SidebarLink from './SidebarLink.vue'
import { useSidebar } from '~/composables/useSidebar'
defineProps<{ open: boolean }>()
defineEmits(['close'])
const { hasSidebar, sidebar } = useSidebar()
</script>

<template>
  <aside v-if="hasSidebar" class="sidebar" :class="{ open }">
    <slot name="top"></slot>
    <div class="sidebar-content">
      <section v-for="(item, key) in sidebar" :key="key" class="sidebar-group">
        <p class="sidebar-group__title">{{ item.text }}</p>
        <SidebarLink
          v-for="(child, childKey) in item.children"
          :key="childKey"
          :item="child"
          @close="$emit('close')"
        />
      </section>
    </div>
    <slot name="bottom"></slot>
  </aside>
</template>

<script lang="ts" setup>
import Link from './common/Link.vue'
import { useMenu } from '~/composables/useMenu'
defineEmits(['close'])

const menus = useMenu()
</script>

<template>
  <div class="header-fullscreen-menu">
    <div
      v-for="(menu, key) in menus"
      :key="key"
      class="header-fullscreen-menu-link"
    >
      <Link :href="menu.link" @click="$emit('close')">{{ menu.text }}</Link>
    </div>
  </div>
</template>

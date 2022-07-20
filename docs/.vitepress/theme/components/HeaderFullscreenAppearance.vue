<script lang="ts" setup>
import ThemeToggle from './common/ThemeToggle.vue'
import { useTheme } from '~/composables/useTheme'
const { toggle } = useTheme()
</script>

<template>
  <div class="header-fullscreen-appearance">
    <span>Theme</span>
    <ThemeToggle @click="toggle()" />
  </div>
</template>

<script lang="ts" setup>
import ThemeToggle from './common/ThemeToggle.vue'
import { useTheme } from '~/composables/useTheme'

const { toggle } = useTheme()
</script>

<template>
  <div class="header-appearance">
    <ThemeToggle @click="toggle()" />
  </div>
</template>

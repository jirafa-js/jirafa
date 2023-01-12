<script lang="ts" setup>
import HeaderFullscreen from './HeaderFullscreen.vue'
import HeaderBar from './HeaderBar.vue'
import { useSidebar } from '~/composables/useSidebar'
import { useHeader } from '~/composables/useHeader'

const { hasSidebar } = useSidebar()
const { isFullscreen, toggleFullscreen, closeFullscreen } = useHeader()
</script>

<template>
  <header class="header" :class="{ 'has-sidebar': hasSidebar }">
    <HeaderBar :fullscreen="isFullscreen" @toggle="toggleFullscreen" />
    <HeaderFullscreen :fullscreen="isFullscreen" @close="closeFullscreen" />
  </header>
</template>

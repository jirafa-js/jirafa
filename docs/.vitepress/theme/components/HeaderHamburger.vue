<script lang="ts" setup>
defineProps<{ active: boolean }>()
</script>

<template>
  <div class="header-hamburger" :class="{ active }">
    <span class="toggle-1"></span>
    <span class="toggle-2"></span>
    <span class="toggle-3"></span>
  </div>
</template>

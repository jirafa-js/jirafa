<script lang="ts" setup></script>

<template>
  <div class="backdrop"></div>
</template>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba($color: #000, $alpha: 0.6);
  z-index: var(--site-z-index-backdrop);
  transition: opacity 0.5s;
}
</style>

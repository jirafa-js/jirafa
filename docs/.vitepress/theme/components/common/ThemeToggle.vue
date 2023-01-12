<script lang="ts" setup>
import Switch from './Switch.vue'
</script>

<template>
  <Switch aria-label="toggle dark mode">
    <i-ri-sun-line class="sun" />
    <i-ri-moon-line class="moon" />
  </Switch>
</template>

<style lang="scss" scoped>
.sun {
  opacity: 1;
}

.moon {
  opacity: 0;
}

@at-root .dark {
  .sun {
    opacity: 0;
  }

  .moon {
    opacity: 1;
  }
}
</style>

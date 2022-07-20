<script lang="ts" setup>
import IconSun from '../icons/IconSun.vue'
import IconMoon from '../icons/IconMoon.vue'
import Switch from './Switch.vue'
</script>

<template>
  <Switch aria-label="toggle dark mode">
    <IconSun class="sun" />
    <IconMoon class="moon" />
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

<script lang="ts" setup>
defineProps<{
  demo: object
}>()
</script>

<template>
  <div class="demo-showcase">
    <ClientOnly>
      <component :is="demo" v-if="demo" v-bind="$attrs" />
    </ClientOnly>
  </div>
</template>

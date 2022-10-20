<script lang="ts" setup>
import { ref } from 'vue'
const fill = ref(true)
</script>

<template>
  <JSpace direction="vertical" style="width: 100%">
    <JButton type="primary" @click="fill = !fill">Toggle</JButton>
    <JSpace :fill="fill" wrap>
      <JButton type="primary">Primary</JButton>
      <JButton type="outline">Outline</JButton>
      <JButton type="text">Text</JButton>
    </JSpace>
  </JSpace>
</template>

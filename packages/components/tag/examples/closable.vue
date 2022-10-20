<script lang="ts" setup>
import { tagPresetColores } from '@jirafa/components/tag'
const colors = ['default', ...tagPresetColores]
</script>

<template>
  <JSpace wrap>
    <JTag v-for="color in colors" :key="color" closable :color="color">
      {{ color }}
    </JTag>
  </JSpace>
</template>

<script lang="ts" setup>
import { tagPresetColores } from '@jirafa/components/tag'
const colores = ['default', ...tagPresetColores]
</script>

<template>
  <JSpace wrap>
    <JTag v-for="color in colores" :key="color" checkable :color="color">
      {{ color }}
    </JTag>
  </JSpace>
</template>

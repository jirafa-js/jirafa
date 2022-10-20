<script lang="ts" setup>
import { tagPresetColores } from '@jirafa/components/tag'
const colores = ['default', ...tagPresetColores]
const customColor = [
  '#00b42a',
  '#0fc6c2',
  '#165dff',
  '#168cff',
  '#7816ff',
  '#7bc616',
  '#86909c',
  '#b71de8',
  '#eb0aa4',
  '#ff5722',
  '#ff7d00',
  '#ffb400',
  '#f53f3f',
]
</script>

<template>
  <JSpace wrap>
    <JTag v-for="color in colores" :key="color" :color="color">
      {{ color }}
    </JTag>
  </JSpace>
  <JDivider space="large">Custom Color</JDivider>
  <JSpace wrap>
    <JTag
      v-for="(color, index) in customColor"
      :key="color"
      :color="color"
      :border="!!(index % 2)"
    >
      {{ color }}
    </JTag>
  </JSpace>
</template>

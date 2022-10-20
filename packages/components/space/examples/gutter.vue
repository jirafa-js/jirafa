<script lang="ts" setup>
import type { SpaceProps } from '@jirafa/jirafa'
import { ref } from 'vue'

const gutter = ref<SpaceProps['gutter']>()
</script>

<template>
  <div style="margin-bottom: 20px">
    Gutter:
    <JRadioGroup v-model="gutter" type="button">
      <JRadio value="mini">mini</JRadio>
      <JRadio value="small">small</JRadio>
      <JRadio value="default">default</JRadio>
      <JRadio value="large">large</JRadio>
      <JRadio :value="0"> 0 </JRadio>
    </JRadioGroup>
  </div>
  <JSpace :gutter="gutter" wrap>
    <div v-for="i in 12" :key="i">
      <JButton>Item {{ i }}</JButton>
    </div>
  </JSpace>
</template>

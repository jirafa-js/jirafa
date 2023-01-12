<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { ref } from 'vue'

const align = ref<CSSProperties['align-items']>('center')
</script>

<template>
  <div>
    <JRadioGroup v-model="align" type="button">
      <JRadio value="flex-start">Start</JRadio>
      <JRadio value="center">Center</JRadio>
      <JRadio value="flex-end">End</JRadio>
      <JRadio value="baseline">Baseline</JRadio>
    </JRadioGroup>
  </div>
  <JSpace :align="align">
    <JButton v-for="i in 4" :key="i">Item {{ i }}</JButton>
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 120px;
        width: 120px;
        background-color: var(--j-color-primary-lighten-3);
        color: #fff;
        border-radius: 4px;
      "
    >
      Block
    </div>
  </JSpace>
</template>

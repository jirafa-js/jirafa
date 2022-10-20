<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { ref } from 'vue'

const align = ref<CSSProperties['align-items']>('center')
</script>

<template>
  <div>
    <JRadioGroup v-model="align">
      <JRadio value="flex-start">start</JRadio>
      <JRadio value="center">center</JRadio>
      <JRadio value="flex-end">end</JRadio>
      <JRadio value="baseline">baseline</JRadio>
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

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('A')
const value2 = ref('B')
const value3 = ref('B')
</script>

<template>
  <JSpace direction="vertical">
    <JRadioGroup v-model="value1" border size="large">
      <JRadio value="A">Option A</JRadio>
      <JRadio value="B">Option B</JRadio>
      <JRadio value="C">Option C</JRadio>
      <JRadio value="D">Option D</JRadio>
    </JRadioGroup>
    <JRadioGroup v-model="value2" border>
      <JRadio value="A">Option A</JRadio>
      <JRadio disabled value="B">Option B</JRadio>
      <JRadio value="C">Option C</JRadio>
      <JRadio value="D">Option D</JRadio>
    </JRadioGroup>
    <JRadioGroup v-model="value3" border size="small">
      <JRadio value="A">Option A</JRadio>
      <JRadio value="B">Option B</JRadio>
      <JRadio value="C">Option C</JRadio>
      <JRadio value="D">Option D</JRadio>
    </JRadioGroup>
    <JRadioGroup v-model="value3" border disabled size="mini">
      <JRadio value="A">Option A</JRadio>
      <JRadio value="B">Option B</JRadio>
      <JRadio value="C">Option C</JRadio>
      <JRadio value="D">Option D</JRadio>
    </JRadioGroup>
  </JSpace>
</template>

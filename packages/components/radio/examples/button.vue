<script lang="ts" setup>
import type { RadioOption } from '@jirafa/jirafa'
import { ref } from 'vue'
const options = ref<RadioOption[]>([
  { label: 'Option A', value: 'A' },
  { label: 'Option B', value: 'B' },
  { label: 'Option C', value: 'C' },
  { label: 'Option D', value: 'D' },
])
const value = ref('')
const value1 = ref('A')
const value2 = ref('B')
const value3 = ref('B')
</script>

<template>
  <JSpace direction="vertical">
    <JRadioGroup v-model="value" :options="options" type="button"></JRadioGroup>

    <JRadioGroup v-model="value1" type="button" size="large">
      <JRadio value="A">Option A</JRadio>
      <JRadio value="B">Option B</JRadio>
      <JRadio value="C">Option C</JRadio>
      <JRadio value="D">Option D</JRadio>
    </JRadioGroup>
    <JRadioGroup v-model="value2" type="button">
      <JRadio value="A">Option A</JRadio>
      <JRadio disabled value="B">Option B</JRadio>
      <JRadio value="C">Option C</JRadio>
      <JRadio value="D">Option D</JRadio>
    </JRadioGroup>
    <JRadioGroup v-model="value3" type="button" size="small">
      <JRadio value="A">Option A</JRadio>
      <JRadio value="B">Option B</JRadio>
      <JRadio value="C">Option C</JRadio>
      <JRadio value="D">Option D</JRadio>
    </JRadioGroup>
    <JRadioGroup v-model="value3" type="button" disabled size="mini">
      <JRadio value="A">Option A</JRadio>
      <JRadio value="B">Option B</JRadio>
      <JRadio value="C">Option C</JRadio>
      <JRadio value="D">Option D</JRadio>
    </JRadioGroup>
  </JSpace>
</template>

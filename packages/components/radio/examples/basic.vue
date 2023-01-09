<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('B')
const value3 = ref('B')
const handleChange = () => {
  // eslint-disable-next-line no-console
  console.log('handleChange')
}
</script>

<template>
  <JSpace direction="vertical">
    <JRadio v-model="value1" value="A" @change="handleChange"></JRadio>
    <JRadioGroup v-model="value1" size="large">
      <JRadio value="A">Option A</JRadio>
      <JRadio value="B">Option B</JRadio>
      <JRadio value="C">Option C</JRadio>
      <JRadio value="D">Option D</JRadio>
    </JRadioGroup>
    <JRadioGroup v-model="value2">
      <JRadio value="A">Option A</JRadio>
      <JRadio disabled value="B">Option B</JRadio>
      <JRadio value="C">Option C</JRadio>
      <JRadio value="D">Option D</JRadio>
    </JRadioGroup>
    <JRadioGroup v-model="value3" size="small">
      <JRadio value="A">Option A</JRadio>
      <JRadio value="B">Option B</JRadio>
      <JRadio value="C">Option C</JRadio>
      <JRadio value="D">Option D</JRadio>
    </JRadioGroup>
    <JRadioGroup v-model="value3" disabled size="mini">
      <JRadio value="A">Option A</JRadio>
      <JRadio value="B">Option B</JRadio>
      <JRadio value="C">Option C</JRadio>
      <JRadio value="D">Option D</JRadio>
    </JRadioGroup>
  </JSpace>
</template>

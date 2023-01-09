<script lang="ts" setup>
import { ref } from 'vue'
import type { RadioOption } from '@jirafa/components/radio'

const options1 = ref(['A', 'B', 'C', 'D'])
const options2 = ref<RadioOption[]>([
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B', disabled: true },
  { label: 'C', value: 'C' },
  { label: 'D', value: 'D' },
])
const value1 = ref('A')
const value2 = ref('B')
</script>

<template>
  <JSpace direction="vertical">
    <JRadioGroup v-model="value1" name="id" :options="options1"> </JRadioGroup>
    <JRadioGroup v-model="value2" name="id2" :options="options2"> </JRadioGroup>
  </JSpace>
</template>

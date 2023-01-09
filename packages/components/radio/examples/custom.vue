<script lang="ts" setup>
import type { RadioOption } from '@jirafa/jirafa'
import { ref } from 'vue'

const options = ref<RadioOption[]>([
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B', disabled: true },
  { label: 'C', value: 'C' },
  { label: 'D', value: 'D' },
])
const value = ref('A')
</script>

<template>
  <JSpace direction="vertical">
    <JRadioGroup v-model="value" :options="options"> </JRadioGroup>
    <JRadioGroup v-model="value" :options="options">
      <template #label="{ option }">
        <JTag>Option {{ option.label }}</JTag>
      </template>
    </JRadioGroup>
  </JSpace>
</template>

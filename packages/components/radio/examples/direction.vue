<script lang="ts" setup>
import type { RadioGroupProps } from '@jirafa/jirafa'
import { ref } from 'vue'

const options1 = ref(['A', 'B', 'C', 'D'])

const direction = ref<RadioGroupProps['direction']>('horizontal')
const value2 = ref('B')
</script>

<template>
  <JSpace direction="vertical">
    <JRadioGroup v-model="direction" type="button">
      <JRadio value="horizontal">Horizontal</JRadio>
      <JRadio value="vertical">Vertical</JRadio>
    </JRadioGroup>
    <JRadioGroup
      v-model="value2"
      name="id2"
      :direction="direction"
      :options="options1"
    >
    </JRadioGroup>
  </JSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { ComponentSizes } from '@jirafa/utils'
import { capitalize, componentSizes } from '@jirafa/utils'

const options = componentSizes.map((i) => ({
  label: capitalize(i || 'default'),
  value: i,
}))

const size = ref<ComponentSizes>('')
</script>

<template>
  <JConfigProvider :size="size">
    <JSpace direction="vertical">
      <JRadioGroup
        v-model="size"
        :options="options"
        type="button"
      ></JRadioGroup>
      <JButton>Button</JButton>
    </JSpace>
  </JConfigProvider>
</template>

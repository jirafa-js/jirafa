<script lang="ts" setup>
import { ref } from 'vue'
import { Calendar, Search } from '@jirafa/icons'
const input = ref('')
</script>

<template>
  <JDivider orientation="left">Use attributes</JDivider>
  <JSpace>
    <JInput
      v-model="input"
      placeholder="Please input"
      :prefix-icon="Calendar"
    />
    <JInput v-model="input" placeholder="Please input" :suffix-icon="Search" />
  </JSpace>
  <JDivider orientation="left">Use slots</JDivider>
  <JSpace>
    <JInput v-model="input" placeholder="Please input">
      <template #prefix>
        <JIcon><Calendar /></JIcon>
      </template>
    </JInput>
    <JInput v-model="input" placeholder="Please input">
      <template #suffix>
        <JIcon><Search /></JIcon>
      </template>
    </JInput>
  </JSpace>
</template>

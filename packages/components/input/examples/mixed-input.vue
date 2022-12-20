<script lang="ts" setup>
import { Search } from '@jirafa/icons'
import { ref } from 'vue'
const input = ref('')
</script>

<template>
  <JSpace direction="vertical">
    <JInput v-model="input" placeholder="Please input">
      <template #prepend>Http://</template>
      <template #append>
        <JButton :icon="Search"></JButton>
      </template>
    </JInput>
  </JSpace>
</template>

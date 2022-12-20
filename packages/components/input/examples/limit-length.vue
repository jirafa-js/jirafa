<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('jirafa')
</script>

<template>
  <JInput
    v-model="input"
    placeholder="Please input"
    maxlength="10"
    show-word-limit
  />
</template>

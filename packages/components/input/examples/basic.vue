<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
</script>

<template>
  <JInput v-model="input" placeholder="Please input" />
</template>

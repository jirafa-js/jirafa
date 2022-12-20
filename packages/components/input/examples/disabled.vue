<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('vuevuevuevuevue')
</script>

<template>
  <JInput v-model="input" placeholder="Please input" disabled />
</template>

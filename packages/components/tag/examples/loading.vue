<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)
const onClose = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2_000)
}
</script>

<template>
  <JSpace>
    <JTag loading> Loading </JTag>
    <JTag :loading="loading" closable @close="onClose"> Close </JTag>
  </JSpace>
</template>

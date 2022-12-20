<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
</script>

<template>
  <JSpace>
    <JInput
      v-model="input"
      maxlength="10"
      show-word-limit
      placeholder="Please input"
      size="large"
    />
    <JInput
      v-model="input"
      maxlength="10"
      show-word-limit
      placeholder="Please input"
    />
    <JInput
      v-model="input"
      maxlength="10"
      show-word-limit
      placeholder="Please input"
      size="small"
    />
    <JInput
      v-model="input"
      maxlength="10"
      show-word-limit
      placeholder="Please input"
      size="mini"
    />
  </JSpace>
</template>

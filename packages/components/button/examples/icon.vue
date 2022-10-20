<script lang="ts" setup>
import { Add } from '@jirafa/icons'
</script>

<template>
  <JSpace>
    <JButton type="primary" :icon="Add" />
    <JButton type="primary" :icon="Add">Add</JButton>
    <JButton type="primary" shape="circle" :icon="Add"></JButton>
    <JButton type="primary" shape="round" :icon="Add"></JButton>
  </JSpace>
</template>

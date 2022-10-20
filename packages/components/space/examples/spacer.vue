<script lang="ts" setup>
import { h } from 'vue'

const spacer = h('span', {}, ['/'])
</script>

<template>
  <JSpace direction="vertical">
    <JSpace :spacer="spacer">
      <JButton v-for="i in 4" :key="i">Item {{ i }}</JButton>
    </JSpace>
    <JSpace spacer="|">
      <JButton v-for="i in 4" :key="i" type="primary">Item {{ i }}</JButton>
    </JSpace>
  </JSpace>
</template>

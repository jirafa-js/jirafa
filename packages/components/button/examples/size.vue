<script lang="ts" setup>
import { Heart } from '@jirafa/icons'
</script>

<template>
  <JSpace direction="vertical">
    <JSpace>
      <JButton type="primary" size="mini">Mini</JButton>
      <JButton type="primary" size="small">Small</JButton>
      <JButton type="primary">Default</JButton>
      <JButton type="primary" size="large">Large</JButton>
    </JSpace>
    <JSpace>
      <JButton type="primary" shape="round" size="mini">Mini</JButton>
      <JButton type="primary" shape="round" size="small">Small</JButton>
      <JButton type="primary" shape="round">Default</JButton>
      <JButton type="primary" shape="round" size="large">Large</JButton>
    </JSpace>
    <JSpace>
      <JButton type="primary" shape="circle" size="mini"><Heart /></JButton>
      <JButton type="primary" shape="circle" size="small"><Heart /></JButton>
      <JButton type="primary" shape="circle"><Heart /></JButton>
      <JButton type="primary" shape="circle" size="large"><Heart /></JButton>
    </JSpace>
  </JSpace>
</template>

<template>
  <JGrid :cols="3" :gap="12">
    <JGridItem>item</JGridItem>
    <JGridItem>item</JGridItem>
    <JGridItem>item</JGridItem>
    <JGridItem :offset="1">item | offset - 1</JGridItem>
    <JGridItem>item</JGridItem>
    <JGridItem :span="3">item | span - 3</JGridItem>
    <JGridItem>item</JGridItem>
    <JGridItem>item</JGridItem>
  </JGrid>
</template>

<style lang="scss" scoped>
.j-grid-item {
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  border-radius: 4px;

  &:nth-child(2n) {
    background-color: var(--j-color-primary-lighten-3);
  }
  &:nth-child(2n + 1) {
    background-color: var(--j-color-primary-darken-1);
  }
}
</style>

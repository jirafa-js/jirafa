<template>
  <JGrid
    :cols="3"
    :xs="1"
    :sm="2"
    :md="3"
    :lg="4"
    :xl="5"
    :max="6"
    :gap="[12, 16]"
  >
    <JGridItem>item</JGridItem>
    <JGridItem>item</JGridItem>
    <JGridItem>item</JGridItem>
    <JGridItem>item</JGridItem>
    <JGridItem>item</JGridItem>
    <JGridItem :xl="2">
      <template #default="{ breakpoint }">
        item {{ breakpoint === 'xl' ? '| xl-span-2' : '' }}
      </template>
    </JGridItem>
    <JGridItem :xl="{ span: 2, offset: 1 }">
      <template #default="{ breakpoint }">
        item {{ breakpoint === 'xl' ? '| xl-span-2 xl-offset-1' : '' }}
      </template>
    </JGridItem>
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

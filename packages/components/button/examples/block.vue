<template>
  <div>
    <JButton block type="primary">Primary</JButton>
    <JButton block type="secondary">Secondary</JButton>
    <JButton block type="outline">Outline</JButton>
    <JButton block type="dashed">Dashed</JButton>
    <JButton block type="text">Text</JButton>
  </div>
</template>

<style lang="scss" scoped>
.j-button + .j-button {
  margin-top: 12px;
}
</style>

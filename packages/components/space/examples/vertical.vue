<template>
  <JSpace direction="vertical">
    <JButton v-for="i in 4" :key="i">Item {{ i }}</JButton>
  </JSpace>
</template>

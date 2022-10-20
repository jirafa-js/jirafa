<template>
  <JSpace>
    <template v-for="i in 5" :key="i">
      <JButton>Item {{ i }} </JButton>
    </template>
  </JSpace>
</template>

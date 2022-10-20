<template>
  <JSpace wrap>
    <div v-for="i in 12" :key="i">
      <JButton>Item {{ i }}</JButton>
    </div>
  </JSpace>
</template>

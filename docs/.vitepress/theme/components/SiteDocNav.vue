<script lang="ts" setup>
import IconArrowLeft from './icons/IconArrowLeft.vue'
import IconArrowRight from './icons/IconArrowRight.vue'
import { useDocNav } from '~/composables/useDocNav'

const { next, prev, has } = useDocNav()
</script>

<template>
  <div v-if="has" class="site-doc-nav">
    <div class="prev">
      <a v-if="prev" class="link" :href="prev.link">
        <IconArrowLeft />
        <span class="text">{{ prev.text }}</span>
      </a>
    </div>
    <div class="next">
      <a v-if="next" class="link" :href="next.link">
        <span class="text">{{ next.text }}</span>
        <IconArrowRight />
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.site-doc-nav {
  margin-top: 1em;
  padding-top: 1em;
  border-top: 1px solid var(--site-c-divider-light);
  display: flex;
  justify-content: space-between;

  .link {
    display: flex;
    align-items: center;

    .text {
      margin: 0 4px;
    }
  }
}
</style>

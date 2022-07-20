<script lang="ts" setup>
import { ref } from 'vue'
import { useActiveAnchor } from '~/composables/useActiveAnchor'
import { useToc } from '~/composables/useToc'

const container = ref()
const marker = ref()
const headers = useToc()
useActiveAnchor(container, marker)
</script>

<template>
  <nav ref="container" class="toc-content">
    <h3 class="toc-content__title">Contents</h3>
    <ul class="toc-link-group">
      <li v-for="{ link, text, children } in headers" :key="link">
        <a class="toc-link" :href="link" :title="text">{{ text }}</a>
        <ul v-if="children">
          <li
            v-for="{ link: childLink, text: childText } in children"
            :key="childLink"
          >
            <a class="toc-link subitem" :href="childLink" :title="text">{{
              childText
            }}</a>
          </li>
        </ul>
      </li>
    </ul>
    <div ref="marker" class="toc-marker"></div>
  </nav>
</template>

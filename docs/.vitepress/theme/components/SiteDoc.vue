<script lang="ts" setup>
import { useData } from 'vitepress'
import SiteDocToc from './SiteDocToc.vue'
import SiteDocFooter from './SiteDocFooter.vue'
import SiteDocNav from './SiteDocNav.vue'

const { page } = useData()
</script>

<template>
  <section class="site-doc">
    <main class="site-doc-container">
      <Content class="site-doc-content" />
      <SiteDocFooter />
      <SiteDocNav />
    </main>

    <aside class="site-doc-aside">
      <div class="site-doc-aside-content">
        <SiteDocToc v-if="page.headers?.length" />
      </div>
    </aside>
  </section>
</template>

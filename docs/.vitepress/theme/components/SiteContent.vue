<script lang="ts" setup>
import { useData, useRoute } from 'vitepress'
import SitePage from './SitePage.vue'
import SiteDoc from './SiteDoc.vue'
import SiteNotFound from './SiteNotFound.vue'
import { useSidebar } from '~/composables/useSidebar'

const route = useRoute()
const { page } = useData()
const { hasSidebar } = useSidebar()
</script>

<template>
  <main class="site-content" :class="{ 'has-sidebar': hasSidebar }">
    <SiteNotFound v-if="route.component === SiteNotFound" />
    <SitePage v-else-if="page.frontmatter.page === true" />
    <SiteDoc v-else />
  </main>
</template>

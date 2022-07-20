<script lang="ts" setup>
import { useToggle } from '@vueuse/core'
import SiteHeader from './Header.vue'
import SiteSidebar from './SiteSidebar.vue'
import SiteContent from './SiteContent.vue'
import SiteMenuBar from './SiteMenuBar.vue'
import Backdrop from './common/Backdrop.vue'

import { useSidebar } from '~/composables/useSidebar'

const { hasSidebar } = useSidebar()

const [open, toggleSidebar] = useToggle(false)
</script>

<template>
  <div class="site">
    <Backdrop v-if="open" @click="toggleSidebar(false)" />
    <SiteHeader />
    <SiteMenuBar v-if="hasSidebar" @open-menu="toggleSidebar(true)" />
    <SiteSidebar :open="open" @close="toggleSidebar(false)" />
    <SiteContent />

    <Debug />
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vitepress'
import { isActive } from '../../utils/url'
import Link from './common/Link.vue'
import { useMenu } from '~/composables/useMenu'

const route = useRoute()
const menus = useMenu()
</script>

<template>
  <div class="header-menu">
    <Link
      v-for="(menu, key) in menus"
      :key="key"
      class="header-menu-link"
      :class="{
        active: isActive(
          route.path,
          menu.activeMatch ? menu.activeMatch : menu.link,
          !!menu.activeMatch
        ),
      }"
      :href="menu.link"
      >{{ menu.text }}</Link
    >
  </div>
</template>

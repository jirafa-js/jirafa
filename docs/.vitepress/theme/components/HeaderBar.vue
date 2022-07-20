<script lang="ts" setup>
import { useData } from 'vitepress'
import HeaderMenu from './HeaderMenu.vue'
import HeaderAppearance from './HeaderAppearance.vue'
import HeaderTranslation from './HeaderTranslation.vue'
import HeaderSocialLinks from './HeaderSocialLinks.vue'
import HeaderHamburger from './HeaderHamburger.vue'
import { useLang } from '~/composables/useLang'

defineProps<{ fullscreen: boolean }>()
defineEmits(['toggle'])

const { site, theme } = useData()
const lang = useLang()
</script>

<template>
  <div class="header-wrap">
    <div class="header-content">
      <div class="logo-container">
        <a :href="`${site.base + lang}/`">
          <img class="logo" :src="theme.logo" alt="Jirafa UI logo" />
        </a>
      </div>
      <div class="content">
        <HeaderMenu />
        <HeaderAppearance />
        <HeaderTranslation />
        <HeaderSocialLinks />
        <HeaderHamburger :active="fullscreen" @click="$emit('toggle')" />
      </div>
    </div>
  </div>
</template>

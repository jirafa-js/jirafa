<script lang="ts" setup>
import { useSocialLinks } from '~/composables/useSocialLinks'

const links = useSocialLinks()
</script>

<template>
  <div class="header-fullscreen-social-links">
    <a
      v-for="link in links"
      :key="link.text"
      ref="noopener noreferrer"
      class="header-social-link"
      target="_blank"
      :href="link.link"
      :title="link.text"
    >
      <component :is="link.icon" v-if="link.icon" />
    </a>
  </div>
</template>

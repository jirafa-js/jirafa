<script lang="ts" setup>
import Link from './common/Link.vue'
import IconExternalLink from './icons/IconExternalLink.vue'
import { useEditLink } from '~/composables/useEditLink'
const { text, url } = useEditLink()
</script>

<template>
  <div v-if="url" class="edit-link">
    <Link :href="url">
      <span>{{ text }}</span>
      <IconExternalLink />
    </Link>
  </div>
</template>

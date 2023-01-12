<script lang="ts" setup>
import Link from './common/Link.vue'
import { useEditLink } from '~/composables/useEditLink'
const { text, url } = useEditLink()
</script>

<template>
  <div v-if="url" class="edit-link">
    <Link :href="url">
      <span>{{ text }}</span>
      <i-ri-external-link-line />
    </Link>
  </div>
</template>

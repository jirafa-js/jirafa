<script lang="ts" setup>
import HeaderFullscreenMenu from './HeaderFullscreenMenu.vue'
import HeaderFullscreenTranslation from './HeaderFullscreenTranslation.vue'
import HeaderFullscreenAppearance from './HeaderFullscreenAppearance.vue'
import HeaderFullscreenSocialLinks from './HeaderFullscreenSocialLinks.vue'
defineProps<{ fullscreen: boolean }>()
defineEmits(['close'])
</script>

<template>
  <transition name="fade" @after-leave="$emit('close')">
    <div v-if="fullscreen" class="header-fullscreen">
      <div class="header-fullscreen-content">
        <HeaderFullscreenMenu @close="$emit('close')" />
        <HeaderFullscreenTranslation @close="$emit('close')" />
        <HeaderFullscreenAppearance />
        <HeaderFullscreenSocialLinks />
      </div>
    </div>
  </transition>
</template>

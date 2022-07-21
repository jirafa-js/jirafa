<script lang="ts" setup>
import { ref } from 'vue'
import IconTranslate from './icons/IconTranslate.vue'
import Link from './common/Link.vue'
import { useTranslation } from '~/composables/useTranslation'

const { lang, langs, languageMap, switchLang, helpTranslate } = useTranslation()
const open = ref(false)
</script>

<template>
  <div
    class="header-translation"
    @mouseenter="open = true"
    @mouseleave="open = false"
  >
    <IconTranslate @click="open = !open" />
    <!-- TODO need instead by jirafa popup -->

    <div class="header-translation-popup">
      <div
        v-for="l in langs"
        :key="l"
        class="language"
        :class="{ active: l === lang }"
        @click="switchLang(l)"
      >
        {{ languageMap[l] }}
      </div>
      <div class="language">
        <Link :href="helpTranslate.link">{{ helpTranslate.text.value }}</Link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/mixins.scss' as *;
.header-translation {
  position: relative;
  height: var(--site-header-height);

  &:hover &-popup {
    opacity: 1;
    visibility: visible;
    transform: translateY(0px);
  }

  &-popup {
    position: absolute;
    top: calc(var(--site-header-height) / 2 + 20px);
    right: 0;
    min-width: 128px;
    border-radius: 8px;
    border: 1px solid var(--site-c-divider-light);
    background-color: var(--site-c-bg);
    box-shadow: var(--site-shadow-3);
    padding: 16px;
    font-size: 14px;

    visibility: hidden;
    opacity: 0;
    transform: translateY(12px);

    @include with-transition(opacity, background-color, color, transform);

    .language {
      color: var(--site-c-text-1);
      white-space: nowrap;
      padding: 0 12px;
      line-height: 32px;
      border-radius: 4px;
      cursor: pointer;

      &.active {
        color: var(--site-c-brand);
      }

      &:hover {
        background-color: var(--site-c-bg-alt);
        color: var(--site-c-brand);
      }
    }
  }
}
</style>

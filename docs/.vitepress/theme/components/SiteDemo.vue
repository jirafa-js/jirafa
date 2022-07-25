<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useClipboard, useToggle } from '@vueuse/core'
import demo from '../../i18n/components/demo.json'
import IconGithubLine from './icons/IconGithubLine.vue'
import IconCode from './icons/IconCode.vue'
import IconCopy from './icons/IconCopy.vue'
import IconArrowUpFill from './icons/IconArrowUpFill.vue'
import SiteDemoShowcase from './SiteDemoShowcase.vue'
import { useLocale } from '~/composables/useLocale'
import { REPO_DOCS, REPO_DOCS_BRANCH } from '~/constants'

const props = defineProps<{
  demos: object
  source: string
  rawSource: string
  path: string
  realpath: string
  description?: string
}>()
const demoLocale = useLocale(demo)

const decodedDesc = computed(() => decodeURIComponent(props.description || ''))

const formatPathDemos = computed(() => {
  return Object.keys(props.demos).reduce((demos, key) => {
    demos[key.replace('../examples/', '').replace('.vue', '')] =
      props.demos[key]
    return demos
  }, {})
})
const demoComp = computed(() => {
  const [, path] = props.path.split('/')
  const key = `../examples/${path}.vue`

  return props.demos[key].default
})

const demoUrl = computed(
  () => `${REPO_DOCS}/edit/${REPO_DOCS_BRANCH}/${props.realpath}`
)

const { copy, copied, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
})
const copyCode = async () => {
  if (!isSupported) {
    // eslint-disable-next-line no-alert
    alert(demoLocale.value['copy-error'])
    return
  }
  await copy()
  // TODO copied feedback
}

const sourceRef = ref<HTMLElement>()
const sourceClientHeight = computed(() => sourceRef.value?.clientHeight)
const [sourceVisible, toggleSourceVisible] = useToggle(false)

const decodedSource = computed(() => decodeURIComponent(props.source))
</script>

<template>
  <div class="demo">
    <div v-if="decodedDesc" class="demo-desc" v-html="decodedDesc"></div>
    <div class="demo-content">
      <SiteDemoShowcase :demo="demoComp" />

      <div class="demo-btns">
        <a
          class="demo-btn"
          rel="noopener noreferrer"
          target="_blank"
          :href="demoUrl"
          :title="demoLocale['edit-on-github']"
        >
          <IconGithubLine />
        </a>
        <i
          :title="demoLocale['copy-source-code']"
          class="demo-btn"
          @click="copyCode"
        >
          <IconCopy />
        </i>
        <i
          :title="demoLocale['view-source-code']"
          class="demo-btn"
          @click="toggleSourceVisible()"
        >
          <IconCode />
        </i>
      </div>
      <div
        class="demo-source"
        :style="{ maxHeight: `${sourceVisible ? sourceClientHeight : 0}px` }"
      >
        <div ref="sourceRef" class="language-vue" v-html="decodedSource"></div>
      </div>
      <div
        class="demo-source-control"
        :class="{ show: sourceVisible }"
        @click="toggleSourceVisible(false)"
      >
        <IconArrowUpFill />
        <span>{{ demoLocale['hide-source-code'] }}</span>
      </div>
    </div>
  </div>
</template>

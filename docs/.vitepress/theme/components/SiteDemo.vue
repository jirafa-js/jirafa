<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useClipboard, useToggle } from '@vueuse/core'
import { JIcon } from 'jirafa'
import { CaretUpFilled } from '@jirafa/icons'
import demo from '../../i18n/components/demo.json'
import IconGithubLine from './icons/IconGithubLine.vue'
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
        <JIcon class="demo-btn">
          <a
            rel="noopener noreferrer"
            target="_blank"
            :href="demoUrl"
            :title="demoLocale['edit-on-github']"
          >
            <i-ri-github-line />
          </a>
        </JIcon>
        <JIcon
          :title="demoLocale['copy-source-code']"
          class="demo-btn"
          @click="copyCode"
        >
          <i-ri-file-copy-line />
        </JIcon>
        <JIcon
          :title="demoLocale['view-source-code']"
          class="demo-btn"
          @click="toggleSourceVisible()"
        >
          <i-ri-code-line />
        </JIcon>
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
        <JIcon :size="16">
          <CaretUpFilled />
        </JIcon>
        <span>{{ demoLocale['hide-source-code'] }}</span>
      </div>
    </div>
  </div>
</template>

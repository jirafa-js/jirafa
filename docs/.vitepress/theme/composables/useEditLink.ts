import { useRoute } from 'vitepress'
import { computed } from 'vue'
import editLinkLocale from '../../i18n/components/edit-link.json'
import { useLang } from './useLang'
import { REPO_DOCS, REPO_DOCS_BRANCH } from '~/constants'

export const useEditLink = () => {
  const route = useRoute()
  const lang = useLang()
  const text = computed(() => editLinkLocale[lang.value].edit)
  const url = computed(() => {
    return `${REPO_DOCS}/edit/${REPO_DOCS_BRANCH}/docs/${route.data.relativePath}`
  })

  return { text, url }
}

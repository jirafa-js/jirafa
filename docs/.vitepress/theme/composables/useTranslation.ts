import { useStorage } from '@vueuse/core'
import { useRoute, useRouter } from 'vitepress'
import { computed } from 'vue'
import translationLocale from '../../i18n/components/translation.json'
import langs from '../../i18n/lang.json'
import { useLang } from './useLang'
import type { Languages } from '~/constants'
import { LANGUAGE_MAP, PREFERRED_LANG_KEY, REPO_DOCS } from '~/constants'

export const useTranslation = () => {
  const route = useRoute()
  const router = useRouter()
  const lang = useLang()
  const language = useStorage(PREFERRED_LANG_KEY, 'en-US')

  const helpTranslate = computed(() => translationLocale[lang.value].help)

  const langsRef = computed<Languages[]>(() => {
    const langset = new Set(langs as Languages[])
    const hasCn = langset.has('zh-CN')
    if (hasCn) {
      langset.delete('zh-CN')
    }

    return hasCn ? ['zh-CN', ...langset] : [...langset]
  })

  function switchLang(target: Languages) {
    if (target === language.value) return

    language.value = target

    const firstSlash = route.path.indexOf('/', 1)
    const goto = `/${target}${route.path.slice(firstSlash)}`
    router.go(goto)
  }

  return {
    switchLang,
    lang,
    langs: langsRef,
    languageMap: LANGUAGE_MAP,
    helpTranslate: { link: REPO_DOCS, text: helpTranslate },
  }
}

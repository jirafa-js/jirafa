import { useData, useRoute } from 'vitepress'
import { computed } from 'vue'
import { ensureSlash } from '../../utils/url'
import { useLang } from './useLang'
import type { Sidebar, ThemConfig } from '~/types/theme-config'

export const useSidebar = () => {
  const { page, theme } = useData<ThemConfig>()
  const route = useRoute()
  const lang = useLang()

  if (!page.value) {
    return { hasSidebar: computed(() => false), sidebar: computed(() => []) }
  }

  const sidebar = computed(() => {
    if (page.value.frontmatter.sidebar === false) return []

    return getSidebar(theme.value.sidebar, route.data.relativePath, lang.value)
  })

  return { hasSidebar: computed(() => sidebar.value.length > 0), sidebar }
}

function getSidebar(sidebar: Sidebar, path: string, lang: string) {
  if (
    sidebar === false ||
    typeof sidebar === 'undefined' ||
    Array.isArray(sidebar)
  ) {
    return []
  }

  path = ensureSlash(path)
  for (const dir in sidebar) {
    if (
      dir.split(',').some((d) => path.startsWith(ensureSlash(`${lang}${d}`)))
    ) {
      return sidebar[dir][lang]
    }
  }

  return []
}

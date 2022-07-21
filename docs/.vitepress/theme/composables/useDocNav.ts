import { useRoute } from 'vitepress'
import { computed } from 'vue'
import { ensureSlash, normalize } from '../../utils/url'
import { useSidebar } from './useSidebar'
import type { SidebarGroup, SidebarItem } from '~/types/theme-config'

export const useDocNav = () => {
  const { sidebar } = useSidebar()
  const route = useRoute()

  const path = computed(() => normalize(ensureSlash(route.data.relativePath)))
  const flatedSidebar = computed(() => flatSidebar(sidebar.value))
  const index = computed(() =>
    flatedSidebar.value.findIndex((item) => item.link === path.value)
  )

  const next = computed(() => {
    return flatedSidebar.value[index.value + 1] || null
  })

  const prev = computed(() => {
    return flatedSidebar.value[index.value - 1] || null
  })

  const has = computed(() => !!next.value || !!prev.value)

  return { next, prev, has }
}

function flatSidebar(sidebar: SidebarGroup[]) {
  return sidebar.reduce<SidebarItem[]>((val, s) => {
    return val.concat(s.children)
  }, [])
}

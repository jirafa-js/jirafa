import { useData } from 'vitepress'
import { computed } from 'vue'
import { useLang } from '~/composables/useLang'
import type { NavItem, ThemConfig } from '~/types/theme-config'

export const useMenu = () => {
  const lang = useLang()
  const { theme } = useData<ThemConfig>()
  return computed<NavItem[]>(() => {
    return theme.value.nav?.[lang.value] || []
  })
}

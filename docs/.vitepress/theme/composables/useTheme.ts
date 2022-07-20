import { useDark, useToggle } from '@vueuse/core'

export const useTheme = () => {
  const theme = useDark({ storageKey: 'JIRAFA_UI_THEME_APPEARANCE' })

  return { theme, toggle: useToggle(theme) }
}

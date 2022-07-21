import { computed } from 'vue'
import { useLang } from './useLang'

export const useLocale = (
  localeJson: Record<string, Record<string, string>>
) => {
  const lang = useLang()
  return computed(() => localeJson[lang.value])
}

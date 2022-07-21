import { useRoute } from 'vitepress'
import { computed } from 'vue'
import type { Languages } from '~/constants'

export const useLang = () => {
  const route = useRoute()

  return computed(() => {
    let lang = 'en-US'

    const path = route.data.relativePath

    if (path.includes('/')) {
      lang = path.split('/')[0]
    }

    return lang as Languages
  })
}

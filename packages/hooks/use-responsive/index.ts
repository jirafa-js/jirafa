import type { Ref } from 'vue'
import { reactive, ref, watchEffect } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import type { BreakPoint } from '@jirafa/utils'
import { responsiveArray, responsiveMediaQueryMap } from '@jirafa/utils'

export function useResponsive(): { [K in BreakPoint]: Ref<boolean> } {
  return Object.fromEntries(
    Object.entries(responsiveMediaQueryMap).map<any[]>(([key, query]) => {
      return [key, useMediaQuery(query)]
    })
  )
}

export function useResponsiveBreakpoint() {
  const map = reactive(useResponsive())

  const breakpointRef = ref<BreakPoint>()
  watchEffect(() => {
    for (let i = 0; i < responsiveArray.length; i++) {
      const breakpoint = responsiveArray[i]
      if (map[breakpoint]) {
        breakpointRef.value = breakpoint
        break
      }
    }
  })

  return breakpointRef
}

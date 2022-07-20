import { inBrowser } from 'vitepress'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { throttleAndDebounce } from '../../utils'
import { BREAKPOINTS } from '~/constants'

const cubic = (value: number): number => value ** 3
const easeInOutCubic = (value: number): number =>
  value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2

export const useBackTop = (offset = 200) => {
  const show = ref(false)
  const scroller = document.documentElement
  const backToTop = () => {
    const raf = window.requestAnimationFrame
    const beginTime = Date.now()
    const beginValue = scroller.scrollTop

    const frameFn = () => {
      const process = (Date.now() - beginTime) / 500
      if (process < 1) {
        scroller.scrollTop = beginValue * (1 - easeInOutCubic(process))
        raf(frameFn)
      } else {
        scroller.scrollTop = 0
      }
    }

    raf(frameFn)
  }

  const onScroll = () => {
    if (!inBrowser) return

    show.value = scroller.scrollTop > offset
  }
  const throttleScroll = throttleAndDebounce(onScroll, 160)

  let listened = false
  const onResize = () => {
    if (!inBrowser) return

    if (document.body.clientHeight > BREAKPOINTS.lg) {
      if (listened) return
      window.addEventListener('scroll', throttleScroll)
      listened = true
    } else if (listened) {
      window.removeEventListener('scroll', throttleScroll)
    }
  }

  const throttleResize = throttleAndDebounce(onResize, 300)

  onMounted(() => {
    if (!inBrowser) return

    onScroll()
    onResize()
    window.addEventListener('resize', throttleResize)
  })

  onBeforeUnmount(() => {
    if (!inBrowser) return

    window.removeEventListener('scroll', throttleScroll)
    window.removeEventListener('resize', throttleResize)
  })

  return { show, backToTop }
}

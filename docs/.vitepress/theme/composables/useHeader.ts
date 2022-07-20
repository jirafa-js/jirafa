import { ref } from 'vue'
import { BREAKPOINTS } from '~/constants'

export const useHeader = () => {
  const isFullscreen = ref(false)
  let initialValue: string
  function toggleFullscreen() {
    isFullscreen.value ? closeFullscreen() : openFullscreen()
  }

  function closeFullscreen() {
    isFullscreen.value = false
    document.body.style.overflow = initialValue
    window.removeEventListener('resize', onResize)
  }

  function openFullscreen() {
    isFullscreen.value = true
    window.addEventListener('resize', onResize)
    initialValue = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }

  function onResize() {
    window.outerWidth > BREAKPOINTS.md && closeFullscreen()
  }

  return {
    isFullscreen,
    toggleFullscreen,
    openFullscreen,
    closeFullscreen,
  }
}

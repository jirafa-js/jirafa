import { inBrowser } from 'vitepress'
import type { Ref } from 'vue'
import { onMounted, onUnmounted, onUpdated } from 'vue'
import { throttleAndDebounce } from '../../utils'

export const useActiveAnchor = (
  container: Ref<HTMLElement>,
  marker: Ref<HTMLElement>
) => {
  if (!inBrowser) return

  let preActiveLink: HTMLAnchorElement | null = null
  const onScroll = throttleAndDebounce(setActiveLink, 100)
  function setActiveLink() {
    const links = Array.from<HTMLAnchorElement>(
      container.value.querySelectorAll('.toc-link')
    )
    const anchors = Array.from<HTMLAnchorElement>(
      document.querySelectorAll('.site-doc-content .header-anchor')
    ).filter((anchor) =>
      links.some(
        (link) => anchor.hash === link.hash && anchor.offsetParent !== null
      )
    )

    if (!anchors.length) return

    const { scrollY, innerHeight } = window
    const { offsetHeight } = document.body

    const isBottom = scrollY + innerHeight === offsetHeight

    if (isBottom) {
      activateLink(anchors[anchors.length - 1].hash)
      return
    }

    for (let i = 0; i < anchors.length; i++) {
      const anchor = anchors[i]
      const nextAnchor = anchors[i + 1]
      const [isActive, hash] = isAnchorActive(i, anchor, nextAnchor)

      if (isActive) {
        history.replaceState(null, document.title, hash || ' ')
        activateLink(anchor.hash)
        return
      }
    }
  }
  function activateLink(hash: string) {
    if (preActiveLink) {
      preActiveLink.classList.remove('active')
    }

    if (hash !== null) {
      preActiveLink = container.value.querySelector(
        `a[href="${decodeURIComponent(hash)}"]`
      )
    }

    if (preActiveLink) {
      preActiveLink.classList.add('active')
      marker.value.style.top = `${preActiveLink.offsetTop}px`
      marker.value.style.opacity = '1'
    } else {
      marker.value.style.top = `33px`
      marker.value.style.opacity = '0'
    }
  }

  onMounted(() => {
    window.requestAnimationFrame(setActiveLink)
    window.addEventListener('scroll', onScroll)
  })

  onUpdated(() => {
    activateLink(location.hash)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })
}

function isAnchorActive(
  index: number,
  anchor: HTMLAnchorElement,
  nextAnchor?: HTMLAnchorElement
): [boolean, string | null] {
  const { scrollY } = window
  if (index === 0 && scrollY === 0) return [true, null]

  if (scrollY < getAnchorTop(anchor)) {
    return [false, null]
  }

  if (!nextAnchor || scrollY < getAnchorTop(nextAnchor)) {
    return [true, decodeURIComponent(anchor.hash)]
  }

  return [false, null]
}

function getAnchorTop(anchor: HTMLAnchorElement) {
  try {
    return anchor.parentElement!.offsetTop - 56 /* doc offsetTop */ - 15
  } catch {
    return 0
  }
}

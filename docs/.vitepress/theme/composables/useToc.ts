import type { Header } from 'vitepress'
import { useData } from 'vitepress'
import { computed } from 'vue'

export type TocHeader = Header & { children?: Header[] }

export interface Toc {
  text: string
  link: string
  children?: Toc[]
}

export const useToc = () => {
  const { page } = useData()

  return computed(() => {
    return mapHeaders(resolveHeaders(page.value.headers))
  })
}

export function resolveHeaders(headers: Header[]) {
  const cloned = headers.map((h) => ({ ...h }))
  let lastH2: Header & { children?: Header[] }

  cloned.forEach((h) => {
    if (h.level === 2) {
      lastH2 = h
    } else {
      lastH2.children ??= []
      lastH2.children.push(h)
    }
  })

  return cloned.filter((h) => h.level === 2)
}

export function mapHeaders(headers: TocHeader[]): Toc[] {
  return headers.map((h) => ({
    text: h.title,
    link: `#${h.slug}`,
    children: h.children ? mapHeaders(h.children) : undefined,
  }))
}

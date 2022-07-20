import { ref } from 'vue'

export const ensureSlash = (path: string) =>
  /^\//.test(path) ? path : `/${path}`

export const HASH_RE = /#.*$/
export const EXT_RE = /(index)?\.(md|html)$/
export const normalize = (url: string) => {
  return decodeURIComponent(url).replace(HASH_RE, '').replace(EXT_RE, '')
}

const inBrowser = typeof window !== 'undefined'
const hashRef = ref(inBrowser ? location.hash : '')
export const isActive = (
  currentPath: string,
  matchPath: string,
  asRegexp = false
) => {
  currentPath = normalize(ensureSlash(currentPath))
  if (asRegexp) return new RegExp(matchPath).test(currentPath)

  if (normalize(matchPath) !== currentPath) return false

  const hashMatch = matchPath.match(HASH_RE)

  if (hashMatch) {
    return hashMatch[0] === hashRef.value
  }

  return true
}

export const isExternal = (url: string) => /^[a-z]+:/i.test(url)

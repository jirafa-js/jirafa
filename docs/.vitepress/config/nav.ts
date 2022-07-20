import NavLocale from '../i18n/pages/nav.json'
import { ensureSlash } from '../utils/url'

const getNav = () => {
  return Object.fromEntries(
    Object.entries(NavLocale).map(([lang, val]) => {
      return [
        lang,
        Object.values(val).map((item) => ({
          ...item,
          link: `${ensureSlash(lang)}${item.link}`,
        })),
      ]
    })
  )
}

export const nav = getNav()

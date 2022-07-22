import guideLocale from '../i18n/pages/guide.json'
import designLocale from '../i18n/pages/design.json'
import tokenLocale from '../i18n/pages/token.json'
import componentLocale from '../i18n/pages/component.json'
import type { Sidebar } from '~/types/theme-config'

const sidebars: Sidebar = {
  '/guide/,/design/': getSidebar(guideLocale, designLocale),
  '/component/,/token/': getSidebar(tokenLocale, componentLocale),
}

export default sidebars

interface Item {
  text: string
  children?: Item[]
  link?: string
}

function getSidebar(...locales: Record<string, { [key: string]: Item }>[]) {
  return locales.reduce<{ [key: string]: any[] }>((sidebars, locale) => {
    Object.entries(locale).forEach(([lang, val]) => {
      const value = Object.values(val)
        .filter((item) => !item.children || item.children.length)
        .map((item) => mapPrefix(item, lang))

      if (sidebars[lang]) {
        sidebars[lang].push(...value)
      } else {
        sidebars[lang] = value
      }
    })
    return sidebars
  }, {})
}

function mapPrefix(item: Item, lang: string, prefix = '') {
  if (item.children && item.children.length > 0) {
    return {
      ...item,
      children: item.children.map((child) => mapPrefix(child, lang, prefix)),
    }
  }
  return {
    ...item,
    link: `/${lang}${prefix}${item.link}`,
  }
}

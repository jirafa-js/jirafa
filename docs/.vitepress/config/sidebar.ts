import type { DefaultTheme } from 'vitepress'
import guideLocale from '../i18n/pages/guide.json'
import designLocale from '../i18n/pages/design.json'
import tokenLocale from '../i18n/pages/token.json'
import componentLocale from '../i18n/pages/component.json'

const sidebars: DefaultTheme.Sidebar = {
  '/en-US/guide/': getSidebar(guideLocale, designLocale),
  '/en-US/component/': getSidebar(tokenLocale, componentLocale),
}

export default sidebars

interface Item {
  text: string
  children?: Item[]
  link?: string
}

function getSidebar(...locales: Record<string, { [key: string]: Item }>[]) {
  return locales.reduce<DefaultTheme.SidebarGroup[]>((sidebars, locale) => {
    Object.entries(locale).forEach(([lang, val]) => {
      sidebars.push(...Object.values(val).map((item) => mapPrefix(item, lang)))
    })
    return sidebars
  }, [])
}

function mapPrefix({ text, children, link }: Item, lang: string, prefix = '') {
  if (children && children.length > 0) {
    return {
      text,
      items: children.map((child) => mapPrefix(child, lang, prefix)),
    }
  }
  return {
    text,
    link: `/${lang}${prefix}${link}`,
  }
}

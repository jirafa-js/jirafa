import type { UserConfig } from 'vitepress'
import head from './config/head'
import { nav } from './config/nav'
import sidebar from './config/sidebar'
import { mdPlugin } from './config/md-plugin'
import { languages } from './utils/lang'
import type { ThemConfig } from '~/types/theme-config'

const locales = languages.reduce((locales, l) => {
  locales[`/${l}`] = { label: l, lang: l }
  return locales
}, {})

const config: UserConfig<ThemConfig> = {
  title: 'Jirafa UI',
  description: 'a Vue 3 based component library, powered by Material Design',
  lastUpdated: true,
  head,
  locales,
  themeConfig: {
    logo: '/images/logo.svg',
    siteTitle: false,
    nav,
    sidebar,

    editLink: {
      pattern: 'https://github.com/jirafa-js/jirafa/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
  },
  markdown: {
    config: (md) => mdPlugin(md),
  },
}

export default config

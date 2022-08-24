import type { Theme } from 'vitepress'
import Jirafa from 'jirafa'

import Layout from './components/SiteLayout.vue'
import NotFound from './components/SiteNotFound.vue'
import SiteDemo from './components/SiteDemo.vue'
import IconsList from './components/globals/IconsList.vue'

import '../../../packages/theme/src/index.scss'

import './styles/site.scss'

const theme: Theme = {
  Layout,
  NotFound,
  enhanceApp({ app }) {
    app.use(Jirafa)
    app.component('SiteDemo', SiteDemo)
    app.component('IconList', IconsList)
  },
}

export default theme

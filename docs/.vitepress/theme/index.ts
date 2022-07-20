import type { Theme } from 'vitepress'

import Layout from './components/SiteLayout.vue'
import NotFound from './components/SiteNotFound.vue'

import './styles/site.scss'

const theme: Theme = {
  Layout,
  NotFound,
  enhanceApp() {
    // app.use()
  },
}

export default theme

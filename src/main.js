import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import App from './App.vue'
import router from './router/index.js'
import './assets/main.css'

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(head)
app.mount('#app')

// Google Analytics 4 — uniquement en production, uniquement si VITE_GA4_ID est défini
if (import.meta.env.PROD && import.meta.env.VITE_GA4_ID) {
  const gaId = import.meta.env.VITE_GA4_ID
  const s = document.createElement('script')
  s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  s.async = true
  document.head.appendChild(s)
  window.dataLayer = window.dataLayer || []
  window.gtag = function () { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  window.gtag('config', gaId)
  // Suivi des changements de page (SPA)
  router.afterEach((to) => {
    window.gtag('event', 'page_view', { page_path: to.fullPath })
  })
}

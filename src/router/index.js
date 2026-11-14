import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/estimation',
    name: 'estimation',
    component: () => import('../views/EstimationView.vue'),
  },
  {
    path: '/qui-suis-je',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/immobilier-la-roche-sur-yon',
    name: 'local-la-roche',
    component: () => import('../views/LocalLaRocheView.vue'),
  },
  {
    path: '/immobilier-les-sables-dolonne',
    name: 'local-les-sables',
    component: () => import('../views/LocalLesSablesView.vue'),
  },
  {
    path: '/immobilier-la-ferriere',
    name: 'local-la-ferriere',
    component: () => import('../views/LocalLaFerriereView.vue'),
  },
  {
    path: '/actualites',
    name: 'blog',
    component: () => import('../views/BlogView.vue'),
  },
  {
    path: '/actualites/:slug',
    name: 'article',
    component: () => import('../views/ArticleView.vue'),
  },
  {
    path: '/biens-a-vendre',
    beforeEnter: () => {
      const url = import.meta.env.VITE_SAFTI_LISTINGS_URL || '/'
      window.location.href = url
      return false
    },
    component: () => import('../views/HomeView.vue'), // never rendered
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
  },
  {
    path: '/mentions-legales',
    name: 'mentions-legales',
    component: () => import('../views/MentionsLegalesView.vue'),
  },
  {
    path: '/politique-confidentialite',
    name: 'politique-confidentialite',
    component: () => import('../views/PolitiqueConfidentialiteView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

export default router

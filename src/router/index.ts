import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

/** Every view is lazy-loaded so each screen ships as its own chunk. */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return to.hash ? { el: to.hash, behavior: 'smooth' } : { top: 0 }
  },
})

export default router

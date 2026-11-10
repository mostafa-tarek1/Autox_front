import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import { i18n } from '@/plugins/i18n'

/**
 * Routes are split per feature (router/routes/<feature>.ts, each default-exporting an array) so
 * screen groups can be added without touching this file. Each file declares its own layout.
 */
const modules = import.meta.glob<RouteRecordRaw[]>('./routes/*.ts', {
  eager: true,
  import: 'default',
})

const routes: RouteRecordRaw[] = [
  ...Object.values(modules).flat(),
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'notFound' },
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

router.afterEach((to) => {
  const appName = i18n.global.t('app.name')
  const titleKey = to.meta.title
  document.title =
    titleKey && i18n.global.te(`pageTitles.${titleKey}`)
      ? `${i18n.global.t(`pageTitles.${titleKey}`)} | ${appName}`
      : appName
})

export default router

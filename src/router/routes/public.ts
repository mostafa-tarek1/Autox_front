import type { RouteRecordRaw } from 'vue-router'

import { DefaultLayout } from '@/router/layouts'

const routes: RouteRecordRaw[] = [
  {
    path: '/landing',
    name: 'landing',
    component: () => import('@/views/public/LandingView.vue'),
    meta: { title: 'landing' },
  },
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: 'contact',
        name: 'contact',
        component: () => import('@/views/public/ContactView.vue'),
        meta: { title: 'contact', nav: 'contact' },
      },
      {
        path: 'privacy',
        name: 'privacy',
        component: () => import('@/views/public/PrivacyView.vue'),
        meta: { title: 'privacy' },
      },
      {
        path: 'terms',
        name: 'terms',
        component: () => import('@/views/public/TermsView.vue'),
        meta: { title: 'terms' },
      },
      {
        path: 'search/excel',
        name: 'excel-search',
        component: () => import('@/views/public/ExcelSearchView.vue'),
        meta: { title: 'excelSearch', nav: 'home', featureStrip: true },
      },
    ],
  },
]

export default routes

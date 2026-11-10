import type { RouteRecordRaw } from 'vue-router'

import { DefaultLayout } from '@/router/layouts'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: 'quotes',
        name: 'quotes',
        component: () => import('@/views/quotes/QuotesView.vue'),
        meta: { title: 'quotes', nav: 'quotes' },
      },
    ],
  },
]

export default routes

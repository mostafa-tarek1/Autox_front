import type { RouteRecordRaw } from 'vue-router'

import { DefaultLayout } from '@/router/layouts'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@/views/orders/OrdersView.vue'),
        meta: { title: 'orders', nav: 'orders' },
      },
      {
        path: 'orders/:id',
        name: 'order-details',
        component: () => import('@/views/orders/OrderDetailsView.vue'),
        props: true,
        meta: { title: 'orderDetails', nav: 'orders' },
      },
      {
        path: 'orders/:id/return',
        name: 'order-return',
        component: () => import('@/views/orders/ReturnRequestView.vue'),
        props: true,
        meta: { title: 'returnRequest', nav: 'orders' },
      },
      {
        path: 'returns',
        name: 'returns',
        component: () => import('@/views/orders/ReturnsView.vue'),
        meta: { title: 'returns', nav: 'orders' },
      },
    ],
  },
]

export default routes

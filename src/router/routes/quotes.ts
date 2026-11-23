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
        meta: { title: 'quotes', nav: 'quotes', footerGap: 129 },
      },
      {
        path: 'quotes/request',
        name: 'quote-request',
        component: () => import('@/views/quotes/QuoteRequestView.vue'),
        meta: { title: 'quoteRequest', nav: 'quoteRequest', footerGap: 290 },
      },
      {
        path: 'quotes/:id/payment',
        name: 'quote-payment',
        component: () => import('@/views/quotes/QuotePaymentView.vue'),
        meta: { title: 'quotePayment', nav: 'quotes', featureStrip: true, footerGap: 99 },
      },
    ],
  },
]

export default routes

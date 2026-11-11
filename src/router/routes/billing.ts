import type { RouteRecordRaw } from 'vue-router'

import { DefaultLayout } from '@/router/layouts'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: 'payments',
        name: 'payments',
        component: () => import('@/views/billing/PaymentsView.vue'),
        meta: { title: 'payments' },
      },
      {
        path: 'vouchers',
        name: 'vouchers',
        component: () => import('@/views/billing/VouchersView.vue'),
        meta: { title: 'vouchers', nav: 'vouchers' },
      },
      {
        path: 'vouchers/new',
        name: 'voucher-create',
        component: () => import('@/views/billing/CreateVoucherView.vue'),
        meta: { title: 'voucherCreate', nav: 'vouchers', footerGap: 183 },
      },
      {
        path: 'vouchers/transactions',
        name: 'voucher-transactions',
        component: () => import('@/views/billing/VoucherTransactionsView.vue'),
        meta: { title: 'voucherTransactions', nav: 'vouchers', footerGap: 94 },
      },
    ],
  },
]

export default routes

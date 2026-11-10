import type { RouteRecordRaw } from 'vue-router'

import { DefaultLayout } from '@/router/layouts'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: 'account',
        component: () => import('@/views/account/AccountLayoutView.vue'),
        children: [
          {
            path: '',
            name: 'account',
            component: () => import('@/views/account/AccountPersonalView.vue'),
            meta: { title: 'account' },
          },
          {
            path: 'company',
            name: 'account-company',
            component: () => import('@/views/account/AccountCompanyView.vue'),
            meta: { title: 'accountCompany' },
          },
          {
            path: 'addresses',
            name: 'account-addresses',
            component: () => import('@/views/account/AccountAddressesView.vue'),
            meta: { title: 'accountAddresses' },
          },
        ],
      },
      {
        path: 'wallet',
        name: 'wallet',
        component: () => import('@/views/account/WalletView.vue'),
        meta: { title: 'wallet' },
      },
      {
        path: 'wallet/withdraw',
        name: 'wallet-withdraw',
        component: () => import('@/views/account/WalletWithdrawView.vue'),
        meta: { title: 'walletWithdraw' },
      },
    ],
  },
]

export default routes

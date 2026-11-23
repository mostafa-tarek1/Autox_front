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
            meta: { title: 'account', footerGap: 225 },
          },
          {
            path: 'company',
            name: 'account-company',
            component: () => import('@/views/account/AccountCompanyView.vue'),
            meta: { title: 'accountCompany', footerGap: 169 },
          },
          {
            path: 'addresses',
            name: 'account-addresses',
            component: () => import('@/views/account/AccountAddressesView.vue'),
            meta: { title: 'accountAddresses', footerGap: 177 },
          },
          {
            path: 'bank',
            name: 'account-bank',
            component: () => import('@/views/account/AccountBankView.vue'),
            meta: { title: 'accountBank', footerGap: 140 },
          },
        ],
      },
      {
        path: 'wallet',
        name: 'wallet',
        component: () => import('@/views/account/WalletView.vue'),
        meta: { title: 'wallet', footerGap: 128 },
      },
      {
        path: 'wallet/withdraw',
        name: 'wallet-withdraw',
        component: () => import('@/views/account/WalletWithdrawView.vue'),
        meta: { title: 'walletWithdraw', footerGap: 178 },
      },
    ],
  },
]

export default routes

import type { RouteRecordRaw } from 'vue-router'

import { DefaultLayout } from '@/router/layouts'

/**
 * Cart and checkout. The cart asks every supplier to confirm availability; confirmed orders are
 * paid later from the orders list ("ادفع الآن") → payment → bank transfer when chosen.
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: 'cart',
        name: 'cart',
        component: () => import('@/views/shop/CartView.vue'),
        meta: { title: 'cart', featureStrip: true },
      },
      {
        path: 'checkout',
        redirect: { name: 'checkout-payment' },
        children: [
          {
            path: 'payment',
            name: 'checkout-payment',
            component: () => import('@/views/shop/PaymentView.vue'),
            meta: { title: 'checkoutPayment', nav: 'orders', featureStrip: true },
          },
          {
            path: 'payment/bank-transfer',
            name: 'checkout-bank-transfer',
            component: () => import('@/views/shop/BankTransferView.vue'),
            meta: { title: 'checkoutBankTransfer', nav: 'orders', featureStrip: true },
          },
        ],
      },
    ],
  },
]

/** Component gallery for visual comparison with Figma; never part of a production build. */
if (import.meta.env.DEV) {
  routes.push({
    path: '/__preview/shop',
    name: 'shop-preview',
    component: () => import('@/views/shop/ShopPreviewView.vue'),
  })
}

export default routes

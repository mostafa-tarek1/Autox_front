import type { RouteRecordRaw } from 'vue-router'

import { DefaultLayout } from '@/router/layouts'

/** Cart and checkout: cart → availability → shipping → payment → confirmation. */
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
        redirect: { name: 'checkout-availability' },
        children: [
          {
            path: 'availability',
            name: 'checkout-availability',
            component: () => import('@/views/shop/AvailabilityView.vue'),
            meta: { title: 'checkoutAvailability', featureStrip: true },
          },
          {
            path: 'shipping',
            name: 'checkout-shipping',
            component: () => import('@/views/shop/ShippingView.vue'),
            meta: { title: 'checkoutShipping', featureStrip: true },
          },
          {
            path: 'payment',
            name: 'checkout-payment',
            component: () => import('@/views/shop/PaymentView.vue'),
            meta: { title: 'checkoutPayment', featureStrip: true },
          },
          {
            path: 'payment/bank-transfer',
            name: 'checkout-bank-transfer',
            component: () => import('@/views/shop/BankTransferView.vue'),
            meta: { title: 'checkoutBankTransfer', featureStrip: true },
          },
          {
            path: 'confirmation',
            name: 'checkout-confirmation',
            component: () => import('@/views/shop/ConfirmationView.vue'),
            meta: { title: 'checkoutConfirmation' },
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

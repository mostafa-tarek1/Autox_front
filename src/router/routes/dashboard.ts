import type { RouteRecordRaw } from 'vue-router'

import { DashboardLayout } from '@/router/layouts'

/** Supplier dashboard (Figma page "Dashboard"). */
const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/dashboard/DashboardHomeView.vue'),
        meta: { title: 'dashboardHome', dashboardSection: 'home' },
      },
      {
        path: 'welcome',
        name: 'dashboard-welcome',
        component: () => import('@/views/dashboard/DashboardWelcomeView.vue'),
        meta: { title: 'dashboardHome', dashboardSection: 'home' },
      },
      {
        path: 'products',
        name: 'dashboard-products',
        component: () => import('@/views/dashboard/products/ProductsView.vue'),
        meta: { title: 'dashboardProducts', dashboardSection: 'products' },
      },
      {
        path: 'products/catalog',
        name: 'dashboard-catalog',
        component: () => import('@/views/dashboard/products/CatalogView.vue'),
        meta: { title: 'dashboardCatalog', dashboardSection: 'products' },
      },
      {
        path: 'products/new',
        name: 'dashboard-product-new',
        component: () => import('@/views/dashboard/products/ProductNewView.vue'),
        meta: { title: 'dashboardProductNew', dashboardSection: 'products' },
      },
      {
        path: 'products/excel-review',
        name: 'dashboard-excel-review',
        component: () => import('@/views/dashboard/products/ExcelReviewView.vue'),
        meta: { title: 'dashboardExcelReview', dashboardSection: 'products' },
      },
      {
        path: 'quotes',
        name: 'dashboard-quotes',
        component: () => import('@/views/dashboard/quotes/QuotesView.vue'),
        meta: { title: 'dashboardQuotes', dashboardSection: 'quotes' },
      },
      {
        path: 'quotes/:id/offer',
        name: 'dashboard-quote-offer',
        component: () => import('@/views/dashboard/quotes/QuoteOfferView.vue'),
        meta: { title: 'dashboardQuoteOffer', dashboardSection: 'quotes' },
      },
      {
        path: 'balance',
        name: 'dashboard-balance',
        component: () => import('@/views/dashboard/finance/BalanceView.vue'),
        meta: { title: 'dashboardBalance', dashboardSection: 'balance' },
      },
      {
        path: 'invoices',
        name: 'dashboard-invoices',
        component: () => import('@/views/dashboard/finance/InvoicesView.vue'),
        meta: { title: 'dashboardInvoices', dashboardSection: 'invoices' },
      },
      {
        path: 'profile',
        name: 'dashboard-profile',
        component: () => import('@/views/dashboard/finance/ProfileView.vue'),
        meta: { title: 'dashboardProfile' },
      },
    ],
  },
]

export default routes

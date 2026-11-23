import type { RouteRecordRaw } from 'vue-router'

import { DashboardLayout } from '@/router/layouts'

/** Full-width product pages (catalog, add, Excel review): no sidebar in the design, site-style top bar. */
const ProductsFocusLayout = () => import('@/components/dashboard/products/ProductsFocusLayout.vue')

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
        path: 'quotes',
        name: 'dashboard-quotes',
        component: () => import('@/views/dashboard/quotes/QuotesView.vue'),
        meta: { title: 'dashboardQuotes', dashboardSection: 'quotes' },
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
  /** Pricing page for a quotation request: standalone (logo-only header), outside the dashboard shell. */
  {
    path: '/dashboard/products/catalog',
    component: ProductsFocusLayout,
    children: [
      {
        path: '',
        name: 'dashboard-catalog',
        component: () => import('@/views/dashboard/products/CatalogView.vue'),
        meta: { title: 'dashboardCatalog', dashboardSection: 'products' },
      },
    ],
  },
  {
    path: '/dashboard/products/new',
    component: ProductsFocusLayout,
    children: [
      {
        path: '',
        name: 'dashboard-product-new',
        component: () => import('@/views/dashboard/products/ProductNewView.vue'),
        meta: { title: 'dashboardProductNew', dashboardSection: 'products' },
      },
    ],
  },
  {
    path: '/dashboard/products/excel-review',
    component: ProductsFocusLayout,
    children: [
      {
        path: '',
        name: 'dashboard-excel-review',
        component: () => import('@/views/dashboard/products/ExcelReviewView.vue'),
        meta: { title: 'dashboardExcelReview', dashboardSection: 'products' },
      },
    ],
  },
  {
    path: '/dashboard/quotes/:id/offer',
    name: 'dashboard-quote-offer',
    component: () => import('@/views/dashboard/quotes/QuoteOfferView.vue'),
    meta: { title: 'dashboardQuoteOffer', dashboardSection: 'quotes' },
  },
]

export default routes

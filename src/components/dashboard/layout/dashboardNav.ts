import type { Component } from 'vue'

import CarIcon from '@/assets/icons/car-01--stroke-rounded.svg'
import CouponIcon from '@/assets/icons/coupon-01--stroke-rounded.svg'
import HomeIcon from '@/assets/icons/home-01--stroke-rounded.svg'
import InvoiceIcon from '@/assets/icons/invoice-01--stroke-rounded.svg'
import MoneyIcon from '@/assets/icons/money-01--stroke-rounded.svg'

export type DashboardSection = 'home' | 'products' | 'quotes' | 'balance' | 'invoices'

export interface DashboardNavItem {
  key: DashboardSection
  routeName: string
  icon: Component
}

/** Sidebar links, in the order shown (start → end / top → bottom). */
export const dashboardNav: DashboardNavItem[] = [
  { key: 'home', routeName: 'dashboard', icon: HomeIcon },
  { key: 'products', routeName: 'dashboard-products', icon: CarIcon },
  { key: 'quotes', routeName: 'dashboard-quotes', icon: CouponIcon },
  { key: 'balance', routeName: 'dashboard-balance', icon: MoneyIcon },
  { key: 'invoices', routeName: 'dashboard-invoices', icon: InvoiceIcon },
]

import type { Component } from 'vue'

import CarSolidIcon from '@/assets/icons/car-01--solid-rounded.svg'
import CarIcon from '@/assets/icons/car-01--stroke-rounded.svg'
import CouponSolidIcon from '@/assets/icons/coupon-01--solid-rounded.svg'
import CouponIcon from '@/assets/icons/coupon-01--stroke-rounded.svg'
import HomeSolidIcon from '@/assets/icons/home-01--solid-rounded.svg'
import HomeIcon from '@/assets/icons/home-01--stroke-rounded.svg'
import InvoiceSolidIcon from '@/assets/icons/invoice-01--solid-rounded.svg'
import InvoiceIcon from '@/assets/icons/invoice-01--stroke-rounded.svg'
import MoneySolidIcon from '@/assets/icons/money-01--solid-rounded.svg'
import MoneyIcon from '@/assets/icons/money-01--stroke-rounded.svg'

export type DashboardSection = 'home' | 'products' | 'quotes' | 'balance' | 'invoices'

export interface DashboardNavItem {
  key: DashboardSection
  routeName: string
  icon: Component
  /** Filled variant shown on the active link, as in the Figma "link" component. */
  activeIcon: Component
}

/** Sidebar links, in the order shown (start → end / top → bottom). */
export const dashboardNav: DashboardNavItem[] = [
  { key: 'home', routeName: 'dashboard', icon: HomeIcon, activeIcon: HomeSolidIcon },
  { key: 'products', routeName: 'dashboard-products', icon: CarIcon, activeIcon: CarSolidIcon },
  { key: 'quotes', routeName: 'dashboard-quotes', icon: CouponIcon, activeIcon: CouponSolidIcon },
  { key: 'balance', routeName: 'dashboard-balance', icon: MoneyIcon, activeIcon: MoneySolidIcon },
  {
    key: 'invoices',
    routeName: 'dashboard-invoices',
    icon: InvoiceIcon,
    activeIcon: InvoiceSolidIcon,
  },
]

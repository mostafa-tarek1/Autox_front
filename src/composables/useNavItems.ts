import type { RouteLocationRaw } from 'vue-router'

export interface NavItem {
  key: 'home' | 'orders' | 'quotes' | 'vouchers' | 'contact'
  to: RouteLocationRaw
}

/** Main navigation, in the order shown in the navbar (start → end). */
export const navItems: NavItem[] = [
  { key: 'home', to: { name: 'home' } },
  { key: 'orders', to: '/orders' },
  { key: 'quotes', to: '/quotes' },
  { key: 'vouchers', to: '/vouchers' },
  { key: 'contact', to: '/contact' },
]

import { describe, expect, it } from 'vitest'

import router from '@/router'
import { AuthLayout, DefaultLayout } from '@/router/layouts'

describe('router', () => {
  it('keeps one parent record per layout so the layout is not remounted between features', () => {
    const roots = router.options.routes.filter((route) => route.path === '/')

    expect(roots).toHaveLength(2)
    expect(roots.map((route) => route.component)).toEqual(
      expect.arrayContaining([DefaultLayout, AuthLayout]),
    )
  })

  it.each([
    'home',
    'login',
    'cart',
    'orders',
    'account',
    'wallet',
    'payments',
    'vouchers',
    'quotes',
    'contact',
  ])('resolves the %s route under a layout', (name) => {
    const resolved = router.resolve({ name })

    expect(resolved.matched.length).toBeGreaterThan(1)
  })
})

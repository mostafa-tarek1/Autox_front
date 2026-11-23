import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import { validateDeliveryAddress } from '@/components/shop/deliveryAddress'
import type { DeliveryAddress } from '@/components/shop/types'
import { useCartStore } from '@/stores/cart'

const address: DeliveryAddress = {
  fullName: 'فهد العتيبي',
  phone: '512345678',
  city: 'riyadh',
  district: '',
  street: '',
  building: '',
  details: '',
}

describe('validateDeliveryAddress', () => {
  it('accepts a name, a Saudi mobile and a city', () => {
    expect(validateDeliveryAddress(address)).toEqual({})
  })

  it('flags missing name and city and a malformed mobile', () => {
    expect(
      validateDeliveryAddress({ ...address, fullName: ' ', phone: '0512', city: null }),
    ).toEqual({
      fullName: 'required',
      phone: 'invalidPhone',
      city: 'required',
    })
  })
})

describe('cart store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('groups lines per supplier with each group total', () => {
    const cart = useCartStore()

    expect(cart.groups.map((group) => [group.supplier, Math.round(group.total)])).toEqual([
      ['الشركة رقم 9', 2160],
      ['الشركة رقم 4', 200],
    ])
    expect(cart.itemsCount).toBe(7)
  })

  it('drops a line when its quantity reaches zero', () => {
    const cart = useCartStore()
    cart.setQuantity('cart-2', 0)

    expect(cart.items.map((item) => item.id)).toEqual(['cart-1', 'cart-3'])
  })
})

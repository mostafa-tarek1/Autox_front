import { describe, expect, it } from 'vitest'

import { useSupplierProducts } from '@/components/dashboard/products/useSupplierProducts'

const draft = {
  partNumber: 'TEST-1',
  name: 'Test part',
  origin: 'original',
  brandId: 'toyota',
  price: 50,
} as const

describe('useSupplierProducts', () => {
  it('adds new parts to the top of the list and removes them', () => {
    const store = useSupplierProducts()
    const added = store.add({ ...draft })

    expect(store.products.value[0]?.id).toBe(added.id)
    store.remove(added.id)
    expect(store.find(added.id)).toBeUndefined()
  })

  it('attaches alternatives to their main part', () => {
    const store = useSupplierProducts()
    const main = store.add({ ...draft })
    store.addAlternative(main.id, { ...draft, partNumber: 'ALT-1', origin: 'chinese' })

    expect(store.alternativesOf(main.id).map((part) => [part.partNumber, part.origin])).toEqual([
      ['ALT-1', 'chinese'],
    ])
  })
})

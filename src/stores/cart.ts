import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { CartItem, CartSupplierGroup, DeliveryAddress } from '@/components/shop/types'
import { initialCartItems, VAT_AMOUNT } from '@/mocks/shop'
import type { Product } from '@/types/catalog'

/**
 * Cart state for the UI phase. The cart now sends an availability request to every supplier;
 * payment happens later from the orders list. Totals are local until the API exists.
 */
export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(structuredClone(initialCartItems))
  const address = ref<DeliveryAddress>({
    fullName: 'فهد العتيبي',
    phone: '512345678',
    city: 'riyadh',
    district: '',
    street: '',
    building: '',
    details: '',
  })

  const itemsCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const subtotal = computed(() => items.value.reduce((sum, item) => sum + lineTotal(item), 0))
  const vat = computed(() => (items.value.length ? VAT_AMOUNT : 0))
  const total = computed(() => subtotal.value + vat.value)

  /** Lines grouped per supplier, in the order suppliers first appear in the cart. */
  const groups = computed<CartSupplierGroup[]>(() => {
    const bySupplier = new Map<string, CartSupplierGroup>()
    for (const item of items.value) {
      const group = bySupplier.get(item.supplier) ?? {
        supplier: item.supplier,
        total: 0,
        items: [],
      }
      group.items.push(item)
      group.total += lineTotal(item)
      bySupplier.set(item.supplier, group)
    }
    return [...bySupplier.values()]
  })

  function lineTotal(item: CartItem): number {
    return item.unitPrice * item.quantity
  }

  function add(product: Product, quantity = 1): void {
    const existing = items.value.find((item) => item.id === product.id)
    if (existing) {
      existing.quantity += quantity
      return
    }
    items.value.push({
      id: product.id,
      title: product.title,
      partNumber: product.partNumber,
      supplier: product.supplier,
      brandName: '',
      brandLogo: product.brandLogo,
      origin: product.origin,
      unitPrice: product.price,
      quantity,
    })
  }

  function setQuantity(id: string, quantity: number): void {
    const item = items.value.find((entry) => entry.id === id)
    if (!item) {
      return
    }
    if (quantity <= 0) {
      remove(id)
      return
    }
    item.quantity = quantity
  }

  function remove(id: string): void {
    items.value = items.value.filter((item) => item.id !== id)
  }

  function clear(): void {
    items.value = []
  }

  return {
    items,
    address,
    itemsCount,
    subtotal,
    vat,
    total,
    groups,
    lineTotal,
    add,
    setQuantity,
    remove,
    clear,
  }
})

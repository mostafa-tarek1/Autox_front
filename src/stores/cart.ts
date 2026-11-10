import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { CartItem, PaymentMethod, ShippingDetails } from '@/components/shop/types'
import { DELIVERY_FEE, initialCartItems, QUOTE_THRESHOLD, VAT_AMOUNT } from '@/mocks/shop'
import type { Product } from '@/types/catalog'

/**
 * Cart and checkout state for the UI phase. Totals are computed locally from mock data; once the
 * API exists the server becomes the source of truth for prices, VAT and availability.
 */
export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(structuredClone(initialCartItems))
  const shipping = ref<ShippingDetails>({
    fullName: 'فهد العتيبي',
    phone: '',
    city: null,
    address: '',
  })
  const paymentMethod = ref<PaymentMethod | null>(null)
  const isAvailabilityChecked = ref(false)

  const itemsCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
  )
  const vat = computed(() => (items.value.length ? VAT_AMOUNT : 0))
  const delivery = computed(() => (items.value.length ? DELIVERY_FEE : 0))
  const total = computed(() => subtotal.value + vat.value)
  const totalWithDelivery = computed(() => total.value + delivery.value)

  function lineTotal(item: CartItem): number {
    return item.unitPrice * item.quantity
  }

  function exceedsQuoteThreshold(item: CartItem): boolean {
    return lineTotal(item) > QUOTE_THRESHOLD
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

  /** Keeps only what the supplier can deliver for a partially available line. */
  function acceptAvailableQuantity(id: string): void {
    const item = items.value.find((entry) => entry.id === id)
    if (item?.availableQuantity) {
      item.quantity = item.availableQuantity
      item.availability = 'available'
    }
  }

  function clear(): void {
    items.value = []
    paymentMethod.value = null
    isAvailabilityChecked.value = false
  }

  return {
    items,
    shipping,
    paymentMethod,
    isAvailabilityChecked,
    itemsCount,
    subtotal,
    vat,
    delivery,
    total,
    totalWithDelivery,
    lineTotal,
    exceedsQuoteThreshold,
    add,
    setQuantity,
    remove,
    acceptAvailableQuantity,
    clear,
  }
})

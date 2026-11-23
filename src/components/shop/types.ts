import type { PartOrigin } from '@/types/catalog'

export interface CartItem {
  id: string
  title: string
  partNumber: string
  supplier: string
  brandName: string
  brandLogo: string
  origin: PartOrigin
  unitPrice: number
  quantity: number
}

/** Cart lines grouped per supplier, as the cart screen shows them (Figma 588:16341). */
export interface CartSupplierGroup {
  supplier: string
  total: number
  items: CartItem[]
}

export type PaymentMethod = 'wallet' | 'card' | 'mada' | 'tabby' | 'tamara' | 'bankTransfer'

/** "عنوان التوصيل" block of the cart (Figma 588:16534). */
export interface DeliveryAddress {
  fullName: string
  phone: string
  city: string | null
  district: string
  street: string
  building: string
  details: string
}

export interface BankAccount {
  bankName: string
  bankLogo: string
  beneficiary: string
  iban: string
}

/** Totals of the order being paid on the payment screens. */
export interface PaymentSummary {
  count: number
  subtotal: number
  vat: number
  total: number
}

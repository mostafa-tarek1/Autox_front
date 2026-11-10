import type { PartOrigin } from '@/types/catalog'

/** Result of the suppliers' availability check for one cart line. */
export type AvailabilityStatus = 'available' | 'partial' | 'unavailable'

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
  availability?: AvailabilityStatus
  /** Pieces the supplier can deliver when availability is `partial`. */
  availableQuantity?: number
}

export type CheckoutStep = 'cart' | 'availability' | 'shipping' | 'payment' | 'confirmation'

export type PaymentMethod = 'visa' | 'mastercard' | 'mada' | 'tabby' | 'tamara' | 'bankTransfer'

export interface ShippingDetails {
  fullName: string
  phone: string
  city: string | null
  address: string
}

export interface BankAccount {
  bankName: string
  bankLogo: string
  beneficiary: string
  iban: string
}

/**
 * Mock data for the checkout UI phase. Replaced by API calls once the backend endpoints exist.
 */
import hyundai from '@/assets/images/car-brands/hyundai.webp'
import bankAlrajhi from '@/assets/images/shop/bank-alrajhi.webp'
import type { BankAccount, CartItem, PaymentSummary } from '@/components/shop/types'
import {
  bankNames,
  brandNames,
  cityNames,
  companyNamePlaceholder,
  partNames,
  supplierName,
} from '@/mocks/names'

function cartItem(id: string, overrides: Partial<CartItem>): CartItem {
  return {
    id,
    title: partNames.isuzuFender,
    partNumber: '04465-0K240',
    supplier: supplierName(9),
    brandName: brandNames.hyundai,
    brandLogo: hyundai,
    origin: 'original',
    unitPrice: 200,
    quantity: 1,
    ...overrides,
  }
}

/**
 * Cart from Figma 192:3055: two suppliers, line totals 2,000 / 160 (الشركة رقم 9 → 2,160) and
 * 200 (الشركة رقم 4), 7 pieces in all. Unit prices are derived so the line totals match.
 */
export const initialCartItems: CartItem[] = [
  cartItem('cart-1', { quantity: 3, unitPrice: 2000 / 3 }),
  cartItem('cart-2', { quantity: 1, unitPrice: 160 }),
  cartItem('cart-3', { quantity: 3, unitPrice: 200 / 3, supplier: supplierName(4) }),
]

export const VAT_AMOUNT = 100

export const deliveryCities = [
  { value: 'riyadh', label: cityNames.riyadh },
  { value: 'jeddah', label: cityNames.jeddah },
  { value: 'dammam', label: cityNames.dammam },
  { value: 'makkah', label: cityNames.makkah },
  { value: 'madinah', label: cityNames.madinah },
]

/** Order being paid from the orders list ("ادفع الآن"), values from Figma 622:9608. */
export const paymentSummary: PaymentSummary = { count: 9, subtotal: 8900, vat: 100, total: 9000 }

/** Wallet balance shown in the "الدفع بالمحفظة" dialog (Figma 753:14027). */
export const walletBalance = 200_000

export const bankAccount: BankAccount = {
  bankName: bankNames.alrajhi,
  bankLogo: bankAlrajhi,
  beneficiary: companyNamePlaceholder,
  iban: 'SA00 0000 0000 0000 0000 0000',
}

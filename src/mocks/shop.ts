/**
 * Mock data for the checkout UI phase. Replaced by API calls once the backend endpoints exist.
 */
import hyundai from '@/assets/images/car-brands/hyundai.webp'
import bankAlrajhi from '@/assets/images/shop/bank-alrajhi.webp'
import type { BankAccount, CartItem } from '@/components/shop/types'
import type { Product } from '@/types/catalog'

function cartItem(id: string, overrides: Partial<CartItem>): CartItem {
  return {
    id,
    title: 'رفرف ونيت ايسوزو19/23أصلي',
    partNumber: '04465-0K240',
    supplier: 'الشركة رقم 8',
    brandName: 'هيونداي',
    brandLogo: hyundai,
    origin: 'original',
    unitPrice: 200,
    quantity: 3,
    ...overrides,
  }
}

export const initialCartItems: CartItem[] = [
  cartItem('cart-1', { unitPrice: 3500, availability: 'partial', availableQuantity: 2 }),
  cartItem('cart-2', { availability: 'available', supplier: 'الشركة رقم 4' }),
  cartItem('cart-3', { availability: 'unavailable', supplier: 'الشركة رقم 9' }),
]

/** Line totals above this amount (SAR) can be sent as a quotation request. */
export const QUOTE_THRESHOLD = 10_000

export const VAT_AMOUNT = 100

export const DELIVERY_FEE = 300

export const shippingCities = [
  { value: 'riyadh', label: 'الرياض' },
  { value: 'jeddah', label: 'جدة' },
  { value: 'dammam', label: 'الدمام' },
  { value: 'makkah', label: 'مكة المكرمة' },
  { value: 'madinah', label: 'المدينة المنورة' },
]

export const bankAccount: BankAccount = {
  bankName: 'مصرف الراجحي',
  bankLogo: bankAlrajhi,
  beneficiary: 'اسم الشركة',
  iban: 'SA00 0000 0000 0000 0000 0000',
}

export const alternativeParts: Product[] = Array.from({ length: 3 }, (_, index) => ({
  id: `alt-${index + 1}`,
  title: 'بنز بستم ايسوزو',
  partNumber: '04465-0K240',
  supplier: 'الشركة رقم 8',
  brandLogo: hyundai,
  origin: 'original',
  price: 200,
  highlight: 'matchesRequest',
}))

export const confirmedOrder = {
  number: '#AX-10248',
  date: '15/10/2027',
  cardLastDigits: '0100',
  recipient: 'فهد العتيبي',
  address: 'زهرة النرجس, الرياض, المملكة العربية السعودية',
}

/**
 * Supplier dashboard — quotation requests the supplier was invited to price (mock data for the UI
 * phase; replaced by the supplier RFQ endpoints). Values follow the Figma frames 768:16897,
 * 863:13271, 780:10870 and 910:16321.
 */
import type { LocalizedText } from '@/composables/useLocalizedText'
import { partNames } from '@/mocks/names'
import type { PartOrigin } from '@/types/catalog'

/**
 * - awaitingOffer: the supplier still has to price it (opens the pricing page)
 * - offerSent: offer sent, waiting for the trader
 * - awaitingPayment: the trader accepted, payment pending
 * - accepted / approved: the trader accepted (and paid) — customer details are shown
 * - closed: the request closed without this supplier's offer
 */
export type SupplierQuoteStatus =
  'awaitingOffer' | 'offerSent' | 'awaitingPayment' | 'accepted' | 'approved' | 'closed'

export interface SupplierQuoteItem {
  id: string
  title: LocalizedText
  partNumber: string
  origin: PartOrigin
  quantity: number
}

export interface SupplierQuoteCustomer {
  name: string
  phone: string
  address: string
}

export interface SupplierQuote {
  id: string
  number: number
  customerName: string
  /** ISO date the request was sent to the supplier. */
  date: string
  /** Price offered by the supplier; 0 while no offer was sent. */
  offeredPrice: number
  status: SupplierQuoteStatus
  items: SupplierQuoteItem[]
  customer: SupplierQuoteCustomer
}

export interface SupplierQuoteStats {
  sent: number
  accepted: number
  rejected: number
}

export const supplierQuoteStats: SupplierQuoteStats = { sent: 2000, accepted: 1500, rejected: 500 }

const customer: SupplierQuoteCustomer = {
  name: 'فهد العتيبي',
  phone: '5512345678',
  address: 'حي النرجس, الرياض, المملكة العربية السعودية',
}

const offerItems: SupplierQuoteItem[] = [
  {
    id: 'item-1',
    title: partNames.isuzuFender,
    partNumber: '04465-0K240',
    origin: 'original',
    quantity: 3,
  },
  {
    id: 'item-2',
    title: partNames.isuzuFender,
    partNumber: '04465-0K240',
    origin: 'original',
    quantity: 3,
  },
]

const requestItems: SupplierQuoteItem[] = Array.from({ length: 3 }, (_, index) => ({
  id: `request-item-${index + 1}`,
  title: partNames.elantraControlArm,
  partNumber: '54500-AA100',
  origin: 'original',
  quantity: 2,
}))

const statuses: SupplierQuoteStatus[] = [
  'awaitingOffer',
  'closed',
  'offerSent',
  'offerSent',
  'accepted',
  'closed',
  'accepted',
  'closed',
  'approved',
  'closed',
]

export const supplierQuotes: SupplierQuote[] = statuses.map((status, index) => ({
  id: `rfq-${index + 1}`,
  number: index + 1,
  customerName: 'فهد العتيبي',
  date: '2026-11-15',
  offeredPrice: 3000,
  status,
  items: status === 'awaitingOffer' ? requestItems : offerItems,
  customer,
}))

/** The pricing page shows the request date of the RFQ (frame 863:13271). */
export const quoteRequestDate = '2027-10-15'

/** Offered amount shown in the offer-details drawer (frames 780:10870 / 910:16321). */
export const drawerOfferedPrice = 2000

export function findSupplierQuote(id: string): SupplierQuote | undefined {
  return supplierQuotes.find((quote) => quote.id === id)
}

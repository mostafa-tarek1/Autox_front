/**
 * Local mock data for quotation requests (UI phase only).
 */
import type { LocalizedText } from '@/composables/useLocalizedText'
import { bankNames, companyNamePlaceholder, partNames, supplierName } from '@/mocks/names'

export type QuoteStatus = 'offersReceived' | 'awaitingOffers'

export interface QuoteItem {
  id: string
  name: LocalizedText
  partNumber: string
  origin: 'original' | 'korean' | 'japanese' | 'chinese'
  quantity: number
}

export interface QuoteOffer {
  id: string
  supplier: LocalizedText
  price: number
}

export interface QuoteRequest {
  id: string
  date: string
  status: QuoteStatus
  items: QuoteItem[]
  offers: QuoteOffer[]
}

const items: QuoteItem[] = [
  {
    id: 'item-1',
    name: partNames.elantraControlArm,
    partNumber: '54500-AA100',
    origin: 'original',
    quantity: 2,
  },
  {
    id: 'item-2',
    name: partNames.elantraControlArm,
    partNumber: '54500-AA100',
    origin: 'original',
    quantity: 2,
  },
]

export const quoteRequests: QuoteRequest[] = [
  {
    id: 'quote-1',
    date: '2027-10-15',
    status: 'offersReceived',
    items,
    offers: [1, 2, 3, 4].map((n) => ({
      id: `offer-${n}`,
      supplier: supplierName(n),
      price: 200,
    })),
  },
  { id: 'quote-2', date: '2027-10-15', status: 'awaitingOffers', items, offers: [] },
]

/** Totals shown on the quote payment page (values from the Figma frame 686:8455). */
export interface QuotePaymentSummary {
  pieces: number
  subtotal: number
  vat: number
  total: number
}

export const quotePaymentSummary: QuotePaymentSummary = {
  pieces: 9,
  subtotal: 2000,
  vat: 100,
  total: 2400,
}

/** Bank account the trader transfers to (placeholder until the backend provides it). */
export const quoteBankAccount = {
  bankName: bankNames.alrajhi,
  beneficiary: companyNamePlaceholder,
  iban: 'SA00 0000 0000 0000 0000 0000',
}

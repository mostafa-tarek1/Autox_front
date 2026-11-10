/**
 * Local mock data for quotation requests (UI phase only).
 */
export type QuoteStatus = 'offersReceived' | 'awaitingOffers'

export interface QuoteItem {
  id: string
  name: string
  partNumber: string
  origin: 'original' | 'korean' | 'japanese' | 'chinese'
  quantity: number
}

export interface QuoteOffer {
  id: string
  merchant: string
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
    name: 'مقص امامي يسار النترا 2020',
    partNumber: '54500-AA100',
    origin: 'original',
    quantity: 2,
  },
  {
    id: 'item-2',
    name: 'مقص امامي يسار النترا 2020',
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
      merchant: `التاجر رقم ${n}`,
      price: 200,
    })),
  },
  { id: 'quote-2', date: '2027-10-15', status: 'awaitingOffers', items, offers: [] },
]

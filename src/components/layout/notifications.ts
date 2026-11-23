import type { LocalizedText } from '@/composables/useLocalizedText'
import { supplierName } from '@/mocks/names'

/** Notification shown in the navbar bell menu. Mock data until the API is wired. */
export interface AppNotification {
  id: string
  kind: 'quoteOffer' | 'availabilityConfirmed' | 'newOrder' | 'quoteRequest' | 'payout'
  /** Message parameters, e.g. supplier name or order number. */
  params: Record<string, LocalizedText>
  /** Offer amount, shown under a quote-offer message. */
  amount?: number
  time: string
}

export const mockNotifications: AppNotification[] = [
  {
    id: 'n-1',
    kind: 'quoteOffer',
    params: { supplier: supplierName(1) },
    amount: 200,
    time: '9:39 AM',
  },
  { id: 'n-2', kind: 'availabilityConfirmed', params: { order: '#12345' }, time: '9:39 AM' },
  { id: 'n-3', kind: 'availabilityConfirmed', params: { order: '#12345' }, time: '9:39 AM' },
]

/** Supplier dashboard notifications (new orders, quote requests, payouts). */
export const mockSupplierNotifications: AppNotification[] = [
  { id: 's-1', kind: 'newOrder', params: { order: '#12345' }, time: '9:39 AM' },
  { id: 's-2', kind: 'quoteRequest', params: { customer: 'فهد العتيبي' }, time: '9:20 AM' },
  { id: 's-3', kind: 'payout', params: {}, amount: 250, time: '8:05 AM' },
]

import type { PartOrigin } from '@/types/catalog'

/** Order-level and shipment-level states shown as status chips. */
export type OrderStatus =
  | 'awaitingAvailability'
  | 'quantityUnavailable'
  | 'awaitingPayment'
  | 'awaitingPaymentConfirmation'
  | 'preparing'
  | 'shipping'
  | 'delivered'
  | 'completed'

export type ReturnStatus = 'underReview' | 'rejected' | 'refunded'

export type OrdersTab = 'current' | 'previous' | 'returns'

export interface OrderItem {
  id: string
  title: string
  partNumber: string
  origin: PartOrigin
  brandName: string
  brandLogo: string
  quantity: number
  /** Unit price in SAR. */
  price: number
}

export interface Shipment {
  id: string
  number: number
  status: OrderStatus
  trackingNumber: string
  items: OrderItem[]
}

/**
 * `request` orders are per-seller requests that still wait for stock/payment (compact rows);
 * `placed` orders are paid and split into shipments.
 */
export interface Order {
  id: string
  number: string
  kind: 'request' | 'placed'
  status: OrderStatus
  seller?: string
  date: string
  total: number
  trackingNumber?: string
  items: OrderItem[]
  shipments: Shipment[]
}

export interface OrderDetails extends Order {
  recipient: string
  address: string
  cardLast4: string
  subtotal: number
  vat: number
  grandTotal: number
}

export interface ReturnRequest {
  id: string
  orderId: string
  orderNumber: string
  date: string
  status: ReturnStatus
  reason: string
  notes: string
  rejectionReason?: string
  photos: string[]
}

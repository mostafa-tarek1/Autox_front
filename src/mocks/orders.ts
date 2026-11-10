/**
 * Local mock data for the orders/returns UI phase. Replaced by API calls once the endpoints exist.
 */
import hyundai from '@/assets/images/car-brands/hyundai.webp'
import returnPhoto from '@/assets/images/orders/return-photo.webp'
import type {
  Order,
  OrderDetails,
  OrderItem,
  ReturnRequest,
  Shipment,
} from '@/components/orders/types'

function item(id: string, price = 200, quantity = 3): OrderItem {
  return {
    id,
    title: 'رفرف ونيت ايسوزو19/23أصلي',
    partNumber: '04465-0K240',
    origin: 'original',
    brandName: 'هيونداي',
    brandLogo: hyundai,
    quantity,
    price,
  }
}

function shipment(id: string, number: number, status: Shipment['status'], count: number): Shipment {
  return {
    id,
    number,
    status,
    trackingNumber: '#AX-10248',
    items: Array.from({ length: count }, (_, index) => item(`${id}-item-${index}`)),
  }
}

const base = { number: '#AX-10248', date: '15/10/2027', total: 2000 }

/** "Current orders" (Figma 588:16862). */
export const currentOrders: Order[] = [
  {
    ...base,
    id: 'ord-1004',
    kind: 'placed',
    status: 'awaitingPaymentConfirmation',
    trackingNumber: '#AX-10248',
    items: [item('p1-a'), item('p1-b')],
    untrackedItems: [item('p1-c')],
    shipments: [],
  },
  {
    ...base,
    id: 'ord-1005',
    kind: 'placed',
    status: 'shipping',
    items: [],
    shipments: [shipment('s1', 1, 'shipping', 2), shipment('s2', 2, 'delivered', 1)],
  },
  {
    ...base,
    id: 'ord-1006',
    kind: 'placed',
    status: 'shipping',
    items: [],
    untrackedItems: [item('p3-a'), item('p3-b')],
    shipments: [],
  },
  {
    ...base,
    id: 'ord-1007',
    kind: 'placed',
    status: 'delivered',
    items: [],
    untrackedItems: [item('p4-a')],
    shipments: [],
  },
]

/** Seller requests still waiting for availability or payment (Figma 235:10299, `?tab=requests`). */
export const requestOrders: Order[] = [
  {
    ...base,
    id: 'ord-1001',
    kind: 'request',
    status: 'awaitingAvailability',
    seller: 'شركة رقم 9',
    items: [item('r1-a', 2000), item('r1-b', 160)],
    shipments: [],
  },
  {
    ...base,
    id: 'ord-1002',
    kind: 'request',
    status: 'awaitingPayment',
    seller: 'شركة رقم 9',
    items: [item('r2-a', 2000), item('r2-b', 160)],
    shipments: [],
  },
  {
    ...base,
    id: 'ord-1003',
    kind: 'request',
    status: 'quantityUnavailable',
    seller: 'شركة رقم 9',
    items: [item('r3-a', 2000), item('r3-b', 160)],
    shipments: [],
  },
]

export const previousOrders: Order[] = Array.from({ length: 3 }, (_, index) => ({
  ...base,
  id: `ord-90${index}`,
  kind: 'request' as const,
  status: 'completed' as const,
  seller: 'شركة رقم 9',
  items: [item(`h${index}-a`, 2000), item(`h${index}-b`, 160)],
  shipments: [],
}))

export function findOrderDetails(id: string): OrderDetails | undefined {
  const order = [...currentOrders, ...requestOrders, ...previousOrders].find(
    (candidate) => candidate.id === id,
  )
  if (!order) {
    return undefined
  }
  return {
    ...order,
    status: 'preparing',
    shipments: [shipment(`${id}-s1`, 1, 'shipping', 2), shipment(`${id}-s2`, 2, 'delivered', 1)],
    recipient: 'فهد العتيبي',
    address: 'زهرة النرجس, الرياض, المملكة العربية السعودية',
    cardLast4: '0100',
    subtotal: 2000,
    vat: 100,
    grandTotal: 2400,
  }
}

export function orderItemsFor(id: string): OrderItem[] {
  const details = findOrderDetails(id)
  return details ? details.shipments.flatMap((entry) => entry.items) : []
}

export const returnRequests: ReturnRequest[] = [
  {
    id: 'ret-1',
    orderId: 'ord-1005',
    orderNumber: '#AX-10248',
    date: '15/10/2027',
    status: 'refunded',
    reason: 'يوجد بعض المنتجات تالفه',
    notes: 'وجدت احد المنتجات تالفه ولا تصلح للاستخدام ارجو استبدالها',
    photos: [returnPhoto, returnPhoto],
  },
  {
    id: 'ret-2',
    orderId: 'ord-1005',
    orderNumber: '#AX-10248',
    date: '15/10/2027',
    status: 'underReview',
    reason: 'يوجد بعض المنتجات تالفه',
    notes: 'وجدت احد المنتجات تالفه ولا تصلح للاستخدام ارجو استبدالها',
    photos: [returnPhoto, returnPhoto],
  },
  {
    id: 'ret-3',
    orderId: 'ord-1005',
    orderNumber: '#AX-10248',
    date: '15/10/2027',
    status: 'rejected',
    reason: 'يوجد بعض المنتجات تالفه',
    notes: 'وجدت احد المنتجات تالفه ولا تصلح للاستخدام ارجو استبدالها',
    rejectionReason: 'لقد مر اكثر من 3 ايام علي طلب المنتج لذلك لا يمكن ارجاعه',
    photos: [returnPhoto, returnPhoto],
  },
]

export const returnReasons = ['damaged', 'wrongPart', 'notAsDescribed', 'other'] as const

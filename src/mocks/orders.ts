/**
 * Local mock data for the orders/returns UI phase. Replaced by API calls once the endpoints exist.
 */
import hyundai from '@/assets/images/car-brands/hyundai.webp'
import returnPhoto from '@/assets/images/orders/return-photo.webp'
import type {
  Order,
  OrderDetails,
  OrderItem,
  OrderRequest,
  ReturnRequest,
  SellerOrder,
  Shipment,
} from '@/components/orders/types'
import { brandNames } from '@/mocks/names'

function item(id: string, price = 200, quantity = 3): OrderItem {
  return {
    id,
    title: 'رفرف ونيت ايسوزو19/23أصلي',
    partNumber: '04465-0K240',
    origin: 'original',
    brandName: brandNames.hyundai,
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

function seller(
  id: string,
  status: SellerOrder['status'],
  name: string,
  total: number,
  prices: number[],
): SellerOrder {
  return {
    id,
    seller: name,
    status,
    total,
    items: prices.map((price, index) => item(`${id}-${index}`, price)),
  }
}

/** "الطلبات الحالية" (Figma 235:10299): orders split per seller, each with its own status. */
export const currentOrders: OrderRequest[] = [
  {
    id: 'ord-1001',
    number: base.number,
    date: base.date,
    sellers: [
      seller('ord-1001-a', 'awaitingPayment', 'شركة رقم 10', 2160, [2000, 160]),
      seller('ord-1001-b', 'awaitingAvailability', 'شركة رقم 9', 2000, [2000]),
    ],
  },
  {
    id: 'ord-1002',
    number: base.number,
    date: base.date,
    sellers: [seller('ord-1002-a', 'quantityUnavailable', 'شركة رقم 9', 2000, [2000, 160])],
  },
]

/** "الطلبات المنتهية" (Figma 238:12021): paid orders that can be returned or invoiced. */
export const previousOrders: OrderRequest[] = Array.from({ length: 3 }, (_, index) => ({
  id: `ord-90${index}`,
  number: base.number,
  date: base.date,
  sellers: [seller(`ord-90${index}-a`, 'paid', 'شركة رقم 9', 2000, [2000, 160])],
}))

/** Sample shipments for the order details screen (reached from payments and the return form). */
function placedOrder(id: string): Order {
  return {
    ...base,
    id,
    kind: 'placed',
    status: 'preparing',
    items: [],
    shipments: [],
  }
}

/** Any order id resolves to the sample details while the API does not exist yet. */
export function findOrderDetails(id: string): OrderDetails | undefined {
  if (!id) {
    return undefined
  }
  return {
    ...placedOrder(id),
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
  const listed = [...currentOrders, ...previousOrders].find((order) => order.id === id)
  if (listed) {
    return listed.sellers.flatMap((entry) => entry.items)
  }
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

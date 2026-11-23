/**
 * Supplier dashboard mock data for the UI phase. Screen-specific mocks live next to this file
 * (dashboard-*.ts) and are replaced by API calls once the supplier endpoints exist.
 */
import type { LocalizedText } from '@/composables/useLocalizedText'
import { partNames } from '@/mocks/names'

export interface DashboardStatsData {
  ordersCount: number
  totalSales: number
  withdrawableBalance: number
  pendingBalance: number
}

/** Values from the Dashboard "الرئيسية" frame (754:15572). */
export const dashboardStats: DashboardStatsData = {
  ordersCount: 2000,
  totalSales: 500,
  withdrawableBalance: 250,
  pendingBalance: 50,
}

/** The "ترحيب" frame (768:16476): a new supplier with no data yet. */
export const emptyDashboardStats: DashboardStatsData = {
  ordersCount: 0,
  totalSales: 0,
  withdrawableBalance: 0,
  pendingBalance: 0,
}

/* ------------------------------------------------------------------ incoming orders */

/** Supplier-side order states, in the order they appear on the "الرئيسية" frame. */
export type SupplierOrderStatus =
  | 'awaitingResponse'
  | 'awaitingPayment'
  | 'awaitingTransferConfirmation'
  | 'paidReadyToShip'
  | 'inDeliveryPeriod'
  | 'inReturnPeriod'
  | 'returnRequested'
  | 'returned'
  | 'returnRejected'
  | 'cancelled'

export interface SupplierOrderItem {
  id: string
  title: LocalizedText
  partNumber: string
  origin: 'original' | 'korean' | 'japanese' | 'chinese' | 'taiwanese'
  quantity: number
  price: number
}

export interface SupplierOrder {
  id: string
  /** Number shown in the table ("#1"). */
  number: string
  /** Reference shown in the details panel ("#AX-10248"). */
  reference: string
  customer: { name: string; phone: string; address: string }
  date: string
  total: number
  status: SupplierOrderStatus
  items: SupplierOrderItem[]
}

/** The supplier can still cancel while the customer has not paid. */
export const cancellableStatuses: readonly SupplierOrderStatus[] = [
  'awaitingResponse',
  'awaitingPayment',
  'awaitingTransferConfirmation',
]

/** Customer contact details are revealed only once the order is paid (frame 879:14555). */
export const hiddenCustomerStatuses: readonly SupplierOrderStatus[] = [
  'awaitingResponse',
  'awaitingPayment',
  'awaitingTransferConfirmation',
  'cancelled',
]

const orderItems: SupplierOrderItem[] = [
  {
    id: 'i-1',
    title: partNames.isuzuFender,
    partNumber: '04465-0K240',
    origin: 'original',
    quantity: 3,
    price: 2000,
  },
  {
    id: 'i-2',
    title: partNames.isuzuFender,
    partNumber: '04465-0K240',
    origin: 'original',
    quantity: 3,
    price: 160,
  },
]

const customer = {
  name: 'فهد العتيبي',
  phone: '+966 5512345678',
  address: 'حي النرجس, الرياض, المملكة العربية السعودية',
}

/** Rows of the orders table, numbered as in the design (it skips #5 and repeats #7). */
const rows: Array<[string, SupplierOrderStatus]> = [
  ['1', 'awaitingResponse'],
  ['2', 'awaitingPayment'],
  ['3', 'awaitingTransferConfirmation'],
  ['4', 'paidReadyToShip'],
  ['6', 'inDeliveryPeriod'],
  ['7', 'inReturnPeriod'],
  ['7', 'returnRequested'],
  ['8', 'returned'],
  ['9', 'returnRejected'],
  ['10', 'cancelled'],
]

export const supplierOrders: SupplierOrder[] = rows.map(([number, status], index) => ({
  id: `so-${index + 1}`,
  number,
  reference: '#AX-10248',
  customer,
  date: '2026-11-15',
  total: 3000,
  status,
  items: orderItems,
}))

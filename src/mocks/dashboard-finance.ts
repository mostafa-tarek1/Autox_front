/**
 * Supplier dashboard — balance, transactions and invoices (Figma 799:8040, 879:14858).
 * Mock data for the UI phase; replaced by the supplier wallet/invoice endpoints later.
 */
export interface SupplierBalance {
  total: number
  withdrawable: number
  /** Held until the delivery and return window of the order has passed. */
  pending: number
}

export type SupplierTransactionType =
  'partsSale' | 'returns' | 'platformFee' | 'cardFee' | 'withdrawal'
export type SupplierTransactionStatus = 'pending' | 'deducted' | 'accepted'

export interface SupplierTransaction {
  id: string
  reference: string
  /** Positive = money in, negative = money out. */
  amount: number
  type: SupplierTransactionType
  date: string
  note: string | null
  status: SupplierTransactionStatus
}

export interface SupplierInvoice {
  id: string
  orderNumber: string
  amount: number
  customer: string
  date: string
}

export type FinanceSort = 'newest' | 'oldest' | 'amountDesc' | 'amountAsc'

export const supplierBalance: SupplierBalance = {
  total: 300,
  withdrawable: 250,
  pending: 50,
}

function transaction(
  index: number,
  amount: number,
  type: SupplierTransactionType,
  status: SupplierTransactionStatus,
): SupplierTransaction {
  return {
    id: `txn-${index}`,
    reference: '#1',
    amount,
    type,
    date: '2026-11-15',
    note: null,
    status,
  }
}

/** Rows in the order of the design. */
export const supplierTransactions: SupplierTransaction[] = [
  transaction(1, 3000, 'partsSale', 'pending'),
  transaction(2, -3000, 'returns', 'deducted'),
  transaction(3, 3000, 'partsSale', 'accepted'),
  transaction(4, -10, 'platformFee', 'deducted'),
  transaction(5, -30, 'cardFee', 'deducted'),
  ...Array.from({ length: 5 }, (_, index) => transaction(index + 6, 3000, 'partsSale', 'accepted')),
]

export const supplierInvoices: SupplierInvoice[] = Array.from({ length: 10 }, (_, index) => ({
  id: `inv-${index + 1}`,
  orderNumber: `#${index + 1}`,
  amount: 3000,
  customer: 'فهد العتيبي',
  date: '2026-11-15',
}))

/** "2026-11-15" → "15/11/2026", as shown in the tables. */
export function formatFinanceDate(iso: string): string {
  const [year, month, day] = iso.split('-')
  return `${day}/${month}/${year}`
}

/** Sort helper shared by the balance and invoices tables (stable; dates are ISO strings). */
export function sortFinanceRows<T extends { date: string; amount: number }>(
  rows: T[],
  sort: FinanceSort | null,
): T[] {
  if (!sort) {
    return rows
  }
  const sorted = [...rows]
  const compare: Record<FinanceSort, (a: T, b: T) => number> = {
    newest: (a, b) => b.date.localeCompare(a.date),
    oldest: (a, b) => a.date.localeCompare(b.date),
    amountDesc: (a, b) => b.amount - a.amount,
    amountAsc: (a, b) => a.amount - b.amount,
  }
  return sorted.sort(compare[sort])
}

/**
 * Local mock data for payments and installment vouchers (UI phase only).
 */
import tabbyLogo from '@/assets/images/billing/tabby.webp'
import tamaraLogo from '@/assets/images/billing/tamara.webp'

export type PaymentStatus = 'pending' | 'paid' | 'failed'
export type PaymentMethod = 'bankTransfer' | 'card'

export interface Payment {
  id: string
  orderNumber: string
  status: PaymentStatus
  amount: number
  method: PaymentMethod
  date: string
}

export interface PaymentSummary {
  unpaidInvoices: number
  totalInvoices: number
  pendingAmount: number
  totalPaid: number
}

export type InstallmentStatus = 'paid' | 'processing' | 'rejected'
export type InstallmentProvider = 'tabby' | 'tamara'

export interface InstallmentRequest {
  id: string
  orderNumber: string
  customerName: string
  phone: string
  amount: number
  date: string
  note: string | null
  status: InstallmentStatus
  provider: InstallmentProvider
}

export const providerLogos: Record<InstallmentProvider, string> = {
  tabby: tabbyLogo,
  tamara: tamaraLogo,
}

export const paymentSummary: PaymentSummary = {
  unpaidInvoices: 3,
  totalInvoices: 18,
  pendingAmount: 8200,
  totalPaid: 200000,
}

export const payments: Payment[] = [
  {
    id: 'pay-1',
    orderNumber: 'AX-10248',
    status: 'pending',
    amount: 200000,
    method: 'bankTransfer',
    date: '2027-10-15',
  },
  {
    id: 'pay-2',
    orderNumber: 'AX-10248',
    status: 'paid',
    amount: 200000,
    method: 'card',
    date: '2027-10-15',
  },
  {
    id: 'pay-3',
    orderNumber: 'AX-10248',
    status: 'paid',
    amount: 200000,
    method: 'card',
    date: '2027-10-15',
  },
  {
    id: 'pay-4',
    orderNumber: 'AX-10248',
    status: 'failed',
    amount: 200000,
    method: 'card',
    date: '2027-10-15',
  },
  {
    id: 'pay-5',
    orderNumber: 'AX-10248',
    status: 'paid',
    amount: 200000,
    method: 'card',
    date: '2027-10-15',
  },
  {
    id: 'pay-6',
    orderNumber: 'AX-10248',
    status: 'paid',
    amount: 200000,
    method: 'card',
    date: '2027-10-15',
  },
]

export const installmentSummary = { totalSales: 100000, currentBalance: 200000 }

/** Row order as in the Figma table (490:8428). */
const requestStatuses: InstallmentStatus[] = [
  'paid',
  'processing',
  'rejected',
  'paid',
  'paid',
  'paid',
  'rejected',
  'paid',
  'rejected',
  'paid',
]

export const installmentRequests: InstallmentRequest[] = Array.from({ length: 10 }, (_, index) => ({
  id: `inst-${index + 1}`,
  orderNumber: '12345',
  customerName: 'احمد السيد',
  phone: '055123456789',
  amount: 2000,
  date: '2026-10-05',
  note: null,
  status: requestStatuses[index] ?? 'paid',
  provider: index === 1 || index === 4 ? 'tamara' : 'tabby',
}))

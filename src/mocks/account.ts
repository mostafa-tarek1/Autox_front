/**
 * Local mock data for the account and wallet screens (UI phase only).
 * Replaced by API calls once the backend endpoints are wired.
 */
export interface AccountProfile {
  name: string
  phone: string
  email: string
  isVerified: boolean
}

export type CompanyDocumentKind = 'commercialRegister' | 'taxRegister' | 'nationalAddress'

export interface CompanyDocument {
  kind: CompanyDocumentKind
  url: string
}

export interface CompanyInfo {
  name: string
  unifiedNumber: string
  commercialRegister: string
  taxNumber: string
  nationalAddress: string
  documents: CompanyDocument[]
}

export interface ShippingAddress {
  id: string
  label: string
  address: string
}

export type WalletOperation = 'withdraw' | 'payment' | 'deposit'
export type WalletStatus = 'accepted' | 'rejected' | 'pending'

export interface WalletTransaction {
  id: string
  reference: string
  operation: WalletOperation
  amount: number
  /** ISO date (yyyy-mm-dd). */
  date: string
  note: string | null
  status: WalletStatus
}

export const accountProfile: AccountProfile = {
  name: 'فهد العتيبي',
  phone: '05512345678',
  email: 'username@gmail.com',
  isVerified: true,
}

export const companyInfo: CompanyInfo = {
  name: 'مؤسسة التقوي لقطع الغيار',
  unifiedNumber: '123456789',
  commercialRegister: '1010123456',
  taxNumber: '123456789',
  nationalAddress: 'الرياض, السعودية',
  documents: [
    { kind: 'commercialRegister', url: '#' },
    { kind: 'taxRegister', url: '#' },
    { kind: 'nationalAddress', url: '#' },
  ],
}

export const shippingAddresses: ShippingAddress[] = [
  { id: 'address-1', label: 'العنوان 1', address: 'حي النرجس, الرياض, المملكة العربية السعودية' },
  { id: 'address-2', label: 'العنوان 1', address: 'حي النرجس, الرياض, المملكة العربية السعودية' },
]

export const walletBalance = 200_000

function transaction(
  index: number,
  operation: WalletOperation,
  note: string | null,
  status: WalletStatus = 'accepted',
): WalletTransaction {
  return {
    id: `trx-${index}`,
    reference: '#12345',
    operation,
    amount: 2000,
    date: '2026-10-05',
    note,
    status,
  }
}

export const walletTransactions: WalletTransaction[] = [
  transaction(1, 'withdraw', 'سحب من المحفظة'),
  transaction(2, 'payment', 'دفع في عملية شراء'),
  transaction(3, 'deposit', 'ايداع مبلغ من العميل'),
  transaction(4, 'payment', 'دفع في عملية شراء', 'rejected'),
  transaction(5, 'payment', 'دفع في عملية شراء'),
  transaction(6, 'payment', 'دفع في عملية شراء'),
  transaction(7, 'withdraw', null),
  transaction(8, 'withdraw', null),
  transaction(9, 'withdraw', null),
  transaction(10, 'withdraw', null, 'rejected'),
]

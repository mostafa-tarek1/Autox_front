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
  isDefault: boolean
}

export interface BankAccount {
  id: string
  bankId: string
  beneficiary: string
  /** IBAN without spaces, e.g. SA0380000000608010167519. */
  iban: string
  isDefault: boolean
}

/** Saudi banks offered in the bank account and withdrawal forms. */
export const saudiBanks: Array<{ id: string; name: string }> = [
  { id: 'alrajhi', name: 'مصرف الراجحي' },
  { id: 'snb', name: 'البنك الأهلي السعودي' },
  { id: 'riyad', name: 'بنك الرياض' },
  { id: 'sab', name: 'البنك السعودي الأول' },
  { id: 'alinma', name: 'مصرف الإنماء' },
  { id: 'albilad', name: 'بنك البلاد' },
  { id: 'aljazira', name: 'بنك الجزيرة' },
  { id: 'anb', name: 'البنك العربي الوطني' },
]

export type WalletOperation =
  'walletWithdrawal' | 'returnRefund' | 'cardFee' | 'deposit' | 'purchase' | 'withdrawal'
export type WalletStatus = 'accepted' | 'rejected' | 'pending'

export interface WalletTransaction {
  id: string
  reference: string
  operation: WalletOperation
  /** Signed: positive credits the wallet, negative debits it. */
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
  {
    id: 'address-1',
    label: 'العنوان 1',
    address: 'حي النرجس, الرياض, المملكة العربية السعودية',
    isDefault: true,
  },
  {
    id: 'address-2',
    label: 'العنوان 1',
    address: 'حي النرجس, الرياض, المملكة العربية السعودية',
    isDefault: false,
  },
]

export const bankAccounts: BankAccount[] = [
  {
    id: 'bank-1',
    bankId: 'alrajhi',
    beneficiary: 'اسم الشركة',
    iban: 'SA0000000000000000000000',
    isDefault: true,
  },
  {
    id: 'bank-2',
    bankId: 'alrajhi',
    beneficiary: 'اسم الشركة',
    iban: 'SA0000000000000000000000',
    isDefault: false,
  },
]

/** Wallet balances (Figma "المحفظة"): pending money is under review for a withdrawal request. */
export const walletBalances = {
  total: 200_000,
  pending: 200_000,
  withdrawable: 200_000,
}

function transaction(
  index: number,
  operation: WalletOperation,
  amount: number,
  note: string | null,
  status: WalletStatus = 'accepted',
): WalletTransaction {
  return {
    id: `trx-${index}`,
    reference: '#12345',
    operation,
    amount,
    date: '2026-10-05',
    note,
    status,
  }
}

export const walletTransactions: WalletTransaction[] = [
  transaction(1, 'walletWithdrawal', -2000, 'سحب من المحفظة'),
  transaction(2, 'returnRefund', 2000, 'دفع في عملية شراء'),
  transaction(3, 'returnRefund', 2000, 'ايداع مبلغ من العميل'),
  transaction(4, 'cardFee', -20, 'دفع في عملية شراء'),
  transaction(5, 'returnRefund', 2000, 'تم قبول ارجاع المنتج'),
  transaction(6, 'deposit', 2000, 'دفع في عملية شراء'),
  transaction(7, 'purchase', -20, null),
  transaction(8, 'returnRefund', 2000, null),
  transaction(9, 'walletWithdrawal', -2000, null),
  transaction(10, 'withdrawal', 2000, null, 'rejected'),
]

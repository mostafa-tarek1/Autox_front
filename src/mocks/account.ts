/**
 * Local mock data for the account and wallet screens (UI phase only).
 * Replaced by API calls once the backend endpoints are wired.
 */
import type { LocalizedText } from '@/composables/useLocalizedText'
import { bankNames, companyNamePlaceholder, type BankId } from '@/mocks/names'

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
  beneficiary: LocalizedText
  /** IBAN without spaces, e.g. SA0380000000608010167519. */
  iban: string
  isDefault: boolean
}

/** Saudi banks offered in the bank account and withdrawal forms. */
export const saudiBanks: Array<{ id: BankId; name: LocalizedText }> = [
  { id: 'alrajhi', name: bankNames.alrajhi },
  { id: 'snb', name: bankNames.snb },
  { id: 'riyad', name: bankNames.riyad },
  { id: 'sab', name: bankNames.sab },
  { id: 'alinma', name: bankNames.alinma },
  { id: 'albilad', name: bankNames.albilad },
  { id: 'aljazira', name: bankNames.aljazira },
  { id: 'anb', name: bankNames.anb },
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
  note: LocalizedText | null
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
    beneficiary: companyNamePlaceholder,
    iban: 'SA0000000000000000000000',
    isDefault: true,
  },
  {
    id: 'bank-2',
    bankId: 'alrajhi',
    beneficiary: companyNamePlaceholder,
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

/** System notes on wallet transactions, in every locale. */
const walletNotes = {
  withdrawal: { ar: 'سحب من المحفظة', en: 'Wallet withdrawal', ur: 'والیٹ سے رقم نکلوائی گئی' },
  purchase: { ar: 'دفع في عملية شراء', en: 'Purchase payment', ur: 'خریداری کی ادائیگی' },
  customerDeposit: {
    ar: 'ايداع مبلغ من العميل',
    en: 'Deposit from customer',
    ur: 'کسٹمر کی جانب سے رقم جمع',
  },
  returnAccepted: {
    ar: 'تم قبول ارجاع المنتج',
    en: 'Product return accepted',
    ur: 'پروڈکٹ کی واپسی منظور ہو گئی',
  },
} satisfies Record<string, LocalizedText>

function transaction(
  index: number,
  operation: WalletOperation,
  amount: number,
  note: LocalizedText | null,
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
  transaction(1, 'walletWithdrawal', -2000, walletNotes.withdrawal),
  transaction(2, 'returnRefund', 2000, walletNotes.purchase),
  transaction(3, 'returnRefund', 2000, walletNotes.customerDeposit),
  transaction(4, 'cardFee', -20, walletNotes.purchase),
  transaction(5, 'returnRefund', 2000, walletNotes.returnAccepted),
  transaction(6, 'deposit', 2000, walletNotes.purchase),
  transaction(7, 'purchase', -20, null),
  transaction(8, 'returnRefund', 2000, null),
  transaction(9, 'walletWithdrawal', -2000, null),
  transaction(10, 'withdrawal', 2000, null, 'rejected'),
]

import { reactive } from 'vue'

import {
  accountProfile,
  bankAccounts,
  companyInfo,
  shippingAddresses,
  walletBalances,
  type AccountProfile,
  type BankAccount,
  type CompanyInfo,
  type ShippingAddress,
} from '@/mocks/account'

interface AccountState {
  profile: AccountProfile
  company: CompanyInfo
  addresses: ShippingAddress[]
  bankAccounts: BankAccount[]
  wallet: typeof walletBalances
}

export type BankAccountValues = Pick<BankAccount, 'bankId' | 'beneficiary' | 'iban'>

/**
 * In-memory account state shared by the account pages during the UI phase. Swap for API-backed
 * store actions when the backend is wired; the components only rely on this shape.
 */
const state = reactive<AccountState>({
  profile: structuredClone(accountProfile),
  company: structuredClone(companyInfo),
  addresses: structuredClone(shippingAddresses),
  bankAccounts: structuredClone(bankAccounts),
  wallet: { ...walletBalances },
})

let nextAddressId = state.addresses.length + 1
let nextBankAccountId = state.bankAccounts.length + 1

/** Exactly one item of a list is the default; the first one added becomes it. */
function markDefault<T extends { id: string; isDefault: boolean }>(items: T[], id: string): void {
  for (const item of items) {
    item.isDefault = item.id === id
  }
}

export function useAccountState() {
  function updateProfile(changes: Partial<AccountProfile>): void {
    Object.assign(state.profile, changes)
  }

  function updateCompany(changes: Partial<CompanyInfo>): void {
    Object.assign(state.company, changes)
  }

  function saveAddress(values: Pick<ShippingAddress, 'label' | 'address'>, id?: string): void {
    const existing = id ? state.addresses.find((address) => address.id === id) : undefined
    if (existing) {
      Object.assign(existing, values)
      return
    }
    state.addresses.push({
      id: `address-${nextAddressId++}`,
      ...values,
      isDefault: state.addresses.length === 0,
    })
  }

  function setDefaultAddress(id: string): void {
    markDefault(state.addresses, id)
  }

  function saveBankAccount(values: BankAccountValues, id?: string): void {
    const existing = id ? state.bankAccounts.find((account) => account.id === id) : undefined
    if (existing) {
      Object.assign(existing, values)
      return
    }
    state.bankAccounts.push({
      id: `bank-${nextBankAccountId++}`,
      ...values,
      isDefault: state.bankAccounts.length === 0,
    })
  }

  function removeBankAccount(id: string): void {
    const removed = state.bankAccounts.find((account) => account.id === id)
    state.bankAccounts = state.bankAccounts.filter((account) => account.id !== id)
    const first = state.bankAccounts[0]
    if (removed?.isDefault && first) {
      first.isDefault = true
    }
  }

  function setDefaultBankAccount(id: string): void {
    markDefault(state.bankAccounts, id)
  }

  return {
    state,
    updateProfile,
    updateCompany,
    saveAddress,
    setDefaultAddress,
    saveBankAccount,
    removeBankAccount,
    setDefaultBankAccount,
  }
}

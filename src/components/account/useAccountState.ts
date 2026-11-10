import { reactive } from 'vue'

import {
  accountProfile,
  companyInfo,
  shippingAddresses,
  walletBalance,
  type AccountProfile,
  type CompanyInfo,
  type ShippingAddress,
} from '@/mocks/account'

interface AccountState {
  profile: AccountProfile
  company: CompanyInfo
  addresses: ShippingAddress[]
  walletBalance: number
}

/**
 * In-memory account state shared by the account pages during the UI phase. Swap for API-backed
 * store actions when the backend is wired; the components only rely on this shape.
 */
const state = reactive<AccountState>({
  profile: structuredClone(accountProfile),
  company: structuredClone(companyInfo),
  addresses: structuredClone(shippingAddresses),
  walletBalance,
})

let nextAddressId = state.addresses.length + 1

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
    state.addresses.push({ id: `address-${nextAddressId++}`, ...values })
  }

  return { state, updateProfile, updateCompany, saveAddress }
}

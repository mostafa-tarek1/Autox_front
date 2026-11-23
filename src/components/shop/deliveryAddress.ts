import type { DeliveryAddress } from './types'

export type DeliveryAddressErrors = Partial<
  Record<keyof DeliveryAddress, 'required' | 'invalidPhone'>
>

/** Saudi mobile without the leading zero: 9 digits starting with 5 (the +966 prefix is shown). */
const SAUDI_MOBILE = /^5\d{8}$/

/** The design marks the city as required; name and mobile are needed to deliver at all. */
export function validateDeliveryAddress(address: DeliveryAddress): DeliveryAddressErrors {
  const errors: DeliveryAddressErrors = {}
  if (!address.fullName.trim()) {
    errors.fullName = 'required'
  }
  if (!address.phone) {
    errors.phone = 'required'
  } else if (!SAUDI_MOBILE.test(address.phone)) {
    errors.phone = 'invalidPhone'
  }
  if (!address.city) {
    errors.city = 'required'
  }
  return errors
}

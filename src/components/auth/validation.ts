/** Saudi mobile numbers without the +966 prefix: 9 digits starting with 5. */
export function isValidSaudiMobile(value: string): boolean {
  return /^5\d{8}$/.test(value)
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
}

/** Saudi unified number (الرقم الموحد): 10 digits starting with 7. */
export function isValidUnifiedNumber(value: string): boolean {
  return /^7\d{9}$/.test(value.trim())
}

/**
 * Field validators for the account forms. Each returns an i18n key (with optional params)
 * describing the problem, or `null` when the value is valid.
 */
export interface ValidationError {
  key: string
  params?: Record<string, number>
}

export type Validator = (value: string) => ValidationError | null

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const required: Validator = (value) =>
  value.trim() ? null : { key: 'account.validation.required' }

export function minLength(min: number): Validator {
  return (value) =>
    value.trim().length >= min ? null : { key: 'account.validation.minLength', params: { min } }
}

/** Saudi mobile: 05 followed by 8 digits (spaces allowed while typing). */
export const saudiMobile: Validator = (value) =>
  /^05\d{8}$/.test(value.replace(/\s/g, '')) ? null : { key: 'account.validation.phone' }

export const email: Validator = (value) =>
  EMAIL_PATTERN.test(value.trim()) ? null : { key: 'account.validation.email' }

export function digits(length: number): Validator {
  return (value) =>
    new RegExp(`^\\d{${length}}$`).test(value.trim())
      ? null
      : { key: 'account.validation.digits', params: { length } }
}

/** Saudi VAT registration number: 15 digits, starts and ends with 3. */
export const vatNumber: Validator = (value) =>
  /^3\d{13}3$/.test(value.trim()) ? null : { key: 'account.validation.taxNumber' }

/** Saudi unified (700) number: 10 digits starting with 7. */
export const unifiedNumber: Validator = (value) =>
  /^7\d{9}$/.test(value.trim()) ? null : { key: 'account.validation.unifiedNumber' }

/** Runs validators in order and returns the first failure. */
export function validate(value: string, validators: Validator[]): ValidationError | null {
  for (const validator of validators) {
    const error = validator(value)
    if (error) {
      return error
    }
  }
  return null
}

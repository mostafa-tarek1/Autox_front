import { describe, expect, it } from 'vitest'

import {
  digits,
  email,
  minLength,
  required,
  saudiMobile,
  unifiedNumber,
  validate,
  vatNumber,
} from '../validators'

describe('account validators', () => {
  it('requires a non-blank value', () => {
    expect(required('  ')).toEqual({ key: 'account.validation.required' })
    expect(required('فهد')).toBeNull()
  })

  it('accepts Saudi mobile numbers with spaces and rejects other formats', () => {
    expect(saudiMobile('055 123 4567')).toBeNull()
    expect(saudiMobile('0551234567')).toBeNull()
    expect(saudiMobile('551234567')).not.toBeNull()
    expect(saudiMobile('0451234567')).not.toBeNull()
  })

  it('validates email, digits, VAT and unified numbers', () => {
    expect(email('username@gmail.com')).toBeNull()
    expect(email('username@gmail')).not.toBeNull()
    expect(digits(10)('1010123456')).toBeNull()
    expect(digits(10)('101012345')).toEqual({
      key: 'account.validation.digits',
      params: { length: 10 },
    })
    expect(vatNumber('300123456700003')).toBeNull()
    expect(vatNumber('100123456700003')).not.toBeNull()
    expect(unifiedNumber('7001234567')).toBeNull()
    expect(unifiedNumber('6001234567')).not.toBeNull()
  })

  it('returns the first failing rule', () => {
    expect(validate('', [required, minLength(3)])).toEqual({ key: 'account.validation.required' })
    expect(validate('ab', [required, minLength(3)])).toEqual({
      key: 'account.validation.minLength',
      params: { min: 3 },
    })
  })
})

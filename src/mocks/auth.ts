/**
 * Mock auth service for the UI phase. Each call simulates network latency; replace the bodies
 * with API calls once the backend endpoints are wired.
 */

export type AuthFlow = 'login' | 'register'

export interface RegistrationPayload {
  fullName: string
  phone: string
  email: string
  companyName: string
  unifiedNumber: string
  cityId: string
  documents: {
    commercialRegister: File
    /** Optional: the design asks for it only "if available". */
    taxRegister: File | null
    nationalAddress: File
  }
}

export interface City {
  id: string
  name: string
}

/** Mock cities list (the backend exposes a cities endpoint). */
export const cities: City[] = [
  { id: 'riyadh', name: 'الرياض' },
  { id: 'jeddah', name: 'جدة' },
  { id: 'makkah', name: 'مكة المكرمة' },
  { id: 'madinah', name: 'المدينة المنورة' },
  { id: 'dammam', name: 'الدمام' },
  { id: 'khobar', name: 'الخبر' },
  { id: 'qassim', name: 'القصيم' },
  { id: 'abha', name: 'أبها' },
  { id: 'tabuk', name: 'تبوك' },
  { id: 'hail', name: 'حائل' },
]

/** Code the mock rejects, so the error state can be previewed. */
export const MOCK_INVALID_OTP = '0000'

const LATENCY_MS = 700

function delay(ms = LATENCY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function requestLoginOtp(phone: string): Promise<{ phone: string }> {
  await delay()
  return { phone }
}

export async function registerTrader(payload: RegistrationPayload): Promise<{ phone: string }> {
  await delay()
  return { phone: payload.phone }
}

export async function verifyOtp(_phone: string, code: string): Promise<{ valid: boolean }> {
  await delay()
  return { valid: code !== MOCK_INVALID_OTP }
}

/**
 * Mock auth service for the UI phase. Each call simulates network latency; replace the bodies
 * with API calls once the backend endpoints are wired.
 */
import type { LocalizedText } from '@/composables/useLocalizedText'
import { cityNames, type CityId } from '@/mocks/names'

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
  id: CityId
  name: LocalizedText
}

/** Mock cities list (the backend exposes a cities endpoint). */
export const cities: City[] = [
  { id: 'riyadh', name: cityNames.riyadh },
  { id: 'jeddah', name: cityNames.jeddah },
  { id: 'makkah', name: cityNames.makkah },
  { id: 'madinah', name: cityNames.madinah },
  { id: 'dammam', name: cityNames.dammam },
  { id: 'khobar', name: cityNames.khobar },
  { id: 'qassim', name: cityNames.qassim },
  { id: 'abha', name: cityNames.abha },
  { id: 'tabuk', name: cityNames.tabuk },
  { id: 'hail', name: cityNames.hail },
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

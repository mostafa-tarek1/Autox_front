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
  documents: {
    commercialRegister: File
    taxRegister: File
    nationalAddress: File
  }
}

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

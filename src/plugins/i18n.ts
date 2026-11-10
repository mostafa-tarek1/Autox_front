import { createI18n } from 'vue-i18n'

import ar from '@/locales/ar.json'
import en from '@/locales/en.json'

export type MessageSchema = typeof ar
export type AppLocale = 'ar' | 'en'

export const SUPPORTED_LOCALES: readonly AppLocale[] = ['ar', 'en']
export const DEFAULT_LOCALE: AppLocale = 'ar'
export const LOCALE_STORAGE_KEY = 'autox.locale'

const RTL_LOCALES: readonly AppLocale[] = ['ar']

export function isSupportedLocale(value: unknown): value is AppLocale {
  return typeof value === 'string' && SUPPORTED_LOCALES.includes(value as AppLocale)
}

export function directionFor(locale: AppLocale): 'rtl' | 'ltr' {
  return RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr'
}

function readStoredLocale(): AppLocale {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
    return isSupportedLocale(stored) ? stored : DEFAULT_LOCALE
  } catch {
    return DEFAULT_LOCALE
  }
}

export const i18n = createI18n<[MessageSchema], AppLocale>({
  legacy: false,
  locale: readStoredLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages: { ar, en },
})

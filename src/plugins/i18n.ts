import { createI18n } from 'vue-i18n'

import arCommon from '@/locales/ar/common.json'

export type MessageSchema = typeof arCommon
export type AppLocale = 'ar' | 'en'

export const SUPPORTED_LOCALES: readonly AppLocale[] = ['ar', 'en']
export const DEFAULT_LOCALE: AppLocale = 'ar'
export const LOCALE_STORAGE_KEY = 'autox.locale'

const RTL_LOCALES: readonly AppLocale[] = ['ar']

/**
 * Messages are split per feature (locales/<locale>/<feature>.json) so screens can be built in
 * parallel without editing one shared file. Every file of a locale is merged at build time.
 */
const files = import.meta.glob<Record<string, unknown>>('@/locales/*/*.json', {
  eager: true,
  import: 'default',
})

type Messages = Record<string, unknown>

function isPlainObject(value: unknown): value is Messages {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** Deep merge so two feature files can both add keys under e.g. `pageTitles`. */
function mergeInto(target: Messages, source: Messages): void {
  for (const [key, value] of Object.entries(source)) {
    const existing = target[key]
    if (isPlainObject(existing) && isPlainObject(value)) {
      mergeInto(existing, value)
    } else {
      target[key] = isPlainObject(value) ? structuredClone(value) : value
    }
  }
}

function loadMessages(): Record<AppLocale, Record<string, unknown>> {
  const messages: Record<AppLocale, Record<string, unknown>> = { ar: {}, en: {} }
  for (const [path, content] of Object.entries(files)) {
    const locale = path.split('/').at(-2) as AppLocale
    if (messages[locale]) {
      mergeInto(messages[locale], content)
    }
  }
  return messages
}

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

export const i18n = createI18n({
  legacy: false,
  locale: readStoredLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages: loadMessages() as Record<AppLocale, MessageSchema>,
})

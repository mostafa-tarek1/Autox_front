import { useI18n } from 'vue-i18n'

import type { AppLocale } from '@/plugins/i18n'

/**
 * A name that comes with the data rather than from the locale files (car brand, supplier).
 * It is either one string shown as is, or one string per locale with Arabic always present.
 */
export type LocalizedText = string | ({ ar: string } & Partial<Record<AppLocale, string>>)

/** Locale-independent key for a localized name, for grouping and `v-for` keys. */
export function localizedKey(text: LocalizedText): string {
  return typeof text === 'string' ? text : text.ar
}

/** Returns a resolver that shows a localized name in the current locale, falling back to Arabic. */
export function useLocalizedText(): (text: LocalizedText) => string {
  const { locale } = useI18n<unknown, AppLocale>()
  return (text) => (typeof text === 'string' ? text : (text[locale.value] ?? text.ar))
}

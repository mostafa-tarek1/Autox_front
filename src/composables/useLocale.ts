import { useHead } from '#imports'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { directionFor, LOCALE_STORAGE_KEY, type AppLocale } from '@/plugins/i18n'

/**
 * Current locale plus its text direction. Keeps <html lang/dir> in sync so
 * Tailwind's rtl:/ltr: variants and logical utilities (ps-, me-, start-) work.
 */
export function useLocale() {
  const { locale } = useI18n<unknown, AppLocale>()

  const direction = computed(() => directionFor(locale.value))
  const isRtl = computed(() => direction.value === 'rtl')

  function setLocale(next: AppLocale): void {
    locale.value = next
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next)
    } catch {
      // Storage can be unavailable (private mode); the choice simply won't persist.
    }
  }

  return { locale, direction, isRtl, setLocale }
}

/**
 * Call once from the root component: keeps <html lang/dir> on the current locale through the head
 * manager, so pre-rendered pages ship with them and the client updates them on a switch.
 */
export function useDocumentLocale(): void {
  const { locale, direction } = useLocale()

  useHead({ htmlAttrs: { lang: locale, dir: direction } })
}

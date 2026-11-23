/**
 * Car brand and supplier names in every locale, standing in for the localized names the API will
 * return. Shared by the catalog, cart, orders, quotes and dashboard mocks.
 */
import type { LocalizedText } from '@/composables/useLocalizedText'

export type BrandId =
  | 'hyundai'
  | 'mercedes'
  | 'toyota'
  | 'kia'
  | 'bmw'
  | 'nissan'
  | 'isuzu'
  | 'ford'
  | 'opel'

export const brandNames: Record<BrandId, Exclude<LocalizedText, string>> = {
  hyundai: { ar: 'هيونداي', en: 'Hyundai', ur: 'ہنڈائی' },
  mercedes: { ar: 'مرسيدس', en: 'Mercedes', ur: 'مرسڈیز' },
  toyota: { ar: 'تويوتا', en: 'Toyota', ur: 'ٹویوٹا' },
  kia: { ar: 'كيا', en: 'Kia', ur: 'کِیا' },
  bmw: { ar: 'بي ام دبليو', en: 'BMW', ur: 'بی ایم ڈبلیو' },
  nissan: { ar: 'نيسان', en: 'Nissan', ur: 'نسان' },
  isuzu: { ar: 'ايسوزو', en: 'Isuzu', ur: 'اسوزو' },
  ford: { ar: 'فورد', en: 'Ford', ur: 'فورڈ' },
  opel: { ar: 'اوبل', en: 'Opel', ur: 'اوپل' },
}

/** Placeholder supplier name of the design ("الشركة رقم 1"). */
export function supplierName(number: number): Exclude<LocalizedText, string> {
  return { ar: `الشركة رقم ${number}`, en: `Company ${number}`, ur: `کمپنی نمبر ${number}` }
}

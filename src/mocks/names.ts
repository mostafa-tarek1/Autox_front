/**
 * Names that come with the data (car brands, suppliers, parts, cities, banks) in every locale,
 * standing in for the localized names the API will return. Shared by all the mocks.
 */
import type { LocalizedText } from '@/composables/useLocalizedText'

export type BrandId =
  'hyundai' | 'mercedes' | 'toyota' | 'kia' | 'bmw' | 'nissan' | 'isuzu' | 'ford' | 'opel'

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

/** Part names used across the mock catalog, cart, orders and dashboard screens. */
export const partNames = {
  isuzuFender: {
    ar: 'رفرف ونيت ايسوزو19/23أصلي',
    en: 'Isuzu pickup fender 19/23, original',
    ur: 'اسوزو پک اپ فینڈر 19/23، اوریجنل',
  },
  isuzuPiston: {
    ar: 'بنز بستم ايسوزو اصلي',
    en: 'Isuzu petrol piston, original',
    ur: 'اسوزو پیٹرول پسٹن، اوریجنل',
  },
  elantraControlArm: {
    ar: 'مقص امامي يسار النترا 2020',
    en: 'Front left control arm, Elantra 2020',
    ur: 'ایلانٹرا 2020 اگلا بایاں کنٹرول آرم',
  },
} satisfies Record<string, Exclude<LocalizedText, string>>

export type CityId =
  | 'riyadh'
  | 'jeddah'
  | 'makkah'
  | 'madinah'
  | 'dammam'
  | 'khobar'
  | 'qassim'
  | 'abha'
  | 'tabuk'
  | 'hail'

export const cityNames: Record<CityId, Exclude<LocalizedText, string>> = {
  riyadh: { ar: 'الرياض', en: 'Riyadh', ur: 'ریاض' },
  jeddah: { ar: 'جدة', en: 'Jeddah', ur: 'جدہ' },
  makkah: { ar: 'مكة المكرمة', en: 'Makkah', ur: 'مکہ مکرمہ' },
  madinah: { ar: 'المدينة المنورة', en: 'Madinah', ur: 'مدینہ منورہ' },
  dammam: { ar: 'الدمام', en: 'Dammam', ur: 'دمام' },
  khobar: { ar: 'الخبر', en: 'Al Khobar', ur: 'الخبر' },
  qassim: { ar: 'القصيم', en: 'Qassim', ur: 'القصیم' },
  abha: { ar: 'أبها', en: 'Abha', ur: 'ابہا' },
  tabuk: { ar: 'تبوك', en: 'Tabuk', ur: 'تبوک' },
  hail: { ar: 'حائل', en: 'Hail', ur: 'حائل' },
}

export type BankId = 'alrajhi' | 'snb' | 'riyad' | 'sab' | 'alinma' | 'albilad' | 'aljazira' | 'anb'

export const bankNames: Record<BankId, Exclude<LocalizedText, string>> = {
  alrajhi: { ar: 'مصرف الراجحي', en: 'Al Rajhi Bank', ur: 'الراجحی بینک' },
  snb: { ar: 'البنك الأهلي السعودي', en: 'Saudi National Bank', ur: 'سعودی نیشنل بینک' },
  riyad: { ar: 'بنك الرياض', en: 'Riyad Bank', ur: 'ریاض بینک' },
  sab: { ar: 'البنك السعودي الأول', en: 'Saudi Awwal Bank', ur: 'سعودی اوّل بینک' },
  alinma: { ar: 'مصرف الإنماء', en: 'Alinma Bank', ur: 'الانماء بینک' },
  albilad: { ar: 'بنك البلاد', en: 'Bank Albilad', ur: 'بینک البلاد' },
  aljazira: { ar: 'بنك الجزيرة', en: 'Bank AlJazira', ur: 'بینک الجزیرہ' },
  anb: { ar: 'البنك العربي الوطني', en: 'Arab National Bank', ur: 'عرب نیشنل بینک' },
}

/** Placeholder beneficiary of the design's bank accounts ("اسم الشركة"). */
export const companyNamePlaceholder: Exclude<LocalizedText, string> = {
  ar: 'اسم الشركة',
  en: 'Company name',
  ur: 'کمپنی کا نام',
}

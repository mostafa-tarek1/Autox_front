/**
 * Supplier dashboard — spare parts (Figma "Products" section 976:9917). Mock data for the UI phase;
 * replaced by the supplier catalog API later.
 */
import type { PartOrigin } from '@/types/catalog'

export interface SupplierProduct {
  id: string
  partNumber: string
  name: string
  origin: PartOrigin
  brandId: string
  price: number
  /** Ids of other products offered as alternatives to this one. */
  alternativeIds: string[]
}

export interface CatalogEntry {
  id: string
  partNumber: string
  name: string
  origin: PartOrigin
}

export interface ExcelImportRow {
  partNumber: string
  name: string
  origin: PartOrigin
  price: number
}

const partName = 'رفرف ونيت ايسوزو19/23أصلي'
const partNumber = '04465-0K240'

export const supplierProducts: SupplierProduct[] = Array.from({ length: 10 }, (_, index) => ({
  id: `sp-${index + 1}`,
  partNumber,
  name: partName,
  origin: 'original',
  brandId: 'toyota',
  price: 100,
  alternativeIds: index === 0 ? ['sp-alt-1'] : [],
}))

/** Alternatives are products too; the design's example is a Chinese part. */
export const alternativeProducts: SupplierProduct[] = [
  {
    id: 'sp-alt-1',
    partNumber,
    name: partName,
    origin: 'chinese',
    brandId: 'toyota',
    price: 80,
    alternativeIds: [],
  },
]

export const catalogEntries: CatalogEntry[] = Array.from({ length: 7 }, (_, index) => ({
  id: `cat-${index + 1}`,
  partNumber,
  name: partName,
  origin: 'original',
}))

/** Rows read from an uploaded Excel file ("قمت بإضافة 200 قطعة"); one page of ten is shown. */
export const excelImportRows: ExcelImportRow[] = Array.from({ length: 200 }, () => ({
  partNumber,
  name: partName,
  origin: 'original',
  price: 100,
}))

export const productOrigins: PartOrigin[] = [
  'original',
  'korean',
  'japanese',
  'chinese',
  'taiwanese',
]

export const productBrands: Array<{ id: string; name: string }> = [
  { id: 'toyota', name: 'تويوتا' },
  { id: 'hyundai', name: 'هيونداي' },
  { id: 'kia', name: 'كيا' },
  { id: 'nissan', name: 'نيسان' },
  { id: 'isuzu', name: 'ايسوزو' },
  { id: 'mercedes', name: 'مرسيدس' },
  { id: 'bmw', name: 'بي ام دبليو' },
  { id: 'ford', name: 'فورد' },
]

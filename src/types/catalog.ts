import type { LocalizedText } from '@/composables/useLocalizedText'

/** Where a part comes from; drives the neutral chip on the product card. */
export type PartOrigin = 'original' | 'korean' | 'japanese' | 'chinese' | 'taiwanese'

/** Highlights the API will flag on a search result. */
export type ProductHighlight = 'cheapest' | 'matchesRequest'

export interface CarBrand {
  id: string
  name: LocalizedText
  logo: string
  /** First model year with parts available. */
  fromYear: number
  origins: Array<{ origin: PartOrigin; count: number }>
}

export interface Product {
  id: string
  title: LocalizedText
  partNumber: string
  supplier: LocalizedText
  brandLogo: string
  origin: PartOrigin
  price: number
  highlight?: ProductHighlight
  /** Other suppliers' parts that can replace this one (Figma "القطع البديلة"). */
  alternatives?: Product[]
}

export type SortOption = 'priceAsc' | 'mostRequested' | 'originalOnly'

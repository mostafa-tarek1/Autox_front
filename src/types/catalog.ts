/** Where a part comes from; drives the neutral chip on the product card. */
export type PartOrigin = 'original' | 'korean' | 'japanese' | 'chinese' | 'taiwanese'

/** Highlights the API will flag on a search result. */
export type ProductHighlight = 'cheapest' | 'matchesRequest'

export interface CarBrand {
  id: string
  name: string
  logo: string
  /** First model year with parts available. */
  fromYear: number
  origins: Array<{ origin: PartOrigin; count: number }>
}

export interface Product {
  id: string
  title: string
  partNumber: string
  supplier: string
  brandLogo: string
  origin: PartOrigin
  price: number
  highlight?: ProductHighlight
}

export type SortOption = 'priceAsc' | 'mostRequested' | 'originalOnly'

/**
 * Local mock data for the UI phase. Replaced by API calls once the backend endpoints are wired.
 */
import bmw from '@/assets/images/car-brands/bmw.webp'
import ford from '@/assets/images/car-brands/ford.webp'
import hyundai from '@/assets/images/car-brands/hyundai.webp'
import isuzu from '@/assets/images/car-brands/isuzu.webp'
import kia from '@/assets/images/car-brands/kia.webp'
import mercedes from '@/assets/images/car-brands/mercedes.webp'
import nissan from '@/assets/images/car-brands/nissan.webp'
import opel from '@/assets/images/car-brands/opel.webp'
import toyota from '@/assets/images/car-brands/toyota.webp'
import type { CarBrand, PartOrigin, Product } from '@/types/catalog'

const defaultOrigins: CarBrand['origins'] = [
  { origin: 'original', count: 300 },
  { origin: 'korean', count: 300 },
  { origin: 'japanese', count: 300 },
  { origin: 'chinese', count: 300 },
]

export const carBrands: CarBrand[] = [
  { id: 'hyundai', name: 'هيونداي', logo: hyundai, fromYear: 2000, origins: defaultOrigins },
  { id: 'mercedes', name: 'مرسيدس', logo: mercedes, fromYear: 2000, origins: defaultOrigins },
  { id: 'toyota', name: 'تويوتا', logo: toyota, fromYear: 2000, origins: defaultOrigins },
  { id: 'kia', name: 'كيا', logo: kia, fromYear: 2000, origins: defaultOrigins },
  { id: 'bmw', name: 'بي ام دبليو', logo: bmw, fromYear: 2000, origins: defaultOrigins },
  { id: 'nissan', name: 'نيسان', logo: nissan, fromYear: 2000, origins: defaultOrigins },
  { id: 'isuzu', name: 'ايسوزو', logo: isuzu, fromYear: 2000, origins: defaultOrigins },
  { id: 'ford', name: 'فورد', logo: ford, fromYear: 2000, origins: defaultOrigins },
  { id: 'opel', name: 'اوبل', logo: opel, fromYear: 2000, origins: defaultOrigins },
]

function product(
  index: number,
  origin: PartOrigin,
  price: number,
  highlight?: Product['highlight'],
): Product {
  return {
    id: `part-${index}`,
    title: 'رفرف ونيت ايسوزو19/23أصلي',
    partNumber: '04465-0K240',
    supplier: 'الشركة رقم 8',
    brandLogo: hyundai,
    origin,
    price,
    highlight,
  }
}

export const searchResults: Product[] = [
  product(1, 'korean', 160, 'cheapest'),
  product(2, 'original', 200, 'matchesRequest'),
  product(3, 'taiwanese', 200),
  ...Array.from({ length: 6 }, (_, index) => product(index + 4, 'original', 200)),
]

export const recentSearches: string[] = ['04465-0K240', '04465-0K240']

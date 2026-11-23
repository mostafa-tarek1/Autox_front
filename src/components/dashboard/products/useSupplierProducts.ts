import { computed, ref } from 'vue'

import {
  alternativeProducts,
  supplierProducts,
  type CatalogEntry,
  type ExcelImportRow,
  type SupplierProduct,
} from '@/mocks/dashboard-products'

/**
 * In-memory supplier catalog shared by the products screens (list, add, catalog picker, Excel review)
 * until the API exists. Module-level so every screen sees the same list.
 */
const products = ref<SupplierProduct[]>(structuredClone(supplierProducts))
const alternatives = ref<SupplierProduct[]>(structuredClone(alternativeProducts))
let sequence = 0

function nextId(prefix: string): string {
  sequence += 1
  return `${prefix}-${Date.now().toString(36)}-${sequence}`
}

export type ProductDraft = Omit<SupplierProduct, 'id' | 'alternativeIds'>

export function useSupplierProducts() {
  const all = computed(() => [...products.value, ...alternatives.value])

  function find(id: string): SupplierProduct | undefined {
    return all.value.find((product) => product.id === id)
  }

  function add(draft: ProductDraft): SupplierProduct {
    const product: SupplierProduct = { ...draft, id: nextId('sp'), alternativeIds: [] }
    products.value.unshift(product)
    return product
  }

  function update(id: string, draft: ProductDraft): void {
    const product = products.value.find((entry) => entry.id === id)
    if (product) {
      Object.assign(product, draft)
    }
  }

  function remove(id: string): void {
    products.value = products.value.filter((product) => product.id !== id)
  }

  function addFromCatalog(entries: Array<CatalogEntry & { price: number }>): void {
    for (const entry of entries) {
      add({
        partNumber: entry.partNumber,
        name: entry.name,
        origin: entry.origin,
        brandId: 'toyota',
        price: entry.price,
      })
    }
  }

  function addFromExcel(rows: ExcelImportRow[]): void {
    for (const row of rows) {
      add({ ...row, brandId: 'toyota' })
    }
  }

  function alternativesOf(id: string): SupplierProduct[] {
    const ids = find(id)?.alternativeIds ?? []
    return ids.map(find).filter((product): product is SupplierProduct => Boolean(product))
  }

  function addAlternative(id: string, draft: ProductDraft): void {
    const owner = products.value.find((product) => product.id === id)
    if (!owner) {
      return
    }
    const alternative: SupplierProduct = { ...draft, id: nextId('sp-alt'), alternativeIds: [] }
    alternatives.value.push(alternative)
    owner.alternativeIds.push(alternative.id)
  }

  return {
    products,
    find,
    add,
    update,
    remove,
    addFromCatalog,
    addFromExcel,
    alternativesOf,
    addAlternative,
  }
}

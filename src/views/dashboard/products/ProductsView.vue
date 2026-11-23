<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import SearchIcon from '@/assets/icons/search-01--stroke-standard.svg'
import AddProductsCard from '@/components/dashboard/products/AddProductsCard.vue'
import AlternativesDrawer from '@/components/dashboard/products/AlternativesDrawer.vue'
import ConfirmDeleteModal from '@/components/dashboard/products/ConfirmDeleteModal.vue'
import ExcelUploadModal from '@/components/dashboard/products/ExcelUploadModal.vue'
import ProductsSortSelect, {
  type ProductSort,
} from '@/components/dashboard/products/ProductsSortSelect.vue'
import ProductsTable from '@/components/dashboard/products/ProductsTable.vue'
import { useSupplierProducts } from '@/components/dashboard/products/useSupplierProducts'
import BasePagination from '@/components/ui/BasePagination.vue'
import { useLocalizedText } from '@/composables/useLocalizedText'

/** Supplier spare parts (754:15902). */
const { t } = useI18n()
const localized = useLocalizedText()
const router = useRouter()
const store = useSupplierProducts()

const PAGE_SIZE = 10
const query = ref('')
const sort = ref<ProductSort | ''>('')
const page = ref(1)

const isExcelOpen = ref(false)
const deleteId = ref<string | null>(null)
const alternativesId = ref<string | null>(null)
const isAlternativesOpen = ref(false)

const filtered = computed(() => {
  const term = query.value.trim().toLowerCase()
  const list = store.products.value.filter(
    (product) =>
      !term ||
      product.partNumber.toLowerCase().includes(term) ||
      localized(product.name).toLowerCase().includes(term),
  )
  if (sort.value === 'priceAsc') {
    return [...list].sort((a, b) => a.price - b.price)
  }
  if (sort.value === 'priceDesc') {
    return [...list].sort((a, b) => b.price - a.price)
  }
  return list
})
/** Mock paging: the design shows 20 pages; real totals come from the API. */
const totalPages = computed(() => Math.max(20, Math.ceil(filtered.value.length / PAGE_SIZE)))
const visible = computed(() => filtered.value.slice(0, PAGE_SIZE))

watch([query, sort], () => (page.value = 1))

const isDeleteOpen = computed({
  get: () => deleteId.value !== null,
  set: (open) => {
    if (!open) {
      deleteId.value = null
    }
  },
})

function confirmDelete(): void {
  if (deleteId.value) {
    store.remove(deleteId.value)
  }
}

function openAlternatives(id: string): void {
  alternativesId.value = id
  isAlternativesOpen.value = true
}

function addAlternative(method: 'manual' | 'catalog'): void {
  isAlternativesOpen.value = false
  const target = method === 'manual' ? 'dashboard-product-new' : 'dashboard-catalog'
  router.push({ name: target, query: { alternativeFor: alternativesId.value ?? undefined } })
}

function onExcelUploaded(file: File): void {
  router.push({ name: 'dashboard-excel-review', query: { file: file.name } })
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <AddProductsCard @excel="isExcelOpen = true" />

    <section class="flex flex-col gap-4" aria-labelledby="products-title">
      <header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <h2 id="products-title" class="text-h3 text-ink">
          {{ t('dashboard.products.listTitle') }}
        </h2>
        <div class="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <label
            class="flex h-[41px] w-full items-center gap-2 rounded-lg border-[0.5px] border-line bg-white p-2 focus-within:border-accent sm:w-[197px]"
          >
            <SearchIcon class="size-4 shrink-0 text-secondary" aria-hidden="true" />
            <span class="sr-only">{{ t('dashboard.products.search') }}</span>
            <input
              v-model="query"
              type="search"
              :placeholder="t('dashboard.products.search')"
              class="min-w-0 flex-1 bg-transparent text-body-sm text-ink outline-none placeholder:text-muted/50"
            />
          </label>
          <ProductsSortSelect v-model="sort" />
        </div>
      </header>

      <ProductsTable
        :products="visible"
        @edit="router.push({ name: 'dashboard-product-new', query: { id: $event } })"
        @alternatives="openAlternatives"
        @delete="deleteId = $event"
      />

      <BasePagination v-model="page" :total="totalPages" class="self-center" />
    </section>

    <ExcelUploadModal v-model:open="isExcelOpen" @upload="onExcelUploaded" />
    <ConfirmDeleteModal v-model:open="isDeleteOpen" @confirm="confirmDelete" />
    <AlternativesDrawer
      v-model:open="isAlternativesOpen"
      :product-id="alternativesId"
      @add-alternative="addAlternative"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import SearchIcon from '@/assets/icons/search-01--stroke-standard.svg'
import CatalogItemCard from '@/components/dashboard/products/CatalogItemCard.vue'
import FocusPageHeader from '@/components/dashboard/products/FocusPageHeader.vue'
import ProductsSortSelect, {
  type ProductSort,
} from '@/components/dashboard/products/ProductsSortSelect.vue'
import ProductsSuccessModal from '@/components/dashboard/products/ProductsSuccessModal.vue'
import { useSupplierProducts } from '@/components/dashboard/products/useSupplierProducts'
import BaseButton from '@/components/ui/BaseButton.vue'
import BasePagination from '@/components/ui/BasePagination.vue'
import { useLocalizedText } from '@/composables/useLocalizedText'
import { catalogEntries } from '@/mocks/dashboard-products'

/** "اضافة قطع غيار" from the platform catalog (910:16426): pick parts and set a price for each. */
const { t } = useI18n()
const localized = useLocalizedText()
const route = useRoute()
const router = useRouter()
const store = useSupplierProducts()

const query = ref('')
const sort = ref<ProductSort | ''>('')
const page = ref(1)
const showErrors = ref(false)
const isSuccessOpen = ref(false)
const formError = ref('')

/** The design shows the first three parts already picked. */
const selection = reactive<Record<string, { selected: boolean; price: string }>>(
  Object.fromEntries(
    catalogEntries.map((entry, index) => [entry.id, { selected: index < 3, price: '0' }]),
  ),
)

const alternativeFor = computed(() =>
  typeof route.query.alternativeFor === 'string' ? route.query.alternativeFor : null,
)

const visible = computed(() => {
  const term = query.value.trim().toLowerCase()
  return catalogEntries.filter(
    (entry) =>
      !term ||
      entry.partNumber.toLowerCase().includes(term) ||
      localized(entry.name).toLowerCase().includes(term),
  )
})
const selectedEntries = computed(() =>
  catalogEntries.filter((entry) => selection[entry.id]?.selected),
)

function priceError(id: string): string {
  const price = Number(selection[id]?.price)
  return showErrors.value && selection[id]?.selected && !(price > 0)
    ? t('dashboard.products.errors.price')
    : ''
}

function submit(): void {
  showErrors.value = true
  if (!selectedEntries.value.length) {
    formError.value = t('dashboard.products.errors.selectOne')
    return
  }
  if (selectedEntries.value.some((entry) => priceError(entry.id))) {
    formError.value = t('dashboard.products.errors.prices')
    return
  }
  formError.value = ''
  const picked = selectedEntries.value.map((entry) => ({
    ...entry,
    price: Number(selection[entry.id]!.price),
  }))
  if (alternativeFor.value) {
    for (const entry of picked) {
      store.addAlternative(alternativeFor.value, {
        partNumber: entry.partNumber,
        name: entry.name,
        origin: entry.origin,
        brandId: 'toyota',
        price: entry.price,
      })
    }
  } else {
    store.addFromCatalog(picked)
  }
  isSuccessOpen.value = true
}
</script>

<template>
  <div class="page-container">
    <FocusPageHeader
      :title="t('dashboard.products.addTitle')"
      :back="{ name: 'dashboard-products' }"
    >
      <template #action>
        <BaseButton class="w-[115px] px-10" @click="submit">{{
          t('dashboard.products.add')
        }}</BaseButton>
      </template>
    </FocusPageHeader>

    <section
      class="flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-card sm:p-8"
      aria-labelledby="catalog-search-title"
    >
      <div class="flex flex-col gap-2">
        <h2 id="catalog-search-title" class="text-h4 text-ink">
          {{ t('dashboard.products.catalogSearch') }}
        </h2>
        <div class="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <label
            class="flex h-12 flex-1 items-center gap-2 rounded-xl border border-line bg-surface px-4 py-3 focus-within:border-accent"
          >
            <SearchIcon class="size-4 shrink-0 text-ink" aria-hidden="true" />
            <span class="sr-only">{{ t('dashboard.products.catalogPlaceholder') }}</span>
            <input
              v-model="query"
              type="search"
              :placeholder="t('dashboard.products.catalogPlaceholder')"
              class="min-w-0 flex-1 bg-transparent text-body-sm text-ink outline-none placeholder:text-ink/60"
            />
          </label>
          <ProductsSortSelect v-model="sort" />
        </div>
      </div>

      <p class="text-body-md text-primary" aria-live="polite">
        {{ t('dashboard.products.selectedCount', { count: selectedEntries.length }) }}
      </p>
      <p v-if="formError" class="text-caption text-error" role="alert">{{ formError }}</p>

      <ul class="flex flex-col gap-4">
        <li v-for="entry in visible" :key="entry.id">
          <CatalogItemCard
            v-model:selected="selection[entry.id]!.selected"
            v-model:price="selection[entry.id]!.price"
            :entry="entry"
            :error="priceError(entry.id)"
          />
        </li>
      </ul>

      <BasePagination v-model="page" :total="20" class="mt-4 self-center" />
    </section>

    <ProductsSuccessModal
      v-model:open="isSuccessOpen"
      :message="t('dashboard.products.addedSuccess')"
      @closed="router.push({ name: 'dashboard-products' })"
    />
  </div>
</template>

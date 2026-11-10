<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import BrandFilter from '@/components/catalog/BrandFilter.vue'
import ProductCard from '@/components/catalog/ProductCard.vue'
import SearchPanel from '@/components/catalog/SearchPanel.vue'
import SortMenu from '@/components/catalog/SortMenu.vue'
import HomeHero from '@/components/home/HomeHero.vue'
import BasePagination from '@/components/ui/BasePagination.vue'
import { useAddedToCartToast } from '@/components/shop/useAddedToCartToast'
import { carBrands, recentSearches, searchResults } from '@/mocks/catalog'
import { useCartStore } from '@/stores/cart'
import type { PartOrigin, Product, SortOption } from '@/types/catalog'

const { t } = useI18n()

const recent = ref([...recentSearches])
const sort = ref<SortOption>('priceAsc')
const page = ref(1)
const brandSelection = ref<{ brandId: string; origin: PartOrigin } | null>(null)
const cart = useCartStore()
const toast = useAddedToCartToast()

function quantityOf(product: Product): number {
  return cart.items.find((item) => item.id === product.id)?.quantity ?? 0
}

function updateQuantity(product: Product, next: number): void {
  const current = quantityOf(product)
  if (next > current) {
    cart.add(product, next - current)
    toast.show()
  } else {
    cart.setQuantity(product.id, next)
  }
}
const totalResults = 300
</script>

<template>
  <HomeHero />

  <div class="page-container relative z-10 -mt-[108px]">
    <SearchPanel :recent="recent" @remove-recent="recent.splice($event, 1)" />
  </div>

  <div class="page-container mt-[60px] flex flex-col gap-6 lg:flex-row lg:items-start">
    <BrandFilter v-model="brandSelection" :brands="carBrands" class="lg:w-[292px] lg:shrink-0" />

    <section
      class="flex min-w-0 flex-1 flex-col items-center gap-5"
      aria-labelledby="results-title"
    >
      <header class="flex w-full items-center justify-between gap-4">
        <div class="flex flex-col gap-2">
          <h2 id="results-title" class="text-h3 text-ink">{{ t('catalog.results') }}</h2>
          <p class="text-body-sm text-muted">
            {{ t('catalog.resultsCount', { count: totalResults }) }}
          </p>
        </div>
        <SortMenu v-model="sort" />
      </header>

      <ul class="flex w-full flex-col gap-4">
        <li v-for="product in searchResults" :key="product.id">
          <ProductCard
            :product="product"
            :quantity="quantityOf(product)"
            @update:quantity="updateQuantity(product, $event)"
          />
        </li>
      </ul>

      <BasePagination v-model="page" :total="20" />
    </section>
  </div>
</template>

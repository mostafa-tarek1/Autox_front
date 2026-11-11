<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import SortMenu from '@/components/catalog/SortMenu.vue'
import HomeHero from '@/components/home/HomeHero.vue'
import type { ExcelSearchItem } from '@/components/public/excel/excelParser'
import ExcelResultsTable from '@/components/public/excel/ExcelResultsTable.vue'
import ExcelSearchPanel from '@/components/public/excel/ExcelSearchPanel.vue'
import OriginFilter from '@/components/public/excel/OriginFilter.vue'
import { excelOfferColumns, excelResults, mockExcelResultsFor } from '@/mocks/public'
import type { PartOrigin, SortOption } from '@/types/catalog'

const { t } = useI18n()

const sort = ref<SortOption>('priceAsc')
const origin = ref<PartOrigin | 'all'>('all')
const searchedItems = ref<ExcelSearchItem[]>([])
const totalResults = 300

const filterOrigins: PartOrigin[] = ['original', 'korean', 'chinese', 'taiwanese']

/** Mock filtering: shows only the column matching the chosen origin. */
const visibleColumns = computed(() =>
  origin.value === 'all'
    ? excelOfferColumns
    : excelOfferColumns.filter((column) => column.origin === origin.value),
)

/** Before a search the page shows the design's sample rows. */
const rows = computed(() =>
  searchedItems.value.length ? mockExcelResultsFor(searchedItems.value) : excelResults,
)

function onSearch(items: ExcelSearchItem[]): void {
  searchedItems.value = items
}
</script>

<template>
  <HomeHero />

  <div class="page-container relative z-10 -mt-[108px]">
    <ExcelSearchPanel @search="onSearch" />
  </div>

  <section
    class="page-container mt-[52px] flex flex-col gap-4"
    aria-labelledby="excel-results-title"
  >
    <header class="flex items-center justify-between gap-4">
      <div class="flex flex-col gap-2">
        <h2 id="excel-results-title" class="text-h3 text-ink">{{ t('catalog.results') }}</h2>
        <p class="text-body-sm text-muted">
          {{ t('catalog.resultsCount', { count: searchedItems.length || totalResults }) }}
        </p>
      </div>
      <SortMenu v-model="sort" />
    </header>

    <OriginFilter v-model="origin" :origins="filterOrigins" />

    <ExcelResultsTable :rows="rows" :columns="visibleColumns" />
  </section>
</template>

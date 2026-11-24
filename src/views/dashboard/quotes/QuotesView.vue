<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import CheckIcon from '@/assets/icons/checkmark-circle-01--duotone-rounded.svg'
import CancelIcon from '@/assets/icons/cancel-02--duotone-rounded.svg'
import CouponIcon from '@/assets/icons/coupon-01--duotone-rounded.svg'
import QuoteDetailsDrawer from '@/components/dashboard/quotes/QuoteDetailsDrawer.vue'
import QuoteSortMenu, { type QuoteSort } from '@/components/dashboard/quotes/QuoteSortMenu.vue'
import QuotesTable from '@/components/dashboard/quotes/QuotesTable.vue'
import DashboardStatCard from '@/components/dashboard/DashboardStatCard.vue'
import BasePagination from '@/components/ui/BasePagination.vue'
import { supplierQuotes, supplierQuoteStats, type SupplierQuote } from '@/mocks/dashboard-quotes'

const { t } = useI18n()
const router = useRouter()

const sort = ref<QuoteSort | null>(null)
const page = ref(1)
const selected = ref<SupplierQuote | null>(null)
const isDrawerOpen = ref(false)

/** Mock sorting until the API sorts server-side; the design shows the unsorted order. */
const quotes = computed(() => {
  const list = [...supplierQuotes]
  switch (sort.value) {
    case 'oldest':
      return list.reverse()
    case 'priceHigh':
      return list.sort((a, b) => b.offeredPrice - a.offeredPrice)
    case 'priceLow':
      return list.sort((a, b) => a.offeredPrice - b.offeredPrice)
    default:
      return list
  }
})

/** Requests still waiting for a price open the pricing page; the others open the details drawer. */
function view(quote: SupplierQuote): void {
  if (quote.status === 'awaitingOffer') {
    router.push({ name: 'dashboard-quote-offer', params: { id: quote.id } })
    return
  }
  selected.value = quote
  isDrawerOpen.value = true
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <section
      class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6"
      :aria-label="t('dashboard.quotes.statsLabel')"
    >
      <DashboardStatCard
        :label="t('dashboard.quotes.stats.sent')"
        :value="supplierQuoteStats.sent"
        :icon="CouponIcon"
      />
      <DashboardStatCard
        :label="t('dashboard.quotes.stats.accepted')"
        :value="supplierQuoteStats.accepted"
        :icon="CheckIcon"
      />
      <DashboardStatCard
        :label="t('dashboard.quotes.stats.rejected')"
        :value="supplierQuoteStats.rejected"
        :icon="CancelIcon"
        icon-class="text-orange"
      />
    </section>

    <section class="flex flex-col items-center gap-4" aria-labelledby="dashboard-quotes-title">
      <header class="flex w-full flex-wrap items-center justify-between gap-4">
        <h2 id="dashboard-quotes-title" class="text-h3 text-ink">
          {{ t('dashboard.quotes.listTitle') }}
        </h2>
        <QuoteSortMenu v-model="sort" class="w-full sm:w-auto" />
      </header>

      <div class="w-full rounded-2xl bg-white p-2">
        <QuotesTable :quotes="quotes" @view="view" />
      </div>

      <BasePagination v-model="page" :total="20" />
    </section>

    <QuoteDetailsDrawer v-model:open="isDrawerOpen" :quote="selected" />
  </div>
</template>

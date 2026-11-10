<script setup lang="ts">
import PriceTag from '@/components/ui/PriceTag.vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import FileDownloadIcon from '@/assets/icons/file-download--stroke-rounded.svg'
import SearchIcon from '@/assets/icons/search-01--stroke-rounded.svg'
import CartCheckIcon from '@/assets/icons/shopping-cart-check-out-01--duotone-rounded.svg'
import WalletIcon from '@/assets/icons/wallet-02--duotone-rounded.svg'
import DateFilter from '@/components/billing/DateFilter.vue'
import InstallmentsTable from '@/components/billing/InstallmentsTable.vue'
import PageHero from '@/components/layout/PageHero.vue'
import StatCard from '@/components/billing/StatCard.vue'
import SelectField from '@/components/form/SelectField.vue'
import TextField from '@/components/form/TextField.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BasePagination from '@/components/ui/BasePagination.vue'
import { installmentRequests, installmentSummary, type InstallmentStatus } from '@/mocks/billing'

const { t } = useI18n()

const query = ref('')
const status = ref<InstallmentStatus | null>(null)
const startDate = ref('')
const endDate = ref('')
const page = ref(1)

const statusOptions = computed(() =>
  (['paid', 'processing', 'rejected'] as const).map((value) => ({
    value,
    label: t(`billing.installmentStatus.${value}`),
  })),
)

const filteredRequests = computed(() => {
  const term = query.value.trim()
  return installmentRequests.filter(
    (request) =>
      (!status.value || request.status === status.value) &&
      (!startDate.value || request.date >= startDate.value) &&
      (!endDate.value || request.date <= endDate.value) &&
      (!term ||
        request.customerName.includes(term) ||
        request.phone.includes(term) ||
        request.orderNumber.includes(term)),
  )
})
</script>

<template>
  <PageHero
    :title="t('billing.vouchers')"
    :breadcrumbs="[
      { label: t('nav.home'), to: { name: 'home' } },
      { label: t('billing.vouchers') },
    ]"
  />

  <div class="page-container flex flex-col gap-10 pt-10">
    <section class="grid grid-cols-1 gap-6 md:grid-cols-2" :aria-label="t('billing.summary')">
      <StatCard size="lg" :label="t('billing.currentBalance')" :icon="WalletIcon">
        <PriceTag :amount="installmentSummary.currentBalance" class="text-primary" />
      </StatCard>
      <StatCard
        size="lg"
        :label="t('billing.totalSales')"
        :icon="CartCheckIcon"
        icon-color="text-orange"
      >
        <PriceTag :amount="installmentSummary.totalSales" class="text-primary" />
      </StatCard>
    </section>

    <section class="flex flex-col gap-6" aria-labelledby="installments-heading">
      <h2 id="installments-heading" class="text-h2 text-ink">
        {{ t('billing.installmentRequests') }}
      </h2>

      <div class="flex flex-col gap-4">
        <div
          class="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,245px))_auto]"
        >
          <TextField
            v-model="query"
            type="search"
            :placeholder="t('billing.filters.search')"
            :icon="SearchIcon"
          />
          <SelectField
            v-model="status"
            :options="statusOptions"
            :placeholder="t('billing.filters.status')"
          />
          <DateFilter v-model="startDate" :label="t('billing.filters.startDate')" />
          <DateFilter v-model="endDate" :label="t('billing.filters.endDate')" />
          <BaseButton variant="soft" class="lg:ms-auto">
            <template #icon><FileDownloadIcon class="size-5" aria-hidden="true" /></template>
            {{ t('billing.downloadExcel') }}
          </BaseButton>
        </div>

        <InstallmentsTable v-if="filteredRequests.length" :requests="filteredRequests" />
        <p v-else class="rounded-3xl bg-white p-8 text-center text-body-md text-secondary">
          {{ t('billing.noResults') }}
        </p>
      </div>

      <div class="max-w-full self-center overflow-x-auto pb-1">
        <BasePagination v-model="page" :total="20" />
      </div>
    </section>
  </div>
</template>

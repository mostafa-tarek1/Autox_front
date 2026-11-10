<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import DownloadIcon from '@/assets/icons/file-download--stroke-rounded.svg'
import PageHero from '@/components/layout/PageHero.vue'
import DateFilterField from '@/components/account/DateFilterField.vue'
import { useAccountState } from '@/components/account/useAccountState'
import WalletBalanceCard from '@/components/account/WalletBalanceCard.vue'
import WalletTransactionsTable from '@/components/account/WalletTransactionsTable.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BasePagination from '@/components/ui/BasePagination.vue'
import { walletTransactions } from '@/mocks/account'

const { t } = useI18n()
const { state } = useAccountState()

const startDate = ref('')
const endDate = ref('')
const page = ref(1)
/** Mock total until the API returns real pagination metadata. */
const totalPages = 20

const breadcrumbs = computed(() => [
  { label: t('nav.home'), to: { name: 'home' } },
  { label: t('wallet.title') },
])

const filteredTransactions = computed(() =>
  walletTransactions.filter(
    (transaction) =>
      (!startDate.value || transaction.date >= startDate.value) &&
      (!endDate.value || transaction.date <= endDate.value),
  ),
)

watch([startDate, endDate], () => (page.value = 1))

/** Exports the visible rows as a CSV file (opens in Excel) until the API provides an export. */
function downloadExcel(): void {
  const header = ['reference', 'operation', 'amount', 'date', 'note', 'status'].map((column) =>
    t(`wallet.columns.${column}`),
  )
  const rows = filteredTransactions.value.map((transaction) => [
    transaction.reference,
    t(`wallet.operations.${transaction.operation}`),
    String(transaction.amount),
    transaction.date,
    transaction.note ?? t('wallet.noNote'),
    t(`wallet.statuses.${transaction.status}`),
  ])
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(','))
    .join('\n')
  const url = URL.createObjectURL(new Blob(['﻿', csv], { type: 'text/csv;charset=utf-8' }))
  const link = Object.assign(document.createElement('a'), {
    href: url,
    download: 'wallet-transactions.csv',
  })
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <PageHero :title="t('wallet.title')" :breadcrumbs="breadcrumbs" />

  <div class="page-container mt-12 flex flex-col gap-12 xl:max-w-[1208px]">
    <WalletBalanceCard :balance="state.walletBalance" />

    <section class="flex flex-col gap-4" aria-labelledby="transactions-title">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 id="transactions-title" class="text-h3 text-ink">{{ t('wallet.transactions') }}</h2>
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
          <DateFilterField
            v-model="startDate"
            :placeholder="t('wallet.startDate')"
            :max="endDate || undefined"
          />
          <DateFilterField
            v-model="endDate"
            :placeholder="t('wallet.endDate')"
            :min="startDate || undefined"
          />
          <BaseButton variant="soft" @click="downloadExcel">
            <template #icon><DownloadIcon class="size-5" aria-hidden="true" /></template>
            {{ t('wallet.downloadExcel') }}
          </BaseButton>
        </div>
      </div>

      <div class="flex flex-col items-center gap-6 rounded-3xl bg-white py-2 ps-4 pe-2 pb-6">
        <WalletTransactionsTable :transactions="filteredTransactions" class="w-full" />
        <BasePagination v-if="filteredTransactions.length" v-model="page" :total="totalPages" />
      </div>
    </section>
  </div>
</template>

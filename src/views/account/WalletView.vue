<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import DownloadIcon from '@/assets/icons/file-download--stroke-rounded.svg'
import WalletIcon from '@/assets/icons/wallet-02--duotone-rounded.svg'
import WalletDoneIcon from '@/assets/icons/wallet-done-01--duotone-rounded.svg'
import WalletRemoveIcon from '@/assets/icons/wallet-remove-01--duotone-rounded.svg'
import PageHero from '@/components/layout/PageHero.vue'
import DateFilterField from '@/components/account/DateFilterField.vue'
import InfoHint from '@/components/account/InfoHint.vue'
import { useAccountState } from '@/components/account/useAccountState'
import WalletBalanceCard from '@/components/account/WalletBalanceCard.vue'
import WalletTransactionsTable from '@/components/account/WalletTransactionsTable.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BasePagination from '@/components/ui/BasePagination.vue'
import { useLocalizedText } from '@/composables/useLocalizedText'
import { walletTransactions } from '@/mocks/account'

const { t } = useI18n()
const localized = useLocalizedText()
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

/** "+2,000" / "-20" — the sign tells credits from debits in the export. */
function formatSignedAmount(amount: number): string {
  const formatted = Math.abs(amount).toLocaleString('en-US', { maximumFractionDigits: 2 })
  return `${amount < 0 ? '-' : '+'}${formatted}`
}

/** Exports the visible rows as a CSV file (opens in Excel) until the API provides an export. */
function downloadExcel(): void {
  const header = ['reference', 'amount', 'operation', 'date', 'note', 'status'].map((column) =>
    t(`wallet.columns.${column}`),
  )
  const rows = filteredTransactions.value.map((transaction) => [
    transaction.reference,
    formatSignedAmount(transaction.amount),
    t(`wallet.operations.${transaction.operation}`),
    transaction.date,
    transaction.note ? localized(transaction.note) : t('wallet.noNote'),
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
    <section
      class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
      :aria-label="t('wallet.balances')"
    >
      <WalletBalanceCard
        :label="t('wallet.balance')"
        :amount="state.wallet.total"
        :icon="WalletIcon"
      />
      <WalletBalanceCard
        :label="t('wallet.pendingBalance')"
        :amount="state.wallet.pending"
        :icon="WalletRemoveIcon"
        icon-class="text-orange"
      >
        <InfoHint
          class="[&_button]:text-orange"
          :label="t('wallet.pendingInfoLabel')"
          :text="t('wallet.pendingInfo')"
        />
      </WalletBalanceCard>
      <WalletBalanceCard
        :label="t('wallet.withdrawableBalance')"
        :amount="state.wallet.withdrawable"
        :icon="WalletDoneIcon"
        tone="success"
        class="md:col-span-2 lg:col-span-1"
      >
        <BaseButton size="sm" :to="{ name: 'wallet-withdraw' }" class="shrink-0">
          {{ t('wallet.requestWithdraw') }}
        </BaseButton>
      </WalletBalanceCard>
    </section>

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

      <div
        class="flex flex-col items-center gap-6 rounded-3xl bg-white p-3 md:py-2 md:ps-4 md:pe-2 md:pb-6"
      >
        <WalletTransactionsTable :transactions="filteredTransactions" class="w-full" />
        <BasePagination v-if="filteredTransactions.length" v-model="page" :total="totalPages" />
      </div>
    </section>
  </div>
</template>

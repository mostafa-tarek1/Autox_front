<script setup lang="ts">
import WithdrawDrawer from '@/components/dashboard/finance/WithdrawDrawer.vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import DownloadIcon from '@/assets/icons/file-download--stroke-rounded.svg'
import TickIcon from '@/assets/icons/tick-02--solid-standard.svg'
import WalletDoneIcon from '@/assets/icons/wallet-done-01--duotone-rounded.svg'
import WalletRemoveIcon from '@/assets/icons/wallet-remove-01--duotone-rounded.svg'
import InfoHint from '@/components/account/InfoHint.vue'
import BalanceCard from '@/components/dashboard/finance/BalanceCard.vue'
import FinanceSortMenu from '@/components/dashboard/finance/FinanceSortMenu.vue'
import TransactionsTable from '@/components/dashboard/finance/TransactionsTable.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BasePagination from '@/components/ui/BasePagination.vue'
import {
  formatFinanceDate,
  sortFinanceRows,
  supplierBalance,
  supplierTransactions,
  type FinanceSort,
} from '@/mocks/dashboard-finance'

/** Supplier balance & transactions (Figma 799:8040). */
const { t } = useI18n()

const sort = ref<FinanceSort | null>(null)
const page = ref(1)
const totalPages = 20
const isWithdrawOpen = ref(false)
const isWithdrawSent = ref(false)

const rows = computed(() => sortFinanceRows(supplierTransactions, sort.value))

/** Mock: the API will receive the amount and the chosen bank account. */
function onWithdrawSubmitted(): void {
  isWithdrawSent.value = true
}

function downloadExcel(): void {
  const header = ['reference', 'amount', 'type', 'date', 'note', 'status']
    .map((key) => t(`dashboard.finance.columns.${key}`))
    .join(',')
  const lines = rows.value.map((row) =>
    [
      row.reference,
      row.amount.toFixed(2),
      t(`dashboard.finance.types.${row.type}`),
      formatFinanceDate(row.date),
      row.note ?? t('dashboard.finance.noNote'),
      t(`dashboard.finance.statuses.${row.status}`),
    ].join(','),
  )
  const csv = [header, ...lines].join('\n')
  const url = URL.createObjectURL(new Blob(['﻿', csv], { type: 'text/csv;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'transactions.csv'
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <section
      class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-6"
      :aria-label="t('dashboard.finance.balance.label')"
    >
      <BalanceCard
        :label="t('dashboard.finance.balance.total')"
        :amount="supplierBalance.total"
        :icon="WalletDoneIcon"
      />
      <BalanceCard
        :label="t('dashboard.finance.balance.withdrawable')"
        :amount="supplierBalance.withdrawable"
        :icon="WalletDoneIcon"
      >
        <template #aside>
          <BaseButton :disabled="supplierBalance.withdrawable <= 0" @click="isWithdrawOpen = true">
            {{ t('dashboard.finance.balance.withdraw') }}
          </BaseButton>
        </template>
      </BalanceCard>
      <BalanceCard
        :label="t('dashboard.finance.balance.pending')"
        :amount="supplierBalance.pending"
        :icon="WalletRemoveIcon"
        icon-class="text-orange"
        class="md:col-span-2 xl:col-span-1"
      >
        <template #aside>
          <InfoHint
            class="[&_button]:text-orange"
            :text="t('dashboard.finance.balance.pendingHint')"
            :label="t('dashboard.finance.balance.pendingHintLabel')"
          />
        </template>
      </BalanceCard>
    </section>

    <section class="flex flex-col items-center gap-4" aria-labelledby="transactions-title">
      <div class="flex w-full flex-wrap items-center justify-between gap-4 sm:gap-6">
        <h2 id="transactions-title" class="flex-1 text-h3 text-ink">
          {{ t('dashboard.finance.transactions') }}
        </h2>
        <BaseButton variant="soft" class="order-last sm:order-none" @click="downloadExcel">
          <template #icon><DownloadIcon class="size-5" aria-hidden="true" /></template>
          {{ t('dashboard.finance.downloadExcel') }}
        </BaseButton>
        <FinanceSortMenu v-model="sort" class="w-full sm:w-auto" />
      </div>

      <TransactionsTable :transactions="rows" class="w-full" />
      <BasePagination v-model="page" :total="totalPages" />
    </section>
  </div>

  <WithdrawDrawer
    v-model:open="isWithdrawOpen"
    :withdrawable="supplierBalance.withdrawable"
    @submitted="onWithdrawSubmitted"
  />

  <BaseModal
    v-model:open="isWithdrawSent"
    tone="surface"
    panel-class="max-w-[320px] rounded-2xl px-6 py-12"
  >
    <div class="flex flex-col items-center gap-2 text-center">
      <span class="grid size-10 place-items-center rounded-full bg-accent text-primary">
        <TickIcon class="size-8" aria-hidden="true" />
      </span>
      <p class="text-h4 text-secondary" role="status">
        {{ t('dashboard.finance.balance.withdrawSent') }}
      </p>
    </div>
  </BaseModal>
</template>

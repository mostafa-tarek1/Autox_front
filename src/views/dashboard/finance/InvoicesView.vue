<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import FinanceAmount from '@/components/dashboard/finance/FinanceAmount.vue'
import FinanceSortMenu from '@/components/dashboard/finance/FinanceSortMenu.vue'
import InvoicesTable from '@/components/dashboard/finance/InvoicesTable.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BasePagination from '@/components/ui/BasePagination.vue'
import {
  formatFinanceDate,
  sortFinanceRows,
  supplierInvoices,
  type FinanceSort,
  type SupplierInvoice,
} from '@/mocks/dashboard-finance'

/** Supplier invoices (Figma 879:14858). */
const { t } = useI18n()

const sort = ref<FinanceSort | null>(null)
const page = ref(1)
const totalPages = 20
const viewing = ref<SupplierInvoice | null>(null)

const rows = computed(() => sortFinanceRows(supplierInvoices, sort.value))
const isViewing = computed({
  get: () => viewing.value !== null,
  set: (open) => {
    if (!open) {
      viewing.value = null
    }
  },
})

/** Mock download until the API serves the invoice PDF. */
function download(invoice: SupplierInvoice): void {
  const text = [
    `${t('dashboard.finance.invoices.columns.orderNumber')}: ${invoice.orderNumber}`,
    `${t('dashboard.finance.invoices.columns.customer')}: ${invoice.customer}`,
    `${t('dashboard.finance.invoices.columns.date')}: ${formatFinanceDate(invoice.date)}`,
    `${t('dashboard.finance.invoices.columns.amount')}: ${invoice.amount.toFixed(2)}`,
  ].join('\n')
  const url = URL.createObjectURL(new Blob(['﻿', text], { type: 'text/plain;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = `invoice-${invoice.id}.txt`
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <section class="flex flex-col items-center gap-4" aria-labelledby="invoices-title">
    <div class="flex w-full flex-wrap items-center justify-between gap-4 sm:gap-6">
      <h2 id="invoices-title" class="flex-1 text-h3 text-ink">
        {{ t('dashboard.finance.invoices.title') }}
      </h2>
      <FinanceSortMenu v-model="sort" class="w-full sm:w-auto" />
    </div>

    <InvoicesTable :invoices="rows" class="w-full" @view="viewing = $event" @download="download" />
    <BasePagination v-model="page" :total="totalPages" />
  </section>

  <BaseModal v-model:open="isViewing" :title="t('dashboard.finance.invoices.detailsTitle')">
    <dl v-if="viewing" class="grid grid-cols-2 gap-x-4 gap-y-3 text-body-md">
      <dt class="text-secondary">{{ t('dashboard.finance.invoices.columns.orderNumber') }}</dt>
      <dd class="text-ink">{{ viewing.orderNumber }}</dd>
      <dt class="text-secondary">{{ t('dashboard.finance.invoices.columns.customer') }}</dt>
      <dd class="text-ink">{{ viewing.customer }}</dd>
      <dt class="text-secondary">{{ t('dashboard.finance.invoices.columns.date') }}</dt>
      <dd class="text-ink tabular-nums">{{ formatFinanceDate(viewing.date) }}</dd>
      <dt class="text-secondary">{{ t('dashboard.finance.invoices.columns.amount') }}</dt>
      <dd><FinanceAmount :amount="viewing.amount" /></dd>
    </dl>
  </BaseModal>
</template>

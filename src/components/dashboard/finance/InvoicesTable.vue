<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import DownloadIcon from '@/assets/icons/file-download--stroke-rounded.svg'
import ViewIcon from '@/assets/icons/view--stroke-rounded.svg'
import { formatFinanceDate, type SupplierInvoice } from '@/mocks/dashboard-finance'

import FinanceAmount from './FinanceAmount.vue'

/** Invoices table (Figma 879:14858): table on desktop, cards on phones. */
defineProps<{ invoices: SupplierInvoice[] }>()
const emit = defineEmits<{
  view: [invoice: SupplierInvoice]
  download: [invoice: SupplierInvoice]
}>()
const { t } = useI18n()

const columns = ['orderNumber', 'amount', 'customer', 'date', 'actions'] as const
const grid = 'grid grid-cols-[98px_175px_175px_199px_194px] gap-x-10 px-4'
const action =
  'inline-flex h-8 items-center gap-1 rounded-lg bg-surface px-2 py-1 text-body-sm text-primary transition-colors hover:bg-accent/30'
</script>

<template>
  <div class="rounded-2xl bg-white p-2">
    <p v-if="!invoices.length" class="py-10 text-center text-body-md text-secondary">
      {{ t('dashboard.finance.invoices.empty') }}
    </p>

    <ul v-if="invoices.length" class="flex flex-col gap-2 lg:hidden">
      <li
        v-for="invoice in invoices"
        :key="invoice.id"
        class="flex flex-col gap-3 rounded-xl border border-line p-4"
      >
        <div class="flex items-center justify-between gap-2">
          <span class="text-body-md text-secondary">{{ invoice.orderNumber }}</span>
          <FinanceAmount :amount="invoice.amount" />
        </div>
        <dl class="grid grid-cols-2 gap-x-4 gap-y-2 text-body-sm">
          <dt class="text-secondary">{{ t('dashboard.finance.invoices.columns.customer') }}</dt>
          <dd class="text-ink">{{ invoice.customer }}</dd>
          <dt class="text-secondary">{{ t('dashboard.finance.invoices.columns.date') }}</dt>
          <dd class="text-ink tabular-nums">{{ formatFinanceDate(invoice.date) }}</dd>
        </dl>
        <div class="flex gap-6">
          <button type="button" :class="action" @click="emit('view', invoice)">
            <ViewIcon class="size-5" aria-hidden="true" />
            {{ t('dashboard.finance.invoices.view') }}
          </button>
          <button type="button" :class="action" @click="emit('download', invoice)">
            <DownloadIcon class="size-5" aria-hidden="true" />
            {{ t('dashboard.finance.invoices.download') }}
          </button>
        </div>
      </li>
    </ul>

    <div v-if="invoices.length" class="hidden overflow-x-auto lg:block">
      <table class="w-full min-w-[1148px] text-start">
        <thead>
          <tr :class="[grid, 'h-14 items-center rounded-xl bg-surface']">
            <th
              v-for="column in columns"
              :key="column"
              scope="col"
              class="text-start text-body-md font-normal text-ink"
            >
              {{ t(`dashboard.finance.invoices.columns.${column}`) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(invoice, index) in invoices"
            :key="invoice.id"
            :class="[
              grid,
              'items-center text-body-md text-secondary transition-colors hover:bg-surface',
              index === invoices.length - 1 ? 'h-16' : 'h-[65px] border-b border-line',
            ]"
          >
            <td>{{ invoice.orderNumber }}</td>
            <td><FinanceAmount :amount="invoice.amount" /></td>
            <td>{{ invoice.customer }}</td>
            <td class="tabular-nums">{{ formatFinanceDate(invoice.date) }}</td>
            <td>
              <div class="flex items-center gap-6">
                <button
                  type="button"
                  :class="action"
                  :aria-label="`${t('dashboard.finance.invoices.view')} ${invoice.orderNumber}`"
                  @click="emit('view', invoice)"
                >
                  <ViewIcon class="size-5" aria-hidden="true" />
                  {{ t('dashboard.finance.invoices.view') }}
                </button>
                <button
                  type="button"
                  :class="action"
                  :aria-label="`${t('dashboard.finance.invoices.download')} ${invoice.orderNumber}`"
                  @click="emit('download', invoice)"
                >
                  <DownloadIcon class="size-5" aria-hidden="true" />
                  {{ t('dashboard.finance.invoices.download') }}
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

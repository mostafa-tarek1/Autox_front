<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { formatFinanceDate, type SupplierTransaction } from '@/mocks/dashboard-finance'

import FinanceAmount from './FinanceAmount.vue'
import FinanceStatusChip from './FinanceStatusChip.vue'

/** Balance transactions (Figma "Frame 764" rows): table on desktop, cards on phones. */
defineProps<{ transactions: SupplierTransaction[] }>()
const { t } = useI18n()

const columns = ['reference', 'amount', 'type', 'date', 'note', 'status'] as const
const grid =
  'grid grid-cols-[minmax(0,98fr)_minmax(0,175fr)_minmax(0,178fr)_minmax(0,175fr)_minmax(0,194fr)_minmax(0,112fr)] gap-x-10 px-4'
</script>

<template>
  <div class="rounded-2xl bg-white p-2">
    <p v-if="!transactions.length" class="py-10 text-center text-body-md text-secondary">
      {{ t('dashboard.finance.empty') }}
    </p>

    <!-- Phones and tablets: one card per transaction. -->
    <ul v-if="transactions.length" class="flex flex-col gap-2 lg:hidden">
      <li
        v-for="row in transactions"
        :key="row.id"
        class="flex flex-col gap-3 rounded-xl border border-line p-4"
      >
        <div class="flex items-center justify-between gap-2">
          <span class="text-body-md text-secondary">{{ row.reference }}</span>
          <FinanceStatusChip :status="row.status" />
        </div>
        <dl class="grid grid-cols-2 gap-x-4 gap-y-2 text-body-sm">
          <dt class="text-secondary">{{ t('dashboard.finance.columns.amount') }}</dt>
          <dd><FinanceAmount :amount="row.amount" signed /></dd>
          <dt class="text-secondary">{{ t('dashboard.finance.columns.type') }}</dt>
          <dd class="text-ink">{{ t(`dashboard.finance.types.${row.type}`) }}</dd>
          <dt class="text-secondary">{{ t('dashboard.finance.columns.date') }}</dt>
          <dd class="text-ink tabular-nums">{{ formatFinanceDate(row.date) }}</dd>
          <dt class="text-secondary">{{ t('dashboard.finance.columns.note') }}</dt>
          <dd class="text-ink">{{ row.note ?? t('dashboard.finance.noNote') }}</dd>
        </dl>
      </li>
    </ul>

    <div v-if="transactions.length" class="hidden overflow-x-auto lg:block">
      <table class="w-full min-w-[1148px] text-start">
        <thead>
          <tr :class="[grid, 'h-14 items-center rounded-xl bg-surface']">
            <th
              v-for="column in columns"
              :key="column"
              scope="col"
              class="text-start text-body-md font-normal text-ink"
            >
              {{ t(`dashboard.finance.columns.${column}`) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in transactions"
            :key="row.id"
            :class="[
              grid,
              'items-center text-body-md text-secondary transition-colors hover:bg-surface',
              index === transactions.length - 1 ? 'h-16' : 'h-[65px] border-b border-line',
            ]"
          >
            <td>{{ row.reference }}</td>
            <td><FinanceAmount :amount="row.amount" signed /></td>
            <td>{{ t(`dashboard.finance.types.${row.type}`) }}</td>
            <td class="tabular-nums">{{ formatFinanceDate(row.date) }}</td>
            <td>{{ row.note ?? t('dashboard.finance.noNote') }}</td>
            <td><FinanceStatusChip :status="row.status" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

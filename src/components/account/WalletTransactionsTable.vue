<script setup lang="ts">
import PriceTag from '@/components/ui/PriceTag.vue'
import { useI18n } from 'vue-i18n'

import type { WalletStatus, WalletTransaction } from '@/mocks/account'

import StatusChip, { type StatusTone } from '@/components/ui/StatusChip.vue'

defineProps<{ transactions: WalletTransaction[] }>()
const { t } = useI18n()

const walletTones: Record<WalletStatus, StatusTone> = {
  accepted: 'success',
  rejected: 'error',
  pending: 'pending',
}

function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-')
  return `${Number(day)}/${Number(month)}/${year}`
}

const columns = ['reference', 'operation', 'amount', 'date', 'note', 'status'] as const
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full min-w-[880px] border-separate border-spacing-0 text-start">
      <thead>
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="column"
            scope="col"
            class="h-14 bg-surface text-start text-body-md font-normal text-ink"
            :class="[
              index === 0 && 'w-[129px] rounded-s-2xl ps-6',
              index === columns.length - 1 && 'rounded-e-2xl',
              index > 0 && 'w-[195px]',
            ]"
          >
            {{ t(`wallet.columns.${column}`) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!transactions.length">
          <td :colspan="columns.length" class="py-10 text-center text-body-md text-secondary">
            {{ t('wallet.empty') }}
          </td>
        </tr>
        <tr
          v-for="transaction in transactions"
          :key="transaction.id"
          class="[&>td]:border-b-[0.6px] [&>td]:border-line"
        >
          <td class="h-16 ps-6 text-body-md text-secondary" dir="ltr">
            <span class="rtl:block rtl:text-right">{{ transaction.reference }}</span>
          </td>
          <td class="text-body-md text-success">
            {{ t(`wallet.operations.${transaction.operation}`) }}
          </td>
          <td><PriceTag :amount="transaction.amount" tone="primary" class="text-h4" /></td>
          <td class="text-body-md text-secondary tabular-nums">
            {{ formatDate(transaction.date) }}
          </td>
          <td class="text-body-md text-secondary">{{ transaction.note ?? t('wallet.noNote') }}</td>
          <td>
            <StatusChip :tone="walletTones[transaction.status]" :with-icon="false">{{
              t(`wallet.statuses.${transaction.status}`)
            }}</StatusChip>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

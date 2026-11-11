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
  <div>
    <!-- Phones: one card per transaction. -->
    <ul class="flex flex-col gap-3 md:hidden">
      <li v-if="!transactions.length" class="py-10 text-center text-body-md text-secondary">
        {{ t('wallet.empty') }}
      </li>
      <li
        v-for="transaction in transactions"
        :key="transaction.id"
        class="flex flex-col gap-3 rounded-2xl border border-line p-4"
      >
        <div class="flex items-center justify-between gap-2">
          <span dir="ltr" class="text-body-md text-secondary">{{ transaction.reference }}</span>
          <StatusChip :tone="walletTones[transaction.status]" :with-icon="false">{{
            t(`wallet.statuses.${transaction.status}`)
          }}</StatusChip>
        </div>
        <dl class="grid grid-cols-2 gap-x-4 gap-y-2 text-body-sm">
          <dt class="text-secondary">{{ t('wallet.columns.operation') }}</dt>
          <dd class="text-success">{{ t(`wallet.operations.${transaction.operation}`) }}</dd>
          <dt class="text-secondary">{{ t('wallet.columns.amount') }}</dt>
          <dd><PriceTag :amount="transaction.amount" tone="primary" class="text-h4" /></dd>
          <dt class="text-secondary">{{ t('wallet.columns.date') }}</dt>
          <dd class="text-ink tabular-nums">{{ formatDate(transaction.date) }}</dd>
          <dt class="text-secondary">{{ t('wallet.columns.note') }}</dt>
          <dd class="text-ink">{{ transaction.note ?? t('wallet.noNote') }}</dd>
        </dl>
      </li>
    </ul>

    <div class="hidden overflow-x-auto md:block">
      <table class="w-full min-w-[880px] table-fixed border-separate border-spacing-0 text-start">
        <thead>
          <tr>
            <th
              v-for="(column, index) in columns"
              :key="column"
              scope="col"
              class="h-[60px] border-b-4 border-transparent bg-surface bg-clip-padding text-start text-body-md font-normal text-ink"
              :class="[
                index === 0 && 'w-[129px] rounded-s-2xl ps-6',
                index === columns.length - 1 && 'rounded-e-2xl',
                index > 0 && index < columns.length - 1 && 'w-[195px]',
                index > 0 && 'ps-6',
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
            class="[&>td]:border-b [&>td]:border-line/60 [&>td+td]:ps-6"
          >
            <td class="h-16 ps-6 text-body-md text-secondary">
              <span dir="ltr">{{ transaction.reference }}</span>
            </td>
            <td class="text-body-md text-success">
              {{ t(`wallet.operations.${transaction.operation}`) }}
            </td>
            <td><PriceTag :amount="transaction.amount" tone="primary" class="text-h4" /></td>
            <td class="text-body-md text-secondary tabular-nums">
              {{ formatDate(transaction.date) }}
            </td>
            <td class="text-body-md text-secondary">
              {{ transaction.note ?? t('wallet.noNote') }}
            </td>
            <td>
              <StatusChip :tone="walletTones[transaction.status]" :with-icon="false">{{
                t(`wallet.statuses.${transaction.status}`)
              }}</StatusChip>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

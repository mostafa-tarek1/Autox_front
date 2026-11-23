<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { SupplierTransactionStatus } from '@/mocks/dashboard-finance'

/** 32px pill from the balance table (14/16 text). */
defineProps<{ status: SupplierTransactionStatus }>()
const { t } = useI18n()

const toneClasses: Record<SupplierTransactionStatus, string> = {
  pending: 'bg-waiting/15 text-waiting',
  deducted: 'bg-success/10 text-success',
  accepted: 'bg-success/10 text-success',
}
</script>

<template>
  <span
    class="inline-flex h-8 items-center justify-center rounded-full p-2 text-sm leading-4 whitespace-nowrap"
    :class="toneClasses[status]"
  >
    {{ t(`dashboard.finance.statuses.${status}`) }}
  </span>
</template>

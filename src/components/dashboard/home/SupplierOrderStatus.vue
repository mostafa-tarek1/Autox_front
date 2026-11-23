<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { SupplierOrderStatus } from '@/mocks/dashboard'

defineProps<{ status: SupplierOrderStatus }>()
const { t } = useI18n()

/** Pill colours from the "الرئيسية" frame: waiting = orange, payment = blue, active = green, returns/cancel = red. */
const tones: Record<SupplierOrderStatus, string> = {
  awaitingResponse: 'bg-waiting/15 text-waiting',
  awaitingPayment: 'bg-info/10 text-match',
  awaitingTransferConfirmation: 'bg-info/10 text-match',
  paidReadyToShip: 'bg-success/10 text-success',
  inDeliveryPeriod: 'bg-success/10 text-success',
  inReturnPeriod: 'bg-success/10 text-success',
  returnRequested: 'bg-error/15 text-error',
  returned: 'bg-error/15 text-error',
  returnRejected: 'bg-error/15 text-error',
  cancelled: 'bg-error/15 text-error',
}
</script>

<template>
  <span
    class="inline-flex h-8 items-center justify-center rounded-full p-2 text-sm leading-4 whitespace-nowrap"
    :class="tones[status]"
  >
    {{ t(`dashboard.home.status.${status}`) }}
  </span>
</template>

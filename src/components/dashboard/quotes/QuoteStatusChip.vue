<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { SupplierQuoteStatus } from '@/mocks/dashboard-quotes'

/** Status pill of the dashboard quotes table and offer drawer (Figma "Frame 512"). */
defineProps<{ status: SupplierQuoteStatus }>()
const { t } = useI18n()

const toneClasses: Record<SupplierQuoteStatus, string> = {
  awaitingOffer: 'bg-orange/10 text-waiting',
  awaitingPayment: 'bg-waiting/15 text-waiting',
  offerSent: 'bg-info/10 text-match',
  accepted: 'bg-success/10 text-success',
  approved: 'bg-success/10 text-success',
  closed: 'bg-error/15 text-error',
}
</script>

<template>
  <span
    class="inline-flex h-8 shrink-0 items-center justify-center rounded-full p-2 text-sm leading-4 whitespace-nowrap"
    :class="toneClasses[status]"
  >
    {{ t(`dashboard.quotes.status.${status}`) }}
  </span>
</template>

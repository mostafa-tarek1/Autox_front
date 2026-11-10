<script setup lang="ts">
import PriceTag from '@/components/ui/PriceTag.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import BorderIcon from '@/assets/icons/border-full--stroke-rounded.svg'
import CalendarIcon from '@/assets/icons/calendar-02--duotone-rounded.svg'
import MoneyIcon from '@/assets/icons/money-04--duotone-rounded.svg'
import PaymentIcon from '@/assets/icons/payment-02--duotone-rounded.svg'
import BaseButton from '@/components/ui/BaseButton.vue'
import type { Payment } from '@/mocks/billing'

import { formatDate } from './formatDate'
import InfoItem from './InfoItem.vue'
import StatusChip, { type StatusTone } from '@/components/ui/StatusChip.vue'

const props = defineProps<{ payment: Payment }>()
const emit = defineEmits<{ pay: [payment: Payment] }>()
const { t } = useI18n()

const statusTone = computed<StatusTone>(() => {
  switch (props.payment.status) {
    case 'pending':
      return 'pending'
    case 'failed':
      return 'error'
    default:
      return 'paid'
  }
})
</script>

<template>
  <article
    class="flex flex-col gap-6 rounded-3xl border border-line bg-white px-4 pt-4 pb-3 shadow-card"
  >
    <header
      class="flex flex-col gap-3 rounded-lg bg-surface px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="flex flex-wrap items-center gap-6">
        <StatusChip :tone="statusTone">{{
          t(`billing.paymentStatus.${payment.status}`)
        }}</StatusChip>
        <p class="flex items-center gap-1 text-body-sm">
          <BorderIcon class="size-4 text-primary" aria-hidden="true" />
          <span class="text-secondary">{{ t('billing.orderNumber') }}</span>
          <span dir="ltr" class="text-ink">#{{ payment.orderNumber }}</span>
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-6">
        <BaseButton
          variant="outline"
          size="sm"
          class="h-[38px] px-6!"
          :to="`/orders/${payment.orderNumber}`"
        >
          {{ t('billing.orderDetails') }}
        </BaseButton>
        <BaseButton
          v-if="payment.status === 'pending'"
          size="sm"
          class="h-9 px-6!"
          @click="emit('pay', payment)"
        >
          {{ t('billing.completePayment') }}
        </BaseButton>
      </div>
    </header>

    <div class="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-36 sm:gap-y-4">
      <InfoItem :label="t('billing.amount')" :icon="MoneyIcon">
        <PriceTag :amount="payment.amount" class="text-primary [&_svg]:text-secondary" />
      </InfoItem>
      <InfoItem :label="t('billing.paymentMethod')" :icon="PaymentIcon">
        {{ t(`billing.paymentMethods.${payment.method}`) }}
      </InfoItem>
      <InfoItem :label="t('billing.transactionDate')" :icon="CalendarIcon">
        <span class="tabular-nums">{{ formatDate(payment.date) }}</span>
      </InfoItem>
    </div>
  </article>
</template>

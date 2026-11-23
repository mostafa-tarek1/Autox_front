<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import PriceTag from '@/components/ui/PriceTag.vue'
import type { QuotePaymentSummary } from '@/mocks/quotes'

/** "ملخص الطلب" card on the quote payment page (Figma 686:8465). */
defineProps<{ summary: QuotePaymentSummary }>()
const { t } = useI18n()
</script>

<template>
  <section class="flex flex-col gap-4 rounded-2xl bg-white" aria-labelledby="quote-summary-title">
    <h2 id="quote-summary-title" class="border-b border-line px-6 py-5 text-h3 text-black">
      {{ t('quotes.payment.summary') }}
    </h2>
    <div class="flex flex-col gap-4 px-6 pb-6">
      <dl class="flex flex-col gap-4 text-body-md text-secondary">
        <div class="flex h-7 items-center justify-between">
          <dt>{{ t('quotes.payment.pieces') }}</dt>
          <dd>{{ t('quotes.payment.piecesCount', { count: summary.pieces }) }}</dd>
        </div>
        <div class="flex h-7 items-center justify-between">
          <dt>{{ t('quotes.payment.subtotal') }}</dt>
          <dd>
            <PriceTag :amount="summary.subtotal" :grouping="false" class="text-h4 text-primary" />
          </dd>
        </div>
        <div class="flex h-7 items-center justify-between">
          <dt>{{ t('quotes.payment.vat') }}</dt>
          <dd>
            <PriceTag :amount="summary.vat" :grouping="false" class="text-h4 text-primary" />
          </dd>
        </div>
      </dl>
      <div class="flex items-center justify-between rounded-lg bg-surface p-2">
        <span class="text-body-md text-secondary">{{ t('quotes.payment.total') }}</span>
        <PriceTag :amount="summary.total" :grouping="false" class="text-h3 text-primary" />
      </div>
    </div>
  </section>
</template>

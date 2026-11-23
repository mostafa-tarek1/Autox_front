<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import ArrowRightIcon from '@/assets/icons/arrow-right-01--stroke-standard.svg'
import QuoteBankTransfer from '@/components/quotes/QuoteBankTransfer.vue'
import QuoteOrderSummary from '@/components/quotes/QuoteOrderSummary.vue'
import QuoteSuccessModal from '@/components/quotes/QuoteSuccessModal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import XPattern from '@/components/ui/XPattern.vue'
import { quotePaymentSummary } from '@/mocks/quotes'

/** Bank-transfer payment for an accepted quotation offer (Figma 686:8455). */
const { t } = useI18n()
const showSuccess = ref(false)
</script>

<template>
  <section class="relative isolate overflow-hidden bg-primary">
    <XPattern class="absolute top-0 right-0 -z-10 h-[237px] w-[333px] text-accent opacity-10" />
    <div class="page-container flex min-h-[152px] items-center py-8">
      <h1 class="text-[28px]/[44px] font-bold text-white sm:text-display">
        {{ t('quotes.payment.title') }}
      </h1>
    </div>
  </section>

  <div class="page-container flex flex-col gap-4 pt-4">
    <BaseButton variant="soft" :to="{ name: 'quotes' }" class="self-end">
      <template #icon
        ><ArrowRightIcon class="size-5 ltr:-scale-x-100" aria-hidden="true"
      /></template>
      {{ t('quotes.payment.backToOffers') }}
    </BaseButton>

    <div class="flex flex-col gap-8 lg:flex-row lg:items-start">
      <QuoteBankTransfer
        :amount="quotePaymentSummary.total"
        class="min-w-0 lg:w-[783px] lg:shrink-0"
        @submitted="showSuccess = true"
      />
      <QuoteOrderSummary :summary="quotePaymentSummary" class="lg:w-[385px] lg:shrink-0" />
    </div>
  </div>

  <QuoteSuccessModal
    v-model:open="showSuccess"
    :message="t('quotes.payment.success')"
    :action-label="t('quotes.request.track')"
    :to="{ name: 'quotes' }"
  />
</template>

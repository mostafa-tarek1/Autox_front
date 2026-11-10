<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import TickIcon from '@/assets/icons/tick-02--solid-standard.svg'
import Illustration from '@/assets/images/shop/payment-verification.svg'
import BaseButton from '@/components/ui/BaseButton.vue'

/** Bank-transfer review state (Figma "Frame 106" set 235:9257): pending, then confirmed. */
defineProps<{ confirmed: boolean }>()
const { t } = useI18n()
</script>

<template>
  <section
    class="flex flex-col items-center gap-8 rounded-2xl bg-white px-6 py-10"
    role="status"
    aria-live="polite"
  >
    <div
      v-if="confirmed"
      class="flex w-full max-w-[320px] flex-col items-center gap-6 rounded-2xl bg-surface p-6"
    >
      <div class="flex flex-col items-center gap-2">
        <span class="grid size-10 place-items-center rounded-full bg-accent text-primary">
          <TickIcon class="size-8" aria-hidden="true" />
        </span>
        <p class="text-h4 text-secondary">{{ t('shop.bankTransfer.confirmed') }}</p>
      </div>
      <BaseButton block :to="{ name: 'checkout-confirmation' }">{{
        t('shop.cart.trackOrder')
      }}</BaseButton>
    </div>
    <div
      v-else
      class="flex w-full max-w-[320px] flex-col items-center gap-2 rounded-2xl bg-surface p-6 text-center"
    >
      <p class="text-h4 text-secondary">{{ t('shop.bankTransfer.pendingTitle') }}</p>
      <p class="text-body-sm text-primary">{{ t('shop.bankTransfer.pendingHint') }}</p>
    </div>
    <Illustration class="h-auto w-full max-w-[321px]" aria-hidden="true" />
  </section>
</template>

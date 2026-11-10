<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import Illustration from '@/assets/images/shop/availability-pending.svg'

/** Waiting for suppliers to confirm quantities (Figma 194:4715). */
const { t } = useI18n()
</script>

<template>
  <section
    class="flex flex-col items-center gap-6 rounded-2xl bg-white px-6 py-10"
    role="status"
    aria-live="polite"
  >
    <div
      class="flex max-w-[363px] flex-col items-center gap-2 rounded-2xl bg-surface p-6 text-center"
    >
      <p class="text-h4 text-secondary">{{ t('shop.availability.waitingTitle') }}</p>
      <p class="text-body-sm text-primary">{{ t('shop.availability.waitingHint') }}</p>
    </div>
    <Illustration class="h-auto w-full max-w-[389px]" aria-hidden="true" />
  </section>
</template>

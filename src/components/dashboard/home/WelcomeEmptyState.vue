<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AddIcon from '@/assets/icons/add-01--stroke-rounded.svg'
import StoreAddIcon from '@/assets/icons/store-add-02--stroke-rounded.svg'
import BaseButton from '@/components/ui/BaseButton.vue'

/** Empty state for a new supplier (Figma "ترحيب" 768:16476). */
const { t } = useI18n()
</script>

<template>
  <section
    class="mx-auto grid w-full max-w-[768px] place-items-center rounded-3xl bg-white px-4 py-16 shadow-card sm:min-h-[459px]"
    aria-labelledby="welcome-title"
  >
    <div
      class="flex w-full max-w-[315px] flex-col items-center gap-6 rounded-2xl border border-line bg-surface px-10 py-6 text-center"
    >
      <span class="grid size-[68px] place-items-center rounded-full bg-white p-[18px] text-primary">
        <StoreAddIcon class="size-8" aria-hidden="true" />
      </span>
      <h2 id="welcome-title" class="text-h4 text-ink">{{ t('dashboard.home.welcome.title') }}</h2>
      <BaseButton :to="{ name: 'dashboard-product-new' }">
        <template #icon><AddIcon class="size-5" aria-hidden="true" /></template>
        {{ t('dashboard.home.welcome.action') }}
      </BaseButton>
    </div>
  </section>
</template>

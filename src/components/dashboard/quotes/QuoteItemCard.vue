<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import SecurityCheckIcon from '@/assets/icons/security-check--stroke-rounded.svg'
import { useLocalizedText } from '@/composables/useLocalizedText'
import type { SupplierQuoteItem } from '@/mocks/dashboard-quotes'

/** Requested part inside the offer-details drawer (Figma "product card", 424×122). */
defineProps<{ item: SupplierQuoteItem }>()
const { t } = useI18n()
const localized = useLocalizedText()
</script>

<template>
  <article
    class="flex items-start justify-between gap-8 rounded-xl border border-line bg-white p-3"
  >
    <div class="flex min-w-0 flex-col items-start gap-2">
      <h4 class="text-body-md text-ink">{{ localized(item.title) }}</h4>
      <p dir="ltr" class="text-body-md text-primary">{{ item.partNumber }}</p>
      <span
        class="inline-flex h-8 items-center gap-1 rounded-full bg-surface px-2 py-1 text-body-sm text-primary"
      >
        <SecurityCheckIcon class="size-4" aria-hidden="true" />
        {{ t(`catalog.origins.${item.origin}`) }}
      </span>
    </div>
    <span class="shrink-0 text-body-sm text-secondary">
      {{ t('dashboard.quotes.details.pieces', { count: item.quantity }) }}
    </span>
  </article>
</template>

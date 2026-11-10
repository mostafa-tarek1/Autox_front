<script setup lang="ts">
import PriceTag from '@/components/ui/PriceTag.vue'
import { useI18n } from 'vue-i18n'

import SecurityCheckIcon from '@/assets/icons/security-check--solid-rounded.svg'

import type { OrderItem } from './types'

/**
 * `rich`: placed orders (image tile, bold title, unit price in primary).
 * `compact`: seller requests and previous orders (no image, line total).
 */
withDefaults(defineProps<{ item: OrderItem; variant?: 'rich' | 'compact'; bordered?: boolean }>(), {
  variant: 'rich',
  bordered: false,
})
const { t } = useI18n()
</script>

<template>
  <div
    class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
    :class="bordered && 'rounded-xl border border-line bg-white p-3'"
  >
    <div class="flex min-w-0 flex-1 items-center gap-4">
      <span
        v-if="variant === 'rich'"
        class="grid size-20 shrink-0 place-items-center rounded-xl bg-surface sm:size-24"
      >
        <img
          :src="item.brandLogo"
          :alt="item.brandName"
          width="55"
          height="28"
          class="h-7 w-[55px] object-contain"
        />
      </span>
      <div class="flex min-w-0 flex-1 flex-col items-start gap-2">
        <h3 :class="variant === 'rich' ? 'text-h4' : 'text-body-md'" class="text-ink">
          {{ item.title }}
        </h3>
        <p dir="ltr" class="text-body-md text-primary">{{ item.partNumber }}</p>
        <span
          class="inline-flex h-8 items-center gap-1 rounded-full px-2 py-1 text-body-sm text-primary"
          :class="variant === 'rich' ? 'bg-white' : 'bg-surface'"
        >
          <SecurityCheckIcon v-if="item.origin === 'original'" class="size-4" aria-hidden="true" />
          {{ t(`catalog.origins.${item.origin}`) }}
        </span>
      </div>
    </div>
    <div class="flex shrink-0 items-center gap-6 sm:gap-8">
      <span class="text-body-sm text-secondary">{{
        t('orders.pieces', { count: item.quantity })
      }}</span>
      <PriceTag
        :grouping="false"
        v-if="variant === 'rich'"
        :amount="item.price"
        class="text-h4 text-primary"
      />
      <PriceTag
        :grouping="false"
        v-else
        :amount="item.price"
        decimals
        small-symbol
        class="text-body-sm text-ink"
      />
    </div>
  </div>
</template>

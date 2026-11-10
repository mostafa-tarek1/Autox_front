<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import HotPriceIcon from '@/assets/icons/hot-price--solid-rounded.svg'
import SecurityCheckIcon from '@/assets/icons/security-check--solid-rounded.svg'
import TickIcon from '@/assets/icons/tick-02--solid-rounded.svg'
import BaseChip from '@/components/ui/BaseChip.vue'
import PriceTag from '@/components/ui/PriceTag.vue'
import QuantityStepper from '@/components/ui/QuantityStepper.vue'
import type { Product } from '@/types/catalog'

const props = defineProps<{ product: Product }>()
const quantity = defineModel<number>('quantity', { default: 0 })
const { t } = useI18n()

const isOriginal = computed(() => props.product.origin === 'original')

const borderClass = computed(() => {
  switch (props.product.highlight) {
    case 'cheapest':
      return 'border-accent'
    case 'matchesRequest':
      return 'border-match'
    default:
      return 'border-transparent'
  }
})
</script>

<template>
  <article
    class="flex flex-col gap-4 rounded-2xl border bg-white p-4 sm:flex-row sm:items-center sm:gap-8"
    :class="borderClass"
  >
    <div class="flex min-w-0 flex-1 flex-col items-start gap-2">
      <div class="flex items-center gap-2">
        <span class="grid size-6 shrink-0 place-items-center rounded bg-white">
          <img
            :src="product.brandLogo"
            alt=""
            width="24"
            height="24"
            class="max-h-6 w-full object-contain"
          />
        </span>
        <h3 class="text-body-md text-ink">{{ product.title }}</h3>
      </div>
      <p dir="ltr" class="text-body-md text-primary">{{ product.partNumber }}</p>
      <p class="text-body-md text-muted">{{ product.supplier }}</p>
      <div class="flex flex-wrap items-start gap-2">
        <BaseChip :tone="isOriginal ? 'primary' : 'neutral'">
          <template v-if="isOriginal" #icon>
            <SecurityCheckIcon class="size-4" aria-hidden="true" />
          </template>
          {{ t(`catalog.origins.${product.origin}`) }}
        </BaseChip>
        <BaseChip v-if="product.highlight === 'cheapest'" tone="success">
          <template #icon><HotPriceIcon class="size-3.5" aria-hidden="true" /></template>
          {{ t('catalog.badges.cheapest') }}
        </BaseChip>
        <BaseChip v-else-if="product.highlight === 'matchesRequest'" tone="info">
          <template #icon><TickIcon class="size-3.5" aria-hidden="true" /></template>
          {{ t('catalog.badges.matchesRequest') }}
        </BaseChip>
      </div>
    </div>

    <div class="flex items-center justify-between gap-6 sm:w-[200px] sm:justify-end">
      <PriceTag :amount="product.price" decimals size="lg" tone="ink" />
      <QuantityStepper
        v-model="quantity"
        :label="t('catalog.quantityFor', { part: product.partNumber })"
      />
    </div>
  </article>
</template>

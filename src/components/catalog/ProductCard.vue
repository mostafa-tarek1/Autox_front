<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import { useI18n } from 'vue-i18n'

import ArrowDownIcon from '@/assets/icons/arrow-down-01--stroke-standard.svg'
import HotPriceIcon from '@/assets/icons/hot-price--solid-rounded.svg'
import SecurityCheckIcon from '@/assets/icons/security-check--solid-rounded.svg'
import TickIcon from '@/assets/icons/tick-02--solid-rounded.svg'
import BaseChip from '@/components/ui/BaseChip.vue'
import PriceTag from '@/components/ui/PriceTag.vue'
import QuantityStepper from '@/components/ui/QuantityStepper.vue'
import type { Product } from '@/types/catalog'

/**
 * Search result card (Figma "product card" 1024:7577).
 * - `default`: white card; the cheapest offer gets an accent outline and, when the part has
 *   alternatives, the collapsible "القطع البديلة" panel below it.
 * - `alternative`: a card inside that panel (thin border + soft shadow, whole-riyal price).
 */
const props = withDefaults(
  defineProps<{
    product: Product
    variant?: 'default' | 'alternative'
    /** Current cart quantity of an alternative part, by id. */
    alternativeQuantity?: (id: string) => number
  }>(),
  { variant: 'default', alternativeQuantity: () => 0 },
)
const emit = defineEmits<{ 'update:alternativeQuantity': [product: Product, quantity: number] }>()
const quantity = defineModel<number>('quantity', { default: 0 })
const { t } = useI18n()

const panelId = useId()
const isExpanded = ref(false)

const isAlternative = computed(() => props.variant === 'alternative')
const isOriginal = computed(() => props.product.origin === 'original')
const alternatives = computed(() => (isAlternative.value ? [] : (props.product.alternatives ?? [])))

const cardClass = computed(() => {
  if (isAlternative.value) {
    return 'border border-line shadow-card'
  }
  return props.product.highlight === 'cheapest' ? 'ring-1 ring-accent' : ''
})
</script>

<template>
  <article class="flex flex-col gap-4 rounded-2xl bg-white p-4" :class="cardClass">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      <div class="flex min-w-0 flex-1 flex-col items-start gap-2">
        <div class="flex flex-wrap items-center gap-2">
          <span class="grid size-6 shrink-0 place-items-center rounded bg-white">
            <img
              :src="product.brandLogo"
              alt=""
              width="24"
              height="24"
              class="h-[19px] w-[19.5px] object-contain"
            />
          </span>
          <h3 class="text-body-md text-ink">{{ product.title }}</h3>
          <BaseChip v-if="product.highlight === 'cheapest'" tone="success" class="h-6! px-2! py-1!">
            <template #icon><HotPriceIcon class="size-3.5" aria-hidden="true" /></template>
            {{ t('catalog.badges.cheapest') }}
          </BaseChip>
          <BaseChip
            v-else-if="product.highlight === 'matchesRequest'"
            tone="info"
            class="h-6! px-2! py-1!"
          >
            <template #icon><TickIcon class="size-3.5" aria-hidden="true" /></template>
            {{ t('catalog.badges.matchesRequest') }}
          </BaseChip>
        </div>
        <p dir="ltr" class="text-body-md text-primary">{{ product.partNumber }}</p>
        <p class="text-body-md text-muted">{{ product.supplier }}</p>
        <BaseChip :tone="isOriginal || isAlternative ? 'primary' : 'neutral'">
          <template v-if="isOriginal" #icon>
            <SecurityCheckIcon class="size-4" aria-hidden="true" />
          </template>
          {{ t(`catalog.origins.${product.origin}`) }}
        </BaseChip>
      </div>

      <div
        class="flex items-center justify-between gap-6 sm:justify-end"
        :class="isAlternative ? 'sm:w-[170px]' : 'sm:w-[200px]'"
      >
        <PriceTag
          :amount="product.price"
          :decimals="!isAlternative"
          size="lg"
          tone="ink"
          class="whitespace-nowrap"
        />
        <QuantityStepper
          v-model="quantity"
          :label="t('catalog.quantityFor', { part: product.partNumber })"
        />
      </div>
    </div>

    <div
      v-if="alternatives.length"
      class="flex flex-col rounded-xl border-[0.5px] border-accent bg-surface p-3"
      :class="isExpanded && 'gap-6'"
    >
      <button
        type="button"
        class="flex w-full items-center gap-2 rounded-lg text-start text-button text-primary transition-colors"
        :class="isExpanded && 'bg-white p-2'"
        :aria-expanded="isExpanded"
        :aria-controls="panelId"
        @click="isExpanded = !isExpanded"
      >
        <span class="flex-1">{{ t('catalog.alternatives.title') }}</span>
        <span class="sr-only">
          {{ isExpanded ? t('catalog.alternatives.hide') : t('catalog.alternatives.show') }}
        </span>
        <ArrowDownIcon
          class="size-5 shrink-0 text-ink transition-transform"
          :class="isExpanded && 'rotate-180'"
          aria-hidden="true"
        />
      </button>
      <ul
        v-if="isExpanded"
        :id="panelId"
        class="flex flex-col gap-4"
        :aria-label="t('catalog.alternatives.for', { part: product.partNumber })"
      >
        <li v-for="alternative in alternatives" :key="alternative.id">
          <ProductCard
            :product="alternative"
            variant="alternative"
            :quantity="alternativeQuantity(alternative.id)"
            @update:quantity="emit('update:alternativeQuantity', alternative, $event)"
          />
        </li>
      </ul>
    </div>
  </article>
</template>

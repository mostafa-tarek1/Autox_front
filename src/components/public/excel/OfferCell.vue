<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import RiyalIcon from '@/assets/brand/riyal.svg'
import HotPriceIcon from '@/assets/icons/hot-price--solid-rounded.svg'
import CartAddIcon from '@/assets/icons/shopping-cart-add-01--stroke-rounded.svg'
import TickIcon from '@/assets/icons/tick-02--solid-rounded.svg'
import type { ExcelOffer } from '@/mocks/public'

import OfferQuantity from './OfferQuantity.vue'

const props = defineProps<{ offer: ExcelOffer; requestedQuantity: number; partNumber: string }>()
const emit = defineEmits<{ addToCart: [offerId: string, quantity: number] }>()
const { t } = useI18n()

const quantity = ref(Math.min(props.requestedQuantity, props.offer.stock))
const isAdded = ref(false)

function add(): void {
  emit('addToCart', props.offer.id, quantity.value)
  isAdded.value = true
}

const formatPrice = (amount: number) =>
  amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
</script>

<template>
  <article
    class="flex flex-col items-start gap-2 rounded-xl bg-white px-2 py-3"
    :class="offer.badge === 'cheapest' ? 'border-[0.5px] border-accent' : 'border border-line'"
  >
    <div class="flex w-full items-center justify-between gap-1">
      <span class="inline-flex items-center gap-1 text-h4 text-ink">
        <span class="tabular-nums">{{ formatPrice(offer.price) }}</span>
        <RiyalIcon class="h-2.5 w-[9px] shrink-0" role="img" :aria-label="t('common.currency')" />
      </span>
      <span
        v-if="offer.badge === 'cheapest'"
        class="inline-flex h-6 items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-sm leading-4 text-success"
      >
        <HotPriceIcon class="size-3.5" aria-hidden="true" />
        {{ t('public.excel.badges.cheapest') }}
      </span>
      <span
        v-else-if="offer.badge === 'matches'"
        class="inline-flex h-6 items-center gap-1 rounded-full bg-info/10 px-2 py-1 text-sm leading-4 text-match"
      >
        <TickIcon class="size-3.5" aria-hidden="true" />
        {{ t('public.excel.badges.matches') }}
      </span>
    </div>
    <p class="text-body-sm text-muted">{{ t('public.excel.inStock', { count: offer.stock }) }}</p>
    <p class="text-body-sm text-muted">{{ offer.supplier }}</p>
    <div class="flex w-full items-center gap-2">
      <OfferQuantity
        v-model="quantity"
        :max="offer.stock"
        :label="t('catalog.quantityFor', { part: partNumber })"
      />
      <button
        type="button"
        class="grid size-9 shrink-0 place-items-center rounded-lg p-2 transition-colors"
        :class="isAdded ? 'bg-primary text-accent' : 'bg-accent text-primary hover:brightness-95'"
        :aria-label="t('public.excel.addToCart')"
        :aria-pressed="isAdded"
        @click="add"
      >
        <CartAddIcon class="size-5" aria-hidden="true" />
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useLocalizedText } from '@/composables/useLocalizedText'
import PriceTag from '@/components/ui/PriceTag.vue'

import CartItemCard from './CartItemCard.vue'
import type { CartSupplierGroup } from './types'

/** One supplier's lines in the cart (Figma 588:16341): name, total pill, then the lines. */
defineProps<{ group: CartSupplierGroup }>()
const emit = defineEmits<{ quantity: [id: string, value: number] }>()
const { t } = useI18n()
const localized = useLocalizedText()
</script>

<template>
  <section class="flex flex-col gap-4 rounded-lg border border-line p-3">
    <header class="flex items-center justify-between gap-4">
      <h3 class="text-h4 text-ink">{{ localized(group.supplier) }}</h3>
      <span
        class="inline-flex items-center rounded-full bg-surface px-3 py-1 text-sm leading-7 font-semibold text-ink"
        :aria-label="t('shop.cart.groupTotal', { supplier: localized(group.supplier) })"
      >
        <PriceTag :amount="group.total" decimals :grouping="false" small-symbol />
      </span>
    </header>
    <ul class="flex flex-col gap-4">
      <li v-for="item in group.items" :key="item.id">
        <CartItemCard :item="item" @update:quantity="emit('quantity', item.id, $event)" />
      </li>
    </ul>
  </section>
</template>

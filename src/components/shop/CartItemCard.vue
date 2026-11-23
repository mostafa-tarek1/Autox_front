<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import PriceTag from '@/components/ui/PriceTag.vue'
import QuantityStepper from '@/components/ui/QuantityStepper.vue'

import OriginChip from './OriginChip.vue'
import type { CartItem } from './types'

/** Cart line (Figma "product card" 194:4196): part details, quantity and line total. */
const props = defineProps<{ item: CartItem }>()
const emit = defineEmits<{ 'update:quantity': [value: number] }>()
const { t } = useI18n()

const quantity = computed({
  get: () => props.item.quantity,
  set: (value: number) => emit('update:quantity', value),
})
</script>

<template>
  <article
    class="flex flex-col gap-4 rounded-xl border border-line bg-white p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
  >
    <div class="flex min-w-0 flex-col items-start gap-2">
      <h3 class="text-body-md text-ink">{{ item.title }}</h3>
      <p dir="ltr" class="text-body-md text-primary">{{ item.partNumber }}</p>
      <OriginChip :origin="item.origin" />
    </div>

    <div class="flex shrink-0 items-center justify-between gap-6 sm:justify-end">
      <PriceTag
        :amount="item.unitPrice * item.quantity"
        decimals
        :grouping="false"
        small-symbol
        class="text-body-sm text-ink"
      />
      <QuantityStepper
        v-model="quantity"
        variant="surface"
        size="sm"
        :min="1"
        :label="t('catalog.quantityFor', { part: item.partNumber })"
      />
    </div>
  </article>
</template>

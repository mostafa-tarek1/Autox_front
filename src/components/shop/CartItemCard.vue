<script setup lang="ts">
import QuantityStepper from '@/components/ui/QuantityStepper.vue'
import PriceTag from '@/components/ui/PriceTag.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import DeleteIcon from '@/assets/icons/delete-01--stroke-standard.svg'

import BrandThumb from './BrandThumb.vue'
import OriginChip from './OriginChip.vue'
import type { CartItem } from './types'

const props = withDefaults(defineProps<{ item: CartItem; removable?: boolean }>(), {
  removable: false,
})
const emit = defineEmits<{ 'update:quantity': [value: number]; remove: [] }>()
const { t } = useI18n()

const quantity = computed({
  get: () => props.item.quantity,
  set: (value: number) => emit('update:quantity', value),
})
</script>

<template>
  <article class="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-4">
    <div v-if="$slots.badge" class="flex">
      <slot name="badge" />
    </div>

    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      <div class="flex min-w-0 items-center gap-4">
        <BrandThumb :logo="item.brandLogo" :name="item.brandName" />
        <div class="flex min-w-0 flex-col items-start gap-2">
          <h3 class="text-h4 text-ink">{{ item.title }}</h3>
          <p dir="ltr" class="text-body-md text-primary">{{ item.partNumber }}</p>
          <OriginChip :origin="item.origin" />
        </div>
      </div>

      <div class="flex items-center justify-between gap-6 sm:justify-end">
        <PriceTag tone="ink" :amount="item.unitPrice * item.quantity" size="xl" />
        <QuantityStepper
          variant="surface"
          :min="1"
          size="md"
          v-model="quantity"
          :label="t('catalog.quantityFor', { part: item.partNumber })"
        />
        <button
          v-if="removable"
          type="button"
          class="grid size-9 place-items-center rounded-lg text-secondary transition-colors hover:bg-error/10 hover:text-error"
          :aria-label="t('shop.cart.remove', { title: item.title })"
          @click="emit('remove')"
        >
          <DeleteIcon class="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>

    <slot name="footer" />
  </article>
</template>

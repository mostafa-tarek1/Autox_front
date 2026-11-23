<script setup lang="ts">
import { useLocalizedText } from '@/composables/useLocalizedText'
import type { SupplierProduct } from '@/mocks/dashboard-products'

import OriginChip from './OriginChip.vue'

/** Bordered part card used in the alternatives drawer. */
defineProps<{ product: SupplierProduct }>()
const localized = useLocalizedText()
</script>

<template>
  <article class="flex flex-col items-start gap-2 rounded-xl border border-line p-3">
    <h3 class="text-body-md text-ink">{{ localized(product.name) }}</h3>
    <p class="text-body-md text-primary" dir="ltr">{{ product.partNumber }}</p>
    <OriginChip :origin="product.origin" />
  </article>
</template>

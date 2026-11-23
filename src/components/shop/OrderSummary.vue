<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import ShopCard from './ShopCard.vue'
import SummaryRow from './SummaryRow.vue'

withDefaults(
  defineProps<{
    count: number
    subtotal: number
    vat: number
    total: number
  }>(),
  {},
)
const { t } = useI18n()
</script>

<template>
  <ShopCard :title="t('shop.summary.title')" body-class="flex flex-col gap-4 px-6 pt-4 pb-6">
    <dl class="flex flex-col gap-4">
      <SummaryRow :label="t('shop.summary.itemsCount')">
        {{ t('shop.summary.pieces', { count }) }}
      </SummaryRow>
      <SummaryRow :label="t('shop.summary.subtotal')" :amount="subtotal" />
      <SummaryRow :label="t('shop.summary.vat')" :amount="vat" />
      <SummaryRow :label="t('shop.summary.total')" :amount="total" emphasis />
    </dl>
    <div v-if="$slots.default" class="flex flex-col gap-4">
      <slot />
    </div>
  </ShopCard>
</template>

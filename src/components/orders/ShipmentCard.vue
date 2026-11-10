<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import BorderIcon from '@/assets/icons/border-full--stroke-rounded.svg'

import OrderActionButton from './OrderActionButton.vue'
import OrderItemRow from './OrderItemRow.vue'
import OrderMeta from './OrderMeta.vue'
import OrderStatusChip from './OrderStatusChip.vue'
import type { Shipment } from './types'

withDefaults(defineProps<{ shipment: Shipment; orderId: string; allowReturn?: boolean }>(), {
  allowReturn: false,
})
const { t } = useI18n()
</script>

<template>
  <section
    class="flex flex-col gap-8 rounded-2xl border border-line px-3 pt-2 pb-3"
    :aria-label="t('orders.shipment', { number: shipment.number })"
  >
    <header
      class="flex flex-col gap-3 rounded-xl bg-surface p-3 md:flex-row md:items-center md:justify-between"
    >
      <div class="flex flex-wrap items-center gap-x-8 gap-y-2">
        <h3 class="text-h4 text-ink">{{ t('orders.shipment', { number: shipment.number }) }}</h3>
        <OrderStatusChip :status="shipment.status" />
        <OrderMeta :icon="BorderIcon" :label="t('orders.meta.trackingNumber')">
          <span dir="ltr">{{ shipment.trackingNumber }}</span>
        </OrderMeta>
      </div>
      <div class="flex flex-wrap items-center gap-4">
        <OrderActionButton>{{ t('orders.actions.reportProblem') }}</OrderActionButton>
        <OrderActionButton
          v-if="allowReturn && shipment.status === 'delivered'"
          :to="{ name: 'order-return', params: { id: orderId } }"
        >
          {{ t('orders.actions.return') }}
        </OrderActionButton>
      </div>
    </header>
    <ul class="flex flex-col gap-8">
      <li v-for="item in shipment.items" :key="item.id">
        <OrderItemRow :item="item" />
      </li>
    </ul>
  </section>
</template>

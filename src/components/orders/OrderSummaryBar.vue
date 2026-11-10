<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import BuildingIcon from '@/assets/icons/building-03--stroke-rounded.svg'
import BorderIcon from '@/assets/icons/border-full--stroke-rounded.svg'
import CalendarIcon from '@/assets/icons/calendar-02--stroke-rounded.svg'
import PaymentIcon from '@/assets/icons/payment-02--stroke-rounded.svg'

import OrderAmount from './OrderAmount.vue'
import OrderMeta from './OrderMeta.vue'
import OrderStatusChip from './OrderStatusChip.vue'
import type { Order } from './types'

/** Grey header strip of an order: status, seller, number, date, total + actions slot. */
defineProps<{ order: Order }>()
const { t } = useI18n()
</script>

<template>
  <div
    class="flex flex-col gap-4 rounded-lg bg-surface px-4 py-3 lg:flex-row lg:items-center lg:justify-between"
  >
    <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
      <OrderStatusChip :status="order.status" />
      <OrderMeta v-if="order.seller" :icon="BuildingIcon" :label="t('orders.meta.seller')">{{
        order.seller
      }}</OrderMeta>
      <OrderMeta :icon="BorderIcon" :label="t('orders.meta.orderNumber')">
        <span dir="ltr">{{ order.number }}</span>
      </OrderMeta>
      <OrderMeta :icon="CalendarIcon" :label="t('orders.meta.orderDate')">{{
        order.date
      }}</OrderMeta>
      <span class="inline-flex items-center gap-1 text-body-sm whitespace-nowrap">
        <PaymentIcon class="size-4 text-primary" aria-hidden="true" />
        <span class="text-secondary">{{
          t(order.kind === 'placed' ? 'orders.meta.totalPaid' : 'orders.meta.total')
        }}</span>
        <OrderAmount :amount="order.total" class="text-h4 text-primary" />
      </span>
    </div>
    <div class="flex flex-wrap items-center gap-4">
      <slot name="actions" />
    </div>
  </div>
</template>

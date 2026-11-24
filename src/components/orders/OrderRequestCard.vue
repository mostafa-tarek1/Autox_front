<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import BorderIcon from '@/assets/icons/border-full--stroke-rounded.svg'
import CalendarIcon from '@/assets/icons/calendar-02--stroke-rounded.svg'
import PolicyIcon from '@/assets/icons/shopping-cart-check-out-02--stroke-rounded.svg'

import OrderMeta from './OrderMeta.vue'
import SellerOrderBlock from './SellerOrderBlock.vue'
import type { OrderRequest } from './types'

/** Order card of the orders list (Figma 653:15290): number, date, one block per seller. */
defineProps<{ order: OrderRequest }>()
const emit = defineEmits<{ deleteSeller: [id: string]; showPolicy: [] }>()
const { t } = useI18n()
</script>

<template>
  <article
    class="flex flex-col gap-6 rounded-3xl border border-line bg-white p-4 shadow-card"
    :aria-label="`${t('orders.meta.orderNumber')} ${order.number}`"
  >
    <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
      <OrderMeta :icon="BorderIcon" :label="t('orders.meta.orderNumber')">
        <span dir="ltr">{{ order.number }}</span>
      </OrderMeta>
      <OrderMeta :icon="CalendarIcon" :label="t('orders.meta.orderDate')">{{
        order.date
      }}</OrderMeta>
    </div>

    <SellerOrderBlock
      v-for="entry in order.sellers"
      :key="entry.id"
      :entry="entry"
      :order-id="order.id"
      @delete="emit('deleteSeller', $event)"
    />

    <button
      type="button"
      class="flex items-center gap-2 self-start text-button text-primary"
      @click="emit('showPolicy')"
    >
      <PolicyIcon class="size-5" aria-hidden="true" />
      <span class="underline underline-offset-2">{{ t('orders.returnPolicy.open') }}</span>
    </button>
  </article>
</template>

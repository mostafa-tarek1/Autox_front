<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import BuildingIcon from '@/assets/icons/building-03--stroke-rounded.svg'
import DeleteIcon from '@/assets/icons/delete-01--stroke-standard.svg'
import PaymentIcon from '@/assets/icons/payment-02--stroke-rounded.svg'
import PriceTag from '@/components/ui/PriceTag.vue'

import OrderActionButton from './OrderActionButton.vue'
import OrderItemRow from './OrderItemRow.vue'
import OrderMeta from './OrderMeta.vue'
import OrderStatusChip from './OrderStatusChip.vue'
import type { SellerOrder } from './types'

/** One seller's part of an order (Figma 588:17789): status, seller, total, actions and lines. */
const props = defineProps<{ entry: SellerOrder; orderId: string }>()
const emit = defineEmits<{ delete: [id: string] }>()
const { t } = useI18n()

const isPaid = computed(() => props.entry.status === 'paid')
</script>

<template>
  <section class="flex flex-col gap-6 rounded-2xl border border-line bg-white p-4">
    <div
      class="flex flex-col gap-4 rounded-lg bg-surface px-4 py-3 lg:flex-row lg:items-center lg:justify-between"
    >
      <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
        <OrderStatusChip :status="entry.status" />
        <OrderMeta :icon="BuildingIcon" :label="t('orders.meta.seller')">{{
          entry.seller
        }}</OrderMeta>
        <span class="inline-flex items-center gap-1 text-body-sm whitespace-nowrap">
          <PaymentIcon class="size-4 text-primary" aria-hidden="true" />
          <span class="text-secondary">{{ t('orders.meta.total') }}</span>
          <PriceTag
            :grouping="false"
            :decimals="!Number.isInteger(entry.total)"
            :amount="entry.total"
            class="text-h4 text-primary"
          />
        </span>
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <template v-if="isPaid">
          <OrderActionButton :to="{ name: 'order-return', params: { id: orderId } }">
            {{ t('orders.actions.returnOrder') }}
          </OrderActionButton>
          <OrderActionButton>{{ t('orders.actions.invoice') }}</OrderActionButton>
        </template>
        <template v-else>
          <OrderActionButton
            v-if="entry.status === 'awaitingPayment'"
            tone="accent"
            :to="{ name: 'checkout-payment', query: { order: orderId } }"
          >
            {{ t('orders.actions.payNow') }}
          </OrderActionButton>
          <OrderActionButton
            icon-only
            :label="t('orders.actions.deleteSeller', { seller: entry.seller })"
            @click="emit('delete', entry.id)"
          >
            <DeleteIcon class="size-4 text-error" aria-hidden="true" />
          </OrderActionButton>
        </template>
      </div>
    </div>

    <ul class="flex flex-col gap-4">
      <li v-for="item in entry.items" :key="item.id">
        <OrderItemRow :item="item" variant="compact" bordered />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import BorderIcon from '@/assets/icons/border-full--stroke-rounded.svg'
import DeleteIcon from '@/assets/icons/delete-01--stroke-standard.svg'
import EditIcon from '@/assets/icons/pencil-edit-02--stroke-standard.svg'

import OrderActionButton from './OrderActionButton.vue'
import OrderItemRow from './OrderItemRow.vue'
import OrderMeta from './OrderMeta.vue'
import OrderSummaryBar from './OrderSummaryBar.vue'
import ShipmentCard from './ShipmentCard.vue'
import type { Order, OrderStatus } from './types'

const props = defineProps<{ order: Order }>()
const emit = defineEmits<{ delete: [id: string]; cancel: [id: string] }>()
const { t } = useI18n()

const editableStatuses: OrderStatus[] = [
  'awaitingAvailability',
  'awaitingPayment',
  'quantityUnavailable',
]
const cancellableStatuses: OrderStatus[] = ['awaitingPaymentConfirmation', 'shipping']

const isEditable = computed(() => editableStatuses.includes(props.order.status))
/** Orders already split into shipments can no longer be cancelled as a whole. */
const isCancellable = computed(
  () => cancellableStatuses.includes(props.order.status) && !props.order.shipments.length,
)
const isPlaced = computed(() => props.order.kind === 'placed')
const isCompleted = computed(() => props.order.status === 'completed')
const isDelivered = computed(() => props.order.status === 'delivered')
const detailsRoute = computed(() => ({ name: 'order-details', params: { id: props.order.id } }))
</script>

<template>
  <article
    class="flex flex-col gap-6 rounded-3xl border border-line bg-white p-4 shadow-card"
    :aria-label="`${t('orders.meta.orderNumber')} ${order.number}`"
  >
    <!-- In the list, split orders show the status on each shipment instead. -->
    <OrderSummaryBar :order="order" :hide-status="order.shipments.length > 0">
      <template #actions>
        <template v-if="isEditable">
          <OrderActionButton v-if="order.status === 'awaitingPayment'" tone="accent">
            {{ t('orders.actions.payNow') }}
          </OrderActionButton>
          <OrderActionButton v-else-if="order.status === 'quantityUnavailable'">
            {{ t('orders.actions.notifySellers') }}
          </OrderActionButton>
          <div class="flex items-center gap-4">
            <OrderActionButton icon-only :label="t('orders.actions.edit')">
              <EditIcon class="size-4 text-secondary" aria-hidden="true" />
            </OrderActionButton>
            <OrderActionButton
              icon-only
              :label="t('orders.actions.delete')"
              @click="emit('delete', order.id)"
            >
              <DeleteIcon class="size-4 text-error" aria-hidden="true" />
            </OrderActionButton>
          </div>
        </template>
        <template v-else-if="isCompleted">
          <OrderActionButton :to="{ name: 'order-return', params: { id: order.id } }">
            {{ t('orders.actions.return') }}
          </OrderActionButton>
          <OrderActionButton>{{ t('orders.actions.invoice') }}</OrderActionButton>
        </template>
        <template v-else>
          <OrderActionButton tone="outline" :to="detailsRoute">{{
            t('orders.actions.details')
          }}</OrderActionButton>
          <OrderActionButton>{{ t('orders.actions.invoice') }}</OrderActionButton>
          <OrderActionButton v-if="isCancellable" tone="danger" @click="emit('cancel', order.id)">
            {{ t('orders.actions.cancel') }}
          </OrderActionButton>
          <OrderActionButton
            v-else-if="isDelivered"
            :to="{ name: 'order-return', params: { id: order.id } }"
          >
            {{ t('orders.actions.return') }}
          </OrderActionButton>
        </template>
      </template>
    </OrderSummaryBar>

    <ul v-if="!isPlaced" class="flex flex-col gap-6">
      <li v-for="item in order.items" :key="item.id">
        <OrderItemRow :item="item" variant="compact" bordered />
      </li>
    </ul>

    <div v-else-if="order.shipments.length" class="flex flex-col gap-2">
      <ShipmentCard
        v-for="shipment in order.shipments"
        :key="shipment.id"
        :shipment="shipment"
        :order-id="order.id"
      />
    </div>

    <div v-else class="flex flex-col gap-2">
      <div
        v-if="order.items.length"
        class="flex flex-col items-start gap-8 rounded-2xl border border-line p-3"
      >
        <OrderMeta
          v-if="order.trackingNumber"
          :icon="BorderIcon"
          :label="t('orders.meta.trackingNumber')"
        >
          <span dir="ltr">{{ order.trackingNumber }}</span>
        </OrderMeta>
        <ul class="flex w-full flex-col gap-8">
          <li v-for="item in order.items" :key="item.id">
            <OrderItemRow :item="item" />
          </li>
        </ul>
      </div>
      <OrderItemRow
        v-for="item in order.untrackedItems ?? []"
        :key="item.id"
        :item="item"
        class="rounded-2xl border border-line p-3"
      />
    </div>
  </article>
</template>

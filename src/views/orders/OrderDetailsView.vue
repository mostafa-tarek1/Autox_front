<script setup lang="ts">
import PriceTag from '@/components/ui/PriceTag.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import CreditCardIcon from '@/assets/icons/credit-card--stroke-rounded.svg'
import LocationIcon from '@/assets/icons/location-04--stroke-rounded.svg'
import OrderActionButton from '@/components/orders/OrderActionButton.vue'
import OrderMeta from '@/components/orders/OrderMeta.vue'
import OrderSummaryBar from '@/components/orders/OrderSummaryBar.vue'
import PageHero from '@/components/layout/PageHero.vue'
import OrderTracker from '@/components/orders/OrderTracker.vue'
import ShipmentCard from '@/components/orders/ShipmentCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { findOrderDetails } from '@/mocks/orders'

const props = defineProps<{ id: string }>()
const { t } = useI18n()

const order = computed(() => findOrderDetails(props.id))
const piecesCount = computed(
  () =>
    order.value?.shipments.reduce(
      (sum, shipment) => sum + shipment.items.reduce((acc, item) => acc + item.quantity, 0),
      0,
    ) ?? 0,
)
const completedSteps = computed(() => {
  const statuses = order.value?.shipments.map((shipment) => shipment.status) ?? []
  if (statuses.length && statuses.every((status) => status === 'delivered')) {
    return 3
  }
  return 2
})
</script>

<template>
  <PageHero
    :title="t('orders.titles.details')"
    :breadcrumbs="[
      { label: t('orders.home'), to: { name: 'home' } },
      { label: t('orders.orders'), to: { name: 'orders' } },
      { label: t('orders.titles.details') },
    ]"
  />

  <div class="page-container mt-12">
    <div
      v-if="!order"
      class="flex flex-col items-center gap-4 rounded-2xl bg-white p-10 text-center"
    >
      <p class="text-h3 text-ink">{{ t('orders.details.notFound') }}</p>
      <BaseButton :to="{ name: 'orders' }">{{ t('orders.orders') }}</BaseButton>
    </div>

    <article v-else class="flex flex-col gap-8 rounded-2xl border border-line bg-white p-4">
      <OrderSummaryBar :order="order">
        <template #actions>
          <OrderActionButton>{{ t('orders.actions.invoice') }}</OrderActionButton>
        </template>
      </OrderSummaryBar>

      <OrderTracker :completed="completedSteps" />

      <div class="grid gap-4 lg:grid-cols-2">
        <section
          class="flex flex-col gap-4 rounded-2xl border border-line bg-white"
          aria-labelledby="summary-title"
        >
          <h2 id="summary-title" class="border-b border-line p-4 text-h4 text-ink">
            {{ t('orders.details.summary') }}
          </h2>
          <div class="flex flex-col gap-4 px-4 pb-4">
            <dl class="flex flex-col gap-4 text-body-md text-secondary">
              <div class="flex h-7 items-center justify-between">
                <dt>{{ t('orders.details.piecesCount') }}</dt>
                <dd>
                  <i18n-t keypath="orders.pieces" tag="span" scope="global">
                    <template #count>
                      <span class="text-h4 text-ink">{{ piecesCount }}</span>
                    </template>
                  </i18n-t>
                </dd>
              </div>
              <div class="flex h-7 items-center justify-between">
                <dt>{{ t('orders.details.subtotal') }}</dt>
                <dd>
                  <PriceTag
                    :grouping="false"
                    :amount="order.subtotal"
                    class="text-h4 text-primary"
                  />
                </dd>
              </div>
              <div class="flex h-7 items-center justify-between">
                <dt>{{ t('orders.details.vat') }}</dt>
                <dd>
                  <PriceTag :grouping="false" :amount="order.vat" class="text-h4 text-primary" />
                </dd>
              </div>
            </dl>
            <div
              class="flex items-center justify-between rounded-lg bg-surface p-2 text-body-md text-secondary"
            >
              <span>{{ t('orders.details.grandTotal') }}</span>
              <PriceTag :grouping="false" :amount="order.grandTotal" class="text-h3 text-primary" />
            </div>
          </div>
        </section>

        <div class="flex flex-col gap-4">
          <section
            class="flex flex-col gap-4 rounded-2xl border border-line bg-white pb-6"
            aria-labelledby="shipping-title"
          >
            <h2 id="shipping-title" class="border-b border-line p-4 text-h4 text-ink">
              {{ t('orders.details.shipping') }}
            </h2>
            <div class="flex flex-col items-start gap-2 px-6">
              <p class="text-body-md text-ink">{{ order.recipient }}</p>
              <OrderMeta :icon="LocationIcon" :label="t('orders.details.address')">{{
                order.address
              }}</OrderMeta>
            </div>
          </section>
          <section
            class="flex flex-col gap-4 rounded-2xl border border-line bg-white pb-6"
            aria-labelledby="payment-title"
          >
            <h2 id="payment-title" class="border-b border-line p-4 text-h4 text-ink">
              {{ t('orders.details.payment') }}
            </h2>
            <p class="flex items-center gap-1 px-4 text-body-sm text-ink">
              <CreditCardIcon class="size-6 text-primary" aria-hidden="true" />
              {{ t('orders.details.cardEnding', { digits: order.cardLast4 }) }}
            </p>
          </section>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <ShipmentCard
          v-for="shipment in order.shipments"
          :key="shipment.id"
          :shipment="shipment"
          :order-id="order.id"
          allow-return
        />
      </div>
    </article>
  </div>
</template>

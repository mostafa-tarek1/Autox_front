<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import PageHero from '@/components/layout/PageHero.vue'
import OrderRequestCard from '@/components/orders/OrderRequestCard.vue'
import OrdersToolbar from '@/components/orders/OrdersToolbar.vue'
import ReturnPolicyDialog from '@/components/orders/ReturnPolicyDialog.vue'
import type { OrderRequest } from '@/components/orders/types'
import { useLocalizedText } from '@/composables/useLocalizedText'
import { currentOrders, previousOrders } from '@/mocks/orders'

const { t } = useI18n()
const localized = useLocalizedText()
const route = useRoute()

type ListTab = 'current' | 'previous'

const tab = computed<ListTab>(() => (route.query.tab === 'previous' ? 'previous' : 'current'))
const sources: Record<ListTab, OrderRequest[]> = {
  current: currentOrders,
  previous: previousOrders,
}
const search = ref('')
const removedSellers = ref<Set<string>>(new Set())
const isPolicyOpen = ref(false)

/** Deleting a seller's request hides it; an order with no sellers left disappears. */
const orders = computed(() => {
  const term = search.value.trim().toLowerCase()
  return sources[tab.value]
    .map((order) => ({
      ...order,
      sellers: order.sellers.filter((entry) => !removedSellers.value.has(entry.id)),
    }))
    .filter(
      (order) =>
        order.sellers.length &&
        (!term ||
          order.number.toLowerCase().includes(term) ||
          order.sellers.some((entry) => localized(entry.seller).toLowerCase().includes(term))),
    )
})

function removeSeller(id: string): void {
  removedSellers.value = new Set([...removedSellers.value, id])
}
</script>

<template>
  <PageHero
    :title="t(`orders.titles.${tab}`)"
    :breadcrumbs="[
      { label: t('orders.home'), to: { name: 'home' } },
      { label: t('orders.orders') },
    ]"
  />
  <div class="page-container mt-12 flex flex-col gap-6">
    <OrdersToolbar v-model:search="search" :active="tab" />
    <ul v-if="orders.length" class="flex flex-col gap-6">
      <li v-for="order in orders" :key="order.id">
        <OrderRequestCard
          :order="order"
          @delete-seller="removeSeller"
          @show-policy="isPolicyOpen = true"
        />
      </li>
    </ul>
    <p v-else class="rounded-3xl bg-white p-10 text-center text-body-md text-secondary">
      {{ t('orders.empty') }}
    </p>
  </div>

  <ReturnPolicyDialog v-model:open="isPolicyOpen" />
</template>

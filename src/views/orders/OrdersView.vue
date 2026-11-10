<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import OrderCard from '@/components/orders/OrderCard.vue'
import PageHero from '@/components/layout/PageHero.vue'
import OrdersToolbar from '@/components/orders/OrdersToolbar.vue'
import { currentOrders, previousOrders } from '@/mocks/orders'

const { t } = useI18n()
const route = useRoute()

const tab = computed(() => (route.query.tab === 'previous' ? 'previous' : 'current'))
const search = ref('')
const removed = ref<Set<string>>(new Set())

const orders = computed(() => {
  const source = tab.value === 'previous' ? previousOrders : currentOrders
  const term = search.value.trim().toLowerCase()
  return source.filter(
    (order) =>
      !removed.value.has(order.id) &&
      (!term || order.number.toLowerCase().includes(term) || order.seller?.includes(term)),
  )
})

function remove(id: string): void {
  removed.value = new Set([...removed.value, id])
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
        <OrderCard :order="order" @delete="remove" @cancel="remove" />
      </li>
    </ul>
    <p v-else class="rounded-3xl bg-white p-10 text-center text-body-md text-secondary">
      {{ t('orders.empty') }}
    </p>
  </div>
</template>

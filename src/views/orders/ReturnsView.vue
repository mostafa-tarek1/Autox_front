<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import PageHero from '@/components/layout/PageHero.vue'
import OrdersToolbar from '@/components/orders/OrdersToolbar.vue'
import ReturnRequestCard from '@/components/orders/ReturnRequestCard.vue'
import { returnRequests } from '@/mocks/orders'

const { t } = useI18n()
const search = ref('')

const requests = computed(() => {
  const term = search.value.trim().toLowerCase()
  return term
    ? returnRequests.filter((request) => request.orderNumber.toLowerCase().includes(term))
    : returnRequests
})
</script>

<template>
  <PageHero
    :title="t('orders.titles.returns')"
    :breadcrumbs="[
      { label: t('orders.home'), to: { name: 'home' } },
      { label: t('orders.orders') },
    ]"
  />
  <div class="page-container mt-12 flex flex-col gap-6">
    <OrdersToolbar v-model:search="search" active="returns" />
    <ul v-if="requests.length" class="flex flex-col gap-6">
      <li v-for="request in requests" :key="request.id">
        <ReturnRequestCard :request="request" />
      </li>
    </ul>
    <p v-else class="rounded-3xl bg-white p-10 text-center text-body-md text-secondary">
      {{ t('returns.empty') }}
    </p>
  </div>
</template>

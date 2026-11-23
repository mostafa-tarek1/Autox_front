<script setup lang="ts">
import { ref } from 'vue'

import DashboardStats from '@/components/dashboard/DashboardStats.vue'
import SupplierOrderDetailsDrawer from '@/components/dashboard/home/SupplierOrderDetailsDrawer.vue'
import SupplierOrdersTable from '@/components/dashboard/home/SupplierOrdersTable.vue'
import { dashboardStats, supplierOrders, type SupplierOrder } from '@/mocks/dashboard'

const orders = ref<SupplierOrder[]>([...supplierOrders])
const selected = ref<SupplierOrder | null>(null)
const isDetailsOpen = ref(false)

function view(order: SupplierOrder): void {
  selected.value = order
  isDetailsOpen.value = true
}

/** UI phase: cancelling only updates the local list. */
function cancel(order: SupplierOrder): void {
  orders.value = orders.value.map((entry) =>
    entry.id === order.id ? { ...entry, status: 'cancelled' } : entry,
  )
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <DashboardStats :stats="dashboardStats" />
    <SupplierOrdersTable :orders="orders" @view="view" @cancel="cancel" />
    <SupplierOrderDetailsDrawer v-model:open="isDetailsOpen" :order="selected" />
  </div>
</template>

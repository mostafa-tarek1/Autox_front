<script setup lang="ts">
import DashboardPlaceholder from '@/components/dashboard/DashboardPlaceholder.vue'
import DashboardStats from '@/components/dashboard/DashboardStats.vue'
import { dashboardStats } from '@/mocks/dashboard'
</script>

<template>
  <div class="flex flex-col gap-8">
    <DashboardStats :stats="dashboardStats" />
    <DashboardPlaceholder />
  </div>
</template>

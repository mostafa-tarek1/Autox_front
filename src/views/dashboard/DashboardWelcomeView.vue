<script setup lang="ts">
import DashboardStats from '@/components/dashboard/DashboardStats.vue'
import WelcomeEmptyState from '@/components/dashboard/home/WelcomeEmptyState.vue'
import { emptyDashboardStats } from '@/mocks/dashboard'
</script>

<template>
  <div class="flex flex-col gap-8 sm:gap-16">
    <DashboardStats :stats="emptyDashboardStats" />
    <WelcomeEmptyState />
  </div>
</template>

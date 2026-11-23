<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import DashboardSidebar from '@/components/dashboard/layout/DashboardSidebar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import DashboardTopbar from '@/components/dashboard/layout/DashboardTopbar.vue'

/** Supplier dashboard shell (Figma "Dashboard" page): 228px sidebar at the start, 72px top bar, 24px content padding. */
const route = useRoute()
const isSidebarOpen = ref(false)

watch(
  () => route.fullPath,
  () => (isSidebarOpen.value = false),
)
</script>

<template>
  <div class="flex min-h-dvh bg-surface">
    <DashboardSidebar v-model:open="isSidebarOpen" />
    <div class="flex min-w-0 flex-1 flex-col">
      <DashboardTopbar @open-menu="isSidebarOpen = true" />
      <main id="main" class="flex-1 p-4 pb-16 sm:p-6 sm:pb-16">
        <RouterView />
      </main>
      <AppFooter />
    </div>
  </div>
</template>

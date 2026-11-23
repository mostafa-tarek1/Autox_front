<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import MoneyIcon from '@/assets/icons/money-01--stroke-rounded.svg'
import CartIcon from '@/assets/icons/shopping-cart-01--duotone-rounded.svg'
import WalletDoneIcon from '@/assets/icons/wallet-done-01--duotone-rounded.svg'
import WalletRemoveIcon from '@/assets/icons/wallet-remove-01--duotone-rounded.svg'
import type { DashboardStatsData } from '@/mocks/dashboard'

import DashboardStatCard from './DashboardStatCard.vue'

defineProps<{ stats: DashboardStatsData }>()
const { t } = useI18n()
</script>

<template>
  <section
    class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6"
    :aria-label="t('dashboard.stats.label')"
  >
    <DashboardStatCard
      :label="t('dashboard.stats.orders')"
      :value="stats.ordersCount"
      :icon="CartIcon"
    />
    <DashboardStatCard
      :label="t('dashboard.stats.sales')"
      :value="stats.totalSales"
      :icon="MoneyIcon"
      currency
    />
    <DashboardStatCard
      :label="t('dashboard.stats.withdrawable')"
      :value="stats.withdrawableBalance"
      :icon="WalletDoneIcon"
      currency
    />
    <DashboardStatCard
      :label="t('dashboard.stats.pending')"
      :value="stats.pendingBalance"
      :icon="WalletRemoveIcon"
      currency
    />
  </section>
</template>

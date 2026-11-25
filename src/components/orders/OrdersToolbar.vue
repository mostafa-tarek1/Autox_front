<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

import SearchIcon from '@/assets/icons/search-01--stroke-standard.svg'

import type { OrdersTab } from './types'

defineProps<{ active: OrdersTab }>()
const search = defineModel<string>('search', { default: '' })
const { t } = useI18n()

const tabs: Array<{ key: OrdersTab; to: RouteLocationRaw }> = [
  { key: 'current', to: { name: 'orders' } },
  { key: 'previous', to: { name: 'orders', query: { tab: 'previous' } } },
  { key: 'returns', to: { name: 'returns' } },
]
</script>

<template>
  <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
    <nav :aria-label="t('orders.tabs.label')">
      <!-- Phones: the tabs share one row in equal columns. -->
      <ul class="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-[21px]">
        <li v-for="tab in tabs" :key="tab.key">
          <RouterLink
            :to="tab.to"
            class="inline-flex h-[46px] w-full items-center justify-center rounded-xl border px-2 py-1 text-center text-button transition max-sm:leading-tight sm:px-6 sm:py-2 sm:whitespace-nowrap"
            :class="
              tab.key === active
                ? 'border-accent bg-accent text-primary'
                : 'border-line bg-surface text-primary hover:border-accent'
            "
            :aria-current="tab.key === active ? 'page' : undefined"
          >
            {{ t(`orders.tabs.${tab.key}`) }}
          </RouterLink>
        </li>
      </ul>
    </nav>
    <!-- The returns tab has a wider search box than the orders tabs in the design. -->
    <label
      class="flex h-[41px] w-full items-center gap-2 rounded-lg border-[0.5px] border-line bg-white p-2"
      :class="active === 'returns' ? 'lg:w-[486px]' : 'lg:w-[355px]'"
    >
      <SearchIcon class="size-4 shrink-0 text-secondary" aria-hidden="true" />
      <span class="sr-only">{{ t('orders.search') }}</span>
      <input
        v-model="search"
        type="search"
        :placeholder="t('orders.search')"
        class="min-w-0 flex-1 bg-transparent text-body-md text-ink outline-none placeholder:text-placeholder"
      />
    </label>
  </div>
</template>

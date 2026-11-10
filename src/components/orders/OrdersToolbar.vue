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
  <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <nav :aria-label="t('orders.tabs.label')" class="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
      <ul class="flex items-center gap-[21px]">
        <li v-for="tab in tabs" :key="tab.key">
          <RouterLink
            :to="tab.to"
            class="inline-flex h-[46px] items-center justify-center rounded-xl border px-6 py-2 text-button whitespace-nowrap transition"
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
    <label
      class="flex h-[41px] w-full items-center gap-2 rounded-lg border-[0.5px] border-line bg-white p-2 md:w-[486px]"
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

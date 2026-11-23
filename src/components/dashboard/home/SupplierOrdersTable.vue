<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import ArrowDownIcon from '@/assets/icons/arrow-down-01--stroke-standard.svg'
import FilterIcon from '@/assets/icons/filter-vertical--stroke-standard.svg'
import SearchIcon from '@/assets/icons/search-01--stroke-standard.svg'
import CartRemoveIcon from '@/assets/icons/shopping-cart-remove-02--stroke-rounded.svg'
import ViewIcon from '@/assets/icons/view--stroke-rounded.svg'
import BaseDropdown from '@/components/ui/BaseDropdown.vue'
import BasePagination from '@/components/ui/BasePagination.vue'
import DropdownItem from '@/components/ui/DropdownItem.vue'
import PriceTag from '@/components/ui/PriceTag.vue'
import { cancellableStatuses, type SupplierOrder } from '@/mocks/dashboard'

import SupplierOrderStatus from './SupplierOrderStatus.vue'

type SortKey = 'newest' | 'oldest' | 'highest'

const props = defineProps<{ orders: SupplierOrder[] }>()
const emit = defineEmits<{ view: [order: SupplierOrder]; cancel: [order: SupplierOrder] }>()
const { t } = useI18n()

const query = ref('')
const sort = ref<SortKey | null>(null)
const isSortOpen = ref(false)
const page = ref(1)
const sortOptions: SortKey[] = ['newest', 'oldest', 'highest']

/** Mock filtering/sorting until the API does it server-side. */
const visibleOrders = computed(() => {
  const term = query.value.trim()
  const list = term
    ? props.orders.filter(
        (order) => order.customer.name.includes(term) || `#${order.number}`.includes(term),
      )
    : [...props.orders]
  if (sort.value === 'highest') {
    list.sort((a, b) => b.total - a.total)
  } else if (sort.value) {
    list.sort((a, b) =>
      sort.value === 'newest' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
    )
  }
  return list
})

const formatDate = (iso: string) => {
  const [year, month, day] = iso.split('-')
  return `${day}/${month}/${year}`
}

const canCancel = (order: SupplierOrder) => cancellableStatuses.includes(order.status)

const columns = ['number', 'customer', 'date', 'total', 'status', 'actions'] as const
const grid = 'grid grid-cols-[98px_175px_174px_199px_112px_158px] items-center gap-10 px-4'
</script>

<template>
  <section class="flex flex-col items-center gap-4" aria-labelledby="supplier-orders-title">
    <header class="flex w-full flex-wrap items-center justify-between gap-4">
      <h2 id="supplier-orders-title" class="text-h3 text-ink">{{ t('dashboard.home.orders') }}</h2>
      <div class="flex w-full flex-wrap items-start gap-4 sm:w-auto sm:gap-6">
        <label
          class="flex h-[41px] min-w-0 flex-1 items-center gap-2 rounded-lg border-[0.5px] border-line bg-white p-2 focus-within:border-accent sm:w-[197px] sm:flex-none"
        >
          <SearchIcon class="size-4 shrink-0 text-secondary" aria-hidden="true" />
          <span class="sr-only">{{ t('dashboard.home.search') }}</span>
          <input
            v-model="query"
            type="search"
            :placeholder="t('dashboard.home.search')"
            class="min-w-0 flex-1 bg-transparent text-body-sm text-ink outline-none placeholder:text-muted/50"
          />
        </label>
        <BaseDropdown v-model:open="isSortOpen" align="end" width="w-[236px]">
          <template #trigger="{ toggle, menuId }">
            <button
              type="button"
              class="flex h-[41px] w-[236px] max-w-full items-center gap-2 rounded-lg border-[0.5px] border-line bg-white p-2 text-body-sm"
              aria-haspopup="menu"
              :aria-expanded="isSortOpen"
              :aria-controls="menuId"
              @click="toggle"
            >
              <FilterIcon class="size-4 shrink-0 text-secondary" aria-hidden="true" />
              <span class="text-secondary">{{ t('dashboard.home.sortBy') }}</span>
              <span class="text-secondary" aria-hidden="true">|</span>
              <span class="flex-1 truncate text-start text-ink">{{
                sort ? t(`dashboard.home.sort.${sort}`) : t('form.choose')
              }}</span>
              <ArrowDownIcon class="size-4 shrink-0 text-secondary" aria-hidden="true" />
            </button>
          </template>
          <DropdownItem
            v-for="option in sortOptions"
            :key="option"
            :active="option === sort"
            @select="sort = option"
          >
            {{ t(`dashboard.home.sort.${option}`) }}
          </DropdownItem>
        </BaseDropdown>
      </div>
    </header>

    <!-- Desktop table (Figma 754:15667). -->
    <div class="hidden w-full rounded-2xl bg-white p-2 lg:block">
      <!-- Rows are CSS grids, so explicit roles keep the table semantics for screen readers. -->
      <table class="w-full border-collapse text-start" role="table">
        <thead>
          <tr role="row" :class="[grid, 'h-14 rounded-xl bg-surface']">
            <th
              v-for="column in columns"
              :key="column"
              scope="col"
              role="columnheader"
              class="text-start text-body-md font-normal text-ink"
            >
              {{ t(`dashboard.home.columns.${column}`) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="!visibleOrders.length"
            class="block py-10 text-center text-body-md text-secondary"
          >
            <td class="block">{{ t('dashboard.home.empty') }}</td>
          </tr>
          <tr
            v-for="(order, index) in visibleOrders"
            :key="order.id"
            role="row"
            :class="[grid, 'h-[65px]', index < visibleOrders.length - 1 && 'border-b border-line']"
          >
            <td role="cell" class="text-body-md text-secondary">#{{ order.number }}</td>
            <td role="cell" class="truncate text-body-md text-secondary">
              {{ order.customer.name }}
            </td>
            <td role="cell" class="text-body-md text-secondary tabular-nums">
              {{ formatDate(order.date) }}
            </td>
            <td role="cell">
              <PriceTag :amount="order.total" decimals :grouping="false" size="md" tone="ink" />
            </td>
            <td role="cell"><SupplierOrderStatus :status="order.status" /></td>
            <td role="cell" class="flex items-center gap-6">
              <button
                type="button"
                class="flex h-8 items-center gap-1 rounded-lg bg-surface px-2 py-1 text-body-sm text-primary transition hover:brightness-95"
                @click="emit('view', order)"
              >
                <ViewIcon class="size-5" aria-hidden="true" />
                {{ t('dashboard.home.view') }}
              </button>
              <button
                v-if="canCancel(order)"
                type="button"
                class="flex h-8 items-center gap-1 rounded-lg bg-surface px-2 py-1 text-body-sm text-error transition hover:brightness-95"
                @click="emit('cancel', order)"
              >
                <CartRemoveIcon class="size-5" aria-hidden="true" />
                {{ t('dashboard.home.cancel') }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Phones and tablets: one card per order. -->
    <ul class="flex w-full flex-col gap-3 lg:hidden">
      <li v-if="!visibleOrders.length" class="py-10 text-center text-body-md text-secondary">
        {{ t('dashboard.home.empty') }}
      </li>
      <li
        v-for="order in visibleOrders"
        :key="order.id"
        class="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-card"
      >
        <div class="flex items-center justify-between gap-2">
          <span class="text-h4 text-ink">#{{ order.number }}</span>
          <SupplierOrderStatus :status="order.status" />
        </div>
        <dl class="grid grid-cols-2 gap-x-4 gap-y-2 text-body-sm">
          <dt class="text-secondary">{{ t('dashboard.home.columns.customer') }}</dt>
          <dd class="text-ink">{{ order.customer.name }}</dd>
          <dt class="text-secondary">{{ t('dashboard.home.columns.date') }}</dt>
          <dd class="text-ink tabular-nums">{{ formatDate(order.date) }}</dd>
          <dt class="text-secondary">{{ t('dashboard.home.columns.total') }}</dt>
          <dd><PriceTag :amount="order.total" decimals :grouping="false" tone="ink" /></dd>
        </dl>
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="flex h-8 items-center gap-1 rounded-lg bg-surface px-2 py-1 text-body-sm text-primary"
            @click="emit('view', order)"
          >
            <ViewIcon class="size-5" aria-hidden="true" />
            {{ t('dashboard.home.view') }}
          </button>
          <button
            v-if="canCancel(order)"
            type="button"
            class="flex h-8 items-center gap-1 rounded-lg bg-surface px-2 py-1 text-body-sm text-error"
            @click="emit('cancel', order)"
          >
            <CartRemoveIcon class="size-5" aria-hidden="true" />
            {{ t('dashboard.home.cancel') }}
          </button>
        </div>
      </li>
    </ul>

    <BasePagination v-model="page" :total="20" />
  </section>
</template>

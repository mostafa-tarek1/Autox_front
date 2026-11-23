<script setup lang="ts">
import { useId } from 'vue'
import { useI18n } from 'vue-i18n'

import ArrowDownIcon from '@/assets/icons/arrow-down-01--stroke-standard.svg'
import FilterIcon from '@/assets/icons/filter-vertical--stroke-standard.svg'

export type ProductSort = 'newest' | 'priceAsc' | 'priceDesc'

/** "ترتيب حسب | اختر" control (236×41, white, 0.5px line border). */
const sort = defineModel<ProductSort | ''>({ default: '' })
const { t } = useI18n()
const id = useId()
const options: ProductSort[] = ['newest', 'priceAsc', 'priceDesc']
</script>

<template>
  <div
    class="relative flex h-[41px] w-full items-center gap-2 rounded-lg border-[0.5px] border-line bg-white p-2 focus-within:border-accent sm:w-[236px]"
  >
    <FilterIcon class="size-4 shrink-0 text-secondary" aria-hidden="true" />
    <label :for="id" class="shrink-0 text-body-sm text-secondary">{{
      t('dashboard.products.sortBy')
    }}</label>
    <span class="text-body-sm text-secondary" aria-hidden="true">|</span>
    <select
      :id="id"
      v-model="sort"
      class="min-w-0 flex-1 cursor-pointer appearance-none bg-transparent pe-6 text-body-sm text-ink outline-none"
    >
      <option value="">{{ t('form.choose') }}</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ t(`dashboard.products.sort.${option}`) }}
      </option>
    </select>
    <ArrowDownIcon
      class="pointer-events-none absolute end-2 size-4 text-secondary"
      aria-hidden="true"
    />
  </div>
</template>

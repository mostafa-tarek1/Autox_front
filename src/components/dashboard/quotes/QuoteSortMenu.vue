<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import ArrowDownIcon from '@/assets/icons/arrow-down-01--stroke-standard.svg'
import FilterIcon from '@/assets/icons/filter-vertical--stroke-standard.svg'
import BaseDropdown from '@/components/ui/BaseDropdown.vue'
import DropdownItem from '@/components/ui/DropdownItem.vue'

export type QuoteSort = 'newest' | 'oldest' | 'priceHigh' | 'priceLow'

/** "ترتيب حسب | اختر" control above the quotes table (Figma "Frame 787", 236×41). */
const sort = defineModel<QuoteSort | null>({ default: null })
const { t } = useI18n()
const open = ref(false)
const options: QuoteSort[] = ['newest', 'oldest', 'priceHigh', 'priceLow']
</script>

<template>
  <BaseDropdown v-model:open="open" align="end" width="w-[236px]">
    <template #trigger="{ toggle, menuId }">
      <button
        type="button"
        class="flex h-[41px] w-full items-center gap-2 rounded-lg border-[0.5px] border-line bg-white p-2 sm:w-[236px]"
        aria-haspopup="menu"
        :aria-expanded="open"
        :aria-controls="menuId"
        @click="toggle"
      >
        <FilterIcon class="size-4 shrink-0 text-secondary" aria-hidden="true" />
        <span class="text-body-sm whitespace-nowrap text-secondary">{{
          t('dashboard.quotes.sort.label')
        }}</span>
        <span class="text-body-sm text-secondary" aria-hidden="true">|</span>
        <span class="min-w-0 flex-1 truncate text-start text-body-sm text-ink">
          {{ sort ? t(`dashboard.quotes.sort.${sort}`) : t('dashboard.quotes.sort.placeholder') }}
        </span>
        <ArrowDownIcon class="size-4 shrink-0 text-secondary" aria-hidden="true" />
      </button>
    </template>
    <DropdownItem
      v-for="option in options"
      :key="option"
      :active="option === sort"
      @select="sort = option"
    >
      {{ t(`dashboard.quotes.sort.${option}`) }}
    </DropdownItem>
  </BaseDropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import ArrowDownIcon from '@/assets/icons/arrow-down-01--stroke-standard.svg'
import FilterIcon from '@/assets/icons/filter-vertical--stroke-standard.svg'
import BaseDropdown from '@/components/ui/BaseDropdown.vue'
import DropdownItem from '@/components/ui/DropdownItem.vue'
import type { SortOption } from '@/types/catalog'

const sort = defineModel<SortOption>({ default: 'priceAsc' })
const { t } = useI18n()
const open = ref(false)

const options: SortOption[] = ['priceAsc', 'mostRequested', 'originalOnly']
</script>

<template>
  <BaseDropdown v-model:open="open" align="end">
    <template #trigger="{ toggle, menuId }">
      <button
        type="button"
        class="flex h-[41px] min-w-[132px] items-center justify-between gap-1.5 rounded-xl border-[0.5px] border-line bg-white p-2"
        aria-haspopup="menu"
        :aria-expanded="open"
        :aria-controls="menuId"
        @click="toggle"
      >
        <span class="flex items-center gap-1.5">
          <FilterIcon class="size-4 text-ink" aria-hidden="true" />
          <span class="text-body-sm whitespace-nowrap text-ink">{{
            t(`catalog.sort.${sort}`)
          }}</span>
        </span>
        <ArrowDownIcon class="size-4 text-ink" aria-hidden="true" />
      </button>
    </template>
    <DropdownItem
      v-for="option in options"
      :key="option"
      :active="option === sort"
      @select="sort = option"
    >
      {{ t(`catalog.sort.${option}`) }}
    </DropdownItem>
  </BaseDropdown>
</template>

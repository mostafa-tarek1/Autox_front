<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import ArrowDownIcon from '@/assets/icons/arrow-down-01--stroke-standard.svg'
import SearchIcon from '@/assets/icons/search-01--stroke-standard.svg'
import type { CarBrand, PartOrigin } from '@/types/catalog'

const props = defineProps<{ brands: CarBrand[] }>()
const selection = defineModel<{ brandId: string; origin: PartOrigin } | null>({ default: null })
const { t } = useI18n()

const query = ref('')
const expandedId = ref<string | null>(null)

const filteredBrands = computed(() => {
  const term = query.value.trim()
  return term ? props.brands.filter((brand) => brand.name.includes(term)) : props.brands
})

function toggle(brandId: string): void {
  expandedId.value = expandedId.value === brandId ? null : brandId
}

function isSelected(brandId: string, origin: PartOrigin): boolean {
  return selection.value?.brandId === brandId && selection.value.origin === origin
}
</script>

<template>
  <aside
    class="flex flex-col gap-3.5 rounded-2xl bg-white p-4"
    :aria-label="t('catalog.carBrands')"
  >
    <h2 class="text-h4 text-ink">{{ t('catalog.carBrands') }}</h2>

    <label
      class="flex h-[41px] items-center gap-2 rounded-lg border-[0.5px] border-line bg-surface p-2"
    >
      <SearchIcon class="size-4 shrink-0 text-ink" aria-hidden="true" />
      <span class="sr-only">{{ t('catalog.searchBrand') }}</span>
      <input
        v-model="query"
        type="search"
        :placeholder="t('catalog.searchBrand')"
        class="min-w-0 flex-1 bg-transparent text-body-md outline-none placeholder:text-placeholder"
      />
    </label>

    <ul class="scrollbar-accent max-h-[581px] overflow-y-auto pe-[13px]">
      <li v-for="brand in filteredBrands" :key="brand.id">
        <button
          type="button"
          class="flex h-[65px] w-full items-center justify-between gap-3.5 border-b-[0.6px] border-line px-2 py-3 transition-colors hover:bg-surface"
          :class="expandedId === brand.id && 'border-transparent bg-surface'"
          :aria-expanded="expandedId === brand.id"
          @click="toggle(brand.id)"
        >
          <span class="flex items-center gap-2">
            <span class="grid size-10 shrink-0 place-items-center rounded-[6.67px] bg-white p-1">
              <img
                :src="brand.logo"
                :alt="brand.name"
                width="32"
                height="32"
                class="max-h-8 object-contain"
              />
            </span>
            <span class="text-body-md text-secondary">{{ brand.name }}</span>
          </span>
          <span class="flex items-center gap-2">
            <span class="text-body-sm text-primary">{{ brand.fromYear }}</span>
            <ArrowDownIcon
              class="size-4 text-ink transition-transform"
              :class="expandedId === brand.id && 'rotate-180'"
              aria-hidden="true"
            />
          </span>
        </button>

        <ul v-if="expandedId === brand.id" class="flex flex-col gap-1 bg-surface p-2">
          <li v-for="option in brand.origins" :key="option.origin">
            <button
              type="button"
              class="flex h-11 w-full items-center justify-between rounded-xl border-[0.5px] bg-white p-2 transition-colors"
              :class="
                isSelected(brand.id, option.origin)
                  ? 'border-accent'
                  : 'border-transparent hover:border-line'
              "
              :aria-pressed="isSelected(brand.id, option.origin)"
              @click="selection = { brandId: brand.id, origin: option.origin }"
            >
              <span
                class="text-h4"
                :class="isSelected(brand.id, option.origin) ? 'text-primary' : 'text-muted'"
              >
                {{ t(`catalog.origins.${option.origin}`) }}
              </span>
              <span class="text-body-md text-primary">{{ option.count }}</span>
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

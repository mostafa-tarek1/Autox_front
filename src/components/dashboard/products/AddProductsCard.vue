<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AddIcon from '@/assets/icons/add-01--stroke-standard.svg'
import SearchListIcon from '@/assets/icons/search-list-02--stroke-standard.svg'
import XlsIcon from '@/assets/icons/xls-02--stroke-rounded.svg'
import BaseButton from '@/components/ui/BaseButton.vue'

/** "اضافة قطع غيار" card: from the catalog, manually, or from an Excel file. */
const emit = defineEmits<{ excel: [] }>()
const { t } = useI18n()
</script>

<template>
  <section
    class="flex flex-col items-start gap-4 rounded-xl bg-white p-4 shadow-card"
    aria-labelledby="add-products-title"
  >
    <h2 id="add-products-title" class="text-h4 text-ink">{{ t('dashboard.products.addTitle') }}</h2>
    <div class="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-6">
      <BaseButton variant="soft" :to="{ name: 'dashboard-catalog' }" block>
        <template #icon><SearchListIcon class="size-5" aria-hidden="true" /></template>
        {{ t('dashboard.products.addFromCatalog') }}
      </BaseButton>
      <BaseButton variant="soft" :to="{ name: 'dashboard-product-new' }" block>
        <template #icon><AddIcon class="size-5" aria-hidden="true" /></template>
        {{ t('dashboard.products.addManual') }}
      </BaseButton>
      <BaseButton variant="soft" block @click="emit('excel')">
        <template #icon><XlsIcon class="size-5" aria-hidden="true" /></template>
        {{ t('dashboard.products.addExcel') }}
      </BaseButton>
    </div>
  </section>
</template>

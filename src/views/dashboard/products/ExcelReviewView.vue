<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import FocusPageHeader from '@/components/dashboard/products/FocusPageHeader.vue'
import ProductsSuccessModal from '@/components/dashboard/products/ProductsSuccessModal.vue'
import { useSupplierProducts } from '@/components/dashboard/products/useSupplierProducts'
import BaseButton from '@/components/ui/BaseButton.vue'
import BasePagination from '@/components/ui/BasePagination.vue'
import PriceTag from '@/components/ui/PriceTag.vue'
import { useLocalizedText } from '@/composables/useLocalizedText'
import { excelImportRows } from '@/mocks/dashboard-products'

/** "مراجعة نتائج Excel" (976:9925): rows read from the uploaded file, confirmed in one go. */
const { t } = useI18n()
const localized = useLocalizedText()
const router = useRouter()
const store = useSupplierProducts()

const PAGE_SIZE = 10
const page = ref(1)
const isSuccessOpen = ref(false)

const rows = excelImportRows
const totalPages = computed(() => Math.ceil(rows.length / PAGE_SIZE))
const visible = computed(() => rows.slice((page.value - 1) * PAGE_SIZE, page.value * PAGE_SIZE))

function confirm(): void {
  store.addFromExcel(rows)
  isSuccessOpen.value = true
}
</script>

<template>
  <div class="page-container">
    <FocusPageHeader
      :title="t('dashboard.products.excelReviewTitle')"
      :back="{ name: 'dashboard-products' }"
    >
      <template #action>
        <BaseButton class="px-10" @click="confirm">{{
          t('dashboard.products.confirmAdd')
        }}</BaseButton>
      </template>
    </FocusPageHeader>

    <section
      class="flex flex-col gap-6 rounded-3xl bg-white p-5 shadow-card sm:p-8"
      aria-labelledby="excel-count"
    >
      <p id="excel-count" class="text-body-md text-primary">
        {{ t('dashboard.products.excelCount', { count: rows.length }) }}
      </p>
      <ul class="-mx-3 flex flex-col">
        <li
          v-for="(row, index) in visible"
          :key="`${page}-${index}`"
          class="flex flex-col gap-1 border-b border-line p-4 md:grid md:min-h-[61px] md:grid-cols-[178px_260px_99px_156px] md:items-center md:gap-20"
        >
          <span class="text-body-sm text-ink rtl:text-right" dir="ltr">{{ row.partNumber }}</span>
          <span class="text-body-sm text-ink">{{ localized(row.name) }}</span>
          <span class="text-body-sm text-ink">{{ t(`catalog.origins.${row.origin}`) }}</span>
          <PriceTag :amount="row.price" decimals class="text-h4 text-ink" />
        </li>
      </ul>
      <BasePagination v-model="page" :total="totalPages" class="self-center" />
    </section>

    <ProductsSuccessModal
      v-model:open="isSuccessOpen"
      :message="t('dashboard.products.addedSuccess')"
      @closed="router.push({ name: 'dashboard-products' })"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import FocusPageHeader from '@/components/dashboard/products/FocusPageHeader.vue'
import ProductForm from '@/components/dashboard/products/ProductForm.vue'
import ProductsSuccessModal from '@/components/dashboard/products/ProductsSuccessModal.vue'
import {
  useSupplierProducts,
  type ProductDraft,
} from '@/components/dashboard/products/useSupplierProducts'

/**
 * "اضافة قطعة جديدة" (884:15299). Also edits a part (`?id=`) and adds an alternative (`?alternativeFor=`).
 */
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const store = useSupplierProducts()
const isSuccessOpen = ref(false)

const editId = computed(() => (typeof route.query.id === 'string' ? route.query.id : null))
const alternativeFor = computed(() =>
  typeof route.query.alternativeFor === 'string' ? route.query.alternativeFor : null,
)
const editing = computed(() => (editId.value ? store.find(editId.value) : undefined))

const title = computed(() => {
  if (editing.value) {
    return t('dashboard.products.editTitle')
  }
  return alternativeFor.value
    ? t('dashboard.products.newAlternativeTitle')
    : t('dashboard.products.newTitle')
})

function save(draft: ProductDraft): void {
  if (editing.value) {
    store.update(editing.value.id, draft)
  } else if (alternativeFor.value) {
    store.addAlternative(alternativeFor.value, draft)
  } else {
    store.add(draft)
  }
  isSuccessOpen.value = true
}
</script>

<template>
  <div class="page-container">
    <FocusPageHeader :title="title" :back="{ name: 'dashboard-products' }" />
    <div class="rounded-3xl bg-white p-5 shadow-card sm:p-8">
      <ProductForm
        :key="editId ?? 'new'"
        :initial="editing"
        :submit-label="editing ? t('dashboard.products.save') : t('dashboard.products.add')"
        @submit="save"
      />
    </div>
    <ProductsSuccessModal
      v-model:open="isSuccessOpen"
      :message="
        editing ? t('dashboard.products.savedSuccess') : t('dashboard.products.addedSuccess')
      "
      @closed="router.push({ name: 'dashboard-products' })"
    />
  </div>
</template>

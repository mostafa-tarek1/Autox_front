<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AddIcon from '@/assets/icons/add-01--stroke-standard.svg'
import DashboardDrawer from '@/components/dashboard/shared/DashboardDrawer.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

import ProductSummaryCard from './ProductSummaryCard.vue'
import { useSupplierProducts } from './useSupplierProducts'

/** "ادارة البدائل" side panel (976:10488): the main part, its alternatives, and "اضافة بديل اخر". */
const props = defineProps<{ productId: string | null }>()
const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ addAlternative: [] }>()
const { t } = useI18n()
const store = useSupplierProducts()

const product = computed(() => (props.productId ? store.find(props.productId) : undefined))
const alternatives = computed(() => (props.productId ? store.alternativesOf(props.productId) : []))
</script>

<template>
  <DashboardDrawer v-model:open="open" :title="t('dashboard.products.manageAlternatives')">
    <div v-if="product" class="flex flex-col">
      <section class="flex flex-col gap-4 px-6 py-4" aria-labelledby="alt-main-title">
        <h3 id="alt-main-title" class="rounded-xl bg-surface px-3 py-3 text-h4 text-ink">
          {{ t('dashboard.products.mainPart') }}
        </h3>
        <ProductSummaryCard :product="product" />
      </section>
      <section class="flex flex-col gap-4 px-6 py-4" aria-labelledby="alt-list-title">
        <h3 id="alt-list-title" class="rounded-xl bg-surface px-3 py-3 text-h4 text-ink">
          {{ t('dashboard.products.alternatives') }}
        </h3>
        <ProductSummaryCard
          v-for="alternative in alternatives"
          :key="alternative.id"
          :product="alternative"
        />
        <p v-if="!alternatives.length" class="text-body-sm text-secondary">
          {{ t('dashboard.products.noAlternatives') }}
        </p>
        <BaseButton variant="outline" block @click="emit('addAlternative')">
          <template #icon><AddIcon class="size-5" aria-hidden="true" /></template>
          {{ t('dashboard.products.addAnotherAlternative') }}
        </BaseButton>
      </section>
    </div>
  </DashboardDrawer>
</template>

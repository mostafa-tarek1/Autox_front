<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import DeleteIcon from '@/assets/icons/delete-01--stroke-rounded.svg'
import EditIcon from '@/assets/icons/pencil-edit-02--stroke-rounded.svg'
import ReloadIcon from '@/assets/icons/reload--stroke-rounded.svg'
import PriceTag from '@/components/ui/PriceTag.vue'
import { useLocalizedText } from '@/composables/useLocalizedText'
import type { SupplierProduct } from '@/mocks/dashboard-products'

/**
 * Supplier parts table (754:15902 / row component 780:8965). Columns: part number 178, name 260,
 * type 99, price 156, controls 258, 40px apart. Below lg each part is a card.
 */
defineProps<{ products: SupplierProduct[] }>()
const emit = defineEmits<{ edit: [id: string]; alternatives: [id: string]; delete: [id: string] }>()
const { t } = useI18n()
const localized = useLocalizedText()

const columns =
  'lg:grid lg:grid-cols-[178px_260px_99px_156px_258px] lg:items-center lg:justify-between lg:gap-10'
const action =
  'inline-flex h-10 items-center gap-1 rounded-lg bg-surface p-2 text-body-sm text-primary transition-colors hover:bg-accent/30'
</script>

<template>
  <div class="rounded-2xl bg-white p-2">
    <div
      class="hidden h-14 rounded-xl bg-surface p-4 text-body-md text-ink lg:grid lg:grid-cols-[178px_260px_99px_156px_258px] lg:items-center lg:justify-between lg:gap-10"
      aria-hidden="true"
    >
      <span>{{ t('dashboard.products.columns.partNumber') }}</span>
      <span>{{ t('dashboard.products.columns.name') }}</span>
      <span>{{ t('dashboard.products.columns.type') }}</span>
      <span>{{ t('dashboard.products.columns.price') }}</span>
      <span>{{ t('dashboard.products.columns.controls') }}</span>
    </div>

    <ul :aria-label="t('dashboard.products.listTitle')" class="lg:mt-2">
      <li v-if="!products.length" class="py-12 text-center text-body-md text-secondary">
        {{ t('dashboard.products.empty') }}
      </li>
      <li
        v-for="(product, index) in products"
        :key="product.id"
        class="flex flex-col gap-3 p-4 transition-colors hover:bg-surface lg:min-h-[73px]"
        :class="[columns, index < products.length - 1 && 'border-b border-line']"
      >
        <span class="text-body-sm text-ink rtl:text-right" dir="ltr">
          <span class="sr-only lg:hidden">{{ t('dashboard.products.columns.partNumber') }}: </span
          >{{ product.partNumber }}
        </span>
        <span class="text-body-sm text-ink">{{ localized(product.name) }}</span>
        <span class="text-body-sm text-ink">{{ t(`catalog.origins.${product.origin}`) }}</span>
        <PriceTag :amount="product.price" decimals class="text-h4 text-ink" />
        <span class="flex flex-wrap items-center gap-3 lg:justify-end lg:gap-6">
          <button type="button" :class="action" @click="emit('edit', product.id)">
            <EditIcon class="size-5" aria-hidden="true" />
            {{ t('dashboard.products.edit') }}
          </button>
          <button type="button" :class="action" @click="emit('alternatives', product.id)">
            <ReloadIcon class="size-5" aria-hidden="true" />
            {{ t('dashboard.products.manageAlternatives') }}
          </button>
          <button
            type="button"
            class="grid size-9 place-items-center rounded-lg bg-surface p-2 text-error transition-colors hover:bg-error/10"
            :aria-label="t('dashboard.products.delete.label', { part: product.partNumber })"
            @click="emit('delete', product.id)"
          >
            <DeleteIcon class="size-5" aria-hidden="true" />
          </button>
        </span>
      </li>
    </ul>
  </div>
</template>

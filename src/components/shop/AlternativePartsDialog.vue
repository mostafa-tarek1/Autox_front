<script setup lang="ts">
import BaseModal from '@/components/ui/BaseModal.vue'
import { ref, useId } from 'vue'
import { useI18n } from 'vue-i18n'

import ProductCard from '@/components/catalog/ProductCard.vue'
import type { Product } from '@/types/catalog'

/** "القطع البديلة" (Figma 192:2932): substitute parts for an unavailable cart line. */
defineProps<{ parts: Product[] }>()
const emit = defineEmits<{ add: [product: Product, quantity: number] }>()
const open = defineModel<boolean>('open', { default: false })
const { t } = useI18n()
const titleId = useId()
const quantities = ref<Record<string, number>>({})

function onQuantity(product: Product, quantity: number): void {
  const previous = quantities.value[product.id] ?? 0
  quantities.value[product.id] = quantity
  if (quantity > previous) {
    emit('add', product, quantity - previous)
  }
}
</script>

<template>
  <BaseModal
    v-model:open="open"
    :labelled-by="titleId"
    tone="surface"
    panel-class="max-w-[892px] rounded-3xl"
    close-class="top-6 end-6"
  >
    <header class="border-b border-line p-6">
      <h2 :id="titleId" class="text-h3 text-ink">{{ t('shop.availability.alternativesTitle') }}</h2>
    </header>
    <!-- The design is a fixed 557px dialog whose list scrolls under the header. -->
    <ul class="flex max-h-[min(480px,70vh)] flex-col gap-4 overflow-y-auto px-6 pt-8 pb-6">
      <li v-for="part in parts" :key="part.id">
        <ProductCard
          :product="part"
          class="border-transparent! shadow-card"
          :quantity="quantities[part.id] ?? 0"
          @update:quantity="onQuantity(part, $event)"
        />
      </li>
    </ul>
  </BaseModal>
</template>

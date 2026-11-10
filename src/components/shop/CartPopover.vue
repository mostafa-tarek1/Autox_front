<script setup lang="ts">
import QuantityStepper from '@/components/ui/QuantityStepper.vue'
import PriceTag from '@/components/ui/PriceTag.vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

import CancelIcon from '@/assets/icons/cancel-circle--stroke-rounded.svg'
import CartDuotoneIcon from '@/assets/icons/shopping-cart-01--duotone-rounded.svg'
import CartIcon from '@/assets/icons/shopping-cart-01--stroke-standard.svg'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useCartStore } from '@/stores/cart'

import BrandThumb from './BrandThumb.vue'

/**
 * Mini cart opened from the navbar cart button (Figma "cart" 173:1645).
 * The navbar is shared, so it is mounted there by the layout owner.
 */
const emit = defineEmits<{ close: [] }>()
const { t } = useI18n()
const cart = useCartStore()
const { items } = storeToRefs(cart)
</script>

<template>
  <div
    class="flex w-[466px] max-w-[calc(100vw-2rem)] flex-col gap-[18px] rounded-3xl border-[0.6px] border-line bg-white pb-6 shadow-card"
    role="dialog"
    :aria-label="t('shop.cart.popoverTitle')"
  >
    <header class="flex items-center justify-between gap-2 border-b border-line p-6">
      <h2 class="flex items-center gap-2 text-h3 text-ink">
        <CartDuotoneIcon class="size-6 text-primary" aria-hidden="true" />
        {{ t('shop.cart.popoverTitle') }}
      </h2>
      <button
        type="button"
        class="text-ink hover:text-error"
        :aria-label="t('common.close')"
        @click="emit('close')"
      >
        <CancelIcon class="size-6" aria-hidden="true" />
      </button>
    </header>

    <div class="flex flex-col gap-4 px-4">
      <p v-if="!items.length" class="py-6 text-center text-body-md text-secondary">
        {{ t('shop.cart.empty') }}
      </p>
      <ul v-else class="flex max-h-[300px] flex-col gap-4 overflow-y-auto">
        <li
          v-for="item in items"
          :key="item.id"
          class="flex items-center justify-between gap-4 rounded-2xl border-[0.5px] border-line bg-white p-2"
        >
          <div class="flex min-w-0 items-start gap-4">
            <BrandThumb :logo="item.brandLogo" :name="item.brandName" size="sm" tone="surface" />
            <div class="flex min-w-0 flex-col items-start gap-2">
              <p class="truncate text-body-md text-ink">{{ item.title }}</p>
              <p dir="ltr" class="text-body-sm text-primary">{{ item.partNumber }}</p>
            </div>
          </div>
          <div class="flex w-[82px] shrink-0 flex-col items-center gap-2">
            <PriceTag tone="ink" size="md" :amount="item.unitPrice" />
            <QuantityStepper
              variant="surface"
              :min="1"
              :model-value="item.quantity"
              size="sm"
              @update:model-value="cart.setQuantity(item.id, $event)"
            />
          </div>
        </li>
      </ul>
      <BaseButton block :to="{ name: 'cart' }" @click="emit('close')">
        <template #icon><CartIcon class="size-5" aria-hidden="true" /></template>
        {{ t('shop.cart.goToCart') }}
      </BaseButton>
    </div>
  </div>
</template>

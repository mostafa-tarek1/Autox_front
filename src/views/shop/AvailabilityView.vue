<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import AlertIcon from '@/assets/icons/alert-circle--stroke-rounded.svg'
import AlternativePartsDialog from '@/components/shop/AlternativePartsDialog.vue'
import AvailabilityBadge from '@/components/shop/AvailabilityBadge.vue'
import AvailabilityPending from '@/components/shop/AvailabilityPending.vue'
import CartItemCard from '@/components/shop/CartItemCard.vue'
import CartNotice from '@/components/shop/CartNotice.vue'
import CheckoutLayout from '@/components/shop/CheckoutLayout.vue'
import OrderSummary from '@/components/shop/OrderSummary.vue'
import ShopCard from '@/components/shop/ShopCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { alternativeParts } from '@/mocks/shop'
import { useCartStore } from '@/stores/cart'

const { t } = useI18n()
const router = useRouter()
const cart = useCartStore()
const { items, itemsCount, subtotal, vat, total, isAvailabilityChecked } = storeToRefs(cart)
const isAlternativesOpen = ref(false)

/** Mock: suppliers "answer" after a short delay. The API will push the result instead. */
const { start: simulateSupplierReply } = useTimeoutFn(
  () => (isAvailabilityChecked.value = true),
  2500,
  {
    immediate: false,
  },
)
watch(isAvailabilityChecked, (checked) => !checked && simulateSupplierReply(), { immediate: true })

const canContinue = computed(
  () =>
    isAvailabilityChecked.value &&
    items.value.length > 0 &&
    items.value.every((item) => item.availability === 'available'),
)
</script>

<template>
  <CheckoutLayout :title="t('shop.availability.title')" step="availability">
    <AvailabilityPending v-if="!isAvailabilityChecked" />

    <ShopCard v-else :title="t('shop.availability.details')" body-class="flex flex-col gap-4 p-6">
      <ul class="flex flex-col gap-4">
        <li v-for="item in items" :key="item.id">
          <CartItemCard
            :item="item"
            :removable="false"
            @update:quantity="cart.setQuantity(item.id, $event)"
          >
            <template v-if="item.availability" #badge>
              <AvailabilityBadge :status="item.availability" />
            </template>
            <template v-if="item.availability === 'partial'" #footer>
              <CartNotice>
                <template #icon
                  ><AlertIcon class="size-4 shrink-0 text-ink" aria-hidden="true"
                /></template>
                {{ t('shop.availability.partialHint', { count: item.availableQuantity ?? 0 }) }}
                <template #actions>
                  <BaseButton variant="soft" class="h-[46px] px-4" @click="cart.remove(item.id)">
                    {{ t('shop.availability.removeProduct') }}
                  </BaseButton>
                  <BaseButton class="px-4" @click="cart.acceptAvailableQuantity(item.id)">
                    {{ t('shop.availability.orderAvailable') }}
                  </BaseButton>
                </template>
              </CartNotice>
            </template>
            <template v-else-if="item.availability === 'unavailable'" #footer>
              <CartNotice>
                <template #actions>
                  <BaseButton variant="soft" class="px-4" @click="cart.remove(item.id)">
                    {{ t('shop.availability.removeProduct') }}
                  </BaseButton>
                  <BaseButton class="px-4" @click="isAlternativesOpen = true">
                    {{ t('shop.availability.viewAlternatives') }}
                  </BaseButton>
                </template>
              </CartNotice>
            </template>
          </CartItemCard>
        </li>
      </ul>
    </ShopCard>

    <template #aside>
      <OrderSummary :count="itemsCount" :subtotal="subtotal" :vat="vat" :total="total">
        <BaseButton
          v-if="isAvailabilityChecked"
          block
          :disabled="!canContinue"
          @click="router.push({ name: 'checkout-shipping' })"
        >
          {{ t('shop.availability.continue') }}
        </BaseButton>
      </OrderSummary>
    </template>
  </CheckoutLayout>

  <AlternativePartsDialog
    v-model:open="isAlternativesOpen"
    :parts="alternativeParts"
    @add="(product, quantity) => cart.add(product, quantity)"
  />
</template>

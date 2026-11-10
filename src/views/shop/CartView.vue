<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import CartIcon from '@/assets/icons/shopping-cart-01--duotone-rounded.svg'
import CartItemCard from '@/components/shop/CartItemCard.vue'
import CartNotice from '@/components/shop/CartNotice.vue'
import CheckoutLayout from '@/components/shop/CheckoutLayout.vue'
import OrderSummary from '@/components/shop/OrderSummary.vue'
import ResultDialog from '@/components/shop/ResultDialog.vue'
import ShopCard from '@/components/shop/ShopCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { QUOTE_THRESHOLD } from '@/mocks/shop'
import { useCartStore } from '@/stores/cart'

const { t } = useI18n()
const router = useRouter()
const cart = useCartStore()
const { items, itemsCount, subtotal, vat, total } = storeToRefs(cart)

const isSentDialogOpen = ref(false)
const quoteThreshold = QUOTE_THRESHOLD.toLocaleString('en-US')

function requestAvailability(): void {
  cart.isAvailabilityChecked = false
  isSentDialogOpen.value = true
}

function goToAvailability(): void {
  isSentDialogOpen.value = false
  router.push({ name: 'checkout-availability' })
}
</script>

<template>
  <CheckoutLayout :title="t('shop.cart.title')" step="cart">
    <ShopCard :title="t('shop.cart.orders')" body-class="flex flex-col gap-4 p-6">
      <div v-if="!items.length" class="flex flex-col items-center gap-4 py-12 text-center">
        <span class="grid size-16 place-items-center rounded-full bg-surface text-primary">
          <CartIcon class="size-8" aria-hidden="true" />
        </span>
        <p class="text-h4 text-ink">{{ t('shop.cart.empty') }}</p>
        <p class="text-body-md text-secondary">{{ t('shop.cart.emptyHint') }}</p>
        <BaseButton :to="{ name: 'home' }">{{ t('shop.cart.browse') }}</BaseButton>
      </div>
      <ul v-else class="flex flex-col gap-4">
        <li v-for="item in items" :key="item.id">
          <CartItemCard
            :item="item"
            @update:quantity="cart.setQuantity(item.id, $event)"
            @remove="cart.remove(item.id)"
          >
            <template v-if="cart.exceedsQuoteThreshold(item)" #footer>
              <CartNotice>
                {{ t('shop.cart.quoteHint', { amount: quoteThreshold }) }}
                <template #actions>
                  <BaseButton to="/quotes">{{ t('shop.cart.requestQuote') }}</BaseButton>
                </template>
              </CartNotice>
            </template>
          </CartItemCard>
        </li>
      </ul>
    </ShopCard>

    <template #aside>
      <OrderSummary :count="itemsCount" :subtotal="subtotal" :vat="vat" :total="total">
        <BaseButton block :disabled="!items.length" @click="requestAvailability">
          {{ t('shop.cart.requestAvailability') }}
        </BaseButton>
        <BaseButton block variant="soft" to="/quotes" :disabled="!items.length">
          {{ t('shop.cart.requestQuantityQuote') }}
        </BaseButton>
      </OrderSummary>
    </template>
  </CheckoutLayout>

  <ResultDialog
    v-model:open="isSentDialogOpen"
    :message="t('shop.cart.sentToSuppliers')"
    :action-label="t('shop.cart.trackOrder')"
    @action="goToAvailability"
  />
</template>

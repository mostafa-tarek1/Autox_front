<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, nextTick, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import CartIcon from '@/assets/icons/shopping-cart-01--duotone-rounded.svg'
import CartSupplierGroup from '@/components/shop/CartSupplierGroup.vue'
import CheckoutLayout from '@/components/shop/CheckoutLayout.vue'
import { localizedKey } from '@/composables/useLocalizedText'
import { validateDeliveryAddress } from '@/components/shop/deliveryAddress'
import DeliveryAddressForm from '@/components/shop/DeliveryAddressForm.vue'
import OrderSummary from '@/components/shop/OrderSummary.vue'
import ResultDialog from '@/components/shop/ResultDialog.vue'
import ShopCard from '@/components/shop/ShopCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useCartStore } from '@/stores/cart'

const { t } = useI18n()
const router = useRouter()
const cart = useCartStore()
const { items, groups, address, itemsCount, subtotal, vat, total } = storeToRefs(cart)

const showAddressErrors = ref(false)
const isSentDialogOpen = ref(false)
const isAddressValid = computed(() => !Object.keys(validateDeliveryAddress(address.value)).length)

/**
 * "تأكيد التوفر" sends the cart to every supplier at once. Each supplier then answers in the
 * orders list, where the buyer pays the confirmed parts.
 */
async function confirmAvailability(): Promise<void> {
  if (!isAddressValid.value) {
    showAddressErrors.value = true
    await nextTick()
    document.getElementById('delivery-address')?.scrollIntoView({ behavior: 'smooth' })
    return
  }
  isSentDialogOpen.value = true
}

function trackOrder(): void {
  isSentDialogOpen.value = false
  cart.clear()
  router.push({ name: 'orders' })
}
</script>

<template>
  <CheckoutLayout :title="t('shop.cart.title')" :strip-gap="81">
    <ShopCard :title="t('shop.cart.orders')" body-class="flex flex-col gap-4 p-6">
      <div v-if="!items.length" class="flex flex-col items-center gap-4 py-12 text-center">
        <span class="grid size-16 place-items-center rounded-full bg-surface text-primary">
          <CartIcon class="size-8" aria-hidden="true" />
        </span>
        <p class="text-h4 text-ink">{{ t('shop.cart.empty') }}</p>
        <p class="text-body-md text-secondary">{{ t('shop.cart.emptyHint') }}</p>
        <BaseButton :to="{ name: 'home' }">{{ t('shop.cart.browse') }}</BaseButton>
      </div>
      <template v-else>
        <CartSupplierGroup
          v-for="group in groups"
          :key="localizedKey(group.supplier)"
          :group="group"
          @quantity="(id, value) => cart.setQuantity(id, value)"
        />
      </template>
    </ShopCard>

    <DeliveryAddressForm v-if="items.length" v-model="address" :show-errors="showAddressErrors" />

    <template #aside>
      <OrderSummary :count="itemsCount" :subtotal="subtotal" :vat="vat" :total="total">
        <BaseButton block :disabled="!items.length" @click="confirmAvailability">
          {{ t('shop.cart.confirmAvailability') }}
        </BaseButton>
      </OrderSummary>
    </template>
  </CheckoutLayout>

  <ResultDialog
    v-model:open="isSentDialogOpen"
    :message="t('shop.cart.sentToSuppliers')"
    :action-label="t('shop.cart.trackOrder')"
    @action="trackOrder"
  />
</template>

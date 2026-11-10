<script setup lang="ts">
/**
 * Development-only gallery that renders one checkout component in its open state, so it can be
 * screenshotted and compared with its Figma frame. Registered only when `import.meta.env.DEV`.
 * Usage: /__preview/shop?c=popover|added|sent|alternatives|card|verification|verified|installments|methods
 */
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import tabbyLogo from '@/assets/images/shop/tabby.webp'
import visaLogo from '@/assets/images/shop/visa.webp'
import AlternativePartsDialog from '@/components/shop/AlternativePartsDialog.vue'
import CardPaymentDialog from '@/components/shop/CardPaymentDialog.vue'
import CartItemCard from '@/components/shop/CartItemCard.vue'
import CartPopover from '@/components/shop/CartPopover.vue'
import InstallmentOffers from '@/components/shop/InstallmentOffers.vue'
import PaymentMethodOption from '@/components/shop/PaymentMethodOption.vue'
import PaymentVerification from '@/components/shop/PaymentVerification.vue'
import ResultDialog from '@/components/shop/ResultDialog.vue'
import { useAddedToCartToast } from '@/components/shop/useAddedToCartToast'
import AddedToCartToast from '@/components/shop/AddedToCartToast.vue'
import { alternativeParts } from '@/mocks/shop'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const { t } = useI18n()
const cart = useCartStore()
const component = computed(() => String(route.query.c ?? ''))
const open = ref(true)
const selected = ref<string | null>('visa')

if (component.value === 'added') {
  useAddedToCartToast().show()
}
</script>

<template>
  <div class="min-h-dvh bg-surface p-4">
    <CartPopover v-if="component === 'popover'" />
    <AddedToCartToast v-else-if="component === 'added'" />
    <ResultDialog
      v-else-if="component === 'sent'"
      v-model:open="open"
      :message="t('shop.cart.sentToSuppliers')"
      :action-label="t('shop.cart.trackOrder')"
    />
    <AlternativePartsDialog
      v-else-if="component === 'alternatives'"
      v-model:open="open"
      :parts="alternativeParts"
    />
    <CardPaymentDialog v-else-if="component === 'card'" v-model:open="open" />
    <div v-else-if="component === 'verification' || component === 'verified'" class="w-[815px]">
      <PaymentVerification :confirmed="component === 'verified'" />
    </div>
    <div v-else-if="component === 'installments'" class="w-[736px]">
      <InstallmentOffers :monthly-from="300" />
    </div>
    <div v-else-if="component === 'methods'" class="flex w-[735px] flex-col gap-4">
      <PaymentMethodOption
        v-model="selected"
        name="m"
        value="tabby"
        :label="t('shop.payment.methods.visa')"
        :logo="visaLogo"
      />
      <PaymentMethodOption
        v-model="selected"
        name="m"
        value="visa"
        :label="t('shop.payment.methods.visa')"
        :logo="tabbyLogo"
      />
    </div>
    <div v-else-if="component === 'line'" class="w-[466px]">
      <CartItemCard v-if="cart.items[0]" :item="cart.items[0]" />
    </div>
  </div>
</template>

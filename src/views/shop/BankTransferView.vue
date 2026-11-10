<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import BankTransferForm from '@/components/shop/BankTransferForm.vue'
import CheckoutLayout from '@/components/shop/CheckoutLayout.vue'
import OrderSummary from '@/components/shop/OrderSummary.vue'
import PaymentVerification from '@/components/shop/PaymentVerification.vue'
import { bankAccount } from '@/mocks/shop'
import { useCartStore } from '@/stores/cart'

const { t } = useI18n()
const cart = useCartStore()
const { itemsCount, subtotal, vat, total } = storeToRefs(cart)

type Stage = 'form' | 'pending' | 'confirmed'
const stage = ref<Stage>('form')

/** Mock: the transfer is "verified" a few seconds after the receipt is sent. */
const { start: simulateReview } = useTimeoutFn(() => (stage.value = 'confirmed'), 4000, {
  immediate: false,
})

function onSubmitted(): void {
  stage.value = 'pending'
  window.scrollTo({ top: 0, behavior: 'smooth' })
  simulateReview()
}
</script>

<template>
  <CheckoutLayout :title="t('shop.payment.title')" step="payment">
    <BankTransferForm
      v-if="stage === 'form'"
      :account="bankAccount"
      :amount="total"
      @submitted="onSubmitted"
    />
    <PaymentVerification v-else :confirmed="stage === 'confirmed'" />

    <template #aside>
      <OrderSummary :count="itemsCount" :subtotal="subtotal" :vat="vat" :total="total" />
    </template>
  </CheckoutLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import BankTransferForm from '@/components/shop/BankTransferForm.vue'
import CheckoutLayout from '@/components/shop/CheckoutLayout.vue'
import OrderSummary from '@/components/shop/OrderSummary.vue'
import ResultDialog from '@/components/shop/ResultDialog.vue'
import { bankAccount, paymentSummary } from '@/mocks/shop'

const { t } = useI18n()
const router = useRouter()
const isSentDialogOpen = ref(false)

function trackOrder(): void {
  isSentDialogOpen.value = false
  router.push({ name: 'orders' })
}
</script>

<template>
  <CheckoutLayout :title="t('shop.payment.title')" :strip-gap="235">
    <BankTransferForm
      :account="bankAccount"
      :amount="paymentSummary.total"
      @submitted="isSentDialogOpen = true"
    />

    <template #aside>
      <OrderSummary v-bind="paymentSummary" />
    </template>
  </CheckoutLayout>

  <ResultDialog
    v-model:open="isSentDialogOpen"
    :message="t('shop.bankTransfer.sent')"
    :action-label="t('shop.cart.trackOrder')"
    @action="trackOrder"
  />
</template>

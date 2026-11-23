<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import AlertIcon from '@/assets/icons/alert-circle--stroke-rounded.svg'
import BankIcon from '@/assets/icons/bank--duotone-rounded.svg'
import WalletIcon from '@/assets/icons/wallet-02--duotone-rounded.svg'
import madaLogo from '@/assets/images/shop/mada.webp'
import tabbyLogo from '@/assets/images/shop/tabby.webp'
import tamaraLogo from '@/assets/images/shop/tamara.webp'
import visaLogo from '@/assets/images/shop/visa.webp'
import CardPaymentDialog from '@/components/shop/CardPaymentDialog.vue'
import CheckoutLayout from '@/components/shop/CheckoutLayout.vue'
import OrderSummary from '@/components/shop/OrderSummary.vue'
import PaymentMethodOption from '@/components/shop/PaymentMethodOption.vue'
import PaymentSuccessDialog from '@/components/shop/PaymentSuccessDialog.vue'
import ResultDialog from '@/components/shop/ResultDialog.vue'
import ShopCard from '@/components/shop/ShopCard.vue'
import type { PaymentMethod } from '@/components/shop/types'
import WalletPayDialog from '@/components/shop/WalletPayDialog.vue'
import { paymentSummary, walletBalance } from '@/mocks/shop'

const { t } = useI18n()
const router = useRouter()

/** Payment of an order whose availability the suppliers confirmed (Figma 622:9608). */
const methods: Array<{ value: PaymentMethod; logo?: string }> = [
  { value: 'wallet' },
  { value: 'card', logo: visaLogo },
  { value: 'mada', logo: madaLogo },
  { value: 'tabby', logo: tabbyLogo },
  { value: 'tamara', logo: tamaraLogo },
  { value: 'bankTransfer' },
]

const selected = ref<string | null>(null)
const isCardDialogOpen = ref(false)
const isWalletDialogOpen = ref(false)
const isSentDialogOpen = ref(false)
const isPaidDialogOpen = ref(false)

/** The design has no "continue" button: picking a method opens its next step straight away. */
watch(selected, (method) => {
  switch (method as PaymentMethod | null) {
    case 'wallet':
      isWalletDialogOpen.value = true
      break
    case 'card':
    case 'mada':
      isCardDialogOpen.value = true
      break
    case 'tabby':
    case 'tamara':
      // Real flow redirects to the provider's hosted checkout and comes back here, paid.
      isPaidDialogOpen.value = true
      break
    case 'bankTransfer':
      router.push({ name: 'checkout-bank-transfer' })
      break
  }
})

/** Closing a dialog clears the choice so the same method can be picked again. */
watch([isCardDialogOpen, isWalletDialogOpen, isSentDialogOpen, isPaidDialogOpen], (openStates) => {
  if (openStates.every((isOpen) => !isOpen)) {
    selected.value = null
  }
})

function onPaid(): void {
  isSentDialogOpen.value = true
}

/** Closing the payment confirmation takes the trader to the order, as its hint says. */
watch(isPaidDialogOpen, (isOpen, wasOpen) => {
  if (wasOpen && !isOpen) {
    router.push({ name: 'orders' })
  }
})

function trackOrder(): void {
  isSentDialogOpen.value = false
  router.push({ name: 'orders' })
}
</script>

<template>
  <CheckoutLayout :title="t('shop.payment.title')">
    <ShopCard body-class="flex flex-col gap-4 px-6 pt-4 pb-6" header-class="py-3.5">
      <template #header>
        <h2 id="payment-methods-title" class="text-h3 text-black">
          {{ t('shop.payment.chooseMethod') }}
        </h2>
        <p class="flex items-center gap-1 rounded-lg bg-orange/10 p-2 text-body-sm text-ink">
          <AlertIcon class="size-4 shrink-0 text-orange" aria-hidden="true" />
          {{ t('shop.payment.cardFeeNote') }}
        </p>
      </template>

      <fieldset class="flex flex-col gap-3" aria-labelledby="payment-methods-title">
        <PaymentMethodOption
          v-for="method in methods"
          :key="method.value"
          v-model="selected"
          name="payment-method"
          :value="method.value"
          :logo="method.logo"
          :label="t(`shop.payment.methods.${method.value}`)"
        >
          <template #icon>
            <WalletIcon v-if="method.value === 'wallet'" class="size-7" aria-hidden="true" />
            <BankIcon v-else class="size-7" aria-hidden="true" />
          </template>
        </PaymentMethodOption>
      </fieldset>
    </ShopCard>

    <template #aside>
      <OrderSummary v-bind="paymentSummary" />
    </template>
  </CheckoutLayout>

  <CardPaymentDialog v-model:open="isCardDialogOpen" />
  <WalletPayDialog
    v-model:open="isWalletDialogOpen"
    :balance="walletBalance"
    :amount="paymentSummary.total"
    @paid="onPaid"
  />
  <ResultDialog
    v-model:open="isSentDialogOpen"
    :message="t('shop.cart.purchaseSent')"
    :action-label="t('shop.cart.trackOrder')"
    @action="trackOrder"
  />
  <PaymentSuccessDialog v-model:open="isPaidDialogOpen" />
</template>

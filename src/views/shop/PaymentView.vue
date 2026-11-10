<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import AlertIcon from '@/assets/icons/alert-circle--stroke-rounded.svg'
import BankIcon from '@/assets/icons/money-04--duotone-rounded.svg'
import madaLogo from '@/assets/images/shop/mada.webp'
import mastercardLogo from '@/assets/images/shop/mastercard.webp'
import tabbyLogo from '@/assets/images/shop/tabby.webp'
import tamaraLogo from '@/assets/images/shop/tamara.webp'
import visaLogo from '@/assets/images/shop/visa.webp'
import CardPaymentDialog from '@/components/shop/CardPaymentDialog.vue'
import CheckoutLayout from '@/components/shop/CheckoutLayout.vue'
import InstallmentOffers from '@/components/shop/InstallmentOffers.vue'
import OrderSummary from '@/components/shop/OrderSummary.vue'
import PaymentMethodOption from '@/components/shop/PaymentMethodOption.vue'
import ShopCard from '@/components/shop/ShopCard.vue'
import type { PaymentMethod } from '@/components/shop/types'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useCartStore } from '@/stores/cart'

const { t } = useI18n()
const router = useRouter()
const cart = useCartStore()
const { paymentMethod, itemsCount, subtotal, vat, total } = storeToRefs(cart)
const isCardDialogOpen = ref(false)

const methods: Array<{ value: PaymentMethod; logo?: string }> = [
  { value: 'visa', logo: visaLogo },
  { value: 'mastercard', logo: mastercardLogo },
  { value: 'mada', logo: madaLogo },
  { value: 'tabby', logo: tabbyLogo },
  { value: 'tamara', logo: tamaraLogo },
  { value: 'bankTransfer' },
]

const selected = computed<string | null>({
  get: () => paymentMethod.value,
  set: (value) => (paymentMethod.value = value as PaymentMethod),
})

/** Lowest monthly instalment shown in the tabby / tamara offer (24 months). */
const monthlyFrom = computed(() => Math.ceil(total.value / 24))

function proceed(): void {
  switch (paymentMethod.value) {
    case 'bankTransfer':
      router.push({ name: 'checkout-bank-transfer' })
      break
    case 'tabby':
    case 'tamara':
      // Real flow redirects to the provider's hosted checkout.
      router.push({ name: 'checkout-confirmation' })
      break
    case null:
      break
    default:
      isCardDialogOpen.value = true
  }
}
</script>

<template>
  <CheckoutLayout :title="t('shop.payment.title')" step="payment">
    <ShopCard body-class="flex flex-col gap-8 p-6">
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
          <template #icon><BankIcon class="size-5 text-primary" aria-hidden="true" /></template>
        </PaymentMethodOption>
      </fieldset>

      <InstallmentOffers :monthly-from="monthlyFrom" />

      <BaseButton class="self-start px-[72px]" :disabled="!paymentMethod" @click="proceed">
        {{ t('shop.payment.continue') }}
      </BaseButton>
    </ShopCard>

    <template #aside>
      <OrderSummary :count="itemsCount" :subtotal="subtotal" :vat="vat" :total="total" />
    </template>
  </CheckoutLayout>

  <CardPaymentDialog v-model:open="isCardDialogOpen" />
</template>

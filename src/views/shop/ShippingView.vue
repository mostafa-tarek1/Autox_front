<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import PhoneField from '@/components/form/PhoneField.vue'
import SelectField from '@/components/form/SelectField.vue'
import TextField from '@/components/form/TextField.vue'
import CheckoutLayout from '@/components/shop/CheckoutLayout.vue'
import OrderSummary from '@/components/shop/OrderSummary.vue'
import ShopCard from '@/components/shop/ShopCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { shippingCities } from '@/mocks/shop'
import { useCartStore } from '@/stores/cart'

const { t } = useI18n()
const router = useRouter()
const cart = useCartStore()
const { shipping, itemsCount, subtotal, vat, total } = storeToRefs(cart)

const form = reactive({ ...shipping.value })
const isSubmitted = ref(false)

const errors = computed(() => ({
  fullName: form.fullName.trim() ? '' : t('shop.shipping.required'),
  phone: /^5\d{8}$/.test(form.phone) ? '' : t('shop.shipping.invalidPhone'),
  city: form.city ? '' : t('shop.shipping.required'),
  address: form.address.trim() ? '' : t('shop.shipping.required'),
}))
const isValid = computed(() => Object.values(errors.value).every((error) => !error))

function errorFor(field: keyof typeof errors.value): string | undefined {
  return isSubmitted.value ? errors.value[field] || undefined : undefined
}

function submit(): void {
  isSubmitted.value = true
  if (!isValid.value) {
    return
  }
  shipping.value = { ...form }
  router.push({ name: 'checkout-payment' })
}
</script>

<template>
  <CheckoutLayout :title="t('shop.shipping.title')" step="shipping">
    <ShopCard :title="t('shop.shipping.title')" body-class="p-6">
      <form class="flex flex-col gap-4" novalidate @submit.prevent="submit">
        <TextField
          v-model="form.fullName"
          :label="t('shop.shipping.fullName')"
          autocomplete="name"
          :error="errorFor('fullName')"
          required
        />
        <PhoneField
          v-model="form.phone"
          :label="t('shop.shipping.phone')"
          placeholder="5X XXX XXXX"
          :error="errorFor('phone')"
        />
        <SelectField
          v-model="form.city"
          :label="t('shop.shipping.city')"
          :placeholder="t('form.choose')"
          :options="shippingCities"
          :error="errorFor('city')"
          required
        />
        <TextField
          v-model="form.address"
          :label="t('shop.shipping.address')"
          :placeholder="t('shop.shipping.addressPlaceholder')"
          autocomplete="street-address"
          :error="errorFor('address')"
          required
        />
        <BaseButton type="submit" class="mt-4 min-w-[173px] self-start px-[72px]">{{
          t('shop.shipping.confirm')
        }}</BaseButton>
      </form>
    </ShopCard>

    <template #aside>
      <OrderSummary :count="itemsCount" :subtotal="subtotal" :vat="vat" :total="total" />
    </template>
  </CheckoutLayout>
</template>

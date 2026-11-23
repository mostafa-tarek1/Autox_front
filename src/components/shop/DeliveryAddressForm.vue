<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import PhoneField from '@/components/form/PhoneField.vue'
import SelectField from '@/components/form/SelectField.vue'
import TextField from '@/components/form/TextField.vue'
import { useLocalizedText } from '@/composables/useLocalizedText'
import { deliveryCities } from '@/mocks/shop'

import { validateDeliveryAddress } from './deliveryAddress'
import ShopCard from './ShopCard.vue'
import type { DeliveryAddress } from './types'

/** "عنوان التوصيل" card of the cart (Figma 588:16534). */
const props = defineProps<{ showErrors: boolean }>()
const address = defineModel<DeliveryAddress>({ required: true })
const { t } = useI18n()
const localized = useLocalizedText()
const cityOptions = computed(() =>
  deliveryCities.map((city) => ({ value: city.value, label: localized(city.label) })),
)

const errors = computed(() => (props.showErrors ? validateDeliveryAddress(address.value) : {}))
const message = (field: keyof DeliveryAddress) => {
  const code = errors.value[field]
  return code ? t(`shop.address.${code}`) : undefined
}
</script>

<template>
  <ShopCard
    id="delivery-address"
    :title="t('shop.cart.addressTitle')"
    body-class="flex flex-col gap-4 p-6"
  >
    <TextField
      v-model="address.fullName"
      :label="t('shop.address.fullName')"
      autocomplete="name"
      :error="message('fullName')"
    />
    <PhoneField
      v-model="address.phone"
      :label="t('shop.address.phone')"
      :error="message('phone')"
    />
    <SelectField
      v-model="address.city"
      :options="cityOptions"
      :label="t('shop.address.city')"
      :placeholder="t('shop.address.cityPlaceholder')"
      :error="message('city')"
    />
    <TextField
      v-model="address.district"
      :label="t('shop.address.district')"
      :placeholder="t('shop.address.districtPlaceholder')"
    />
    <TextField
      v-model="address.street"
      :label="t('shop.address.street')"
      :placeholder="t('shop.address.streetPlaceholder')"
      autocomplete="address-line1"
    />
    <TextField
      v-model="address.building"
      :label="t('shop.address.building')"
      :placeholder="t('shop.address.buildingPlaceholder')"
      inputmode="numeric"
    />
    <TextField
      v-model="address.details"
      :label="t('shop.address.details')"
      :placeholder="t('shop.address.detailsPlaceholder')"
      autocomplete="street-address"
    />
  </ShopCard>
</template>

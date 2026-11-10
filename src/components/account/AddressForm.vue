<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import LocationIcon from '@/assets/icons/location-04--stroke-rounded.svg?component'
import NoteIcon from '@/assets/icons/note-01--stroke-rounded.svg?component'
import TextField from '@/components/form/TextField.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import type { ShippingAddress } from '@/mocks/account'

import { useFormValidation } from './useFormValidation'
import { minLength, required } from './validators'

const props = defineProps<{ address?: ShippingAddress; defaultLabel: string }>()
const emit = defineEmits<{ save: [values: Pick<ShippingAddress, 'label' | 'address'>] }>()
const { t } = useI18n()

const { values, errors, check } = useFormValidation(
  { label: props.address?.label ?? props.defaultLabel, address: props.address?.address ?? '' },
  { label: [required], address: [required, minLength(10)] },
)

function submit(): void {
  if (check()) {
    emit('save', { label: values.label.trim(), address: values.address.trim() })
  }
}
</script>

<template>
  <form class="flex flex-col gap-6" novalidate @submit.prevent="submit">
    <div class="flex flex-col gap-5">
      <TextField
        v-model="values.label"
        :label="t('account.addresses.label')"
        :placeholder="t('account.addresses.labelPlaceholder')"
        :icon="NoteIcon"
        :error="errors.label"
      />
      <TextField
        v-model="values.address"
        multiline
        :rows="3"
        :label="t('account.addresses.address')"
        :placeholder="t('account.addresses.addressPlaceholder')"
        :icon="LocationIcon"
        :error="errors.address"
        autocomplete="street-address"
      />
    </div>
    <BaseButton type="submit" class="self-start px-10">{{ t('account.save') }}</BaseButton>
  </form>
</template>

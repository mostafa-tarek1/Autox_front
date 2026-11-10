<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import MailIcon from '@/assets/icons/mail-01--stroke-rounded.svg?component'
import PhoneIcon from '@/assets/icons/smart-phone-01--stroke-rounded.svg?component'
import UserIcon from '@/assets/icons/user--stroke-rounded.svg?component'
import TextField from '@/components/form/TextField.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import type { AccountProfile } from '@/mocks/account'

import { useFormValidation } from './useFormValidation'
import { email, minLength, required, saudiMobile } from './validators'

const props = defineProps<{ profile: AccountProfile }>()
const emit = defineEmits<{ save: [profile: Pick<AccountProfile, 'name' | 'phone' | 'email'>] }>()
const { t } = useI18n()

const { values, errors, check } = useFormValidation(
  { name: props.profile.name, phone: props.profile.phone, email: props.profile.email },
  { name: [required, minLength(3)], phone: [required, saudiMobile], email: [required, email] },
)

function submit(): void {
  if (check()) {
    emit('save', {
      name: values.name.trim(),
      phone: values.phone.replace(/\s/g, ''),
      email: values.email.trim(),
    })
  }
}
</script>

<template>
  <form class="flex flex-col gap-6" novalidate @submit.prevent="submit">
    <div class="flex flex-col gap-5">
      <TextField
        v-model="values.name"
        :label="t('account.personal.fullName')"
        :icon="UserIcon"
        :error="errors.name"
        autocomplete="name"
      />
      <TextField
        v-model="values.phone"
        :label="t('account.personal.phone')"
        :icon="PhoneIcon"
        :error="errors.phone"
        autocomplete="tel-national"
        dir="ltr"
      />
      <TextField
        v-model="values.email"
        type="email"
        :label="t('account.personal.email')"
        :icon="MailIcon"
        :error="errors.email"
        autocomplete="email"
        dir="ltr"
      />
    </div>
    <BaseButton type="submit" class="self-start px-10">{{ t('account.save') }}</BaseButton>
  </form>
</template>

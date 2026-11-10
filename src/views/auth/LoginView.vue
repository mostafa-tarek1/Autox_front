<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import UserAddIcon from '@/assets/icons/user-add-01--stroke-standard.svg'
import AuthCard from '@/components/auth/AuthCard.vue'
import AuthHeading from '@/components/auth/AuthHeading.vue'
import { isValidSaudiMobile } from '@/components/auth/validation'
import PhoneField from '@/components/form/PhoneField.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { requestLoginOtp } from '@/mocks/auth'

const { t } = useI18n()
const router = useRouter()

const phone = ref('')
const touched = ref(false)
const isSubmitting = ref(false)

const isValid = computed(() => isValidSaudiMobile(phone.value))
const phoneError = computed(() =>
  touched.value && phone.value && !isValid.value ? t('auth.errors.phone') : '',
)

async function submit(): Promise<void> {
  touched.value = true
  if (!isValid.value || isSubmitting.value) {
    return
  }
  isSubmitting.value = true
  try {
    const { phone: sentTo } = await requestLoginOtp(phone.value)
    await router.push({ name: 'verify-otp', state: { phone: sentTo, flow: 'login' } })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <AuthCard aria-labelledby="login-title">
    <AuthHeading
      title-id="login-title"
      :title="t('auth.login.title')"
      :subtitle="t('auth.login.subtitle')"
    />

    <form class="flex w-full flex-col gap-6" novalidate @submit.prevent="submit">
      <PhoneField
        v-model="phone"
        :bordered="false"
        :placeholder="t('auth.fields.phone')"
        :error="phoneError"
        class="[&_label]:sr-only"
        :label="t('auth.fields.phone')"
        @focusout="touched = true"
      />
      <BaseButton type="submit" block :disabled="!isValid" :loading="isSubmitting">
        {{ t('auth.login.submit') }}
      </BaseButton>
    </form>

    <BaseButton :to="{ name: 'register' }" variant="outline">
      <template #icon><UserAddIcon class="size-5" aria-hidden="true" /></template>
      {{ t('auth.login.createAccount') }}
    </BaseButton>
  </AuthCard>
</template>

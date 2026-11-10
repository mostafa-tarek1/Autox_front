<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import AuthCard from '@/components/auth/AuthCard.vue'
import AuthHeading from '@/components/auth/AuthHeading.vue'
import OtpInput from '@/components/auth/OtpInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { verifyOtp, type AuthFlow } from '@/mocks/auth'

const OTP_LENGTH = 4

const { t } = useI18n()
const router = useRouter()

/** Phone and flow come through history state, so the number never lands in the URL. */
const state = (history.state ?? {}) as { phone?: string; flow?: AuthFlow }

/** Dev-only `?previewPhone=` lets the screen be opened directly for design comparison. */
const previewPhone = import.meta.env.DEV
  ? (new URLSearchParams(location.search).get('previewPhone') ?? undefined)
  : undefined
const phone = state.phone ?? previewPhone
const flow = state.flow

const code = ref('')
const error = ref('')
const isSubmitting = ref(false)

const isComplete = computed(() => code.value.length === OTP_LENGTH)

onMounted(() => {
  if (!phone) {
    router.replace({ name: 'login' })
  }
})

async function submit(): Promise<void> {
  if (!isComplete.value || isSubmitting.value || !phone) {
    return
  }
  isSubmitting.value = true
  error.value = ''
  try {
    const { valid } = await verifyOtp(phone, code.value)
    if (!valid) {
      error.value = t('auth.errors.otp')
      return
    }
    await router.replace(flow === 'register' ? { name: 'pending-approval' } : { name: 'home' })
  } finally {
    isSubmitting.value = false
  }
}

function onCodeChange(): void {
  error.value = ''
}
</script>

<template>
  <AuthCard aria-labelledby="otp-title">
    <AuthHeading
      title-id="otp-title"
      :title="t('auth.otp.title')"
      :subtitle="t('auth.otp.subtitle')"
    />

    <form class="flex w-full flex-col items-center gap-6" novalidate @submit.prevent="submit">
      <OtpInput
        v-model="code"
        :length="OTP_LENGTH"
        :invalid="Boolean(error)"
        described-by="otp-error"
        @update:model-value="onCodeChange"
      />
      <p v-if="error" id="otp-error" class="-mt-2 text-body-sm text-white" role="alert">
        {{ error }}
      </p>
      <BaseButton
        type="submit"
        block
        class="max-w-[304px]"
        :disabled="!isComplete"
        :loading="isSubmitting"
      >
        {{ t('auth.otp.submit') }}
      </BaseButton>
    </form>
  </AuthCard>
</template>

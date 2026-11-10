<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import BuildingIcon from '@/assets/icons/building-03--stroke-rounded.svg'
import FileIcon from '@/assets/icons/file-02--stroke-rounded.svg'
import MailIcon from '@/assets/icons/mail-01--stroke-rounded.svg'
import UserIcon from '@/assets/icons/user--stroke-rounded.svg'
import AuthCard from '@/components/auth/AuthCard.vue'
import AuthHeading from '@/components/auth/AuthHeading.vue'
import DocumentTile from '@/components/auth/DocumentTile.vue'
import {
  isValidEmail,
  isValidSaudiMobile,
  isValidUnifiedNumber,
} from '@/components/auth/validation'
import PhoneField from '@/components/form/PhoneField.vue'
import TextField from '@/components/form/TextField.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { registerTrader } from '@/mocks/auth'

type DocumentKey = 'commercialRegister' | 'taxRegister' | 'nationalAddress'

const { t } = useI18n()
const router = useRouter()

const form = reactive({
  fullName: '',
  phone: '',
  email: '',
  companyName: '',
  unifiedNumber: '',
})

const documents = reactive<Record<DocumentKey, File | null>>({
  commercialRegister: null,
  taxRegister: null,
  nationalAddress: null,
})

/** Order follows the design: commercial register first (start side). */
const documentKeys: DocumentKey[] = ['commercialRegister', 'taxRegister', 'nationalAddress']

const submitted = ref(false)
const isSubmitting = ref(false)
const documentError = ref('')

const errors = computed(() => {
  if (!submitted.value) {
    return {}
  }
  return {
    fullName: form.fullName.trim().length < 3 ? t('auth.errors.fullName') : '',
    phone: isValidSaudiMobile(form.phone) ? '' : t('auth.errors.phone'),
    email: isValidEmail(form.email) ? '' : t('auth.errors.email'),
    companyName: form.companyName.trim().length < 2 ? t('auth.errors.companyName') : '',
    unifiedNumber: isValidUnifiedNumber(form.unifiedNumber) ? '' : t('auth.errors.unifiedNumber'),
    documents: documentKeys.some((key) => !documents[key]) ? t('auth.errors.documents') : '',
  }
})

const hasErrors = computed(() => Object.values(errors.value).some(Boolean))

function onRejected(reason: 'size' | 'type'): void {
  documentError.value =
    reason === 'size' ? t('auth.errors.fileSize', { size: 5 }) : t('auth.errors.fileType')
}

function onDocumentPicked(key: DocumentKey, file: File | null): void {
  documents[key] = file
  documentError.value = ''
}

async function submit(): Promise<void> {
  submitted.value = true
  if (hasErrors.value || isSubmitting.value) {
    return
  }
  const { commercialRegister, taxRegister, nationalAddress } = documents
  if (!commercialRegister || !taxRegister || !nationalAddress) {
    return
  }
  isSubmitting.value = true
  try {
    const { phone } = await registerTrader({
      ...form,
      documents: { commercialRegister, taxRegister, nationalAddress },
    })
    await router.push({ name: 'verify-otp', state: { phone, flow: 'register' } })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <AuthCard aria-labelledby="register-title" class="sm:-mt-4">
    <AuthHeading title-id="register-title" :title="t('auth.register.title')" />

    <form
      class="flex w-full flex-col gap-6 [&_label]:leading-5 [&_label]:text-white"
      novalidate
      @submit.prevent="submit"
    >
      <TextField
        v-model="form.fullName"
        :label="t('auth.fields.fullName')"
        :placeholder="t('auth.placeholders.fullName')"
        :icon="UserIcon"
        :error="errors.fullName"
        autocomplete="name"
      />
      <PhoneField
        v-model="form.phone"
        :bordered="false"
        size="sm"
        :label="t('auth.fields.phone')"
        :placeholder="t('auth.placeholders.phone')"
        :error="errors.phone"
      />
      <TextField
        v-model="form.email"
        type="email"
        dir="ltr"
        class="rtl:text-right"
        :label="t('auth.fields.email')"
        :placeholder="t('auth.placeholders.email')"
        :icon="MailIcon"
        :error="errors.email"
        autocomplete="email"
      />
      <TextField
        v-model="form.companyName"
        :label="t('auth.fields.companyName')"
        :placeholder="t('auth.placeholders.companyName')"
        :icon="BuildingIcon"
        :error="errors.companyName"
        autocomplete="organization"
      />
      <TextField
        v-model="form.unifiedNumber"
        dir="ltr"
        class="rtl:text-right"
        :label="t('auth.fields.unifiedNumber')"
        :placeholder="t('auth.placeholders.unifiedNumber')"
        :icon="FileIcon"
        :error="errors.unifiedNumber"
      />

      <div role="group" aria-labelledby="register-documents-title" class="flex flex-col gap-2">
        <div class="flex flex-col gap-1">
          <p id="register-documents-title" class="text-label leading-5 text-white">
            {{ t('auth.register.documents.title') }}
          </p>
          <p class="text-body-sm text-white/80">{{ t('auth.register.documents.hint') }}</p>
        </div>
        <div class="grid grid-cols-1 gap-2 min-[480px]:grid-cols-3">
          <DocumentTile
            v-for="key in documentKeys"
            :key="key"
            :model-value="documents[key]"
            :label="t(`auth.register.documents.${key}`)"
            :invalid="Boolean(errors.documents) && !documents[key]"
            @update:model-value="onDocumentPicked(key, $event)"
            @rejected="onRejected"
          />
        </div>
        <p v-if="documentError || errors.documents" class="text-caption text-white" role="alert">
          {{ documentError || errors.documents }}
        </p>
      </div>

      <BaseButton type="submit" block :loading="isSubmitting">{{
        t('auth.register.submit')
      }}</BaseButton>
    </form>
  </AuthCard>
</template>

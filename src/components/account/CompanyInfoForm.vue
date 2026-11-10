<script setup lang="ts">
import { ref, useId } from 'vue'
import { useI18n } from 'vue-i18n'

import BuildingIcon from '@/assets/icons/building-03--stroke-rounded.svg'
import FileIcon from '@/assets/icons/file-02--stroke-rounded.svg'
import LegalIcon from '@/assets/icons/legal-document-01--stroke-rounded.svg'
import LocationIcon from '@/assets/icons/location-04--stroke-rounded.svg'
import FileDropzone from '@/components/form/FileDropzone.vue'
import TextField from '@/components/form/TextField.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import type { CompanyInfo } from '@/mocks/account'

import { useFormValidation } from './useFormValidation'
import { digits, minLength, required, unifiedNumber, vatNumber } from './validators'

export type CompanyFormValues = Pick<
  CompanyInfo,
  'name' | 'commercialRegister' | 'taxNumber' | 'nationalAddress' | 'unifiedNumber'
>

const props = defineProps<{ company: CompanyInfo }>()
const emit = defineEmits<{ save: [values: CompanyFormValues, attachment: File | null] }>()
const { t } = useI18n()

const attachment = ref<File | null>(null)
const documentsLabelId = useId()
const { values, errors, check } = useFormValidation(
  {
    name: props.company.name,
    commercialRegister: props.company.commercialRegister,
    taxNumber: props.company.taxNumber,
    nationalAddress: props.company.nationalAddress,
    unifiedNumber: props.company.unifiedNumber,
  },
  {
    name: [required, minLength(3)],
    commercialRegister: [required, digits(10)],
    taxNumber: [required, vatNumber],
    nationalAddress: [required],
    unifiedNumber: [required, unifiedNumber],
  },
)

function submit(): void {
  if (check()) {
    emit('save', { ...values }, attachment.value)
  }
}
</script>

<template>
  <form class="flex flex-col gap-6" novalidate @submit.prevent="submit">
    <div class="flex flex-col gap-5">
      <TextField
        v-model="values.name"
        :label="t('account.company.companyName')"
        :placeholder="t('account.company.companyName')"
        :icon="BuildingIcon"
        :error="errors.name"
        autocomplete="organization"
      />
      <TextField
        v-model="values.commercialRegister"
        :label="t('account.company.commercialRegister')"
        :icon="LegalIcon"
        :error="errors.commercialRegister"
      />
      <TextField
        v-model="values.taxNumber"
        :label="t('account.company.taxNumber')"
        :icon="LegalIcon"
        :error="errors.taxNumber"
      />
      <TextField
        v-model="values.nationalAddress"
        :label="t('account.company.nationalAddress')"
        :placeholder="t('account.company.nationalAddressPlaceholder')"
        :icon="LocationIcon"
        :error="errors.nationalAddress"
      />
      <TextField
        v-model="values.unifiedNumber"
        :label="t('account.company.unifiedNumber')"
        :icon="FileIcon"
        :error="errors.unifiedNumber"
      />
      <div role="group" :aria-labelledby="documentsLabelId" class="flex flex-col gap-2">
        <p :id="documentsLabelId" class="text-label text-secondary">
          {{ t('account.company.companyDocuments') }}
        </p>
        <p class="text-body-sm text-secondary/80">{{ t('account.company.documentsHint') }}</p>
        <FileDropzone v-model="attachment" />
      </div>
    </div>
    <BaseButton type="submit" class="self-start">{{ t('account.company.submit') }}</BaseButton>
  </form>
</template>

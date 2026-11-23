<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import SelectField from '@/components/form/SelectField.vue'
import TextField from '@/components/form/TextField.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { saudiBanks, type BankAccount } from '@/mocks/account'

import type { BankAccountValues } from './useAccountState'
import { useFormValidation } from './useFormValidation'
import { formatIban, minLength, normalizeIban, required, saudiIban } from './validators'

/**
 * Bank name, beneficiary and IBAN (Figma "add new" 675:18374, also step 2 of the withdrawal
 * request). Emits normalized values; the parent decides what saving means.
 */
const props = withDefaults(
  defineProps<{ account?: BankAccount; submitLabel: string; loading?: boolean }>(),
  { loading: false },
)
const emit = defineEmits<{ save: [values: BankAccountValues] }>()
const { t } = useI18n()

const bankOptions = saudiBanks.map((bank) => ({ value: bank.id, label: bank.name }))

const { values, errors, check } = useFormValidation(
  {
    bankId: props.account?.bankId ?? '',
    beneficiary: props.account?.beneficiary ?? '',
    iban: props.account ? formatIban(props.account.iban) : '',
  },
  { bankId: [required], beneficiary: [required, minLength(3)], iban: [required, saudiIban] },
)

/** Keeps the IBAN readable while typing: upper-case, grouped in fours, 24 characters max. */
function onIbanInput(value: string): void {
  values.iban = formatIban(normalizeIban(value).slice(0, 24))
}

function submit(): void {
  if (check()) {
    emit('save', {
      bankId: values.bankId,
      beneficiary: values.beneficiary.trim(),
      iban: normalizeIban(values.iban),
    })
  }
}

defineExpose({ submit })
</script>

<template>
  <form class="flex flex-col gap-[31px]" novalidate @submit.prevent="submit">
    <div class="flex flex-col gap-[31px]">
      <SelectField
        :model-value="values.bankId || null"
        :options="bankOptions"
        :label="t('account.bank.bankName')"
        :placeholder="t('form.choose')"
        :error="errors.bankId"
        @update:model-value="values.bankId = $event ?? ''"
      />
      <TextField
        v-model="values.beneficiary"
        :label="t('account.bank.beneficiary')"
        :placeholder="t('account.bank.beneficiaryPlaceholder')"
        :error="errors.beneficiary"
        autocomplete="name"
      />
      <TextField
        :model-value="values.iban"
        :label="t('account.bank.iban')"
        placeholder="SA00 0000 0000 0000 0000 0000"
        :error="errors.iban"
        dir="ltr"
        inputmode="text"
        autocomplete="off"
        spellcheck="false"
        class="rtl:text-right"
        @update:model-value="onIbanInput"
      />
    </div>
    <slot name="actions">
      <BaseButton type="submit" :loading="loading" class="w-full sm:w-[238px] sm:self-start">
        {{ submitLabel }}
      </BaseButton>
    </slot>
  </form>
</template>

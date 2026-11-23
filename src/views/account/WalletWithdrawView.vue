<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import TickIcon from '@/assets/icons/tick-02--solid-standard.svg'
import StepCard from '@/components/account/StepCard.vue'
import { useAccountState } from '@/components/account/useAccountState'
import { useFormValidation } from '@/components/account/useFormValidation'
import {
  formatIban,
  minLength,
  normalizeIban,
  required,
  saudiIban,
  type Validator,
} from '@/components/account/validators'
import SelectField from '@/components/form/SelectField.vue'
import TextField from '@/components/form/TextField.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import { saudiBanks } from '@/mocks/account'

const { t } = useI18n()
const router = useRouter()
const { state } = useAccountState()

const bankOptions = saudiBanks.map((bank) => ({ value: bank.id, label: bank.name }))

/** A positive amount that the withdrawable balance can cover. */
const withdrawableAmount: Validator = (value) => {
  const amount = Number(value)
  if (!(amount > 0)) {
    return { key: 'wallet.withdrawForm.amountInvalid' }
  }
  return amount > state.wallet.withdrawable ? { key: 'wallet.withdrawForm.amountTooHigh' } : null
}

const { values, errors, check } = useFormValidation(
  {
    amount: '',
    bankId: '',
    beneficiary: '',
    iban: '',
  },
  {
    amount: [required, withdrawableAmount],
    bankId: [required],
    beneficiary: [required, minLength(3)],
    iban: [required, saudiIban],
  },
)

const isSubmitting = ref(false)
const isDone = ref(false)

/** Keeps the amount numeric (digits and one decimal point with two decimals). */
function onAmountInput(value: string): void {
  const cleaned = value.replace(/[^\d.]/g, '')
  const [whole = '', ...decimals] = cleaned.split('.')
  values.amount = decimals.length ? `${whole}.${decimals.join('').slice(0, 2)}` : whole
}

function onIbanInput(value: string): void {
  values.iban = formatIban(normalizeIban(value).slice(0, 24))
}

async function submit(): Promise<void> {
  if (!check()) {
    return
  }
  isSubmitting.value = true
  // Mock request until the withdrawal endpoint exists.
  await new Promise((resolve) => setTimeout(resolve, 600))
  isSubmitting.value = false
  isDone.value = true
}

watch(isDone, (open, wasOpen) => {
  if (wasOpen && !open) {
    router.push({ name: 'wallet' })
  }
})
</script>

<template>
  <div class="page-container flex flex-col">
    <header class="flex flex-col gap-3 pt-8 pb-[33px]">
      <h1 class="text-h1 leading-10 text-ink">{{ t('wallet.withdrawForm.title') }}</h1>
      <p class="text-h3 text-secondary">{{ t('wallet.withdrawForm.subtitle') }}</p>
    </header>

    <form
      class="flex flex-col gap-[31px] rounded-3xl bg-white p-5 shadow-card sm:p-8"
      novalidate
      @submit.prevent="submit"
    >
      <StepCard :step="1" :title="t('wallet.withdrawForm.amountStep')">
        <div class="sm:px-4">
          <TextField
            :model-value="values.amount"
            :label="t('wallet.withdrawForm.amount')"
            placeholder="0"
            inputmode="decimal"
            :error="errors.amount"
            @update:model-value="onAmountInput"
          />
        </div>
      </StepCard>

      <StepCard :step="2" :title="t('wallet.withdrawForm.bankStep')">
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
            autocomplete="off"
            spellcheck="false"
            class="rtl:text-right"
            @update:model-value="onIbanInput"
          />
        </div>
      </StepCard>

      <BaseButton type="submit" :loading="isSubmitting" class="w-full sm:w-[238px] sm:self-start">
        {{ t('wallet.withdrawForm.submit') }}
      </BaseButton>
    </form>
  </div>

  <BaseModal
    v-model:open="isDone"
    tone="surface"
    panel-class="max-w-[320px] rounded-2xl px-6 py-12"
    close-class="top-2 start-2"
  >
    <div class="flex flex-col items-center gap-2 text-center" role="status">
      <span class="grid size-10 place-items-center rounded-full bg-accent text-primary">
        <TickIcon class="size-8" aria-hidden="true" />
      </span>
      <p class="text-h4 text-secondary">{{ t('wallet.withdrawForm.sent') }}</p>
    </div>
  </BaseModal>
</template>

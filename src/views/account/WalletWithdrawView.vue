<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRouter } from 'vue-router'

import AccountModal from '@/components/account/AccountModal.vue'
import StepCard from '@/components/account/StepCard.vue'
import { useAccountState } from '@/components/account/useAccountState'
import SelectField from '@/components/form/SelectField.vue'
import TextField from '@/components/form/TextField.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { bankAccounts } from '@/mocks/account'

const { t } = useI18n()
const router = useRouter()
const { state } = useAccountState()

const form = reactive({
  amount: '',
  bankAccountId: null as string | null,
  vatAmount: '',
  invoiceMatched: false,
  agreed: false,
})
const submitted = ref(false)
const isSubmitting = ref(false)
const isDone = ref(false)

const bankOptions = bankAccounts.map((account) => ({
  value: account.id,
  label: `${account.bank} — ${account.iban}`,
}))

const errors = computed(() => {
  if (!submitted.value) {
    return {}
  }
  const amount = Number(form.amount)
  const vatAmount = Number(form.vatAmount)
  const result: Partial<Record<'amount' | 'bankAccountId' | 'vatAmount' | 'agreed', string>> = {}
  if (!form.amount || !(amount > 0)) {
    result.amount = t('wallet.withdrawForm.amountInvalid')
  } else if (amount > state.walletBalance) {
    result.amount = t('wallet.withdrawForm.amountTooHigh')
  }
  if (!form.bankAccountId) {
    result.bankAccountId = t('account.validation.required')
  }
  if (!form.vatAmount || !(vatAmount > 0)) {
    result.vatAmount = t('wallet.withdrawForm.amountInvalid')
  } else if (amount > 0 && vatAmount < amount) {
    result.vatAmount = t('wallet.withdrawForm.vatTooLow')
  }
  if (!form.agreed) {
    result.agreed = t('wallet.withdrawForm.mustAgree')
  }
  return result
})

/** Keeps the amount fields numeric (digits and one decimal point). */
function sanitize(value: string): string {
  const cleaned = value.replace(/[^\d.]/g, '')
  const [whole = '', ...decimals] = cleaned.split('.')
  return decimals.length ? `${whole}.${decimals.join('').slice(0, 2)}` : whole
}

async function submit(): Promise<void> {
  submitted.value = true
  if (Object.keys(errors.value).length) {
    return
  }
  isSubmitting.value = true
  // Mock request until the withdrawal endpoint exists.
  await new Promise((resolve) => setTimeout(resolve, 600))
  isSubmitting.value = false
  isDone.value = true
}

function backToWallet(): void {
  isDone.value = false
  router.push({ name: 'wallet' })
}
</script>

<template>
  <div class="page-container flex flex-col">
    <header class="flex flex-col gap-3 py-8">
      <h1 class="text-h1 leading-10 text-ink">{{ t('wallet.withdrawForm.title') }}</h1>
      <p class="text-h3 text-secondary">{{ t('wallet.withdrawForm.subtitle') }}</p>
    </header>

    <form class="flex flex-col gap-6" novalidate @submit.prevent="submit">
      <section class="flex flex-col gap-[31px] rounded-3xl bg-white p-5 shadow-card sm:p-8">
        <StepCard :step="1" :title="t('wallet.withdrawForm.amountStep')">
          <TextField
            :model-value="form.amount"
            :label="t('wallet.withdrawForm.amount')"
            placeholder="0"
            :error="errors.amount"
            @update:model-value="form.amount = sanitize($event)"
          />
        </StepCard>
        <StepCard :step="2" :title="t('wallet.withdrawForm.bankStep')">
          <SelectField
            v-model="form.bankAccountId"
            :options="bankOptions"
            :label="t('wallet.withdrawForm.bankAccount')"
            :placeholder="t('form.choose')"
            :error="errors.bankAccountId"
          />
        </StepCard>
      </section>

      <section class="rounded-3xl bg-white p-5 shadow-card sm:p-8">
        <StepCard :step="3" :title="t('wallet.withdrawForm.vatStep')">
          <div class="flex flex-col gap-6">
            <TextField
              :model-value="form.vatAmount"
              :label="t('wallet.withdrawForm.vatAmount')"
              placeholder="0"
              :error="errors.vatAmount"
              @update:model-value="form.vatAmount = sanitize($event)"
            />
            <label class="flex items-center gap-2 text-body-md text-ink">
              <input
                v-model="form.invoiceMatched"
                type="checkbox"
                class="size-5 rounded border border-secondary/60 bg-surface accent-primary"
              />
              {{ t('wallet.withdrawForm.invoiceMatch') }}
            </label>
          </div>
        </StepCard>
      </section>

      <section class="rounded-3xl bg-white p-5 shadow-card sm:p-8">
        <StepCard :step="4" :title="t('wallet.withdrawForm.confirmStep')">
          <div class="flex flex-col gap-2">
            <label class="flex items-center gap-2 text-body-md text-ink">
              <input
                v-model="form.agreed"
                type="checkbox"
                class="size-5 rounded border border-secondary/60 bg-surface accent-primary"
                :aria-invalid="errors.agreed ? true : undefined"
              />
              <span>
                {{ t('wallet.withdrawForm.agreePrefix') }}
                <RouterLink to="/terms" target="_blank" class="text-match underline">
                  {{ t('wallet.withdrawForm.terms') }}
                </RouterLink>
              </span>
            </label>
            <p v-if="errors.agreed" class="text-caption text-error" role="alert">
              {{ errors.agreed }}
            </p>
          </div>
        </StepCard>
      </section>

      <BaseButton type="submit" :loading="isSubmitting" class="w-full sm:w-[238px] sm:self-start">
        {{ t('wallet.withdrawForm.submit') }}
      </BaseButton>
    </form>
  </div>

  <AccountModal
    v-model:open="isDone"
    :title="t('wallet.withdrawForm.successTitle')"
    width="max-w-[420px]"
  >
    <p class="mb-6 text-body-md text-secondary">{{ t('wallet.withdrawForm.successText') }}</p>
    <BaseButton block @click="backToWallet">{{ t('wallet.withdrawForm.backToWallet') }}</BaseButton>
  </AccountModal>
</template>

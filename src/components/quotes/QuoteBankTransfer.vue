<script setup lang="ts">
import { computed, reactive, ref, useId } from 'vue'
import { useI18n } from 'vue-i18n'

import InfoIcon from '@/assets/icons/information-circle--duotone-rounded.svg'
import alrajhiLogo from '@/assets/images/billing/alrajhi.webp'
import FileDropzone from '@/components/form/FileDropzone.vue'
import FormField from '@/components/form/FormField.vue'
import TextField from '@/components/form/TextField.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import PriceTag from '@/components/ui/PriceTag.vue'
import { useLocalizedText } from '@/composables/useLocalizedText'
import { quoteBankAccount } from '@/mocks/quotes'

import CopyableDetail from './CopyableDetail.vue'

/** Bank-transfer payment card for an accepted quote (Figma 686:8494). */
defineProps<{ amount: number }>()
const emit = defineEmits<{ submitted: [] }>()
const { t, tm, rt } = useI18n()
const localized = useLocalizedText()
const dateId = useId()

const form = reactive({ reference: '', date: '', receipt: null as File | null })
const submitted = ref(false)
const isSubmitting = ref(false)
const today = new Date().toISOString().slice(0, 10)

const instructions = computed(() =>
  (tm('quotes.payment.instructions') as unknown[]).map((line) => rt(line as never)),
)

const errors = computed(() => {
  if (!submitted.value) {
    return {}
  }
  return {
    reference: form.reference.trim() ? undefined : t('quotes.payment.errors.reference'),
    date: form.date ? undefined : t('quotes.payment.errors.date'),
    receipt: form.receipt ? undefined : t('quotes.payment.errors.receipt'),
  }
})

async function submit(): Promise<void> {
  submitted.value = true
  if (Object.values(errors.value).some(Boolean)) {
    return
  }
  isSubmitting.value = true
  // UI phase: simulate the upload.
  await new Promise((resolve) => setTimeout(resolve, 600))
  isSubmitting.value = false
  emit('submitted')
}
</script>

<template>
  <section class="flex flex-col rounded-2xl bg-white" aria-labelledby="quote-bank-title">
    <header class="flex flex-col items-start gap-2 border-b border-line p-6">
      <h2 id="quote-bank-title" class="text-h3 text-black">{{ t('quotes.payment.bankTitle') }}</h2>
      <p class="text-body-md text-secondary">{{ t('quotes.payment.bankIntro') }}</p>
    </header>

    <form class="flex flex-col gap-4 p-4 sm:p-6" novalidate @submit.prevent="submit">
      <div class="flex items-center justify-between gap-6 rounded-lg bg-surface p-2">
        <span class="text-body-md text-secondary">{{ t('quotes.payment.amountDue') }}</span>
        <PriceTag :amount="amount" :grouping="false" class="text-h3 text-primary" />
      </div>

      <section class="flex flex-col gap-4" aria-labelledby="quote-account-title">
        <h3 id="quote-account-title" class="text-h4 text-ink">
          {{ t('quotes.payment.accountDetails') }}
        </h3>
        <div class="flex flex-col gap-8 rounded-xl border border-line bg-white px-4 py-4 sm:px-6">
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-4">
              <span class="grid h-14 w-32 shrink-0 place-items-center rounded-xl bg-white p-2">
                <img
                  :src="alrajhiLogo"
                  alt=""
                  width="112"
                  height="40"
                  class="h-10 w-28 object-cover"
                />
              </span>
              <div class="flex flex-col items-start gap-1">
                <span class="text-body-md text-secondary">{{ t('quotes.payment.bankName') }}</span>
                <span class="text-h4 text-ink">{{ localized(quoteBankAccount.bankName) }}</span>
              </div>
            </div>
            <hr class="border-line" />
            <CopyableDetail
              :label="t('quotes.payment.beneficiary')"
              :value="localized(quoteBankAccount.beneficiary)"
            />
            <hr class="border-line" />
            <CopyableDetail :label="t('quotes.payment.iban')" :value="quoteBankAccount.iban" ltr />
          </div>

          <div
            class="flex flex-col items-start gap-2 rounded-xl border border-line bg-surface px-6 py-4"
          >
            <p class="flex items-center gap-2 text-h4 text-ink">
              <InfoIcon class="size-6 text-orange" aria-hidden="true" />
              {{ t('quotes.payment.instructionsTitle') }}
            </p>
            <ul class="list-inside list-disc text-body-sm text-muted marker:text-muted">
              <li v-for="line in instructions" :key="line">{{ line }}</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="flex flex-col gap-4" aria-labelledby="quote-confirm-title">
        <h3 id="quote-confirm-title" class="text-h4 text-ink">
          {{ t('quotes.payment.confirmTitle') }}
        </h3>
        <div class="flex flex-col gap-8 rounded-xl border border-line bg-white px-4 py-4 sm:px-6">
          <TextField
            v-model="form.reference"
            :label="t('quotes.payment.reference')"
            :placeholder="t('quotes.payment.referencePlaceholder')"
            :error="errors.reference"
            dir="ltr"
            class="rtl:text-right"
          />
          <FormField :label="t('quotes.payment.date')" :error="errors.date" :for-id="dateId">
            <input
              :id="dateId"
              v-model="form.date"
              type="date"
              :max="today"
              :aria-invalid="errors.date ? true : undefined"
              :aria-describedby="errors.date ? `${dateId}-error` : undefined"
              class="h-12 w-full rounded-xl border bg-white px-4 text-body-md text-ink outline-none focus:border-accent"
              :class="errors.date ? 'border-error' : 'border-line'"
            />
          </FormField>
          <FileDropzone
            v-model="form.receipt"
            :label="t('quotes.payment.receipt')"
            :title="t('quotes.payment.receiptUpload')"
            :error="errors.receipt"
          />
        </div>
      </section>

      <BaseButton type="submit" block :loading="isSubmitting">
        {{ t('quotes.payment.submit') }}
      </BaseButton>
    </form>
  </section>
</template>

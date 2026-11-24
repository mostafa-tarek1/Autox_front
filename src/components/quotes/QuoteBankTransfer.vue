<script setup lang="ts">
import { computed, onMounted, reactive, ref, useId } from 'vue'
import { useI18n } from 'vue-i18n'

import ArrowDownIcon from '@/assets/icons/arrow-down-01--stroke-standard.svg'
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
/**
 * Latest selectable transfer date. Set once mounted: a pre-rendered page would otherwise keep the
 * build day as the limit (attributes are not patched on hydration).
 */
const isDateFocused = ref(false)
const today = ref<string>()
onMounted(() => (today.value = new Date().toISOString().slice(0, 10)))

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

          <!-- pb 11px: the design clips the instructions text box 5px under its last line. -->
          <div
            class="flex flex-col items-start gap-2 rounded-xl border border-line bg-surface px-6 pt-4 pb-[11px]"
          >
            <p class="flex items-center gap-2 text-h4 text-ink">
              <InfoIcon class="size-6 text-orange" aria-hidden="true" />
              {{ t('quotes.payment.instructionsTitle') }}
            </p>
            <ul class="text-body-sm text-muted">
              <li v-for="line in instructions" :key="line" class="before:content-['•_']">
                {{ line }}
              </li>
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
            <!-- Like the checkout transfer form (Figma): a "التاريخ" placeholder and a chevron until
              the field is focused or filled, then the native date picker. -->
            <span
              class="relative flex h-12 items-center rounded-xl border bg-white px-4 focus-within:border-accent"
              :class="errors.date ? 'border-error' : 'border-line'"
            >
              <input
                :id="dateId"
                v-model="form.date"
                :type="isDateFocused || form.date ? 'date' : 'text'"
                :max="today"
                :placeholder="t('quotes.payment.datePlaceholder')"
                :aria-invalid="errors.date ? true : undefined"
                :aria-describedby="errors.date ? `${dateId}-error` : undefined"
                class="min-w-0 flex-1 bg-transparent pe-6 text-label text-ink outline-none placeholder:text-secondary/50"
                @focus="isDateFocused = true"
                @blur="isDateFocused = false"
              />
              <ArrowDownIcon
                v-if="!isDateFocused && !form.date"
                class="pointer-events-none absolute end-4 size-4 text-secondary"
                aria-hidden="true"
              />
            </span>
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

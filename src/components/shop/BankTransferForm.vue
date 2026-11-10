<script setup lang="ts">
import PriceTag from '@/components/ui/PriceTag.vue'
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import ArrowDownIcon from '@/assets/icons/arrow-down-01--stroke-standard.svg'
import InfoIcon from '@/assets/icons/information-circle--duotone-rounded.svg'
import FileDropzone from '@/components/form/FileDropzone.vue'
import TextField from '@/components/form/TextField.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

import CopyableValue from './CopyableValue.vue'
import type { BankAccount } from './types'

/** Bank transfer instructions + confirmation form (Figma 226:6083). */
const props = defineProps<{ account: BankAccount; amount: number }>()
const emit = defineEmits<{
  submitted: [payload: { reference: string; date: string; receipt: File }]
}>()
const { t, tm, rt } = useI18n()

const form = reactive({ reference: '', date: '', receipt: null as File | null })
const isSubmitting = ref(false)
const showErrors = ref(false)
/** Shown as a placeholder text field until focused, like the design's "التاريخ" select. */
const isDateFocused = ref(false)
const isValid = computed(() => Boolean(form.reference.trim() && form.date && form.receipt))
const instructions = computed(() =>
  (tm('shop.bankTransfer.instructions') as unknown as string[]).map((line) => rt(line)),
)
const today = new Date().toISOString().slice(0, 10)

async function submit(): Promise<void> {
  if (!isValid.value || !form.receipt) {
    showErrors.value = true
    return
  }
  isSubmitting.value = true
  await new Promise((resolve) => setTimeout(resolve, 600))
  isSubmitting.value = false
  emit('submitted', { reference: form.reference.trim(), date: form.date, receipt: form.receipt })
}
</script>

<template>
  <section class="rounded-2xl bg-white" aria-labelledby="bank-transfer-title">
    <header class="flex flex-col items-start gap-2 border-b border-line p-6">
      <h2 id="bank-transfer-title" class="text-h3 text-black">
        {{ t('shop.bankTransfer.title') }}
      </h2>
      <p class="text-body-md text-secondary">{{ t('shop.bankTransfer.subtitle') }}</p>
    </header>

    <form class="flex flex-col gap-4 p-6" novalidate @submit.prevent="submit">
      <div class="flex items-center gap-6 rounded-lg bg-surface p-2">
        <span class="text-body-md text-secondary">{{ t('shop.bankTransfer.amount') }}</span>
        <PriceTag :amount="props.amount" size="lg" tone="primary" />
      </div>

      <h3 class="text-h4 text-ink">{{ t('shop.bankTransfer.accountDetails') }}</h3>
      <div class="flex flex-col gap-8 rounded-xl border border-line bg-white px-6 py-4">
        <dl class="flex flex-col divide-y divide-line">
          <div class="flex items-center gap-4 pb-4">
            <span class="grid h-14 w-32 shrink-0 place-items-center rounded-xl bg-white p-2">
              <img
                :src="account.bankLogo"
                :alt="account.bankName"
                width="112"
                height="40"
                class="h-10 w-28 object-contain"
              />
            </span>
            <div class="flex flex-col items-start gap-1">
              <dt class="text-body-md text-secondary">{{ t('shop.bankTransfer.bankName') }}</dt>
              <dd class="text-h4 text-ink">{{ account.bankName }}</dd>
            </div>
          </div>
          <CopyableValue :label="t('shop.bankTransfer.beneficiary')" :value="account.beneficiary" />
          <CopyableValue :label="t('shop.bankTransfer.iban')" :value="account.iban" ltr />
        </dl>

        <aside
          class="flex flex-col items-start gap-2 rounded-xl border border-line bg-surface px-6 py-4"
        >
          <h4 class="flex items-center gap-2 text-h4 text-ink">
            <InfoIcon class="size-6 text-orange" aria-hidden="true" />
            {{ t('shop.bankTransfer.instructionsTitle') }}
          </h4>
          <ul class="text-body-sm text-muted">
            <li v-for="line in instructions" :key="line" class="before:content-['•_']">
              {{ line }}
            </li>
          </ul>
        </aside>
      </div>

      <h3 class="text-h4 text-ink">{{ t('shop.bankTransfer.confirmTitle') }}</h3>
      <div
        class="flex flex-col gap-8 rounded-xl border border-line bg-white px-6 py-4 [&_label]:leading-5"
      >
        <TextField
          v-model="form.reference"
          :label="t('shop.bankTransfer.reference')"
          :placeholder="t('shop.bankTransfer.referencePlaceholder')"
          dir="ltr"
          :error="
            showErrors && !form.reference.trim() ? t('shop.bankTransfer.required') : undefined
          "
        />
        <label class="flex flex-col gap-2">
          <span class="text-label leading-5 text-secondary">{{ t('shop.bankTransfer.date') }}</span>
          <span
            class="relative flex h-12 items-center rounded-xl border bg-white px-4 focus-within:border-accent"
            :class="showErrors && !form.date ? 'border-error' : 'border-line'"
          >
            <input
              v-model="form.date"
              :type="isDateFocused || form.date ? 'date' : 'text'"
              :max="today"
              :placeholder="t('shop.bankTransfer.datePlaceholder')"
              :aria-invalid="showErrors && !form.date ? true : undefined"
              class="min-w-0 flex-1 bg-transparent pe-6 text-label text-ink outline-none placeholder:text-secondary/50"
              @focus="isDateFocused = true"
              @blur="isDateFocused = false"
            />
            <ArrowDownIcon
              v-if="!isDateFocused && !form.date"
              class="pointer-events-none absolute end-4 size-4 text-ink"
              aria-hidden="true"
            />
          </span>
        </label>
        <FileDropzone
          v-model="form.receipt"
          :label="t('shop.bankTransfer.receipt')"
          :title="t('shop.bankTransfer.receiptUpload')"
          :hint="t('form.allowedFiles')"
          :error="showErrors && !form.receipt ? t('shop.bankTransfer.required') : undefined"
        />
      </div>

      <BaseButton type="submit" block :loading="isSubmitting">
        {{ t('shop.bankTransfer.submit') }}
      </BaseButton>
    </form>
  </section>
</template>

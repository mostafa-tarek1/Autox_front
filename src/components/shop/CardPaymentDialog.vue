<script setup lang="ts">
import BaseModal from '@/components/ui/BaseModal.vue'
import { computed, reactive, ref, useId } from 'vue'
import { useI18n } from 'vue-i18n'

import AlertIcon from '@/assets/icons/alert-circle--stroke-standard.svg'
import CalendarIcon from '@/assets/icons/calendar-02--stroke-rounded.svg'
import CardIcon from '@/assets/icons/credit-card--stroke-rounded.svg'
import CardValidationIcon from '@/assets/icons/credit-card-validation--stroke-rounded.svg'
import LockIcon from '@/assets/icons/square-lock-02--stroke-rounded.svg'
import TickIcon from '@/assets/icons/tick-02--solid-standard.svg'
import TextField from '@/components/form/TextField.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

/**
 * Card form → result (Figma "payment" set 226:5817). UI only: the card fields are never sent
 * anywhere; the real flow will use the payment gateway's hosted fields.
 */
const emit = defineEmits<{ paid: [] }>()
const open = defineModel<boolean>('open', { default: false })
const { t } = useI18n()
const titleId = useId()

type Stage = 'form' | 'success' | 'failed'
const stage = ref<Stage>('form')
const isSubmitting = ref(false)
const card = reactive({ number: '', expiry: '', cvv: '' })
const showErrors = ref(false)

const digits = computed(() => card.number.replace(/\D/g, ''))
const errors = computed(() => ({
  number: digits.value.length >= 15 ? undefined : t('shop.payment.card.invalidNumber'),
  expiry: /^\d{2}\/\d{2}$/.test(card.expiry) ? undefined : t('shop.payment.card.invalidExpiry'),
  cvv: /^\d{3,4}$/.test(card.cvv) ? undefined : t('shop.payment.card.invalidCvv'),
}))
const isValid = computed(() => Object.values(errors.value).every((error) => !error))

/** The pay button stays enabled as in the design; problems are shown after a submit attempt. */
function submit(): void {
  showErrors.value = true
  if (isValid.value) {
    pay()
  }
}

function formatNumber(value: string): void {
  card.number = value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ')
}

function formatExpiry(value: string): void {
  const raw = value.replace(/\D/g, '').slice(0, 4)
  card.expiry = raw.length > 2 ? `${raw.slice(0, 2)}/${raw.slice(2)}` : raw
}

async function pay(): Promise<void> {
  isSubmitting.value = true
  await new Promise((resolve) => setTimeout(resolve, 800))
  isSubmitting.value = false
  // Mock rule for the UI phase: card numbers ending in 0000 fail so the error state can be reviewed.
  stage.value = digits.value.endsWith('0000') ? 'failed' : 'success'
  if (stage.value === 'success') {
    emit('paid')
  }
}

function reset(): void {
  stage.value = 'form'
  showErrors.value = false
}
</script>

<template>
  <BaseModal
    v-model:open="open"
    :labelled-by="titleId"
    panel-class="max-w-[584px] rounded-3xl px-6 py-16 sm:px-10"
    close-class="top-3 start-3"
    @update:open="!$event && reset()"
  >
    <form v-if="stage === 'form'" class="flex flex-col gap-6" novalidate @submit.prevent="submit">
      <div class="flex flex-col items-start gap-2">
        <h2 :id="titleId" class="text-h3 text-ink">{{ t('shop.payment.card.title') }}</h2>
        <p class="flex items-center gap-2 text-body-sm text-ink">
          <CardValidationIcon class="size-5 text-primary" aria-hidden="true" />
          {{ t('shop.payment.card.secure') }}
        </p>
      </div>

      <!-- Card values are LTR but sit at the start of the field in Arabic, as in the design. -->
      <div class="flex flex-col gap-6 rtl:[&_input]:text-right">
        <TextField
          :model-value="card.number"
          :label="t('shop.payment.card.number')"
          placeholder="0000 0000 0000"
          :icon="CardIcon"
          dir="ltr"
          autocomplete="cc-number"
          inputmode="numeric"
          :error="showErrors ? errors.number : undefined"
          @update:model-value="formatNumber"
        />
        <div class="grid grid-cols-2 gap-6">
          <TextField
            :model-value="card.expiry"
            :label="t('shop.payment.card.expiry')"
            placeholder="MM/YY"
            :icon="CalendarIcon"
            dir="ltr"
            autocomplete="cc-exp"
            inputmode="numeric"
            :error="showErrors ? errors.expiry : undefined"
            @update:model-value="formatExpiry"
          />
          <TextField
            v-model="card.cvv"
            :label="t('shop.payment.card.cvv')"
            placeholder="000"
            :icon="LockIcon"
            type="password"
            dir="ltr"
            autocomplete="cc-csc"
            inputmode="numeric"
            :error="showErrors ? errors.cvv : undefined"
          />
        </div>
      </div>

      <BaseButton type="submit" block :loading="isSubmitting">
        {{ t('shop.payment.card.pay') }}
      </BaseButton>
    </form>

    <div
      v-else
      class="flex flex-col items-center gap-10 rounded-3xl bg-surface px-6 py-10"
      role="status"
    >
      <div class="flex flex-col items-center gap-6 text-center">
        <span
          class="grid size-16 place-items-center rounded-full p-4"
          :class="stage === 'success' ? 'bg-accent text-primary' : 'bg-error/10 text-error'"
        >
          <TickIcon v-if="stage === 'success'" class="size-8" aria-hidden="true" />
          <AlertIcon v-else class="size-8" aria-hidden="true" />
        </span>
        <div class="flex max-w-[394px] flex-col gap-2">
          <h2 :id="titleId" class="text-h4 text-ink">
            {{ stage === 'success' ? t('shop.payment.success') : t('shop.payment.failed') }}
          </h2>
          <p class="text-body-md text-ink">
            {{ stage === 'success' ? t('shop.payment.successHint') : t('shop.payment.failedHint') }}
          </p>
        </div>
      </div>
      <BaseButton v-if="stage === 'failed'" block @click="reset">{{
        t('shop.payment.retry')
      }}</BaseButton>
      <BaseButton v-else block :to="{ name: 'checkout-confirmation' }">{{
        t('shop.cart.trackOrder')
      }}</BaseButton>
    </div>
  </BaseModal>
</template>

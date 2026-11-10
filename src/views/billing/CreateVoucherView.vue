<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import FileIcon from '@/assets/icons/file-02--stroke-rounded.svg?component'
import NoteIcon from '@/assets/icons/note-01--stroke-rounded.svg?component'
import UserIcon from '@/assets/icons/user--stroke-rounded.svg?component'
import CheckboxField from '@/components/billing/CheckboxField.vue'
import PageHero from '@/components/layout/PageHero.vue'
import StepCard from '@/components/billing/StepCard.vue'
import VoucherSuccessModal from '@/components/billing/VoucherSuccessModal.vue'
import PhoneField from '@/components/form/PhoneField.vue'
import TextField from '@/components/form/TextField.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const { t } = useI18n()

const form = reactive({
  customerName: '',
  phone: '',
  note: '',
  amount: '',
  invoiceMatches: false,
  acceptedTerms: false,
})
const submitted = ref(false)
const isSubmitting = ref(false)
const showSuccess = ref(false)

const errors = computed(() => {
  if (!submitted.value) {
    return {}
  }
  const amount = Number(form.amount)
  return {
    customerName: form.customerName.trim()
      ? undefined
      : t('billing.voucherForm.errors.customerName'),
    phone: /^5\d{8}$/.test(form.phone) ? undefined : t('billing.voucherForm.errors.phone'),
    amount:
      Number.isFinite(amount) && amount > 0 ? undefined : t('billing.voucherForm.errors.amount'),
    acceptedTerms: form.acceptedTerms ? undefined : t('billing.voucherForm.errors.terms'),
  }
})

const hasErrors = computed(() => Object.values(errors.value).some(Boolean))

async function submit(): Promise<void> {
  submitted.value = true
  if (hasErrors.value) {
    return
  }
  isSubmitting.value = true
  // UI phase: simulate the API round-trip.
  await new Promise((resolve) => setTimeout(resolve, 600))
  isSubmitting.value = false
  showSuccess.value = true
}
</script>

<template>
  <PageHero
    :title="t('billing.vouchers')"
    :breadcrumbs="[
      { label: t('nav.home'), to: { name: 'home' } },
      { label: t('billing.vouchers'), to: { name: 'vouchers' } },
      { label: t('billing.createVoucher') },
    ]"
  />

  <div class="bg-surface py-8">
    <div
      class="page-container flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="flex flex-col gap-3">
        <h2 class="text-[26px] leading-9 font-bold text-ink sm:text-h1">
          {{ t('billing.voucherForm.welcome') }}
        </h2>
        <p class="text-h3 text-secondary">{{ t('billing.voucherForm.intro') }}</p>
      </div>
      <BaseButton :to="{ name: 'voucher-transactions' }" class="w-fit">
        <template #icon><FileIcon class="size-5" aria-hidden="true" /></template>
        {{ t('billing.transactionsDetails') }}
      </BaseButton>
    </div>
  </div>

  <form class="page-container flex flex-col gap-6" novalidate @submit.prevent="submit">
    <StepCard :step="1" :title="t('billing.voucherForm.customerInfo')" title-id="voucher-customer">
      <TextField
        v-model="form.customerName"
        :label="t('billing.voucherForm.customerName')"
        :placeholder="t('billing.voucherForm.customerNamePlaceholder')"
        :icon="UserIcon"
        :error="errors.customerName"
        autocomplete="name"
        required
      />
      <PhoneField
        v-model="form.phone"
        :label="t('billing.voucherForm.phone')"
        :placeholder="t('billing.voucherForm.phone')"
        :error="errors.phone"
      />
      <TextField
        v-model="form.note"
        :label="t('billing.voucherForm.note')"
        :placeholder="t('billing.voucherForm.notePlaceholder')"
        :icon="NoteIcon"
      />
    </StepCard>

    <StepCard :step="2" :title="t('billing.voucherForm.amountTitle')" title-id="voucher-amount">
      <TextField
        v-model="form.amount"
        type="number"
        :label="t('billing.voucherForm.amountLabel')"
        placeholder="0"
        :error="errors.amount"
        required
      />
      <CheckboxField v-model="form.invoiceMatches">{{
        t('billing.voucherForm.invoiceMatches')
      }}</CheckboxField>
    </StepCard>

    <StepCard :step="3" :title="t('billing.voucherForm.confirmation')" title-id="voucher-confirm">
      <CheckboxField v-model="form.acceptedTerms" :error="errors.acceptedTerms">
        <i18n-t keypath="billing.voucherForm.acceptTerms" tag="span" scope="global">
          <template #terms>
            <RouterLink
              to="/terms"
              class="text-primary underline underline-offset-2"
              target="_blank"
            >
              {{ t('billing.voucherForm.terms') }}
            </RouterLink>
          </template>
        </i18n-t>
      </CheckboxField>
    </StepCard>

    <div class="flex justify-start">
      <BaseButton type="submit" class="w-full px-[72px] sm:w-auto" :loading="isSubmitting">
        {{ t('billing.voucherForm.submit') }}
      </BaseButton>
    </div>
  </form>

  <VoucherSuccessModal v-model:open="showSuccess" />
</template>

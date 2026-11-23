<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import AddIcon from '@/assets/icons/add-01--stroke-standard.svg'
import WalletDoneIcon from '@/assets/icons/wallet-done-01--duotone-rounded.svg'
import { useAccountState } from '@/components/account/useAccountState'
import {
  formatIban,
  normalizeIban,
  required,
  saudiIban,
  validate,
} from '@/components/account/validators'
import DashboardDrawer from '@/components/dashboard/shared/DashboardDrawer.vue'
import SelectField from '@/components/form/SelectField.vue'
import TextField from '@/components/form/TextField.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import PriceTag from '@/components/ui/PriceTag.vue'
import { saudiBanks } from '@/mocks/account'

/**
 * Supplier withdraw request (Figma "Add Product" set 800:9175): amount + one of the supplier's bank
 * accounts, with an inline "add another account" step (800:9173) that returns here with it selected.
 */
const props = defineProps<{ withdrawable: number }>()
const emit = defineEmits<{ submitted: [payload: { amount: number; bankAccountId: string }] }>()
const open = defineModel<boolean>('open', { default: false })

const { t } = useI18n()
const { state, saveBankAccount } = useAccountState()

type Step = 'withdraw' | 'addAccount'
const step = ref<Step>('withdraw')

const amount = ref('')
const selectedAccountId = ref<string | null>(null)
const errors = reactive<{ amount?: string; account?: string }>({})

const newAccount = reactive({ bankId: null as string | null, beneficiary: '', iban: '' })
const accountErrors = reactive<{ bankId?: string; beneficiary?: string; iban?: string }>({})

const bankOptions = computed(() => saudiBanks.map((bank) => ({ value: bank.id, label: bank.name })))
const bankName = (bankId: string) => saudiBanks.find((bank) => bank.id === bankId)?.name ?? ''

function defaultAccountId(): string | null {
  return (
    (state.bankAccounts.find((account) => account.isDefault) ?? state.bankAccounts[0])?.id ?? null
  )
}

/** Every time the drawer opens it starts on the withdraw step with the default account selected. */
watch(open, (isOpen) => {
  if (!isOpen) {
    return
  }
  step.value = 'withdraw'
  amount.value = ''
  selectedAccountId.value = defaultAccountId()
  errors.amount = errors.account = undefined
})

function onAmountInput(value: string): void {
  amount.value = value.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1')
}

function submitWithdraw(): void {
  const value = Number.parseFloat(amount.value)
  errors.amount = !amount.value
    ? t('dashboard.finance.withdraw.errors.amountRequired')
    : !(value > 0)
      ? t('dashboard.finance.withdraw.errors.amountPositive')
      : value > props.withdrawable
        ? t('dashboard.finance.withdraw.errors.amountTooHigh')
        : undefined
  errors.account = selectedAccountId.value
    ? undefined
    : t('dashboard.finance.withdraw.errors.accountRequired')
  if (errors.amount || errors.account || !selectedAccountId.value) {
    return
  }
  emit('submitted', { amount: value, bankAccountId: selectedAccountId.value })
  open.value = false
}

function openAddAccount(): void {
  newAccount.bankId = null
  newAccount.beneficiary = ''
  newAccount.iban = ''
  accountErrors.bankId = accountErrors.beneficiary = accountErrors.iban = undefined
  step.value = 'addAccount'
}

function submitNewAccount(): void {
  accountErrors.bankId = newAccount.bankId
    ? undefined
    : t('dashboard.finance.withdraw.errors.bankRequired')
  accountErrors.beneficiary = validate(newAccount.beneficiary, [required])
    ? t('dashboard.finance.withdraw.errors.beneficiaryRequired')
    : undefined
  accountErrors.iban = validate(newAccount.iban, [required, saudiIban])
    ? t('dashboard.finance.withdraw.errors.ibanInvalid')
    : undefined
  if (
    accountErrors.bankId ||
    accountErrors.beneficiary ||
    accountErrors.iban ||
    !newAccount.bankId
  ) {
    return
  }
  saveBankAccount({
    bankId: newAccount.bankId,
    beneficiary: newAccount.beneficiary.trim(),
    iban: normalizeIban(newAccount.iban),
  })
  selectedAccountId.value = state.bankAccounts.at(-1)?.id ?? selectedAccountId.value
  errors.account = undefined
  step.value = 'withdraw'
}

const title = computed(() =>
  step.value === 'withdraw'
    ? t('dashboard.finance.withdraw.title')
    : t('dashboard.finance.withdraw.addAccountTitle'),
)
</script>

<template>
  <DashboardDrawer
    v-model:open="open"
    :title="title"
    :on-back="step === 'addAccount' ? () => (step = 'withdraw') : undefined"
  >
    <form
      v-if="step === 'withdraw'"
      class="flex flex-col gap-6 px-6 py-4"
      novalidate
      @submit.prevent="submitWithdraw"
    >
      <div class="flex items-center gap-3">
        <span
          class="grid size-10 shrink-0 place-items-center rounded-full bg-surface p-2 text-primary"
        >
          <WalletDoneIcon class="size-6" aria-hidden="true" />
        </span>
        <span class="text-body-sm text-ink">{{ t('dashboard.finance.withdraw.available') }}</span>
        <PriceTag
          :amount="withdrawable"
          decimals
          class="text-h4 text-primary [&_svg]:text-secondary"
        />
      </div>

      <div class="flex flex-col gap-4 [&_label]:text-muted">
        <TextField
          :model-value="amount"
          :label="t('dashboard.finance.withdraw.amount')"
          placeholder="0"
          inputmode="decimal"
          :error="errors.amount"
          @update:model-value="onAmountInput"
        />

        <fieldset class="flex flex-col gap-2" :aria-invalid="errors.account ? true : undefined">
          <legend class="mb-2 text-body-sm text-muted">
            {{ t('dashboard.finance.withdraw.account') }}
          </legend>
          <label
            v-for="account in state.bankAccounts"
            :key="account.id"
            class="flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-white px-4 py-3 transition-colors hover:border-accent/60"
            :class="
              selectedAccountId === account.id
                ? 'border-accent'
                : 'border-line hover:border-accent/60'
            "
          >
            <input
              v-model="selectedAccountId"
              type="radio"
              name="withdraw-account"
              :value="account.id"
              class="peer sr-only"
            />
            <span
              class="grid size-5 shrink-0 place-items-center rounded-full border bg-surface peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent"
              :class="selectedAccountId === account.id ? 'border-accent' : 'border-line'"
              aria-hidden="true"
            >
              <span
                v-if="selectedAccountId === account.id"
                class="size-3.5 rounded-full bg-accent"
              />
            </span>
            <span class="flex min-w-0 flex-col items-start gap-1">
              <span class="text-body-sm text-ink">{{ bankName(account.bankId) }}</span>
              <span dir="ltr" class="text-body-sm text-ink tabular-nums">{{
                formatIban(account.iban)
              }}</span>
            </span>
          </label>
          <p v-if="errors.account" class="text-caption text-error" role="alert">
            {{ errors.account }}
          </p>
        </fieldset>

        <BaseButton variant="soft" class="self-start px-4" @click="openAddAccount">
          <template #icon><AddIcon class="size-5" aria-hidden="true" /></template>
          {{ t('dashboard.finance.withdraw.addAnother') }}
        </BaseButton>
      </div>

      <BaseButton type="submit" block>{{ t('dashboard.finance.withdraw.submit') }}</BaseButton>
    </form>

    <form
      v-else
      class="flex flex-col gap-6 px-6 py-4"
      novalidate
      @submit.prevent="submitNewAccount"
    >
      <div class="flex flex-col gap-[31px]">
        <SelectField
          v-model="newAccount.bankId"
          :options="bankOptions"
          :label="t('dashboard.finance.withdraw.bankName')"
          :placeholder="t('form.choose')"
          :error="accountErrors.bankId"
        />
        <TextField
          v-model="newAccount.beneficiary"
          :label="t('dashboard.finance.withdraw.beneficiary')"
          :placeholder="t('dashboard.finance.withdraw.beneficiaryPlaceholder')"
          autocomplete="name"
          :error="accountErrors.beneficiary"
        />
        <TextField
          :model-value="newAccount.iban"
          :label="t('dashboard.finance.withdraw.iban')"
          placeholder="SA00 0000 0000 0000 0000 0000"
          dir="ltr"
          :error="accountErrors.iban"
          @update:model-value="newAccount.iban = formatIban($event)"
        />
      </div>
      <BaseButton type="submit" block>{{ t('dashboard.finance.withdraw.add') }}</BaseButton>
    </form>
  </DashboardDrawer>
</template>

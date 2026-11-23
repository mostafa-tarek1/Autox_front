<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import AddIcon from '@/assets/icons/add-01--solid-standard.svg'
import BankIcon from '@/assets/icons/bank--stroke-rounded.svg'
import CopyIcon from '@/assets/icons/copy-01--duotone-rounded.svg'
import DeleteIcon from '@/assets/icons/delete-01--stroke-standard.svg'
import EditIcon from '@/assets/icons/pencil-edit-02--stroke-standard.svg'
import TickIcon from '@/assets/icons/tick-02--solid-standard.svg'
import AccountCard from '@/components/account/AccountCard.vue'
import BankAccountForm from '@/components/account/BankAccountForm.vue'
import DefaultChoice from '@/components/account/DefaultChoice.vue'
import { useAccountState, type BankAccountValues } from '@/components/account/useAccountState'
import { formatIban } from '@/components/account/validators'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import { saudiBanks, type BankAccount } from '@/mocks/account'

const { t } = useI18n()
const { state, saveBankAccount, removeBankAccount, setDefaultBankAccount } = useAccountState()
const { copy, copied } = useClipboard({ legacy: true })

/** `null` = closed, `'new'` = adding, otherwise the account being edited. */
const editing = ref<BankAccount | 'new' | null>(null)
const isSaved = ref(false)
const copiedKey = ref('')

const isFormOpen = computed({
  get: () => editing.value !== null,
  set: (open) => {
    if (!open) {
      editing.value = null
    }
  },
})
const editedAccount = computed(() =>
  editing.value && editing.value !== 'new' ? editing.value : undefined,
)

const bankName = (bankId: string) => saudiBanks.find((bank) => bank.id === bankId)?.name ?? bankId

async function copyValue(key: string, value: string): Promise<void> {
  await copy(value)
  copiedKey.value = key
}

function save(values: BankAccountValues): void {
  saveBankAccount(values, editedAccount.value?.id)
  editing.value = null
  isSaved.value = true
}
</script>

<template>
  <AccountCard :title="t('account.bank.title')" :icon="BankIcon" heading-id="bank-title">
    <template #action>
      <BaseButton variant="soft" @click="editing = 'new'">
        <template #icon><AddIcon class="size-5" aria-hidden="true" /></template>
        {{ t('account.bank.add') }}
      </BaseButton>
    </template>

    <ul v-if="state.bankAccounts.length" class="flex flex-col gap-6">
      <li
        v-for="account in state.bankAccounts"
        :key="account.id"
        class="flex flex-col items-start gap-6 rounded-lg border border-line p-4"
      >
        <DefaultChoice
          :selected="account.isDefault"
          :selected-label="t('account.bank.default')"
          :select-label="t('account.bank.setDefault')"
          @select="setDefaultBankAccount(account.id)"
        />

        <dl class="flex w-full flex-col gap-4">
          <div class="flex flex-col gap-1">
            <dt class="text-body-md text-secondary">{{ t('account.bank.bankName') }}</dt>
            <dd class="text-h4 text-ink">{{ bankName(account.bankId) }}</dd>
          </div>
          <hr class="border-line" />
          <div class="flex flex-col gap-1">
            <dt class="text-body-md text-secondary">{{ t('account.bank.beneficiary') }}</dt>
            <dd class="flex items-center justify-between gap-4">
              <span class="min-w-0 text-h4 break-words text-ink">{{ account.beneficiary }}</span>
              <button
                type="button"
                class="flex shrink-0 items-center gap-1 text-body-md text-secondary hover:text-primary"
                :aria-label="t('account.bank.copyField', { field: t('account.bank.beneficiary') })"
                @click="copyValue(`${account.id}-beneficiary`, account.beneficiary)"
              >
                <TickIcon
                  v-if="copied && copiedKey === `${account.id}-beneficiary`"
                  class="size-6 text-success"
                  aria-hidden="true"
                />
                <CopyIcon v-else class="size-6" aria-hidden="true" />
                {{ t('account.bank.copy') }}
              </button>
            </dd>
          </div>
          <hr class="border-line" />
          <div class="flex flex-col gap-1">
            <dt class="text-body-md text-secondary">{{ t('account.bank.iban') }}</dt>
            <dd class="flex items-center justify-between gap-2 sm:gap-4">
              <span
                dir="ltr"
                class="min-w-0 text-xs/6 font-semibold whitespace-nowrap text-ink tabular-nums min-[400px]:text-[13px] sm:text-h4"
                >{{ formatIban(account.iban) }}</span
              >
              <button
                type="button"
                class="flex shrink-0 items-center gap-1 text-body-md text-secondary hover:text-primary"
                :aria-label="t('account.bank.copyField', { field: t('account.bank.iban') })"
                @click="copyValue(`${account.id}-iban`, account.iban)"
              >
                <TickIcon
                  v-if="copied && copiedKey === `${account.id}-iban`"
                  class="size-6 text-success"
                  aria-hidden="true"
                />
                <CopyIcon v-else class="size-6" aria-hidden="true" />
                <span class="hidden sm:inline">{{ t('account.bank.copy') }}</span>
              </button>
            </dd>
          </div>
        </dl>

        <div class="flex flex-wrap gap-6">
          <BaseButton
            variant="soft"
            :aria-label="t('account.bank.editAccount', { name: bankName(account.bankId) })"
            @click="editing = account"
          >
            <template #icon><EditIcon class="size-5" aria-hidden="true" /></template>
            {{ t('account.edit') }}
          </BaseButton>
          <BaseButton
            variant="soft"
            class="text-error!"
            :aria-label="t('account.bank.deleteAccount', { name: bankName(account.bankId) })"
            @click="removeBankAccount(account.id)"
          >
            <template #icon><DeleteIcon class="size-5" aria-hidden="true" /></template>
            {{ t('account.bank.delete') }}
          </BaseButton>
        </div>
      </li>
    </ul>
    <p v-else class="py-6 text-center text-body-md text-secondary">{{ t('account.bank.empty') }}</p>
    <p class="sr-only" aria-live="polite">{{ copied ? t('account.bank.copied') : '' }}</p>
  </AccountCard>

  <BaseModal
    v-model:open="isFormOpen"
    labelled-by="bank-form-title"
    panel-class="max-w-[822px] px-5 py-8 sm:px-12"
    close-class="top-4 end-4"
  >
    <h2 id="bank-form-title" class="mb-[31px] flex items-center gap-2 text-h2 text-ink">
      <BankIcon class="size-6 shrink-0 text-secondary" aria-hidden="true" />
      {{ editedAccount ? t('account.bank.editTitle') : t('account.bank.addTitle') }}
    </h2>
    <BankAccountForm
      v-if="editing"
      :key="editedAccount?.id ?? 'new'"
      :account="editedAccount"
      :submit-label="editedAccount ? t('account.save') : t('account.bank.submitAdd')"
      @save="save"
    />
  </BaseModal>

  <BaseModal
    v-model:open="isSaved"
    tone="surface"
    panel-class="max-w-[320px] rounded-2xl px-6 py-12"
    close-class="top-2 start-2"
  >
    <div class="flex flex-col items-center gap-2 text-center" role="status">
      <span class="grid size-10 place-items-center rounded-full bg-accent text-primary">
        <TickIcon class="size-8" aria-hidden="true" />
      </span>
      <p class="text-h4 text-secondary">{{ t('account.bank.saved') }}</p>
    </div>
  </BaseModal>
</template>

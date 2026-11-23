<script setup lang="ts">
import BaseModal from '@/components/ui/BaseModal.vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import EditIcon from '@/assets/icons/pencil-edit-02--solid-rounded.svg'
import LocationIcon from '@/assets/icons/location-04--stroke-rounded.svg'
import AccountCard from '@/components/account/AccountCard.vue'
import AddressForm from '@/components/account/AddressForm.vue'
import DefaultChoice from '@/components/account/DefaultChoice.vue'
import { useAccountState } from '@/components/account/useAccountState'
import BaseButton from '@/components/ui/BaseButton.vue'
import type { ShippingAddress } from '@/mocks/account'

const { t } = useI18n()
const { state, saveAddress, setDefaultAddress } = useAccountState()

/** `null` = closed, `'new'` = adding, otherwise the address being edited. */
const editing = ref<ShippingAddress | 'new' | null>(null)

const isModalOpen = computed({
  get: () => editing.value !== null,
  set: (open) => {
    if (!open) {
      editing.value = null
    }
  },
})

const editedAddress = computed(() =>
  editing.value && editing.value !== 'new' ? editing.value : undefined,
)

function save(values: Pick<ShippingAddress, 'label' | 'address'>): void {
  saveAddress(values, editedAddress.value?.id)
  editing.value = null
}
</script>

<template>
  <AccountCard
    :title="t('account.addresses.title')"
    :icon="LocationIcon"
    heading-id="addresses-title"
  >
    <template #action>
      <BaseButton variant="soft" @click="editing = 'new'">{{
        t('account.addresses.add')
      }}</BaseButton>
    </template>

    <ul v-if="state.addresses.length" class="flex flex-col gap-3">
      <li
        v-for="address in state.addresses"
        :key="address.id"
        class="flex flex-col items-start gap-4 rounded-xl border border-line p-4"
      >
        <DefaultChoice
          :selected="address.isDefault"
          :selected-label="t('account.addresses.default')"
          :select-label="t('account.addresses.setDefault')"
          @select="setDefaultAddress(address.id)"
        />
        <div class="flex w-full flex-col items-start gap-6">
          <div class="flex min-w-0 flex-col gap-1">
            <p class="text-body-sm text-secondary">{{ address.label }}</p>
            <p class="text-body-lg break-words text-ink">{{ address.address }}</p>
          </div>
          <button
            type="button"
            class="flex shrink-0 items-center gap-1 text-body-sm text-primary transition-opacity hover:opacity-70"
            :aria-label="t('account.addresses.editAddress', { name: address.label })"
            @click="editing = address"
          >
            <EditIcon class="size-4" aria-hidden="true" />
            {{ t('account.edit') }}
          </button>
        </div>
      </li>
    </ul>
    <p v-else class="py-6 text-center text-body-md text-secondary">
      {{ t('account.addresses.empty') }}
    </p>
  </AccountCard>

  <BaseModal
    tone="surface"
    panel-class="max-w-[582px] px-5 py-14 sm:px-10"
    title-class="mb-6 text-h2"
    close-class="top-3 start-2.5"
    v-model:open="isModalOpen"
    :title="editedAddress ? t('account.addresses.editTitle') : t('account.addresses.addTitle')"
  >
    <AddressForm
      v-if="editing"
      :key="editedAddress?.id ?? 'new'"
      :address="editedAddress"
      :default-label="t('account.addresses.defaultLabel', { number: state.addresses.length + 1 })"
      @save="save"
    />
  </BaseModal>
</template>

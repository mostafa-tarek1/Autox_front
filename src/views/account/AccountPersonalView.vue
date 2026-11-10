<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import UserIcon from '@/assets/icons/user--stroke-rounded.svg?component'
import AccountCard from '@/components/account/AccountCard.vue'
import AccountDetailList from '@/components/account/AccountDetailList.vue'
import AccountModal from '@/components/account/AccountModal.vue'
import PersonalInfoForm from '@/components/account/PersonalInfoForm.vue'
import { useAccountState } from '@/components/account/useAccountState'
import BaseButton from '@/components/ui/BaseButton.vue'
import type { AccountProfile } from '@/mocks/account'

const { t } = useI18n()
const { state, updateProfile } = useAccountState()
const isEditing = ref(false)

/** Displays 0551234567 as +966 551234567, matching the design. */
const internationalPhone = computed(() => `+966 ${state.profile.phone.replace(/^0/, '')}`)

const details = computed(() => [
  { label: t('account.personal.name'), value: state.profile.name },
  { label: t('account.personal.phone'), value: internationalPhone.value, ltr: true },
  { label: t('account.personal.email'), value: state.profile.email, ltr: true },
])

function save(values: Pick<AccountProfile, 'name' | 'phone' | 'email'>): void {
  updateProfile(values)
  isEditing.value = false
}
</script>

<template>
  <AccountCard :title="t('account.personal.title')" :icon="UserIcon" heading-id="personal-title">
    <template #action>
      <BaseButton variant="soft" @click="isEditing = true">{{ t('account.edit') }}</BaseButton>
    </template>
    <AccountDetailList :items="details" />
  </AccountCard>

  <AccountModal v-model:open="isEditing" :title="t('account.personal.title')">
    <PersonalInfoForm v-if="isEditing" :profile="state.profile" @save="save" />
  </AccountModal>
</template>

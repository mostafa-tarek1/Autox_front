<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import BuildingIcon from '@/assets/icons/building-03--stroke-rounded.svg?component'
import FileIcon from '@/assets/icons/file-02--solid-rounded.svg'
import EditIcon from '@/assets/icons/pencil-edit-02--solid-rounded.svg'
import ViewIcon from '@/assets/icons/view--solid-rounded.svg'
import AccountCard from '@/components/account/AccountCard.vue'
import AccountDetailList from '@/components/account/AccountDetailList.vue'
import AccountModal from '@/components/account/AccountModal.vue'
import CompanyInfoForm, { type CompanyFormValues } from '@/components/account/CompanyInfoForm.vue'
import { useAccountState } from '@/components/account/useAccountState'
import BaseButton from '@/components/ui/BaseButton.vue'

const { t } = useI18n()
const { state, updateCompany } = useAccountState()
const isEditing = ref(false)

const details = computed(() => [
  { label: t('account.company.name'), value: state.company.name },
  { label: t('account.company.unifiedNumber'), value: state.company.unifiedNumber, ltr: true },
  { label: t('account.company.taxNumber'), value: state.company.taxNumber, ltr: true },
  { label: t('account.company.nationalAddress'), value: state.company.nationalAddress },
])

function save(values: CompanyFormValues): void {
  updateCompany(values)
  isEditing.value = false
}
</script>

<template>
  <AccountCard :title="t('account.company.title')" :icon="BuildingIcon" heading-id="company-title">
    <template #action>
      <BaseButton variant="soft" @click="isEditing = true">{{ t('account.edit') }}</BaseButton>
    </template>

    <AccountDetailList :items="details">
      <div class="flex flex-col gap-1 border-t border-line pt-3">
        <dt class="text-body-sm text-secondary">{{ t('account.company.documents') }}</dt>
        <dd>
          <ul class="flex flex-wrap gap-3">
            <li
              v-for="document in state.company.documents"
              :key="document.kind"
              class="flex h-12 items-center gap-6 rounded-lg bg-surface p-3"
            >
              <span class="flex items-center gap-1">
                <span class="grid size-6 place-items-center rounded-lg bg-white p-1 text-primary">
                  <FileIcon class="size-4" aria-hidden="true" />
                </span>
                <span class="text-body-sm text-primary">
                  {{ t(`account.company.documentKinds.${document.kind}`) }}
                </span>
              </span>
              <span class="flex items-center gap-2 text-primary">
                <button
                  type="button"
                  class="transition-opacity hover:opacity-70"
                  :aria-label="
                    t('account.company.replaceDocument', {
                      name: t(`account.company.documentKinds.${document.kind}`),
                    })
                  "
                  @click="isEditing = true"
                >
                  <EditIcon class="size-4" aria-hidden="true" />
                </button>
                <a
                  :href="document.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="transition-opacity hover:opacity-70"
                  :aria-label="
                    t('account.company.viewDocument', {
                      name: t(`account.company.documentKinds.${document.kind}`),
                    })
                  "
                >
                  <ViewIcon class="size-4" aria-hidden="true" />
                </a>
              </span>
            </li>
          </ul>
        </dd>
      </div>
    </AccountDetailList>
  </AccountCard>

  <AccountModal v-model:open="isEditing" :title="t('account.company.formTitle')">
    <CompanyInfoForm v-if="isEditing" :company="state.company" @save="save" />
  </AccountModal>
</template>

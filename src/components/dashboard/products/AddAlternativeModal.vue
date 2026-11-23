<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AddIcon from '@/assets/icons/add-01--stroke-rounded.svg'
import CancelIcon from '@/assets/icons/cancel-01--stroke-rounded.svg'
import SearchListIcon from '@/assets/icons/search-list-02--stroke-rounded.svg'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'

/** "طريقة الاضافة" (976:10645): add an alternative manually or from the catalog. */
const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ manual: []; catalog: [] }>()
const { t } = useI18n()

function choose(method: 'manual' | 'catalog'): void {
  open.value = false
  if (method === 'manual') {
    emit('manual')
  } else {
    emit('catalog')
  }
}
</script>

<template>
  <BaseModal
    v-model:open="open"
    panel-class="max-w-[400px] rounded-xl pb-2"
    close-class="hidden"
    labelled-by="add-alternative-title"
  >
    <header class="flex items-center gap-2 border-b border-line p-4">
      <button
        type="button"
        class="grid size-[26px] shrink-0 place-items-center rounded-lg border border-line p-1 text-primary hover:border-accent"
        :aria-label="t('common.close')"
        @click="open = false"
      >
        <CancelIcon class="size-4" aria-hidden="true" />
      </button>
      <h2 id="add-alternative-title" class="text-h4 text-black">
        {{ t('dashboard.products.addMethod') }}
      </h2>
    </header>
    <div class="flex flex-col gap-4 p-4">
      <BaseButton variant="soft" block @click="choose('manual')">
        <template #icon><AddIcon class="size-5" aria-hidden="true" /></template>
        {{ t('dashboard.products.addManual') }}
      </BaseButton>
      <BaseButton variant="soft" block @click="choose('catalog')">
        <template #icon><SearchListIcon class="size-5" aria-hidden="true" /></template>
        {{ t('dashboard.products.addFromCatalog') }}
      </BaseButton>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AlertIcon from '@/assets/icons/alert-02--stroke-standard.svg'
import CancelIcon from '@/assets/icons/cancel-01--stroke-rounded.svg'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'

/** Delete confirmation (780:9890): surface card, red alert badge, نعم / لا. */
const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ confirm: [] }>()
const { t } = useI18n()

function confirm(): void {
  emit('confirm')
  open.value = false
}
</script>

<template>
  <BaseModal
    v-model:open="open"
    tone="surface"
    panel-class="max-w-[385px] rounded-2xl px-6 py-12"
    close-class="hidden"
    labelled-by="delete-product-title"
  >
    <button
      type="button"
      class="absolute start-2 top-2 grid size-[34px] place-items-center rounded-xl border border-line p-2 text-primary hover:border-accent"
      :aria-label="t('common.close')"
      @click="open = false"
    >
      <CancelIcon class="size-4" aria-hidden="true" />
    </button>
    <div class="flex flex-col items-center gap-8">
      <div class="flex flex-col items-center gap-4">
        <span class="grid size-14 place-items-center rounded-full bg-error/10 text-error">
          <AlertIcon class="size-8" aria-hidden="true" />
        </span>
        <h2 id="delete-product-title" class="text-h4 text-secondary">
          {{ t('dashboard.products.delete.title') }}
        </h2>
      </div>
      <div class="grid w-full grid-cols-2 gap-6">
        <BaseButton block @click="confirm">{{ t('dashboard.products.delete.yes') }}</BaseButton>
        <BaseButton variant="soft" block @click="open = false">{{
          t('dashboard.products.delete.no')
        }}</BaseButton>
      </div>
    </div>
  </BaseModal>
</template>

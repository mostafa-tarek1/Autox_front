<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import TickIcon from '@/assets/icons/tick-02--solid-standard.svg'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'

const open = defineModel<boolean>('open', { default: false })
const { t } = useI18n()
</script>

<template>
  <BaseModal v-model:open="open" width="max-w-[320px]">
    <div class="flex flex-col items-center gap-6 pt-2">
      <div class="flex flex-col items-center gap-2">
        <span class="grid size-10 place-items-center rounded-full bg-accent text-primary">
          <TickIcon class="size-8" aria-hidden="true" />
        </span>
        <p class="text-h4 text-secondary" role="status">{{ t('billing.voucherForm.success') }}</p>
      </div>
      <BaseButton block :to="{ name: 'voucher-transactions' }">{{
        t('billing.voucherForm.viewRequests')
      }}</BaseButton>
    </div>
  </BaseModal>
</template>

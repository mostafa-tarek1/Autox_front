<script setup lang="ts">
import { useId } from 'vue'
import { useI18n } from 'vue-i18n'

import TickIcon from '@/assets/icons/tick-02--solid-standard.svg'
import BaseModal from '@/components/ui/BaseModal.vue'

/**
 * "تم الدفع بنجاح" after an instalment provider (Tabby / Tamara) confirms the payment
 * (Figma payment 226:5818): a white panel holding a surface card with the tick, title and hint.
 */
const open = defineModel<boolean>('open', { default: false })
const { t } = useI18n()
const titleId = useId()
</script>

<template>
  <BaseModal
    v-model:open="open"
    :labelled-by="titleId"
    panel-class="max-w-[584px] rounded-3xl px-4 py-16 sm:px-10 sm:py-[101px]"
  >
    <div
      class="flex flex-col items-center gap-6 rounded-3xl bg-surface px-6 py-10 text-center"
      role="status"
    >
      <span class="grid size-16 place-items-center rounded-full bg-accent p-4 text-primary">
        <TickIcon class="size-8" aria-hidden="true" />
      </span>
      <div class="flex max-w-[394px] flex-col gap-2">
        <h2 :id="titleId" class="text-h4 text-ink">{{ t('shop.payment.success') }}</h2>
        <p class="text-body-md text-ink">{{ t('shop.payment.successHint') }}</p>
      </div>
    </div>
  </BaseModal>
</template>

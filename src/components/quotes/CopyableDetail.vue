<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

import CopyIcon from '@/assets/icons/copy-01--duotone-rounded.svg'

/** Bank detail row with a copy action (Figma 686:8517). */
const props = defineProps<{ label: string; value: string; ltr?: boolean }>()
const { t } = useI18n()
const { copy, copied, isSupported } = useClipboard({ copiedDuring: 1500, legacy: true })
</script>

<template>
  <div class="flex flex-col items-start gap-1">
    <span class="text-body-md text-secondary">{{ label }}</span>
    <div class="flex w-full items-center justify-between gap-4">
      <span class="text-h4 break-all text-ink" :dir="props.ltr ? 'ltr' : undefined">{{
        value
      }}</span>
      <button
        v-if="isSupported"
        type="button"
        class="flex shrink-0 items-center gap-1 text-body-md text-secondary transition-colors hover:text-primary"
        :aria-label="t('quotes.payment.copyLabel', { field: label })"
        @click="copy(value)"
      >
        <CopyIcon class="size-6 text-primary" aria-hidden="true" />
        <span aria-live="polite">{{
          copied ? t('quotes.payment.copied') : t('quotes.payment.copy')
        }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

import CopyIcon from '@/assets/icons/copy-01--duotone-rounded.svg'

/** Label + value row with a copy button (bank account details). */
const props = defineProps<{ label: string; value: string; ltr?: boolean }>()
const { t } = useI18n()
const { copy, copied, isSupported } = useClipboard({ legacy: true })
</script>

<template>
  <div class="flex items-end justify-between gap-4 py-4">
    <div class="flex min-w-0 flex-col items-start gap-1">
      <dt class="text-body-md text-secondary">{{ label }}</dt>
      <dd :dir="ltr ? 'ltr' : undefined" class="text-h4 break-all text-ink">{{ value }}</dd>
    </div>
    <button
      v-if="isSupported"
      type="button"
      class="flex shrink-0 items-center gap-1 text-body-md text-secondary hover:text-primary"
      :aria-label="t('shop.bankTransfer.copyLabel', { label: props.label })"
      @click="copy(value)"
    >
      <CopyIcon class="size-6 text-primary" aria-hidden="true" />
      <span aria-live="polite">{{
        copied ? t('shop.bankTransfer.copied') : t('shop.bankTransfer.copy')
      }}</span>
    </button>
  </div>
</template>

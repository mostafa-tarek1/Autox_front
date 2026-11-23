<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import RiyalIcon from '@/assets/brand/riyal.svg'

/** Wallet movement amount: "+2,000" in green for credits, "-20" in red for debits, then ⃁. */
const props = defineProps<{ amount: number }>()
const { t } = useI18n()

const isCredit = computed(() => props.amount >= 0)
const formatted = computed(
  () =>
    `${isCredit.value ? '+' : '-'}${Math.abs(props.amount).toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
)
</script>

<template>
  <span
    class="inline-flex items-center gap-1 text-h4"
    :class="isCredit ? 'text-success' : 'text-error'"
  >
    <span dir="ltr" class="tabular-nums">{{ formatted }}</span>
    <RiyalIcon
      class="h-4 w-3.5 shrink-0 text-secondary"
      role="img"
      :aria-label="t('common.currency')"
    />
  </span>
</template>

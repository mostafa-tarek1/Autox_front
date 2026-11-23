<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import RiyalIcon from '@/assets/brand/riyal.svg'

/**
 * Table amount (16/28 semibold, two decimals, no grouping). `signed` shows "3000.00+" in green or
 * "10.00-" in red — the sign follows the number, as in the design (read right to left); otherwise ink.
 */
const props = withDefaults(defineProps<{ amount: number; signed?: boolean }>(), { signed: false })
const { t } = useI18n()

const tone = computed(() => {
  if (!props.signed) {
    return 'text-ink'
  }
  return props.amount >= 0 ? 'text-success' : 'text-error'
})

const formatted = computed(() => {
  const value = Math.abs(props.amount).toFixed(2)
  if (!props.signed) {
    return value
  }
  return `${value}${props.amount >= 0 ? '+' : '-'}`
})
</script>

<template>
  <span class="inline-flex items-center gap-2 text-h4" :class="tone">
    <span dir="ltr" class="leading-7 tabular-nums">{{ formatted }}</span>
    <RiyalIcon
      class="h-4 w-3.5 shrink-0 text-secondary"
      role="img"
      :aria-label="t('common.currency')"
    />
  </span>
</template>

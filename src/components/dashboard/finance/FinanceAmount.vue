<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import RiyalIcon from '@/assets/brand/riyal.svg'
import { useLocale } from '@/composables/useLocale'

/**
 * Table amount (16/28 semibold, two decimals, no grouping). `signed` shows the amount in green or red
 * with its sign on the reading-end side: "3000.00+" in Arabic/Urdu as in the design, "+3000.00" in
 * English; otherwise ink.
 */
const props = withDefaults(defineProps<{ amount: number; signed?: boolean }>(), { signed: false })
const { t } = useI18n()
const { isRtl } = useLocale()

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
  const sign = props.amount >= 0 ? '+' : '-'
  return isRtl.value ? `${value}${sign}` : `${sign}${value}`
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

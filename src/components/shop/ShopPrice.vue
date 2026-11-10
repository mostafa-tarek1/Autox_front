<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import RiyalIcon from '@/assets/brand/riyal.svg'

/**
 * Riyal amount in the checkout style: thousands separators, no forced decimals
 * ("10,900"), unlike the catalog PriceTag which always shows two decimals.
 */
const props = withDefaults(
  defineProps<{
    amount: number
    size?: 'sm' | 'md' | 'lg' | 'xl'
    tone?: 'ink' | 'primary'
    decimals?: boolean
  }>(),
  { size: 'md', tone: 'ink', decimals: false },
)
const { t } = useI18n()

const formatted = computed(() =>
  props.amount.toLocaleString('en-US', {
    minimumFractionDigits: props.decimals ? 2 : 0,
    maximumFractionDigits: 2,
  }),
)

const sizeClasses = {
  sm: 'text-body-sm',
  md: 'text-h4',
  lg: 'text-h3',
  xl: 'text-h2',
} as const
</script>

<template>
  <span
    class="inline-flex items-center gap-1"
    :class="[sizeClasses[size], tone === 'primary' ? 'text-primary' : 'text-ink']"
  >
    <span class="tabular-nums">{{ formatted }}</span>
    <RiyalIcon
      class="shrink-0"
      :class="size === 'sm' ? 'h-3 w-[11px]' : 'h-4 w-3.5'"
      role="img"
      :aria-label="t('common.currency')"
    />
  </span>
</template>

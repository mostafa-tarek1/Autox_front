<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import RiyalIcon from '@/assets/brand/riyal.svg'

type PriceSize = 'inherit' | 'sm' | 'md' | 'lg' | 'xl'
type PriceTone = 'inherit' | 'ink' | 'primary'

/**
 * Amount followed by the Saudi riyal symbol.
 * - Catalog cards: `decimals size="lg"` → "200.00 ⃁"
 * - Checkout / wallet / billing: default → "10,900 ⃁"
 * - Orders: `:grouping="false"` → "2000 ⃁"
 * Size and tone default to the parent's text style.
 */
const props = withDefaults(
  defineProps<{
    amount: number
    decimals?: boolean
    grouping?: boolean
    size?: PriceSize
    tone?: PriceTone
    smallSymbol?: boolean
  }>(),
  { decimals: false, grouping: true, size: 'inherit', tone: 'inherit', smallSymbol: false },
)

const { t } = useI18n()

const formatted = computed(() =>
  props.amount.toLocaleString('en-US', {
    minimumFractionDigits: props.decimals ? 2 : 0,
    maximumFractionDigits: 2,
    useGrouping: props.grouping,
  }),
)

const sizeClasses: Record<PriceSize, string> = {
  inherit: '',
  sm: 'text-body-sm',
  md: 'text-h4',
  lg: 'text-h3',
  xl: 'text-h2',
}

const toneClasses: Record<PriceTone, string> = {
  inherit: '',
  ink: 'text-ink',
  primary: 'text-primary',
}

const isSmallSymbol = computed(() => props.smallSymbol || props.size === 'sm')
</script>

<template>
  <span class="inline-flex items-center gap-1" :class="[sizeClasses[size], toneClasses[tone]]">
    <span class="tabular-nums">{{ formatted }}</span>
    <RiyalIcon
      class="shrink-0"
      :class="isSmallSymbol ? 'h-3 w-[11px]' : 'h-4 w-3.5'"
      role="img"
      :aria-label="t('common.currency')"
    />
  </span>
</template>

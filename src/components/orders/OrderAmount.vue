<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import RiyalIcon from '@/assets/brand/riyal.svg'

/** Amount + Saudi riyal symbol. Inherits text color/size from the parent. */
const props = withDefaults(defineProps<{ amount: number; decimals?: boolean; small?: boolean }>(), {
  decimals: false,
  small: false,
})
const { t } = useI18n()

const formatted = computed(() =>
  props.amount.toLocaleString('en-US', {
    minimumFractionDigits: props.decimals ? 2 : 0,
    maximumFractionDigits: 2,
    useGrouping: false,
  }),
)
</script>

<template>
  <span class="inline-flex items-center gap-1">
    <span class="tabular-nums">{{ formatted }}</span>
    <RiyalIcon
      class="shrink-0"
      :class="small ? 'h-3 w-[11px]' : 'h-4 w-3.5'"
      role="img"
      :aria-label="t('common.currency')"
    />
  </span>
</template>

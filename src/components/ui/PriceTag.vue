<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import RiyalIcon from '@/assets/brand/riyal.svg'

const props = withDefaults(defineProps<{ amount: number; size?: 'md' | 'lg' }>(), { size: 'lg' })
const { t } = useI18n()

const formatted = computed(() =>
  props.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
)
</script>

<template>
  <span
    class="inline-flex items-center gap-1 text-ink"
    :class="size === 'lg' ? 'text-h3' : 'text-h4'"
  >
    <span class="tabular-nums">{{ formatted }}</span>
    <RiyalIcon class="h-4 w-3.5 shrink-0" role="img" :aria-label="t('common.currency')" />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import RiyalIcon from '@/assets/brand/riyal.svg?component'

/** Grouped amount ("200,000") followed by the riyal symbol, inheriting size and color. */
const props = defineProps<{ amount: number }>()
const { t } = useI18n()

const formatted = computed(() => props.amount.toLocaleString('en-US'))
</script>

<template>
  <span class="inline-flex items-center gap-1">
    <span class="tabular-nums">{{ formatted }}</span>
    <RiyalIcon class="h-4 w-3.5 shrink-0" role="img" :aria-label="t('common.currency')" />
  </span>
</template>

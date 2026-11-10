<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import RiyalIcon from '@/assets/brand/riyal.svg'

/** Amount + riyal symbol without decimals, as in the wallet screens ("200,000 ⃁"). */
const props = withDefaults(defineProps<{ amount: number; tone?: 'ink' | 'primary' }>(), {
  tone: 'ink',
})
const { t } = useI18n()

const formatted = computed(() => props.amount.toLocaleString('en-US', { maximumFractionDigits: 2 }))
</script>

<template>
  <span
    class="inline-flex items-center gap-1"
    :class="tone === 'primary' ? 'text-primary' : 'text-ink'"
  >
    <span class="tabular-nums">{{ formatted }}</span>
    <RiyalIcon class="h-4 w-3.5 shrink-0" role="img" :aria-label="t('common.currency')" />
  </span>
</template>

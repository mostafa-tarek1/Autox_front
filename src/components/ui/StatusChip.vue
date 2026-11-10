<script setup lang="ts">
import { computed, type Component } from 'vue'

import AlertIcon from '@/assets/icons/alert-circle--stroke-rounded.svg'
import CancelIcon from '@/assets/icons/cancel-circle--stroke-rounded.svg'
import CheckIcon from '@/assets/icons/checkmark-circle-01--stroke-rounded.svg'
import HotPriceIcon from '@/assets/icons/hot-price--stroke-rounded.svg'

export type StatusTone = 'pending' | 'success' | 'paid' | 'error' | 'processing' | 'highlight'

/**
 * Status pill from the Figma "status" set. `withIcon` false gives the table variant
 * (16px text, no icon).
 */
const props = withDefaults(defineProps<{ tone: StatusTone; withIcon?: boolean }>(), {
  withIcon: true,
})

const tones: Record<StatusTone, { classes: string; icon?: Component }> = {
  pending: { classes: 'bg-orange/10 text-orange', icon: AlertIcon },
  processing: { classes: 'bg-orange/10 text-orange', icon: AlertIcon },
  paid: { classes: 'bg-accent/20 text-success', icon: CheckIcon },
  success: { classes: 'bg-success/10 text-success', icon: CheckIcon },
  error: { classes: 'bg-error/10 text-error', icon: CancelIcon },
  highlight: { classes: 'bg-accent text-primary', icon: HotPriceIcon },
}

const tone = computed(() => tones[props.tone])
</script>

<template>
  <span
    class="inline-flex h-8 w-fit items-center justify-center gap-1 rounded-full px-2 py-1 whitespace-nowrap"
    :class="[tone.classes, withIcon ? 'text-body-sm' : 'text-body-md']"
  >
    <component :is="tone.icon" v-if="withIcon && tone.icon" class="size-4" aria-hidden="true" />
    <slot />
  </span>
</template>

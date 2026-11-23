<script setup lang="ts">
import type { Component } from 'vue'

import AlertIcon from '@/assets/icons/alert-circle--stroke-rounded.svg'
import PriceTag from '@/components/ui/PriceTag.vue'

/**
 * Stat tile from the Dashboard frames (273×94): round icon at the start, value + label, and an
 * optional info hint at the end (pending balance).
 */
withDefaults(
  defineProps<{
    label: string
    value: number
    icon: Component
    currency?: boolean
    iconClass?: string
    hint?: string
  }>(),
  { currency: false, iconClass: 'text-primary' },
)
</script>

<template>
  <div class="flex h-[94px] items-center gap-3 rounded-3xl bg-white px-5 py-[19px] shadow-card">
    <span
      class="grid size-[54px] shrink-0 place-items-center rounded-full bg-surface p-[15px]"
      :class="iconClass"
    >
      <component :is="icon" class="size-6" aria-hidden="true" />
    </span>
    <span class="flex min-w-0 flex-1 flex-col items-start">
      <PriceTag
        v-if="currency"
        :amount="value"
        :decimals="value !== 0"
        class="text-h2 text-ink [&_svg]:text-secondary"
      />
      <span v-else class="text-h2 text-ink tabular-nums">{{ value }}</span>
      <span class="text-body-sm text-ink">{{ label }}</span>
    </span>
    <span
      v-if="hint"
      class="grid size-6 shrink-0 place-items-center self-center rounded-full bg-surface p-1 text-orange"
      role="img"
      :aria-label="hint"
      :title="hint"
    >
      <AlertIcon class="size-4" aria-hidden="true" />
    </span>
  </div>
</template>

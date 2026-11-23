<script setup lang="ts">
import type { Component } from 'vue'

import InfoHint from '@/components/account/InfoHint.vue'
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
    /** Accessible name of the hint button; defaults to the tile label. */
    hintLabel?: string
  }>(),
  { currency: false, iconClass: 'text-primary' },
)
</script>

<template>
  <div
    class="flex flex-col items-start gap-2 rounded-2xl bg-white p-4 shadow-card sm:h-[94px] sm:flex-row sm:items-center sm:gap-3 sm:rounded-3xl sm:px-5 sm:py-[19px]"
  >
    <span
      class="grid size-10 shrink-0 place-items-center rounded-full bg-surface p-2 sm:size-[54px] sm:p-[15px]"
      :class="iconClass"
    >
      <component :is="icon" class="size-6" aria-hidden="true" />
    </span>
    <span class="flex min-w-0 flex-1 flex-col items-start">
      <PriceTag
        v-if="currency"
        :amount="value"
        :decimals="value !== 0"
        class="text-h3 text-ink sm:text-h2 [&_svg]:text-secondary"
      />
      <span v-else class="text-h3 text-ink tabular-nums sm:text-h2">{{ value }}</span>
      <span class="text-body-sm text-ink">{{ label }}</span>
    </span>
    <InfoHint
      v-if="hint"
      class="self-center [&_button]:text-orange"
      :text="hint"
      :label="hintLabel ?? label"
    />
  </div>
</template>

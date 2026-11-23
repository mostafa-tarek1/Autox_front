<script setup lang="ts">
import type { Component } from 'vue'

import PriceTag from '@/components/ui/PriceTag.vue'

/** Stat tile from the Dashboard frames (273×94): value + label at the start, round icon at the end. */
defineProps<{ label: string; value: number; icon: Component; currency?: boolean }>()
</script>

<template>
  <div class="flex h-[94px] items-center gap-3 rounded-3xl bg-white px-5 py-[19px] shadow-card">
    <span
      class="grid size-[54px] shrink-0 place-items-center rounded-full bg-surface p-[15px] text-primary"
    >
      <component :is="icon" class="size-6" aria-hidden="true" />
    </span>
    <span class="flex min-w-0 flex-1 flex-col items-start">
      <PriceTag v-if="currency" :amount="value" :decimals="value !== 0" class="text-h2 text-ink" />
      <span v-else class="text-h2 text-ink tabular-nums">{{ value.toLocaleString('en-US') }}</span>
      <span class="text-body-sm text-ink">{{ label }}</span>
    </span>
  </div>
</template>

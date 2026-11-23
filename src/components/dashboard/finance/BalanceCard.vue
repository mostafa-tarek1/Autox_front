<script setup lang="ts">
import type { Component } from 'vue'

import PriceTag from '@/components/ui/PriceTag.vue'

/**
 * Balance tile (372×94): round icon + amount/label at the start, optional action or hint at the
 * end (the "aside" slot).
 */
defineProps<{ label: string; amount: number; icon: Component; iconClass?: string }>()
</script>

<template>
  <div
    class="flex min-h-[94px] items-center justify-between gap-3 rounded-3xl bg-white px-5 py-[19px] shadow-card"
  >
    <div class="flex min-w-0 items-center gap-3">
      <span
        class="grid size-[54px] shrink-0 place-items-center rounded-full bg-surface p-[15px]"
        :class="iconClass ?? 'text-primary'"
      >
        <component :is="icon" class="size-6" aria-hidden="true" />
      </span>
      <span class="flex min-w-0 flex-col items-start">
        <PriceTag :amount="amount" decimals class="text-h2 text-ink" />
        <span class="text-body-sm text-ink">{{ label }}</span>
      </span>
    </div>
    <slot name="aside" />
  </div>
</template>

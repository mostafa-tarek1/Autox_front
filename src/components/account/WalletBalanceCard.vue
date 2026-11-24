<script setup lang="ts">
import { useId, type Component } from 'vue'

import PriceTag from '@/components/ui/PriceTag.vue'

/**
 * One balance tile of the wallet (Figma 588:12932): icon box, label, amount, and an optional
 * action (withdraw button) or hint (info icon) on the far side.
 */
withDefaults(
  defineProps<{
    label: string
    amount: number
    icon: Component
    tone?: 'ink' | 'success'
    /** Icon colour; the pending balance uses orange in the design. */
    iconClass?: string
  }>(),
  { tone: 'ink', iconClass: 'text-primary' },
)
const labelId = useId()
</script>

<template>
  <section
    class="flex min-h-[92px] items-center justify-between gap-2 rounded-3xl bg-white px-6 py-4 shadow-card"
    :aria-labelledby="labelId"
  >
    <div class="flex min-w-0 items-center gap-2">
      <span
        class="grid size-12 shrink-0 place-items-center rounded-xl bg-surface p-3"
        :class="iconClass"
      >
        <component :is="icon" class="size-6" aria-hidden="true" />
      </span>
      <div class="flex min-w-0 flex-col gap-2">
        <p :id="labelId" class="text-body-sm text-ink">{{ label }}</p>
        <PriceTag
          :amount="amount"
          class="text-h3 [&_svg]:text-secondary"
          :class="tone === 'success' ? 'text-success' : 'text-ink'"
        />
      </div>
    </div>
    <slot />
  </section>
</template>

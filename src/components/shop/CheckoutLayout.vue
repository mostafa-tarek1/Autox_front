<script setup lang="ts">
import CheckoutHero from './CheckoutHero.vue'
import type { CheckoutStep } from './types'

/** Hero + two-column checkout body: main content at the start, order summary at the end. */
defineProps<{
  title: string
  step?: CheckoutStep
  /**
   * Space (px) the design leaves between the content and the features strip. DefaultLayout puts
   * 106px there; checkout screens use less (cart 88, availability 50).
   */
  stripGap?: number
  /** Tall hero with the title centred above the stepper. */
  centeredHero?: boolean
}>()

/** DefaultLayout's margin above the features strip. */
const LAYOUT_STRIP_GAP = 106
</script>

<template>
  <CheckoutHero :title="title" :step="step" :centered="centeredHero" />
  <div
    class="page-container grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_385px]"
    :class="centeredHero ? 'mt-16' : 'mt-12'"
    :style="
      stripGap === undefined ? undefined : { marginBottom: `${stripGap - LAYOUT_STRIP_GAP}px` }
    "
  >
    <div class="flex min-w-0 flex-col gap-8">
      <slot />
    </div>
    <aside v-if="$slots.aside" class="flex flex-col gap-8 lg:sticky lg:top-24">
      <slot name="aside" />
    </aside>
  </div>
</template>

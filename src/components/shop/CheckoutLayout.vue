<script setup lang="ts">
import CheckoutHero from './CheckoutHero.vue'

/** Hero + two-column checkout body: main content at the start, order summary at the end. */
defineProps<{
  title: string
  /**
   * Space (px) the design leaves between the content and the features strip. DefaultLayout puts
   * 106px there; the cart uses 81, the bank transfer 235.
   */
  stripGap?: number
}>()

/** DefaultLayout's margin above the features strip. */
const LAYOUT_STRIP_GAP = 106
</script>

<template>
  <CheckoutHero :title="title" />
  <div
    class="page-container mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_385px]"
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

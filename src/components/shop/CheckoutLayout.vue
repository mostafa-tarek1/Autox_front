<script setup lang="ts">
import CheckoutHero from './CheckoutHero.vue'
import type { CheckoutStep } from './types'

/** Hero + two-column checkout body: main content at the start, order summary at the end. */
defineProps<{ title: string; step?: CheckoutStep }>()
</script>

<template>
  <CheckoutHero :title="title" :step="step" />
  <div class="page-container mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_385px]">
    <div class="flex min-w-0 flex-col gap-8">
      <slot />
    </div>
    <aside v-if="$slots.aside" class="flex flex-col gap-8 lg:sticky lg:top-24">
      <slot name="aside" />
    </aside>
  </div>
</template>

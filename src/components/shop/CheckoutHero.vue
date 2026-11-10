<script setup lang="ts">
import XPattern from '@/components/ui/XPattern.vue'

import CheckoutStepper from './CheckoutStepper.vue'
import type { CheckoutStep } from './types'

defineProps<{ title: string; step?: CheckoutStep }>()
</script>

<template>
  <section class="relative isolate overflow-hidden bg-primary">
    <XPattern class="absolute top-0 right-0 -z-10 h-[237px] w-[333px] text-accent opacity-10" />
    <div
      class="page-container flex min-h-[152px] flex-col justify-center gap-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:py-10"
    >
      <h1 class="text-[32px] leading-[48px] font-bold text-white sm:text-display">{{ title }}</h1>
      <CheckoutStepper
        v-if="step"
        :current="step"
        class="self-center overflow-x-auto lg:self-auto"
      />
    </div>
  </section>
</template>

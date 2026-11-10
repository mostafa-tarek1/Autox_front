<script setup lang="ts">
import XPattern from '@/components/ui/XPattern.vue'

import CheckoutStepper from './CheckoutStepper.vue'
import type { CheckoutStep } from './types'

/** `centered`: tall variant with the title above the stepper (bank transfer, Figma 226:6083). */
defineProps<{ title: string; step?: CheckoutStep; centered?: boolean }>()
</script>

<template>
  <section class="relative isolate overflow-hidden bg-primary">
    <XPattern class="absolute top-0 right-0 -z-10 h-[237px] w-[333px] text-accent opacity-10" />
    <div
      v-if="centered"
      class="page-container flex min-h-[297px] flex-col items-center gap-12 pt-[73px] pb-12"
    >
      <h1 class="text-center text-[32px] leading-[48px] font-bold text-white sm:text-display">
        {{ title }}
      </h1>
      <CheckoutStepper v-if="step" :current="step" class="overflow-x-auto" />
    </div>
    <div
      v-else
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

<script setup lang="ts">
import XPattern from '@/components/ui/XPattern.vue'

/** Green 152px hero of the cart and payment screens: title only (Figma 212:5649). */
defineProps<{ title: string }>()
</script>

<template>
  <section class="relative isolate overflow-hidden bg-primary">
    <XPattern class="absolute top-0 right-0 -z-10 h-[237px] w-[333px] text-accent opacity-10" />
    <div class="page-container flex min-h-[152px] items-center py-8 lg:py-10">
      <h1 class="text-[32px] leading-[48px] font-bold text-white sm:text-display">{{ title }}</h1>
    </div>
  </section>
</template>

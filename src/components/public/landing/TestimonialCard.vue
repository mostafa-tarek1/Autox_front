<script setup lang="ts">
import QuoteIcon from '@/assets/icons/quote-down--duotone-rounded.svg'
import type { Testimonial } from '@/mocks/public'

defineProps<{ testimonial: Testimonial }>()
</script>

<template>
  <figure
    class="flex h-full flex-col items-start gap-2 rounded-3xl border border-transparent bg-white p-6 shadow-card transition-colors hover:border-accent"
  >
    <QuoteIcon class="size-7 text-primary" aria-hidden="true" />
    <blockquote class="text-h4 text-ink">«{{ testimonial.quote }}»</blockquote>
    <hr class="my-2 w-full border-line" />
    <figcaption class="flex flex-col items-start gap-1">
      <span class="text-body-md text-ink">{{ testimonial.name }}</span>
      <span class="text-body-sm text-secondary">{{ testimonial.role }}</span>
    </figcaption>
  </figure>
</template>

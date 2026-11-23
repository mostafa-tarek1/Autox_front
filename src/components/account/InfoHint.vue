<script setup lang="ts">
import { ref, useId } from 'vue'

import AlertIcon from '@/assets/icons/alert-circle--stroke-rounded.svg'

/**
 * Small "i" button that shows a short explanation on hover, focus or tap
 * (Figma "info" tooltips 885:15936 / 799:8546: a white bubble 6px under the icon).
 */
defineProps<{ text: string; label: string }>()
const isOpen = ref(false)
const tooltipId = useId()
</script>

<template>
  <span class="relative inline-flex">
    <button
      type="button"
      class="grid size-6 place-items-center rounded-full bg-surface p-1 text-secondary hover:text-primary"
      :aria-label="label"
      :aria-describedby="tooltipId"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
      @mouseenter="isOpen = true"
      @mouseleave="isOpen = false"
      @focus="isOpen = true"
      @blur="isOpen = false"
      @keydown.esc="isOpen = false"
    >
      <AlertIcon class="size-4" aria-hidden="true" />
    </button>
    <span
      :id="tooltipId"
      role="tooltip"
      class="absolute end-0 top-full z-20 mt-1.5 w-max max-w-[260px] rounded-lg border border-line bg-white px-3 py-2 text-body-sm text-secondary shadow-soft"
      :class="isOpen ? 'block' : 'hidden'"
    >
      {{ text }}
    </span>
  </span>
</template>

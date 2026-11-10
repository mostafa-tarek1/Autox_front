<script setup lang="ts">
import type { Component } from 'vue'

import IconBox from './IconBox.vue'

/** Summary tile: icon box + label + value (value passed through the default slot). */
withDefaults(
  defineProps<{ label: string; icon: Component; size?: 'md' | 'lg'; iconColor?: string }>(),
  {
    size: 'md',
  },
)
</script>

<template>
  <div
    class="flex items-center gap-2 rounded-3xl bg-white shadow-card"
    :class="size === 'lg' ? 'p-6' : 'px-6 py-4'"
  >
    <IconBox :icon="icon" :size="size" :color="iconColor" />
    <div class="flex min-w-0 flex-col gap-2">
      <span class="text-body-sm text-black">{{ label }}</span>
      <span :class="size === 'lg' ? 'text-h2' : 'text-h3'"><slot /></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

/** Rounded surface square holding a duotone icon (stat cards, info items, feature cards). */
withDefaults(
  defineProps<{
    icon: Component
    size?: 'md' | 'lg' | 'xl'
    tone?: 'surface' | 'white'
    color?: string
  }>(),
  { size: 'md', tone: 'surface', color: 'text-primary' },
)

const boxClasses = {
  md: 'size-12 rounded-xl',
  lg: 'size-14 rounded-xl',
  xl: 'size-[52px] rounded-2xl',
}
const iconClasses = { md: 'size-6', lg: 'size-8', xl: 'size-7' }
</script>

<template>
  <span
    class="grid shrink-0 place-items-center p-3"
    :class="[boxClasses[size], tone === 'surface' ? 'bg-surface' : 'bg-white', color]"
  >
    <component :is="icon" :class="iconClasses[size]" aria-hidden="true" />
  </span>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

/** "icon label: value" pair used in order headers. */
defineProps<{ icon: Component | string; label: string; iconClass?: string }>()
</script>

<template>
  <span class="inline-flex items-center gap-1 text-body-sm whitespace-nowrap">
    <component
      :is="icon"
      class="size-4 shrink-0"
      :class="iconClass ?? 'text-primary'"
      aria-hidden="true"
    />
    <span class="text-secondary">{{ label }}</span>
    <span class="text-ink"><slot /></span>
  </span>
</template>

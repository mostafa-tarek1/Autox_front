<script setup lang="ts">
/** Label + control + error wrapper shared by every form input (Figma "input" component). */
defineProps<{
  label?: string
  error?: string
  hint?: string
  forId: string
  required?: boolean
  /** Shows the design's red asterisk after the label (only where the Figma field has one). */
  requiredMark?: boolean
}>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" :for="forId" class="text-body-sm text-ink">
      {{ label }}<span v-if="requiredMark" class="text-error" aria-hidden="true"> *</span>
    </label>
    <slot />
    <p v-if="error" :id="`${forId}-error`" class="text-caption text-error" role="alert">
      {{ error }}
    </p>
    <p v-else-if="hint" :id="`${forId}-hint`" class="text-caption text-secondary">{{ hint }}</p>
  </div>
</template>

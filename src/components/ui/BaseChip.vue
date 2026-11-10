<script setup lang="ts">
type ChipTone = 'neutral' | 'primary' | 'success' | 'info' | 'error' | 'warning'

withDefaults(defineProps<{ tone?: ChipTone }>(), { tone: 'neutral' })

/** Pill tags used on product cards ("أصلي", "الأقل سعرا", "مطابق لطلبك"). */
const toneClasses: Record<ChipTone, string> = {
  neutral: 'bg-surface text-ink px-2 py-1 text-body-sm',
  primary: 'bg-surface text-primary px-2 py-1 text-body-sm',
  success: 'bg-success/10 text-success p-2 text-sm leading-4',
  info: 'bg-info/10 text-match p-2 text-sm leading-4',
  error: 'bg-error/10 text-error p-2 text-sm leading-4',
  warning: 'bg-orange/10 text-orange p-2 text-sm leading-4',
}
</script>

<template>
  <span
    class="inline-flex h-8 items-center justify-center gap-1 rounded-full"
    :class="toneClasses[tone]"
  >
    <slot name="icon" />
    <slot />
  </span>
</template>

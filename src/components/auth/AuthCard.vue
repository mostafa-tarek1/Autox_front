<script setup lang="ts">
/** Frosted glass card used by every auth step (Figma "login-card"). */
withDefaults(defineProps<{ as?: string }>(), { as: 'section' })
</script>

<template>
  <component
    :is="as"
    class="flex w-full max-w-[598px] flex-col items-center gap-8 rounded-3xl border border-white/25 bg-linear-to-r from-white/30 to-neutral-400/30 px-5 py-10 text-white backdrop-blur-[8px] sm:px-8 sm:py-12"
  >
    <slot />
  </component>
</template>

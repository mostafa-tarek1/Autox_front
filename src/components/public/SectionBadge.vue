<script setup lang="ts">
/** Small pill above section titles ("من نحن", "المميزات"...). */
withDefaults(defineProps<{ tone?: 'light' | 'dark' }>(), { tone: 'light' })
</script>

<template>
  <span
    class="inline-flex items-center justify-center rounded-full border-[0.5px] border-accent/20 bg-accent/16 backdrop-blur-[8px]"
    :class="
      tone === 'dark'
        ? 'px-3 py-2 text-body-sm text-accent'
        : 'px-3 py-1 text-label leading-5 text-primary'
    "
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
/**
 * One selectable payment method row (Figma "button" set 386:9427): radio semantics, lime border
 * when checked. Card brands show their logo on a white tile; wallet and bank show a 28px icon.
 */
defineProps<{ value: string; label: string; logo?: string; name: string }>()
const selected = defineModel<string | null>({ default: null })
</script>

<template>
  <label
    class="flex min-h-[62px] cursor-pointer items-center gap-2 rounded-xl border bg-surface px-6 py-4 transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent"
    :class="selected === value ? 'border-accent' : 'border-line hover:border-accent'"
  >
    <input v-model="selected" type="radio" :name="name" :value="value" class="sr-only" />
    <span
      v-if="logo"
      class="grid h-[29px] w-11 shrink-0 place-items-center rounded-lg bg-white p-1"
    >
      <img :src="logo" alt="" width="37" height="19" class="max-h-[19px] w-[37px] object-contain" />
    </span>
    <span v-else class="grid size-7 shrink-0 place-items-center text-primary">
      <slot name="icon" />
    </span>
    <span class="text-button text-primary">{{ label }}</span>
  </label>
</template>

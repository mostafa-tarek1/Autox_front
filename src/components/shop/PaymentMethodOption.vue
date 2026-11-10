<script setup lang="ts">
/** One selectable payment method row (Figma "button" set 386:9427): radio semantics, lime border when checked. */
defineProps<{ value: string; label: string; logo?: string; name: string }>()
const selected = defineModel<string | null>({ default: null })
</script>

<template>
  <label
    class="flex min-h-[63px] cursor-pointer items-center gap-2 rounded-xl border bg-surface px-6 py-4 transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent"
    :class="selected === value ? 'border-accent' : 'border-line hover:border-accent/60'"
  >
    <input v-model="selected" type="radio" :name="name" :value="value" class="sr-only" />
    <span class="grid h-[29px] w-11 shrink-0 place-items-center rounded-lg bg-white p-1">
      <img
        v-if="logo"
        :src="logo"
        alt=""
        width="37"
        height="19"
        class="max-h-[19px] w-[37px] object-contain"
      />
      <slot v-else name="icon" />
    </span>
    <span class="text-button text-primary">{{ label }}</span>
  </label>
</template>

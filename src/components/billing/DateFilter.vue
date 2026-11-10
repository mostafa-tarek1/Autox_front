<script setup lang="ts">
import { useId } from 'vue'

import CalendarIcon from '@/assets/icons/calendar-02--stroke-rounded.svg'

/** Date input styled like the Figma "input" with a calendar icon; the label stays visually hidden. */
defineProps<{ label: string }>()
const value = defineModel<string>({ default: '' })
const id = useId()
</script>

<template>
  <div class="relative">
    <label :for="id" class="sr-only">{{ label }}</label>
    <CalendarIcon
      class="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-ink"
      aria-hidden="true"
    />
    <input
      :id="id"
      v-model="value"
      type="date"
      class="peer h-12 w-full rounded-xl border border-line bg-white ps-10 pe-4 text-body-md text-ink outline-none focus:border-accent [&::-webkit-calendar-picker-indicator]:opacity-0"
      :class="!value && 'text-transparent focus:text-ink'"
    />
    <span
      v-if="!value"
      class="pointer-events-none absolute start-10 top-1/2 -translate-y-1/2 text-body-md text-ink/50 peer-focus:hidden"
      aria-hidden="true"
    >
      {{ label }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'

import CalendarIcon from '@/assets/icons/calendar-02--stroke-rounded.svg'

/**
 * Date filter styled like the design's input (placeholder + calendar icon). A transparent native
 * date input sits on top, so keyboard, screen readers and the OS picker all keep working.
 */
const props = defineProps<{ placeholder: string; min?: string; max?: string }>()
const date = defineModel<string>({ default: '' })
const input = useTemplateRef<HTMLInputElement>('input')

const display = computed(() => {
  if (!date.value) {
    return props.placeholder
  }
  const [year, month, day] = date.value.split('-')
  return `${Number(day)}/${Number(month)}/${year}`
})

function openPicker(): void {
  try {
    input.value?.showPicker()
  } catch {
    // showPicker is unsupported or blocked; the native input still opens on its own.
  }
}
</script>

<template>
  <label
    class="relative flex h-12 w-full items-center gap-2 rounded-xl border border-line bg-white px-4 py-3 transition-colors focus-within:border-accent sm:w-[184px]"
  >
    <CalendarIcon class="size-4 shrink-0 text-ink" aria-hidden="true" />
    <span
      class="truncate text-body-md"
      :class="date ? 'text-ink' : 'text-ink/50'"
      aria-hidden="true"
      >{{ display }}</span
    >
    <input
      ref="input"
      v-model="date"
      type="date"
      :min="min"
      :max="max"
      :aria-label="placeholder"
      class="absolute inset-0 size-full cursor-pointer opacity-0"
      @click="openPicker"
    />
  </label>
</template>

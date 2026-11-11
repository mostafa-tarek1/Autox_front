<script setup lang="ts" generic="T extends string | number">
import { useId } from 'vue'

import ArrowDownIcon from '@/assets/icons/arrow-down-01--stroke-standard.svg'

import FormField from './FormField.vue'

export interface SelectOption<V> {
  value: V
  label: string
}

withDefaults(
  defineProps<{
    options: SelectOption<T>[]
    label?: string
    placeholder?: string
    error?: string
    required?: boolean
    disabled?: boolean
    surface?: boolean
  }>(),
  { surface: false },
)

const value = defineModel<T | null>({ default: null })
const id = useId()
</script>

<template>
  <FormField :label="label" :error="error" :for-id="id" :required="required">
    <div class="relative">
      <select
        :id="id"
        v-model="value"
        :required="required"
        :disabled="disabled"
        :aria-invalid="error ? true : undefined"
        class="h-12 w-full appearance-none rounded-xl border px-4 pe-10 text-label outline-none transition-colors focus:border-accent disabled:opacity-60"
        :class="[
          error ? 'border-error' : 'border-line',
          surface ? 'bg-surface' : 'bg-white',
          value === null ? 'font-label text-secondary/50' : 'text-ink',
        ]"
      >
        <option :value="null" disabled>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          class="text-ink"
        >
          {{ option.label }}
        </option>
      </select>
      <ArrowDownIcon
        class="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-ink"
        aria-hidden="true"
      />
    </div>
  </FormField>
</template>

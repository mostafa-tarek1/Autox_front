<script setup lang="ts">
import { useId, type Component } from 'vue'

import FormField from './FormField.vue'

withDefaults(
  defineProps<{
    label?: string
    placeholder?: string
    error?: string
    hint?: string
    type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'search'
    icon?: Component
    required?: boolean
    disabled?: boolean
    autocomplete?: string
    dir?: 'ltr' | 'rtl' | 'auto'
    multiline?: boolean
    rows?: number
  }>(),
  { type: 'text', rows: 4 },
)

defineOptions({ inheritAttrs: false })

const value = defineModel<string>({ default: '' })
const id = useId()
</script>

<template>
  <FormField :label="label" :error="error" :hint="hint" :for-id="id" :required="required">
    <div
      class="flex items-center gap-2 rounded-xl border bg-white px-4 py-3 transition-colors focus-within:border-accent"
      :class="[
        error ? 'border-error' : 'border-line',
        disabled && 'opacity-60',
        multiline ? 'items-start' : 'h-12',
      ]"
    >
      <component :is="icon" v-if="icon" class="size-4 shrink-0 text-secondary" aria-hidden="true" />
      <textarea
        v-if="multiline"
        :id="id"
        v-model="value"
        :rows="rows"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :dir="dir"
        :aria-invalid="error ? true : undefined"
        :aria-describedby="error ? `${id}-error` : hint ? `${id}-hint` : undefined"
        v-bind="$attrs"
        class="min-w-0 flex-1 resize-none bg-transparent text-label text-ink outline-none placeholder:text-secondary/50"
      />
      <input
        v-else
        :id="id"
        v-model="value"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :dir="dir"
        :aria-invalid="error ? true : undefined"
        :aria-describedby="error ? `${id}-error` : hint ? `${id}-hint` : undefined"
        v-bind="$attrs"
        class="min-w-0 flex-1 bg-transparent text-label text-ink outline-none placeholder:text-secondary/50"
      />
      <slot name="suffix" />
    </div>
  </FormField>
</template>

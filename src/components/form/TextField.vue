<script setup lang="ts">
import { computed, useId, type Component } from 'vue'

import FormField from './FormField.vue'

const props = withDefaults(
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
    /** Surface (#F4F7F2) background instead of white, as in the dashboard product forms. */
    surface?: boolean
    rows?: number
    /**
     * Placeholder drawn as a greyed sample value (16px body, ink at 50%) instead of the small grey
     * label style; the design uses it on some fields (e.g. "فهد العتيبي", "0", the IBAN mask).
     */
    samplePlaceholder?: boolean
  }>(),
  { type: 'text', rows: 4 },
)

defineOptions({ inheritAttrs: false })

const value = defineModel<string>({ default: '' })
const id = useId()

const placeholderClass = computed(() =>
  props.samplePlaceholder
    ? 'placeholder:font-sans placeholder:text-body-md placeholder:font-normal placeholder:text-ink/50'
    : 'placeholder:font-label placeholder:text-label placeholder:leading-5 placeholder:text-secondary/50',
)
</script>

<template>
  <FormField :label="label" :error="error" :hint="hint" :for-id="id" :required="required">
    <div
      class="flex items-center gap-2 rounded-xl border px-4 py-3 transition-colors focus-within:border-accent"
      :class="[
        surface ? 'bg-surface' : 'bg-white',
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
        class="min-w-0 flex-1 resize-none bg-transparent text-body-md font-normal text-ink outline-none"
        :class="placeholderClass"
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
        class="min-w-0 flex-1 bg-transparent text-body-md font-normal text-ink outline-none"
        :class="placeholderClass"
      />
      <slot name="suffix" />
    </div>
  </FormField>
</template>

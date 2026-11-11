<script setup lang="ts">
import { useId } from 'vue'

import flagSa from '@/assets/images/flag-sa.webp'

withDefaults(
  defineProps<{
    label?: string
    placeholder?: string
    error?: string
    dialCode?: string
    bordered?: boolean
    /** `md` 50px (forms), `sm` 48px (auth card). */
    size?: 'sm' | 'md'
  }>(),
  { dialCode: '+966', bordered: true, size: 'md' },
)

const phone = defineModel<string>({ default: '' })
const inputId = useId()

/** Keeps digits only so the value is always a clean local number. */
function onInput(event: Event): void {
  const target = event.target as HTMLInputElement
  phone.value = target.value.replace(/\D/g, '').slice(0, 9)
  target.value = phone.value
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" :for="inputId" class="text-label text-secondary">{{ label }}</label>
    <div
      class="flex items-center gap-4 rounded-xl border bg-white p-3 transition-colors focus-within:border-accent"
      :class="[
        size === 'sm' ? 'h-12' : 'h-[50px]',
        error ? 'border-error' : bordered ? 'border-line' : 'border-transparent',
      ]"
    >
      <span class="flex shrink-0 items-center gap-2">
        <span class="flex items-center gap-1">
          <img
            :src="flagSa"
            alt=""
            width="24"
            height="24"
            class="size-6 rounded-full object-cover"
          />
          <span dir="ltr" class="text-body-md text-muted">{{ dialCode }}</span>
        </span>
        <span class="h-[22px] w-px bg-line" aria-hidden="true" />
      </span>
      <input
        :id="inputId"
        :value="phone"
        type="tel"
        inputmode="numeric"
        autocomplete="tel-national"
        dir="ltr"
        :placeholder="placeholder"
        :aria-invalid="error ? true : undefined"
        class="min-w-0 flex-1 bg-transparent text-body-md text-ink outline-none placeholder:font-label placeholder:text-label placeholder:leading-5 placeholder:text-secondary rtl:text-right"
        @input="onInput"
      />
    </div>
    <p v-if="error" class="text-caption text-error" role="alert">{{ error }}</p>
  </div>
</template>

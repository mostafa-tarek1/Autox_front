<script setup lang="ts">
import { useId } from 'vue'

import tabbyLogo from '@/assets/images/billing/tabby-method.webp'
import tamaraLogo from '@/assets/images/billing/tamara-method.webp'
import type { InstallmentProvider } from '@/mocks/billing'

/** Installment provider choice on the create-voucher form (Figma 846:8867). */
defineProps<{ label: string; error?: string }>()
const provider = defineModel<InstallmentProvider | null>({ default: null })
const id = useId()

const providers: Array<{ value: InstallmentProvider; logo: string }> = [
  { value: 'tabby', logo: tabbyLogo },
  { value: 'tamara', logo: tamaraLogo },
]
</script>

<template>
  <fieldset class="flex flex-col gap-2" :aria-describedby="error ? `${id}-error` : undefined">
    <legend class="mb-2 text-body-sm text-ink">{{ label }}</legend>
    <div class="flex flex-wrap gap-4">
      <label
        v-for="option in providers"
        :key="option.value"
        class="flex h-[47px] cursor-pointer items-center gap-2 rounded-lg border bg-white px-3 py-2 transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent"
        :class="provider === option.value ? 'border-accent' : 'border-line hover:border-accent/60'"
      >
        <input
          v-model="provider"
          type="radio"
          class="sr-only"
          :name="id"
          :value="option.value"
          :aria-invalid="error ? true : undefined"
        />
        <span
          class="grid size-3 shrink-0 place-items-center rounded-full border-[0.5px] bg-surface"
          :class="provider === option.value ? 'border-accent' : 'border-line'"
          aria-hidden="true"
        >
          <span v-if="provider === option.value" class="size-2 rounded-full bg-accent" />
        </span>
        <span class="grid h-[29px] w-11 place-items-center rounded-lg bg-white">
          <img
            :src="option.logo"
            alt=""
            width="37"
            height="19"
            class="h-[19px] w-[37px] object-cover"
          />
        </span>
        <span class="text-button text-primary" dir="ltr">{{ option.value }}</span>
      </label>
    </div>
    <p v-if="error" :id="`${id}-error`" class="text-caption text-error" role="alert">
      {{ error }}
    </p>
  </fieldset>
</template>

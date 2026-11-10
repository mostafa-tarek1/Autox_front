<script setup lang="ts">
import { onKeyStroke, useScrollLock } from '@vueuse/core'
import { nextTick, useId, useTemplateRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import CancelIcon from '@/assets/icons/cancel-circle--stroke-rounded.svg'

/**
 * Form dialog from the account designs (582px, surface background, close at the top start).
 * Differs from the shared BaseModal in size, background and close-button side.
 */
withDefaults(defineProps<{ title: string; width?: string }>(), { width: 'max-w-[582px]' })

const open = defineModel<boolean>('open', { default: false })
const { t } = useI18n()
const titleId = useId()
const dialog = useTemplateRef<HTMLElement>('dialog')
const isLocked = useScrollLock(typeof document === 'undefined' ? null : document.body)

let previouslyFocused: HTMLElement | null = null

watch(
  open,
  async (value) => {
    isLocked.value = value
    if (value) {
      previouslyFocused = document.activeElement as HTMLElement | null
      await nextTick()
      dialog.value
        ?.querySelector<HTMLElement>('input, select, textarea, button:not([data-close])')
        ?.focus()
    } else {
      previouslyFocused?.focus()
    }
  },
  { immediate: true },
)

onKeyStroke('Escape', () => {
  if (open.value) {
    open.value = false
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-150"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 p-4 sm:items-center"
        @click.self="open = false"
      >
        <div
          ref="dialog"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          class="relative my-auto w-full rounded-3xl bg-surface px-5 py-14 sm:px-10"
          :class="width"
        >
          <button
            type="button"
            data-close
            class="absolute start-4 top-4 text-secondary transition-colors hover:text-ink"
            :aria-label="t('common.close')"
            @click="open = false"
          >
            <CancelIcon class="size-6" aria-hidden="true" />
          </button>
          <h2 :id="titleId" class="mb-6 text-h2 text-ink">{{ title }}</h2>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

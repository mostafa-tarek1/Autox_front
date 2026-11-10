<script setup lang="ts">
import { onKeyStroke, useScrollLock } from '@vueuse/core'
import { computed, nextTick, useId, useTemplateRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import CancelIcon from '@/assets/icons/cancel-circle--stroke-rounded.svg'

/**
 * Dialog used across the app: teleported, Esc / backdrop to close, scroll lock, focus moved in
 * on open and restored on close. Designs put the close button at the top-start corner.
 *
 * - Success dialogs: default (385px, white).
 * - Form dialogs: `tone="surface" panel-class="max-w-[582px] px-5 py-14 sm:px-10"`.
 */
const props = withDefaults(
  defineProps<{
    title?: string
    /** Id of a heading inside the slot, when the slot renders its own title. */
    labelledBy?: string
    tone?: 'white' | 'surface'
    panelClass?: string
    /** Extra width class, kept for short call sites (`width="max-w-[644px]"`). */
    width?: string
    titleClass?: string
    closeClass?: string
    dismissible?: boolean
  }>(),
  {
    tone: 'white',
    panelClass: 'max-w-[385px] p-6',
    titleClass: 'mb-4 text-h3',
    closeClass: 'top-4 start-4',
    dismissible: true,
  },
)

const open = defineModel<boolean>('open', { default: false })
const { t } = useI18n()
const titleId = useId()
const panel = useTemplateRef<HTMLElement>('panel')
const isLocked = useScrollLock(typeof document === 'undefined' ? null : document.body)
let previouslyFocused: HTMLElement | null = null

/** A radius in `panelClass` (e.g. rounded-2xl) replaces the default one. */
const radiusClass = computed(() => (/(^|\s)rounded-/.test(props.panelClass) ? '' : 'rounded-3xl'))

const ariaLabelledBy = computed(() => props.labelledBy ?? (props.title ? titleId : undefined))

function close(): void {
  if (props.dismissible) {
    open.value = false
  }
}

watch(
  open,
  async (isOpen) => {
    isLocked.value = isOpen
    if (isOpen) {
      previouslyFocused = document.activeElement as HTMLElement | null
      await nextTick()
      const firstField = panel.value?.querySelector<HTMLElement>(
        'input, select, textarea, button:not([data-modal-close])',
      )
      ;(firstField ?? panel.value)?.focus()
    } else {
      previouslyFocused?.focus()
    }
  },
  { immediate: true },
)

onKeyStroke('Escape', () => open.value && close())
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
        @click.self="close"
      >
        <div
          ref="panel"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
          :aria-labelledby="ariaLabelledBy"
          class="relative my-auto w-full shadow-card outline-none"
          :class="[radiusClass, panelClass, width, tone === 'surface' ? 'bg-surface' : 'bg-white']"
        >
          <button
            v-if="dismissible"
            type="button"
            data-modal-close
            class="absolute z-10 grid size-8 place-items-center text-secondary transition-colors hover:text-ink"
            :class="closeClass"
            :aria-label="t('common.close')"
            @click="open = false"
          >
            <CancelIcon class="size-6" aria-hidden="true" />
          </button>
          <h2 v-if="title" :id="titleId" class="text-ink" :class="titleClass">{{ title }}</h2>
          <slot :title-id="titleId" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

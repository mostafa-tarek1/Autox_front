<script setup lang="ts">
import { onKeyStroke, useScrollLock } from '@vueuse/core'
import { nextTick, useId, useTemplateRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import CancelIcon from '@/assets/icons/cancel-circle--stroke-rounded.svg'

/**
 * Checkout dialog. Same behaviour as the shared BaseModal (teleport, Esc, scroll lock) but the
 * panel colour, radius, padding and close-button corner follow the checkout designs.
 */
const props = withDefaults(
  defineProps<{
    title?: string
    labelledBy?: string
    panelClass?: string
    tone?: 'white' | 'surface'
    closeClass?: string
  }>(),
  {
    panelClass: 'max-w-[385px] rounded-2xl px-6 py-12',
    tone: 'white',
    closeClass: 'top-2 start-2',
  },
)

const open = defineModel<boolean>('open', { default: false })
const { t } = useI18n()
const titleId = useId()
const panel = useTemplateRef<HTMLElement>('panel')
const isLocked = useScrollLock(typeof document === 'undefined' ? null : document.body)
let previouslyFocused: HTMLElement | null = null

watch(
  open,
  async (value) => {
    isLocked.value = value
    if (value) {
      previouslyFocused = document.activeElement as HTMLElement | null
      await nextTick()
      panel.value?.focus()
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

const ariaLabelledBy = () => props.labelledBy ?? (props.title ? titleId : undefined)
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
        class="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-ink/40 p-4"
        @click.self="open = false"
      >
        <div
          ref="panel"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
          :aria-labelledby="ariaLabelledBy()"
          class="relative w-full outline-none"
          :class="[panelClass, tone === 'surface' ? 'bg-surface' : 'bg-white']"
        >
          <button
            type="button"
            class="absolute z-10 grid size-8 place-items-center text-ink hover:text-error"
            :class="closeClass"
            :aria-label="t('common.close')"
            @click="open = false"
          >
            <CancelIcon class="size-6" aria-hidden="true" />
          </button>
          <slot :title-id="titleId" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

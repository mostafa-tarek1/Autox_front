<script setup lang="ts">
import { onKeyStroke, useScrollLock } from '@vueuse/core'
import { computed, nextTick, useId, useTemplateRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import ArrowIcon from '@/assets/icons/arrow-right-02--stroke-rounded.svg'

/**
 * Side panel of the supplier dashboard ("Order details", "Offer details", "البدائل"...):
 * full height, slides in from the inline end, back button + title in a bordered header.
 *
 * Slots: default (body), `header-end` (e.g. a status chip opposite the title), `subheader` (extra
 * lines inside the header block), `footer` (sticky actions).
 */
const props = withDefaults(
  defineProps<{
    title: string
    width?: number
    /** Runs instead of closing when the back arrow is pressed (e.g. to leave a nested step). */
    onBack?: () => void
  }>(),
  { width: 472, onBack: undefined },
)

function goBack(): void {
  if (props.onBack) {
    props.onBack()
  } else {
    open.value = false
  }
}
const open = defineModel<boolean>('open', { default: false })
const { t } = useI18n()
const titleId = useId()
const panel = useTemplateRef<HTMLElement>('panel')
const isLocked = useScrollLock(typeof document === 'undefined' ? null : document.body)
let previouslyFocused: HTMLElement | null = null

const panelStyle = computed(() => ({ width: `min(${props.width}px, 100vw)` }))

watch(
  open,
  async (isOpen) => {
    isLocked.value = isOpen
    if (isOpen) {
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
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-150"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50 bg-ink/40"
        aria-hidden="true"
        @click="open = false"
      />
    </Transition>
    <Transition
      enter-active-class="transition-transform duration-200 ease-out"
      enter-from-class="ltr:translate-x-full rtl:-translate-x-full"
      leave-active-class="transition-transform duration-150 ease-in"
      leave-to-class="ltr:translate-x-full rtl:-translate-x-full"
    >
      <div
        v-if="open"
        ref="panel"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        tabindex="-1"
        class="fixed inset-y-0 end-0 z-50 flex flex-col overflow-y-auto bg-white outline-none"
        :style="panelStyle"
      >
        <header class="flex flex-col items-start gap-4 border-b border-line p-6">
          <div class="flex w-full items-center gap-2">
            <button
              type="button"
              class="grid size-[34px] shrink-0 place-items-center rounded-xl border border-line p-2 text-primary transition-colors hover:border-accent"
              :aria-label="t('common.close')"
              @click="goBack"
            >
              <ArrowIcon class="size-4 ltr:-scale-x-100" aria-hidden="true" />
            </button>
            <h2 :id="titleId" class="flex-1 text-h3 text-ink">{{ title }}</h2>
            <slot name="header-end" />
          </div>
          <slot name="subheader" />
        </header>
        <div class="flex-1">
          <slot />
        </div>
        <footer v-if="$slots.footer" class="sticky bottom-0 border-t border-line bg-white p-6">
          <slot name="footer" />
        </footer>
      </div>
    </Transition>
  </Teleport>
</template>

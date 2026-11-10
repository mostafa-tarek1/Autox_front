<script setup lang="ts">
import { onKeyStroke, useScrollLock } from '@vueuse/core'
import { useId, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import CancelIcon from '@/assets/icons/cancel-circle--stroke-rounded.svg'

withDefaults(defineProps<{ title?: string; width?: string; dismissible?: boolean }>(), {
  width: 'max-w-[385px]',
  dismissible: true,
})

const open = defineModel<boolean>('open', { default: false })
const { t } = useI18n()
const titleId = useId()
const isLocked = useScrollLock(typeof document === 'undefined' ? null : document.body)

watch(open, (value) => (isLocked.value = value), { immediate: true })
onKeyStroke('Escape', () => (open.value = false))
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
        class="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4"
        @click.self="dismissible && (open = false)"
      >
        <div
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? titleId : undefined"
          class="relative w-full rounded-3xl bg-white p-6 shadow-card"
          :class="width"
        >
          <button
            v-if="dismissible"
            type="button"
            class="absolute end-4 top-4 text-secondary hover:text-ink"
            :aria-label="t('common.close')"
            @click="open = false"
          >
            <CancelIcon class="size-6" aria-hidden="true" />
          </button>
          <h2 v-if="title" :id="titleId" class="mb-4 text-h3 text-ink">{{ title }}</h2>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

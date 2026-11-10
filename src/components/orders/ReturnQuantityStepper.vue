<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AddIcon from '@/assets/icons/add-01--solid-standard.svg'
import MinusIcon from '@/assets/icons/minus-sign--solid-standard.svg'

/** Compact 33px stepper used on the return form ("product card" set 386:11874). */
const props = withDefaults(
  defineProps<{ min?: number; max: number; label: string; disabled?: boolean }>(),
  {
    min: 1,
    disabled: false,
  },
)
const quantity = defineModel<number>({ default: 1 })
const { t } = useI18n()

function step(delta: number): void {
  quantity.value = Math.min(props.max, Math.max(props.min, quantity.value + delta))
}
</script>

<template>
  <div
    dir="ltr"
    role="group"
    :aria-label="label"
    class="inline-flex h-[33px] w-[82px] items-center justify-between rounded-lg border-[0.5px] border-line bg-surface p-1 text-secondary"
    :class="disabled && 'opacity-50'"
  >
    <button
      type="button"
      class="grid size-4 place-items-center disabled:opacity-40"
      :disabled="disabled || quantity <= min"
      :aria-label="t('common.decrease')"
      @click="step(-1)"
    >
      <MinusIcon class="size-4" aria-hidden="true" />
    </button>
    <output class="text-body-sm text-ink tabular-nums" aria-live="polite">{{ quantity }}</output>
    <button
      type="button"
      class="grid size-4 place-items-center disabled:opacity-40"
      :disabled="disabled || quantity >= max"
      :aria-label="t('common.increase')"
      @click="step(1)"
    >
      <AddIcon class="size-4" aria-hidden="true" />
    </button>
  </div>
</template>

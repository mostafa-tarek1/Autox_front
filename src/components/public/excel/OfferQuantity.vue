<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AddIcon from '@/assets/icons/add-01--solid-standard.svg'
import MinusIcon from '@/assets/icons/minus-sign--solid-standard.svg'

const props = withDefaults(defineProps<{ min?: number; max?: number; label: string }>(), {
  min: 1,
  max: 999,
})
const quantity = defineModel<number>({ default: 1 })
const { t } = useI18n()

function step(delta: number): void {
  quantity.value = Math.min(props.max, Math.max(props.min, quantity.value + delta))
}
</script>

<template>
  <!-- Compact stepper of the Excel results table (Figma "quantity" in Frame 699). -->
  <div
    dir="ltr"
    role="group"
    :aria-label="label"
    class="flex h-[34px] min-w-0 flex-1 items-center justify-between rounded-lg border border-line bg-surface px-2 py-1"
  >
    <button
      type="button"
      class="grid size-4 place-items-center text-ink disabled:opacity-40"
      :disabled="quantity <= min"
      :aria-label="t('common.decrease')"
      @click="step(-1)"
    >
      <MinusIcon class="size-4" aria-hidden="true" />
    </button>
    <output class="text-body-sm text-ink tabular-nums" aria-live="polite">{{ quantity }}</output>
    <button
      type="button"
      class="grid size-4 place-items-center text-ink disabled:opacity-40"
      :disabled="quantity >= max"
      :aria-label="t('common.increase')"
      @click="step(1)"
    >
      <AddIcon class="size-4" aria-hidden="true" />
    </button>
  </div>
</template>

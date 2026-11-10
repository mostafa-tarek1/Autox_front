<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AddIcon from '@/assets/icons/add-01--solid-standard.svg'
import MinusIcon from '@/assets/icons/minus-sign--solid-standard.svg'

const props = withDefaults(defineProps<{ min?: number; max?: number; label?: string }>(), {
  min: 0,
  max: 999,
})

const quantity = defineModel<number>({ default: 0 })
const { t } = useI18n()

const isActive = computed(() => quantity.value > props.min)

function step(delta: number): void {
  quantity.value = Math.min(props.max, Math.max(props.min, quantity.value + delta))
}
</script>

<template>
  <!-- Always minus-left / plus-right, as in the design, whatever the page direction. -->
  <div
    dir="ltr"
    role="group"
    :aria-label="label ?? t('common.quantity')"
    class="inline-flex h-[42px] items-center gap-4 rounded-xl border border-accent p-2 transition-colors"
    :class="isActive ? 'bg-accent' : 'bg-surface'"
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
    <output class="min-w-2.5 text-center text-body-md tabular-nums" aria-live="polite">{{
      quantity
    }}</output>
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

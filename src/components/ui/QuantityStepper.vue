<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AddIcon from '@/assets/icons/add-01--solid-standard.svg'
import MinusIcon from '@/assets/icons/minus-sign--solid-standard.svg'

type StepperVariant = 'highlight' | 'surface'
type StepperSize = 'md' | 'sm' | 'fluid'

/**
 * Quantity control from the Figma "quantity" component.
 * - `highlight` (catalog cards): turns lime once a quantity is picked.
 * - `surface` (cart, returns, Excel table): stays on the surface colour.
 * Always minus-left / plus-right (dir="ltr"), as in the design, whatever the page direction.
 * Sizes: `md` 42px card control, `sm` 33px compact (cart popover, returns), `fluid` fills a table cell.
 */
const props = withDefaults(
  defineProps<{
    min?: number
    max?: number
    label?: string
    disabled?: boolean
    variant?: StepperVariant
    size?: StepperSize
  }>(),
  { min: 0, max: 999, disabled: false, variant: 'highlight', size: 'md' },
)

const quantity = defineModel<number>({ default: 0 })
const { t } = useI18n()

const sizeClasses: Record<StepperVariant, Record<StepperSize, string>> = {
  highlight: {
    md: 'h-[42px] gap-4 rounded-xl border border-accent p-2',
    sm: 'h-[33px] w-[82px] gap-4 rounded-lg border border-accent p-1',
    fluid: 'h-[34px] min-w-0 flex-1 rounded-lg border border-accent px-2 py-1',
  },
  surface: {
    md: 'h-[42px] w-[108px] gap-6 rounded-lg border border-accent p-2',
    sm: 'h-[33px] w-[82px] gap-4 rounded-lg border-[0.5px] border-line p-1',
    fluid: 'h-[34px] min-w-0 flex-1 rounded-lg border border-line px-2 py-1',
  },
}

const background = computed(() =>
  props.variant === 'highlight' && quantity.value > props.min ? 'bg-accent' : 'bg-surface',
)

function step(delta: number): void {
  quantity.value = Math.min(props.max, Math.max(props.min, quantity.value + delta))
}
</script>

<template>
  <div
    dir="ltr"
    role="group"
    :aria-label="label ?? t('common.quantity')"
    class="inline-flex shrink-0 items-center transition-colors"
    :class="[
      sizeClasses[variant][size],
      size === 'fluid' ? 'justify-between' : 'justify-center',
      background,
      disabled && 'opacity-50',
    ]"
  >
    <button
      type="button"
      class="grid size-4 place-items-center text-secondary disabled:cursor-not-allowed"
      :disabled="disabled || quantity <= min"
      :aria-label="t('common.decrease')"
      @click="step(-1)"
    >
      <MinusIcon class="size-4" aria-hidden="true" />
    </button>
    <output
      class="min-w-2.5 text-center text-ink tabular-nums"
      :class="size === 'md' ? 'text-body-md' : 'text-body-sm'"
      aria-live="polite"
    >
      {{ quantity }}
    </output>
    <button
      type="button"
      class="grid size-4 place-items-center text-secondary disabled:cursor-not-allowed"
      :disabled="disabled || quantity >= max"
      :aria-label="t('common.increase')"
      @click="step(1)"
    >
      <AddIcon class="size-4" aria-hidden="true" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AddIcon from '@/assets/icons/add-01--solid-standard.svg'
import MinusIcon from '@/assets/icons/minus-sign--solid-standard.svg'

/**
 * Cart flavour of the quantity control: stays on the surface colour whatever the value
 * (the catalog QuantityStepper turns lime once a quantity is picked).
 * `md` = cart/availability cards, `sm` = cart popover.
 */
const props = withDefaults(
  defineProps<{ size?: 'sm' | 'md'; min?: number; max?: number; label?: string }>(),
  {
    size: 'md',
    min: 1,
    max: 999,
  },
)

const quantity = defineModel<number>({ required: true })
const { t } = useI18n()

function step(delta: number): void {
  quantity.value = Math.min(props.max, Math.max(props.min, quantity.value + delta))
}
</script>

<template>
  <div
    dir="ltr"
    role="group"
    :aria-label="label ?? t('common.quantity')"
    class="inline-flex shrink-0 items-center justify-center rounded-lg bg-surface"
    :class="
      size === 'md'
        ? 'h-[42px] w-[108px] gap-6 border border-accent p-2'
        : 'h-[33px] w-[82px] gap-4 border-[0.5px] border-line p-1'
    "
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
    <output
      class="min-w-2.5 text-center text-ink tabular-nums"
      :class="size === 'md' ? 'text-body-md' : 'text-body-sm'"
      aria-live="polite"
    >
      {{ quantity }}
    </output>
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

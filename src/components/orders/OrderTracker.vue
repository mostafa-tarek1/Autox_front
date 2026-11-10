<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import TickIcon from '@/assets/icons/tick-02--solid-standard.svg'

/** Number of completed steps (0–3) out of paid → shipping → delivered. */
const props = defineProps<{ completed: number }>()
const { t } = useI18n()

const steps = computed(() =>
  (['paid', 'shipping', 'delivered'] as const).map((key, index) => ({
    key,
    done: index < props.completed,
  })),
)
</script>

<template>
  <ol
    class="relative mx-auto flex w-full max-w-[602px] items-start justify-between"
    :aria-label="t('orders.tracker.label')"
  >
    <span
      class="absolute inset-x-[67px] top-3 h-px bg-[repeating-linear-gradient(to_right,var(--color-line)_0_4px,transparent_4px_8px)]"
      aria-hidden="true"
    />
    <li
      v-for="step in steps"
      :key="step.key"
      class="relative flex w-[110px] flex-col items-center gap-2 text-center"
    >
      <span
        class="relative z-10 grid size-6 place-items-center rounded-full"
        :class="step.done ? 'bg-accent text-primary' : 'border border-line bg-white'"
      >
        <TickIcon v-if="step.done" class="size-4" aria-hidden="true" />
      </span>
      <span class="text-body-md" :class="step.done ? 'text-success' : 'text-secondary'">
        {{ t(`orders.tracker.${step.key}`) }}
        <span class="sr-only"
          >({{ t(step.done ? 'orders.tracker.done' : 'orders.tracker.pending') }})</span
        >
      </span>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from 'vue-router'

type Tone = 'soft' | 'outline' | 'accent' | 'danger'

withDefaults(
  defineProps<{ tone?: Tone; to?: RouteLocationRaw; iconOnly?: boolean; label?: string }>(),
  {
    tone: 'soft',
    iconOnly: false,
  },
)
defineEmits<{ click: [event: MouseEvent] }>()

/** 38px order actions from the orders screens (34px square when icon-only). */
const toneClasses: Record<Tone, string> = {
  soft: 'border-line bg-surface text-primary hover:border-accent',
  outline: 'border-accent bg-surface text-primary hover:bg-accent/20',
  accent: 'border-accent bg-accent text-primary hover:brightness-95',
  danger: 'border-line bg-surface text-error hover:border-error',
}
</script>

<template>
  <component
    :is="to ? RouterLink : 'button'"
    :to="to"
    :type="to ? undefined : 'button'"
    :aria-label="iconOnly ? label : undefined"
    :title="iconOnly ? label : undefined"
    class="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border text-button whitespace-nowrap transition"
    :class="[toneClasses[tone], iconOnly ? 'size-[34px] p-2' : 'h-[38px] px-6 py-2']"
    @click="$emit('click', $event)"
  >
    <slot />
  </component>
</template>

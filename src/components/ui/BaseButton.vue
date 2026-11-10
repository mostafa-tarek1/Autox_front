<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

type ButtonVariant = 'accent' | 'primary' | 'outline' | 'soft'
type ButtonSize = 'sm' | 'md'

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant
    size?: ButtonSize
    type?: 'button' | 'submit' | 'reset'
    to?: RouteLocationRaw
    disabled?: boolean
    loading?: boolean
    block?: boolean
  }>(),
  { variant: 'accent', size: 'md', type: 'button', block: false },
)

/** Variants match the Figma "button" component set. */
const variantClasses: Record<ButtonVariant, string> = {
  accent: 'bg-accent text-primary hover:brightness-95',
  primary: 'bg-primary text-white hover:bg-primary-deep',
  outline: 'bg-surface text-primary border border-accent hover:bg-accent/20',
  soft: 'bg-surface text-primary border border-line hover:border-accent',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 py-2',
  md: 'h-[46px] px-6 py-2',
}

const isInactive = computed(() => props.disabled || props.loading)

const classes = computed(() => [
  'inline-flex items-center justify-center gap-2 rounded-xl text-button whitespace-nowrap transition',
  'disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
  variantClasses[props.variant],
  sizeClasses[props.size],
  props.block && 'w-full',
])
</script>

<template>
  <RouterLink v-if="to" :to="to" :class="classes" :aria-disabled="isInactive || undefined">
    <slot name="icon" />
    <slot />
  </RouterLink>
  <button
    v-else
    :type="type"
    :class="classes"
    :disabled="isInactive"
    :aria-busy="loading || undefined"
  >
    <span
      v-if="loading"
      class="size-4 animate-spin rounded-full border-2 border-current border-e-transparent"
      aria-hidden="true"
    />
    <slot v-else name="icon" />
    <slot />
  </button>
</template>

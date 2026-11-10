<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from 'vue-router'

defineProps<{ to?: RouteLocationRaw; active?: boolean }>()
defineEmits<{ select: [] }>()

const classes =
  'flex h-10 w-full items-center justify-start gap-2 rounded-lg p-2 text-body-md transition-colors hover:bg-surface hover:text-primary'
</script>

<template>
  <RouterLink
    v-if="to"
    :to="to"
    role="menuitem"
    :class="[classes, active ? 'bg-surface text-primary' : 'text-secondary']"
  >
    <slot name="icon" />
    <slot />
  </RouterLink>
  <button
    v-else
    type="button"
    role="menuitem"
    :class="[classes, active ? 'bg-surface text-primary' : 'text-secondary']"
    @click="$emit('select')"
  >
    <slot name="icon" />
    <slot />
  </button>
</template>

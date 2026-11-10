<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from 'vue-router'

defineProps<{ label: string; count?: number; to?: RouteLocationRaw }>()
</script>

<template>
  <component
    :is="to ? RouterLink : 'button'"
    :to="to"
    :type="to ? undefined : 'button'"
    :aria-label="count ? `${label} (${count})` : label"
    class="relative grid size-10 place-items-center rounded-full border-[0.5px] border-line bg-surface p-2 text-primary transition-colors hover:border-accent"
  >
    <slot />
    <span
      v-if="count"
      class="absolute top-0 right-0 grid size-[18px] place-items-center rounded-full bg-error text-button text-white"
      aria-hidden="true"
    >
      {{ count > 9 ? '9+' : count }}
    </span>
  </component>
</template>

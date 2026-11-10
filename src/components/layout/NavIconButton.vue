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
    class="relative grid size-10 place-items-center rounded-full border-[0.5px] border-line bg-surface p-2 text-ink transition-colors hover:border-accent"
  >
    <slot />
    <span
      v-if="count"
      class="absolute -top-0 end-0 grid size-[18px] translate-x-0 place-items-center rounded-full bg-error text-[11px] leading-none font-bold text-white ltr:translate-x-1/3 rtl:-translate-x-1/3"
      aria-hidden="true"
    >
      {{ count > 9 ? '9+' : count }}
    </span>
  </component>
</template>

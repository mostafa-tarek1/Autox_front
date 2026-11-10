<script setup lang="ts">
import type { Component } from 'vue'

/** White content card with an icon + H2 heading and an optional action on the opposite side. */
defineProps<{ title: string; icon?: Component; headingId?: string }>()
</script>

<template>
  <section
    class="flex flex-col gap-6 rounded-2xl bg-white p-4 shadow-card sm:p-6"
    :aria-labelledby="headingId"
  >
    <header class="flex items-center justify-between gap-4">
      <h2 :id="headingId" class="flex items-center gap-2 text-h2 text-ink">
        <component
          :is="icon"
          v-if="icon"
          class="size-6 shrink-0 text-secondary"
          aria-hidden="true"
        />
        {{ title }}
      </h2>
      <slot name="action" />
    </header>
    <slot />
  </section>
</template>

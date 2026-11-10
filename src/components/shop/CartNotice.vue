<script setup lang="ts">
/** White strip inside a cart card: message at the start, actions at the end. */
</script>

<template>
  <div
    class="flex flex-col gap-3 rounded-xl bg-white p-2 sm:flex-row sm:items-center sm:justify-between"
  >
    <p class="flex items-center gap-2 text-body-sm text-black">
      <slot name="icon" />
      <slot />
    </p>
    <div v-if="$slots.actions" class="flex flex-wrap items-center gap-4">
      <slot name="actions" />
    </div>
  </div>
</template>

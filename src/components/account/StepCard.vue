<script setup lang="ts">
/** Numbered form section used by the withdrawal request (lime step badge + heading). */
defineProps<{ step: number; title: string; headingId?: string }>()
</script>

<template>
  <div class="flex flex-col gap-[31px]">
    <h2 :id="headingId" class="flex items-center gap-2 text-h3 text-ink">
      <span
        class="grid size-9 shrink-0 place-items-center rounded-full bg-accent p-2 text-[13px] leading-5 font-bold text-primary"
        aria-hidden="true"
      >
        {{ step }}
      </span>
      {{ title }}
    </h2>
    <slot />
  </div>
</template>

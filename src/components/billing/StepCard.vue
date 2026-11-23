<script setup lang="ts">
/** Numbered white card used by the create-voucher form (Figma "Frame 624"). */
defineProps<{ step: number; title: string; titleId: string }>()
</script>

<template>
  <section
    class="flex flex-col gap-[31px] rounded-3xl bg-white p-5 shadow-card sm:p-8"
    :aria-labelledby="titleId"
  >
    <header class="flex items-center gap-2">
      <span
        class="grid size-9 place-items-center rounded-full bg-accent p-2 text-[13px] leading-5 font-bold text-primary"
      >
        {{ step }}
      </span>
      <h2 :id="titleId" class="text-h2 text-ink">{{ title }}</h2>
    </header>
    <!-- 20px between fields: the design stacks 76px input frames whose content is 80px tall. -->
    <div class="flex flex-col gap-5 sm:pe-4">
      <slot />
    </div>
  </section>
</template>

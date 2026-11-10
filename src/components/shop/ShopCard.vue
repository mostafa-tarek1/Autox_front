<script setup lang="ts">
import { useId } from 'vue'

/** White card with a titled header row, used by every checkout section. */
withDefaults(defineProps<{ title?: string; bodyClass?: string; as?: string }>(), {
  bodyClass: 'p-6',
  as: 'section',
})

const titleId = useId()
</script>

<template>
  <component :is="as" class="rounded-2xl bg-white" :aria-labelledby="title ? titleId : undefined">
    <header
      v-if="title || $slots.header"
      class="flex min-h-[68px] flex-wrap items-center justify-between gap-2 border-b border-line px-6 py-5"
    >
      <h2 v-if="title" :id="titleId" class="text-h3 text-black">{{ title }}</h2>
      <slot name="header" />
    </header>
    <div :class="bodyClass">
      <slot />
    </div>
  </component>
</template>

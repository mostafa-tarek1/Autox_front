<script setup lang="ts">
withDefaults(defineProps<{ title: string; subtitle?: string; inverted?: boolean; id?: string }>(), {
  inverted: false,
})
</script>

<template>
  <header class="flex flex-col items-center gap-3 text-center">
    <h2
      :id="id"
      class="text-[26px] leading-9 font-bold sm:text-h1"
      :class="inverted ? 'text-white' : 'text-ink'"
    >
      {{ title }}
    </h2>
    <p v-if="subtitle" class="text-body-lg" :class="inverted ? 'text-white/80' : 'text-secondary'">
      {{ subtitle }}
    </p>
  </header>
</template>

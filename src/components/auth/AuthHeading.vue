<script setup lang="ts">
defineProps<{ title: string; subtitle?: string; titleId?: string }>()
</script>

<template>
  <div class="flex flex-col items-center gap-3 text-center">
    <h1 :id="titleId" class="text-h2 text-white">{{ title }}</h1>
    <p v-if="subtitle" class="text-body-md text-white">{{ subtitle }}</p>
  </div>
</template>

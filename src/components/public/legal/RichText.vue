<script setup lang="ts">
import { computed } from 'vue'

/**
 * Legal copy with `**bold**` runs (e.g. the definition labels in the terms). Built from text
 * segments, never v-html, so the content cannot inject markup.
 */
const props = defineProps<{ text: string }>()

const segments = computed(() =>
  props.text.split(/\*\*(.+?)\*\*/).map((value, index) => ({ value, bold: index % 2 === 1 })),
)
</script>

<template>
  <template v-for="(segment, index) in segments" :key="index">
    <strong v-if="segment.bold" class="font-bold">{{ segment.value }}</strong>
    <template v-else>{{ segment.value }}</template>
  </template>
</template>

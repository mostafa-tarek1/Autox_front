<script setup lang="ts">
/**
 * "Default" pill on address and bank-account cards (Figma 678:18498 / 678:18520): a radio dot
 * and a label. Selected = lime border and filled dot; otherwise it offers "set as default".
 */
defineProps<{ selected: boolean; selectedLabel: string; selectLabel: string }>()
const emit = defineEmits<{ select: [] }>()
</script>

<template>
  <button
    type="button"
    :aria-pressed="selected"
    class="inline-flex h-[34px] items-center gap-2 rounded-lg border bg-white px-2 py-1 text-body-sm text-primary transition-colors"
    :class="selected ? 'cursor-default border-accent' : 'border-line hover:border-accent'"
    @click="!selected && emit('select')"
  >
    <span
      class="grid size-3 shrink-0 place-items-center rounded-full border-[0.5px] bg-surface"
      :class="selected ? 'border-accent' : 'border-line'"
      aria-hidden="true"
    >
      <span v-if="selected" class="size-2 rounded-full bg-accent" />
    </span>
    {{ selected ? selectedLabel : selectLabel }}
  </button>
</template>

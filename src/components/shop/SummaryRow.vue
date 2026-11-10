<script setup lang="ts">
import PriceTag from '@/components/ui/PriceTag.vue'

withDefaults(defineProps<{ label: string; amount?: number; text?: string; emphasis?: boolean }>(), {
  emphasis: false,
})
</script>

<template>
  <div
    class="flex items-center justify-between gap-4"
    :class="emphasis ? 'rounded-lg bg-surface p-2' : 'min-h-7'"
  >
    <dt class="text-body-md text-secondary">{{ label }}</dt>
    <dd class="text-body-md text-secondary">
      <PriceTag
        v-if="amount !== undefined"
        :amount="amount"
        :size="emphasis ? 'lg' : 'md'"
        tone="primary"
      />
      <template v-else>{{ text }}</template>
    </dd>
  </div>
</template>

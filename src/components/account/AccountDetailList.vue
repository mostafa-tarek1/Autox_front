<script setup lang="ts">
export interface DetailItem {
  label: string
  value: string
  /** Render the value left-to-right (phone numbers, emails, ids). */
  ltr?: boolean
}

defineProps<{ items: DetailItem[] }>()
</script>

<template>
  <dl class="flex flex-col">
    <div
      v-for="item in items"
      :key="item.label"
      class="flex flex-col gap-1 border-t border-line pt-[11px] pb-3 first:border-t-0 first:pt-0 last:pb-0"
    >
      <dt class="text-body-sm text-secondary">{{ item.label }}</dt>
      <dd
        class="text-body-lg break-words text-ink"
        :dir="item.ltr ? 'ltr' : undefined"
        :class="item.ltr && 'rtl:text-right'"
      >
        {{ item.value }}
      </dd>
    </div>
    <slot />
  </dl>
</template>

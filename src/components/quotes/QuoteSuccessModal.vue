<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

import TickIcon from '@/assets/icons/tick-02--solid-standard.svg'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'

/** Success dialog of the quote flows (Figma 686:8434): tick, message, one action. */
defineProps<{ message: string; actionLabel: string; to: RouteLocationRaw }>()
const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <BaseModal
    v-model:open="open"
    tone="surface"
    panel-class="max-w-[385px] rounded-2xl px-6 py-12"
    close-class="top-2 start-2"
  >
    <div class="flex flex-col items-center gap-6">
      <div class="flex flex-col items-center gap-4">
        <span class="grid size-10 place-items-center rounded-full bg-accent text-primary">
          <TickIcon class="size-8" aria-hidden="true" />
        </span>
        <p class="text-center text-h4 text-secondary" role="status">{{ message }}</p>
      </div>
      <BaseButton block :to="to">{{ actionLabel }}</BaseButton>
    </div>
  </BaseModal>
</template>

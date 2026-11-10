<script setup lang="ts">
import BaseModal from '@/components/ui/BaseModal.vue'
import { useId } from 'vue'

import TickIcon from '@/assets/icons/tick-02--solid-standard.svg'
import BaseButton from '@/components/ui/BaseButton.vue'

import type { RouteLocationRaw } from 'vue-router'

/** Small success dialog: lime tick, message and one action ("تم ارسال الطلب ..."). */
defineProps<{ message: string; actionLabel: string; actionTo?: RouteLocationRaw }>()
const emit = defineEmits<{ action: [] }>()
const open = defineModel<boolean>('open', { default: false })
const messageId = useId()
</script>

<template>
  <BaseModal
    panel-class="max-w-[385px] rounded-2xl px-6 py-12"
    v-model:open="open"
    tone="surface"
    :labelled-by="messageId"
    close-class="top-2 start-2"
  >
    <div class="flex flex-col items-center gap-6">
      <div class="flex flex-col items-center gap-4">
        <span class="grid size-10 place-items-center rounded-full bg-accent text-primary">
          <TickIcon class="size-8" aria-hidden="true" />
        </span>
        <p :id="messageId" class="text-center text-h4 text-secondary">{{ message }}</p>
      </div>
      <BaseButton block :to="actionTo" @click="emit('action')">{{ actionLabel }}</BaseButton>
    </div>
  </BaseModal>
</template>

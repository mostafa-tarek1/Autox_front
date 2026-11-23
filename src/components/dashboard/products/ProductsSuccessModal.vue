<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/core'
import { watch } from 'vue'

import TickIcon from '@/assets/icons/tick-02--solid-standard.svg'
import BaseModal from '@/components/ui/BaseModal.vue'

/** "تم الاضافة بنجاح" (976:9918): 320px surface card, closes itself after a moment. */
const props = withDefaults(defineProps<{ message: string; duration?: number }>(), {
  duration: 1600,
})
const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ closed: [] }>()

const { start, stop } = useTimeoutFn(
  () => (open.value = false),
  () => props.duration,
  { immediate: false },
)

watch(open, (isOpen, wasOpen) => {
  if (isOpen) {
    start()
  } else {
    stop()
    if (wasOpen) {
      emit('closed')
    }
  }
})
</script>

<template>
  <BaseModal
    v-model:open="open"
    tone="surface"
    panel-class="max-w-[320px] rounded-2xl px-6 py-12"
    :dismissible="true"
    close-class="hidden"
  >
    <div class="flex flex-col items-center gap-2 text-center" role="status">
      <span class="grid size-10 place-items-center rounded-full bg-accent text-primary">
        <TickIcon class="size-8" aria-hidden="true" />
      </span>
      <p class="text-h4 text-secondary">{{ message }}</p>
    </div>
  </BaseModal>
</template>

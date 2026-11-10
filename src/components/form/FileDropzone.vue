<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import { useI18n } from 'vue-i18n'

import FileUploadIcon from '@/assets/icons/file-upload--twotone-rounded.svg'

import FormField from './FormField.vue'

const props = withDefaults(
  defineProps<{
    label?: string
    /** Text inside the drop area; defaults to "ارفاق". */
    title?: string
    accept?: string
    hint?: string
    error?: string
    maxSizeMb?: number
    required?: boolean
  }>(),
  { accept: '.png,.jpg,.jpeg,.pdf', maxSizeMb: 5 },
)

const file = defineModel<File | null>({ default: null })
const { t } = useI18n()
const id = useId()
const isDragging = ref(false)
const sizeError = ref('')

const shownError = computed(() => props.error || sizeError.value)

function pick(files: FileList | null | undefined): void {
  const picked = files?.[0]
  if (!picked) {
    return
  }
  if (picked.size > props.maxSizeMb * 1024 * 1024) {
    sizeError.value = t('form.fileTooLarge', { size: props.maxSizeMb })
    return
  }
  sizeError.value = ''
  file.value = picked
}

function onDrop(event: DragEvent): void {
  isDragging.value = false
  pick(event.dataTransfer?.files)
}
</script>

<template>
  <FormField :label="label" :error="shownError" :for-id="id" :required="required">
    <label
      :for="id"
      class="flex min-h-[126px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border bg-white px-4 py-5 text-center transition-colors hover:border-accent"
      :class="[
        shownError ? 'border-error' : isDragging ? 'border-accent bg-accent/5' : 'border-line',
      ]"
      @dragover.prevent="isDragging = true"
      @dragleave="isDragging = false"
      @drop.prevent="onDrop"
    >
      <FileUploadIcon class="size-8 text-ink" aria-hidden="true" />
      <span class="text-label text-ink">{{ file ? file.name : (title ?? t('form.attach')) }}</span>
      <span class="text-caption text-secondary">{{ hint ?? t('form.allowedFiles') }}</span>
      <input
        :id="id"
        type="file"
        class="sr-only"
        :accept="accept"
        :required="required"
        @change="pick(($event.target as HTMLInputElement).files)"
      />
    </label>
  </FormField>
</template>

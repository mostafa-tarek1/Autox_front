<script setup lang="ts">
import { computed, useId } from 'vue'
import { useI18n } from 'vue-i18n'

import CheckIcon from '@/assets/icons/checkmark-circle-01--stroke-rounded.svg'
import FileUploadIcon from '@/assets/icons/file-upload--twotone-rounded.svg'

const props = withDefaults(
  defineProps<{ label: string; accept?: string; maxSizeMb?: number; invalid?: boolean }>(),
  {
    accept: '.png,.jpg,.jpeg,.pdf',
    maxSizeMb: 5,
  },
)

const emit = defineEmits<{ rejected: [reason: 'size' | 'type'] }>()
const file = defineModel<File | null>({ default: null })
const { t } = useI18n()
const id = useId()

const allowedExtensions = computed(() =>
  props.accept.split(',').map((extension) => extension.trim().toLowerCase()),
)

function pick(event: Event): void {
  const input = event.target as HTMLInputElement
  const picked = input.files?.[0]
  input.value = ''
  if (!picked) {
    return
  }
  const extension = `.${picked.name.split('.').pop()?.toLowerCase() ?? ''}`
  if (!allowedExtensions.value.includes(extension)) {
    emit('rejected', 'type')
    return
  }
  if (picked.size > props.maxSizeMb * 1024 * 1024) {
    emit('rejected', 'size')
    return
  }
  file.value = picked
}
</script>

<template>
  <label
    :for="id"
    class="flex min-h-[102px] min-w-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border bg-white px-4 py-5 text-center transition-colors hover:border-accent focus-within:border-accent"
    :class="invalid ? 'border-error' : file ? 'border-accent' : 'border-line'"
  >
    <CheckIcon v-if="file" class="size-8 text-success" aria-hidden="true" />
    <FileUploadIcon v-else class="size-8 text-primary" aria-hidden="true" />
    <span class="w-full truncate font-label text-label leading-5 text-secondary">{{
      file ? file.name : label
    }}</span>
    <span class="sr-only">{{
      file ? t('auth.register.documents.replace', { name: label }) : ''
    }}</span>
    <input
      :id="id"
      type="file"
      class="sr-only"
      :accept="accept"
      :aria-label="label"
      :aria-invalid="invalid || undefined"
      @change="pick"
    />
  </label>
</template>

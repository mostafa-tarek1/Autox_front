<script setup lang="ts">
import { ref, useId, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import CancelIcon from '@/assets/icons/cancel-01--stroke-rounded.svg'
import FileUploadIcon from '@/assets/icons/file-upload--stroke-rounded.svg'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'

/** "رفع ملف EXCEL" (863:13225): one Excel/CSV file, then "اضافة" opens the review screen. */
const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ upload: [file: File] }>()
const { t } = useI18n()
const inputId = useId()
const file = ref<File | null>(null)
const error = ref('')
const isDragging = ref(false)

const ACCEPTED = /\.(xlsx|xls|csv)$/i

watch(open, (isOpen) => {
  if (isOpen) {
    file.value = null
    error.value = ''
  }
})

function pick(files: FileList | null | undefined): void {
  const picked = files?.[0]
  if (!picked) {
    return
  }
  if (!ACCEPTED.test(picked.name)) {
    error.value = t('dashboard.products.excel.invalidType')
    return
  }
  error.value = ''
  file.value = picked
}

function onDrop(event: DragEvent): void {
  isDragging.value = false
  pick(event.dataTransfer?.files)
}

function submit(): void {
  if (!file.value) {
    error.value = t('dashboard.products.excel.required')
    return
  }
  emit('upload', file.value)
  open.value = false
}
</script>

<template>
  <BaseModal
    v-model:open="open"
    panel-class="max-w-[616px] px-8 py-10"
    close-class="hidden"
    labelled-by="excel-upload-title"
  >
    <button
      type="button"
      class="absolute start-2 top-2 grid size-[26px] place-items-center rounded-2xl border border-line p-1 text-primary hover:border-accent"
      :aria-label="t('common.close')"
      @click="open = false"
    >
      <CancelIcon class="size-4" aria-hidden="true" />
    </button>
    <form class="flex flex-col gap-6" novalidate @submit.prevent="submit">
      <div class="flex flex-col gap-4">
        <h2 id="excel-upload-title" class="text-h3 text-ink">
          {{ t('dashboard.products.excel.title') }}
        </h2>
        <label
          :for="inputId"
          class="flex h-28 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed bg-surface p-3 text-body-md transition-colors"
          :class="[
            error ? 'border-error' : isDragging ? 'border-accent' : 'border-line',
            file ? 'text-ink' : 'text-secondary',
          ]"
          @dragover.prevent="isDragging = true"
          @dragleave="isDragging = false"
          @drop.prevent="onDrop"
        >
          <FileUploadIcon class="size-5 shrink-0" aria-hidden="true" />
          <span class="truncate">{{ file ? file.name : t('dashboard.products.excel.pick') }}</span>
          <input
            :id="inputId"
            type="file"
            class="sr-only"
            accept=".xlsx,.xls,.csv"
            :aria-invalid="error ? true : undefined"
            :aria-describedby="error ? `${inputId}-error` : undefined"
            @change="pick(($event.target as HTMLInputElement).files)"
          />
        </label>
        <p v-if="error" :id="`${inputId}-error`" class="text-caption text-error" role="alert">
          {{ error }}
        </p>
      </div>
      <BaseButton type="submit" block>{{ t('dashboard.products.add') }}</BaseButton>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import FileUploadIcon from '@/assets/icons/file-upload--stroke-rounded.svg'
import SearchIcon from '@/assets/icons/search-01--stroke-standard.svg'
import XlsIcon from '@/assets/icons/xls-02--stroke-rounded.svg'
import BaseButton from '@/components/ui/BaseButton.vue'

import type { ExcelSearchItem } from './excelParser'
import ExcelPasteModal from './ExcelPasteModal.vue'

const emit = defineEmits<{ search: [items: ExcelSearchItem[]] }>()
const { t } = useI18n()

const isModalOpen = ref(false)
const isDragging = ref(false)
const droppedText = ref('')

/** Text files (CSV/TSV/TXT) prefill the paste step; .xlsx parsing is left to the API. */
async function readFile(file: File | undefined): Promise<void> {
  droppedText.value = file && /\.(csv|tsv|txt)$/i.test(file.name) ? await file.text() : ''
  isModalOpen.value = true
}

function onDrop(event: DragEvent): void {
  isDragging.value = false
  readFile(event.dataTransfer?.files[0])
}

function openModal(): void {
  droppedText.value = ''
  isModalOpen.value = true
}
</script>

<template>
  <section
    class="flex flex-col gap-6 rounded-3xl bg-white px-4 py-6 shadow-card sm:px-8"
    :aria-label="t('search.title')"
  >
    <div class="flex flex-wrap gap-4" role="tablist">
      <BaseButton
        :to="{ name: 'home' }"
        variant="soft"
        size="sm"
        class="border-transparent"
        role="tab"
        aria-selected="false"
      >
        <template #icon><SearchIcon class="size-[18px]" aria-hidden="true" /></template>
        {{ t('search.byPartNumber') }}
      </BaseButton>
      <BaseButton variant="primary" size="sm" role="tab" aria-selected="true">
        <template #icon><XlsIcon class="size-[18px]" aria-hidden="true" /></template>
        {{ t('search.uploadExcel') }}
      </BaseButton>
    </div>

    <div
      role="button"
      tabindex="0"
      class="flex h-[106px] items-center justify-center gap-2 rounded-xl border border-dashed p-3 transition-colors"
      :class="
        isDragging ? 'border-accent bg-accent/10' : 'border-line bg-surface hover:border-accent'
      "
      :aria-label="t('public.excel.upload')"
      @click="openModal"
      @keydown.enter.prevent="openModal"
      @keydown.space.prevent="openModal"
      @dragover.prevent="isDragging = true"
      @dragleave="isDragging = false"
      @drop.prevent="onDrop"
    >
      <FileUploadIcon class="size-5 text-ink" aria-hidden="true" />
      <span class="text-body-md text-secondary">{{ t('public.excel.upload') }}</span>
    </div>

    <ExcelPasteModal
      v-model:open="isModalOpen"
      :initial-text="droppedText"
      @search="emit('search', $event)"
    />
  </section>
</template>

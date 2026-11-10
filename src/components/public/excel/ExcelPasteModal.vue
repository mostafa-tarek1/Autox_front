<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import SelectField, { type SelectOption } from '@/components/form/SelectField.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'

import {
  columnCount,
  columnLetter,
  parseExcelText,
  toSearchItems,
  type ExcelSearchItem,
} from './excelParser'

const props = defineProps<{ initialText?: string }>()
const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ search: [items: ExcelSearchItem[]] }>()
const { t } = useI18n()

const step = ref<'paste' | 'columns'>('paste')
const text = ref('')
const partColumn = ref<number | null>(0)
const quantityColumn = ref<number | null>(1)

const rows = computed(() => parseExcelText(text.value))
const columns = computed<SelectOption<number>[]>(() =>
  Array.from({ length: columnCount(rows.value) }, (_, index) => ({
    value: index,
    label: t('public.excel.modal.column', { letter: columnLetter(index) }),
  })),
)
const items = computed(() =>
  partColumn.value === null
    ? []
    : toSearchItems(rows.value, partColumn.value, quantityColumn.value),
)

watch(open, (isOpen) => {
  if (isOpen) {
    step.value = 'paste'
    text.value = props.initialText ?? ''
  }
})

watch(columns, (options) => {
  partColumn.value = options.length > 0 ? 0 : null
  quantityColumn.value = options.length > 1 ? 1 : null
})

function back(): void {
  if (step.value === 'columns') {
    step.value = 'paste'
  } else {
    open.value = false
  }
}

function submit(): void {
  emit('search', items.value)
  open.value = false
}
</script>

<template>
  <BaseModal
    v-model:open="open"
    panel-class="max-w-[994px] p-6 pt-12 sm:p-10"
    close-class="top-4 end-4"
  >
    <div class="flex flex-col gap-10">
      <section
        v-if="step === 'paste'"
        class="flex flex-col gap-4"
        aria-labelledby="excel-paste-title"
      >
        <div class="flex flex-col gap-2">
          <h2 id="excel-paste-title" class="text-h3 text-ink">
            {{ t('public.excel.modal.pasteTitle') }}
          </h2>
          <p class="text-body-sm text-muted">{{ t('public.excel.modal.pasteDescription') }}</p>
        </div>
        <div class="flex flex-col gap-2">
          <label for="excel-paste" class="sr-only">{{ t('public.excel.modal.pasteTitle') }}</label>
          <textarea
            id="excel-paste"
            v-model="text"
            dir="ltr"
            rows="8"
            spellcheck="false"
            :placeholder="'0111-1234  2\n0111-1234  3\n0111-1234  1'"
            aria-describedby="excel-paste-hint"
            class="h-[247px] w-full resize-none rounded-xl border border-dashed border-line bg-surface p-3 font-mono text-body-sm leading-8 text-ink outline-none placeholder:text-ink/50 focus:border-accent"
          />
          <p id="excel-paste-hint" class="text-xs leading-4 text-muted">
            {{ t('public.excel.modal.pasteHint') }}
          </p>
        </div>
      </section>

      <div v-else class="grid gap-6 md:grid-cols-[343fr_547fr]">
        <section class="flex flex-col gap-4" aria-labelledby="excel-columns-title">
          <div class="flex flex-col gap-2">
            <h2 id="excel-columns-title" class="text-h3 text-ink">
              {{ t('public.excel.modal.columnsTitle') }}
            </h2>
            <p class="text-body-sm text-muted">{{ t('public.excel.modal.columnsDescription') }}</p>
          </div>
          <div class="rounded-2xl border border-line p-4">
            <SelectField
              v-model="partColumn"
              :options="columns"
              :label="t('public.excel.modal.partNumber')"
              :placeholder="t('form.choose')"
            />
          </div>
          <div class="rounded-2xl border border-line p-4">
            <SelectField
              v-model="quantityColumn"
              :options="columns"
              :label="t('public.excel.modal.quantity')"
              :placeholder="t('form.choose')"
            />
          </div>
        </section>

        <section class="flex flex-col gap-4" aria-labelledby="excel-preview-title">
          <div class="flex flex-col gap-2">
            <h2 id="excel-preview-title" class="text-h3 text-ink">
              {{ t('public.excel.modal.previewTitle') }}
            </h2>
            <p class="text-body-sm text-muted">
              {{ t('public.excel.modal.itemsCount', { count: items.length }) }}
            </p>
          </div>
          <ol
            class="max-h-[244px] min-h-[244px] overflow-y-auto rounded-2xl border border-line px-4 py-2"
          >
            <li
              v-for="(item, index) in items"
              :key="index"
              class="flex items-center justify-between gap-2 border-b border-line py-2"
            >
              <span class="text-body-md text-ink tabular-nums">{{ index + 1 }}</span>
              <span dir="ltr" class="flex gap-2 text-body-sm text-ink">
                <span>{{ item.partNumber }}</span>
                <span class="tabular-nums">{{ item.quantity }}</span>
              </span>
            </li>
          </ol>
        </section>
      </div>

      <div class="flex items-start justify-between gap-10">
        <BaseButton variant="soft" class="min-w-[105px]" @click="back">{{
          t('public.excel.modal.back')
        }}</BaseButton>
        <BaseButton
          v-if="step === 'paste'"
          class="min-w-[105px]"
          :disabled="rows.length === 0"
          @click="step = 'columns'"
        >
          {{ t('public.excel.modal.next') }}
        </BaseButton>
        <BaseButton v-else class="min-w-[105px]" :disabled="items.length === 0" @click="submit">
          {{ t('search.submit') }}
        </BaseButton>
      </div>
    </div>
  </BaseModal>
</template>

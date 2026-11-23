<script setup lang="ts">
import { useId } from 'vue'
import { useI18n } from 'vue-i18n'

import TickIcon from '@/assets/icons/tick-02--stroke-rounded.svg'
import { useLocalizedText } from '@/composables/useLocalizedText'
import type { CatalogEntry } from '@/mocks/dashboard-products'

import OriginChip from './OriginChip.vue'

/** Catalog row (910:16685): checkbox card; once selected, a "سعر القطعة" input appears beside it. */
defineProps<{ entry: CatalogEntry; error?: string }>()
const selected = defineModel<boolean>('selected', { default: false })
const price = defineModel<string>('price', { default: '0' })
const { t } = useI18n()
const localized = useLocalizedText()
const checkboxId = useId()
const priceId = useId()

function onPrice(event: Event): void {
  const target = event.target as HTMLInputElement
  price.value = target.value.replace(/[^\d.]/g, '')
  target.value = price.value
}
</script>

<template>
  <div class="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
    <label
      :for="checkboxId"
      class="flex min-h-[82px] flex-1 cursor-pointer items-center gap-4 rounded-xl border bg-white p-3 transition-colors"
      :class="selected ? 'border-line' : 'border-line hover:border-accent'"
    >
      <input :id="checkboxId" v-model="selected" type="checkbox" class="peer sr-only" />
      <span
        class="grid size-6 shrink-0 place-items-center rounded-lg border border-line transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent"
        :class="selected ? 'bg-accent text-primary' : 'bg-surface'"
        aria-hidden="true"
      >
        <TickIcon v-if="selected" class="size-4" />
      </span>
      <span class="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-2">
        <span class="flex min-w-0 flex-col items-start gap-2">
          <span class="text-body-md text-ink">{{ localized(entry.name) }}</span>
          <span class="text-body-md text-primary" dir="ltr">{{ entry.partNumber }}</span>
        </span>
        <OriginChip :origin="entry.origin" />
      </span>
    </label>

    <div v-if="selected" class="flex items-center gap-2 md:w-[299px]">
      <label :for="priceId" class="shrink-0 text-body-md text-muted">{{
        t('dashboard.products.columns.price')
      }}</label>
      <input
        :id="priceId"
        :value="price"
        inputmode="decimal"
        dir="ltr"
        :aria-invalid="error ? true : undefined"
        class="h-12 min-w-0 flex-1 rounded-xl border bg-surface px-4 py-3 text-body-sm text-ink outline-none focus:border-accent rtl:text-right"
        :class="error ? 'border-error' : 'border-line'"
        @input="onPrice"
      />
    </div>
  </div>
</template>

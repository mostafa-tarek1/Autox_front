<script setup lang="ts">
import { ref, useId } from 'vue'
import { useI18n } from 'vue-i18n'

import CancelCircleIcon from '@/assets/icons/cancel-circle--stroke-standard.svg'
import SearchSolidIcon from '@/assets/icons/search-01--solid-standard.svg'
import BaseButton from '@/components/ui/BaseButton.vue'

/** Home search card (Figma "search" 753:9137): heading, part-number search and recent searches. */
defineProps<{ recent: string[] }>()
const emit = defineEmits<{
  search: [term: string]
  removeRecent: [index: number]
}>()
const { t } = useI18n()
const headingId = useId()

const term = ref('')

function searchRecent(item: string): void {
  term.value = item
  submit()
}

function submit(): void {
  const value = term.value.trim()
  if (value) {
    emit('search', value)
  }
}
</script>

<template>
  <section
    class="flex flex-col gap-5 rounded-3xl bg-white px-4 py-6 shadow-card sm:px-8"
    :aria-labelledby="headingId"
  >
    <h2 :id="headingId" class="text-h3 text-ink">{{ t('search.title') }}</h2>

    <form
      class="flex flex-col gap-4 sm:flex-row sm:items-center"
      role="search"
      @submit.prevent="submit"
    >
      <label
        class="flex h-[50px] flex-1 items-center rounded-xl border border-line bg-surface p-3 focus-within:border-accent"
      >
        <span class="sr-only">{{ t('search.placeholder') }}</span>
        <input
          v-model="term"
          type="search"
          enterkeyhint="search"
          :placeholder="t('search.placeholder')"
          class="w-full bg-transparent text-body-sm text-ink outline-none placeholder:text-secondary"
        />
      </label>
      <BaseButton type="submit" class="sm:w-auto sm:min-w-[105px]">
        <template #icon><SearchSolidIcon class="size-5 shrink-0" aria-hidden="true" /></template>
        {{ t('search.submit') }}
      </BaseButton>
    </form>

    <div v-if="recent.length" class="flex flex-wrap items-center gap-2">
      <span class="text-body-sm text-secondary">{{ t('search.recent') }}</span>
      <span
        v-for="(item, index) in recent"
        :key="`${item}-${index}`"
        class="flex h-8 items-center gap-2 rounded-lg bg-surface px-2 py-1"
      >
        <button
          type="button"
          dir="ltr"
          class="text-body-sm text-primary hover:underline"
          @click="searchRecent(item)"
        >
          {{ item }}
        </button>
        <button
          type="button"
          class="text-secondary hover:text-error"
          :aria-label="t('search.removeRecent', { term: item })"
          @click="emit('removeRecent', index)"
        >
          <CancelCircleIcon class="size-4" aria-hidden="true" />
        </button>
      </span>
    </div>
  </section>
</template>

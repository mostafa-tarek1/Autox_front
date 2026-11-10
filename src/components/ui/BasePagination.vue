<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import ArrowLeftIcon from '@/assets/icons/arrow-left-01--stroke-standard.svg'
import ArrowRightIcon from '@/assets/icons/arrow-right-01--stroke-standard.svg'

const props = withDefaults(defineProps<{ total: number; siblings?: number }>(), { siblings: 3 })
const page = defineModel<number>({ default: 1 })
const { t } = useI18n()

type PageItem = number | 'gap'

/** 1 2 3 4 … 20 — the first pages, a gap, then the last page (as in the design). */
const items = computed<PageItem[]>(() => {
  const { total, siblings } = props
  if (total <= siblings + 2) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }
  const start = Math.max(1, Math.min(page.value - 1, total - siblings))
  const window = Array.from({ length: siblings + 1 }, (_, index) => start + index).filter(
    (n) => n < total,
  )
  const result: PageItem[] = start > 1 ? [1, 'gap', ...window] : window
  if ((window.at(-1) ?? 0) < total - 1) {
    result.push('gap')
  }
  result.push(total)
  return result
})

function go(target: number): void {
  page.value = Math.min(props.total, Math.max(1, target))
}

const cell =
  'grid size-10 place-items-center rounded-lg border border-line text-body-md text-secondary transition-colors'
</script>

<template>
  <nav :aria-label="t('common.pagination')" class="flex items-center gap-[13px]">
    <button
      type="button"
      :class="[cell, 'bg-white hover:border-accent disabled:opacity-50']"
      :disabled="page <= 1"
      :aria-label="t('common.previous')"
      @click="go(page - 1)"
    >
      <ArrowRightIcon class="size-5 ltr:-scale-x-100" aria-hidden="true" />
    </button>
    <template v-for="(item, index) in items" :key="`${item}-${index}`">
      <span
        v-if="item === 'gap'"
        class="w-5 text-center tracking-widest text-secondary"
        aria-hidden="true"
        >•••</span
      >
      <button
        v-else
        type="button"
        :class="[cell, item === page ? 'bg-accent' : 'bg-white hover:border-accent']"
        :aria-current="item === page ? 'page' : undefined"
        @click="go(item)"
      >
        {{ item }}
      </button>
    </template>
    <button
      type="button"
      :class="[cell, 'bg-white hover:border-accent disabled:opacity-50']"
      :disabled="page >= total"
      :aria-label="t('common.next')"
      @click="go(page + 1)"
    >
      <ArrowLeftIcon class="size-5 ltr:-scale-x-100" aria-hidden="true" />
    </button>
  </nav>
</template>

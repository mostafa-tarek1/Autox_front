<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { PartOrigin } from '@/types/catalog'

const props = defineProps<{ origins: PartOrigin[] }>()
const selected = defineModel<PartOrigin | 'all'>({ default: 'all' })
const { t } = useI18n()

const options = ['all', ...props.origins] as const
</script>

<template>
  <div
    class="flex flex-wrap items-center gap-3"
    role="radiogroup"
    :aria-label="t('public.excel.types')"
  >
    <span class="text-button text-ink">{{ t('public.excel.types') }}</span>
    <button
      v-for="option in options"
      :key="option"
      type="button"
      role="radio"
      :aria-checked="selected === option"
      class="h-[30px] rounded-full border px-2 py-1 font-label text-label leading-5 transition-colors"
      :class="
        selected === option
          ? 'border-accent text-ink'
          : 'border-line text-secondary hover:border-accent'
      "
      @click="selected = option"
    >
      {{ option === 'all' ? t('public.excel.allTypes') : t(`public.excel.origins.${option}`) }}
    </button>
  </div>
</template>

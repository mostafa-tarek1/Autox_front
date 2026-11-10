<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import ArrowDownIcon from '@/assets/icons/arrow-down-01--stroke-standard.svg'
import flagSa from '@/assets/images/flag-sa.webp'
import BaseDropdown from '@/components/ui/BaseDropdown.vue'
import DropdownItem from '@/components/ui/DropdownItem.vue'
import { useLocale } from '@/composables/useLocale'
import type { AppLocale } from '@/plugins/i18n'

withDefaults(defineProps<{ align?: 'start' | 'end' }>(), { align: 'end' })

const { t } = useI18n()
const { locale, setLocale } = useLocale()
const open = ref(false)

const languages: Array<{ code: AppLocale; label: string }> = [
  { code: 'ar', label: 'عربي' },
  { code: 'en', label: 'English' },
]

const currentLabel = (code: AppLocale) =>
  languages.find((language) => language.code === code)?.label
</script>

<template>
  <BaseDropdown v-model:open="open" :align="align">
    <template #trigger="{ toggle, menuId }">
      <button
        type="button"
        class="flex h-10 items-center gap-2 rounded-full bg-surface p-2"
        :aria-label="t('nav.language')"
        aria-haspopup="menu"
        :aria-expanded="open"
        :aria-controls="menuId"
        @click="toggle"
      >
        <img :src="flagSa" alt="" width="24" height="24" class="size-6 rounded-full object-cover" />
        <span class="text-body-sm text-secondary">{{ currentLabel(locale) }}</span>
        <ArrowDownIcon class="size-4 text-secondary" aria-hidden="true" />
      </button>
    </template>
    <DropdownItem
      v-for="language in languages"
      :key="language.code"
      :active="language.code === locale"
      @select="setLocale(language.code)"
    >
      {{ language.label }}
    </DropdownItem>
  </BaseDropdown>
</template>

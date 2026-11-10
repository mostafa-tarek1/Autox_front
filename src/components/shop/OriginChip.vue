<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import SecurityCheckIcon from '@/assets/icons/security-check--stroke-rounded.svg'
import type { PartOrigin } from '@/types/catalog'

withDefaults(defineProps<{ origin: PartOrigin; tone?: 'surface' | 'white' }>(), { tone: 'surface' })
const { t } = useI18n()
</script>

<template>
  <span
    class="inline-flex h-8 items-center gap-1 rounded-full px-2 py-1 text-body-sm text-primary"
    :class="tone === 'white' ? 'bg-white' : 'bg-surface'"
  >
    <SecurityCheckIcon v-if="origin === 'original'" class="size-4" aria-hidden="true" />
    {{ t(`catalog.origins.${origin}`) }}
  </span>
</template>

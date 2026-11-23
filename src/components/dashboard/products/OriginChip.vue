<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import SecurityCheckIcon from '@/assets/icons/security-check--stroke-rounded.svg'
import BaseChip from '@/components/ui/BaseChip.vue'
import type { PartOrigin } from '@/types/catalog'

/** Origin pill of a supplier part; "أصلي" carries the security-check icon as in the design. */
defineProps<{ origin: PartOrigin }>()
const { t } = useI18n()
</script>

<template>
  <BaseChip tone="primary" class="shrink-0">
    <template v-if="origin === 'original'" #icon>
      <SecurityCheckIcon class="size-4" aria-hidden="true" />
    </template>
    {{ t(`catalog.origins.${origin}`) }}
  </BaseChip>
</template>

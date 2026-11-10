<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { WalletStatus } from '@/mocks/account'

defineProps<{ status: WalletStatus }>()
const { t } = useI18n()

const toneClasses: Record<WalletStatus, string> = {
  accepted: 'bg-success/10 text-success',
  rejected: 'bg-error/10 text-error',
  pending: 'bg-orange/10 text-orange',
}
</script>

<template>
  <span
    class="inline-flex h-8 items-center rounded-full px-2 py-1 text-body-md whitespace-nowrap"
    :class="toneClasses[status]"
  >
    {{ t(`wallet.statuses.${status}`) }}
  </span>
</template>

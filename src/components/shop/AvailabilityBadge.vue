<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AlertIcon from '@/assets/icons/alert-circle--stroke-rounded.svg'
import CheckIcon from '@/assets/icons/checkmark-circle-01--stroke-rounded.svg'
import CartRemoveIcon from '@/assets/icons/shopping-cart-remove-02--stroke-rounded.svg'

import type { AvailabilityStatus } from './types'

defineProps<{ status: AvailabilityStatus }>()
const { t } = useI18n()

const variants = {
  available: { icon: CheckIcon, classes: 'bg-accent/20 text-success' },
  partial: { icon: AlertIcon, classes: 'bg-orange/10 text-orange' },
  unavailable: { icon: CartRemoveIcon, classes: 'bg-error/10 text-error' },
} as const
</script>

<template>
  <span
    class="inline-flex h-8 items-center gap-1 rounded-full px-2 py-1 text-body-sm"
    :class="variants[status].classes"
  >
    <component :is="variants[status].icon" class="size-4" aria-hidden="true" />
    {{ t(`shop.availability.${status}`) }}
  </span>
</template>

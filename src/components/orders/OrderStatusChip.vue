<script setup lang="ts">
import { computed, type Component } from 'vue'
import { useI18n } from 'vue-i18n'

import CancelCircleIcon from '@/assets/icons/cancel-circle--stroke-rounded.svg'
import CheckmarkCircleIcon from '@/assets/icons/checkmark-circle-01--stroke-rounded.svg'
import HourglassIcon from '@/assets/icons/hourglass--stroke-standard.svg'
import PaymentIcon from '@/assets/icons/payment-02--stroke-standard.svg'
import PaymentSuccessIcon from '@/assets/icons/payment-success-02--stroke-standard.svg'
import CartRemoveIcon from '@/assets/icons/shopping-cart-remove-02--stroke-standard.svg'
import TimeIcon from '@/assets/icons/time-04--stroke-standard.svg'
import TrolleyIcon from '@/assets/icons/trolley-02--stroke-standard.svg'
import VanIcon from '@/assets/icons/van--stroke-standard.svg'

import type { OrderStatus, ReturnStatus } from './types'

interface ChipStyle {
  icon: Component | string
  /** Background, text and icon classes, all from design tokens. */
  surface: string
  text: string
  iconColor: string
}

const props = defineProps<
  { kind?: 'order'; status: OrderStatus } | { kind: 'return'; status: ReturnStatus }
>()

const { t } = useI18n()

const orderStyles: Record<OrderStatus, ChipStyle> = {
  awaitingAvailability: {
    icon: TimeIcon,
    surface: 'bg-orange/10',
    text: 'text-ink',
    iconColor: 'text-orange',
  },
  quantityUnavailable: {
    icon: CartRemoveIcon,
    surface: 'bg-orange/10',
    text: 'text-error',
    iconColor: 'text-error',
  },
  awaitingPayment: {
    icon: PaymentIcon,
    surface: 'bg-success/10',
    text: 'text-success',
    iconColor: 'text-success',
  },
  awaitingPaymentConfirmation: {
    icon: PaymentSuccessIcon,
    surface: 'bg-orange/10',
    text: 'text-ink',
    iconColor: 'text-orange',
  },
  preparing: {
    icon: TrolleyIcon,
    surface: 'bg-info/10',
    text: 'text-ink',
    iconColor: 'text-primary',
  },
  shipping: {
    icon: TrolleyIcon,
    surface: 'bg-info/10',
    text: 'text-ink',
    iconColor: 'text-primary',
  },
  delivered: {
    icon: CheckmarkCircleIcon,
    surface: 'bg-accent/20',
    text: 'text-success',
    iconColor: 'text-success',
  },
  completed: {
    icon: VanIcon,
    surface: 'bg-success/10',
    text: 'text-success',
    iconColor: 'text-success',
  },
}

const returnStyles: Record<ReturnStatus, ChipStyle> = {
  underReview: {
    icon: HourglassIcon,
    surface: 'bg-orange/10',
    text: 'text-ink',
    iconColor: 'text-orange',
  },
  rejected: {
    icon: CancelCircleIcon,
    surface: 'bg-error/10',
    text: 'text-error',
    iconColor: 'text-error',
  },
  refunded: {
    icon: CheckmarkCircleIcon,
    surface: 'bg-accent/20',
    text: 'text-ink',
    iconColor: 'text-primary',
  },
}

const chip = computed(() =>
  props.kind === 'return'
    ? { style: returnStyles[props.status], label: t(`returns.status.${props.status}`) }
    : { style: orderStyles[props.status], label: t(`orders.status.${props.status}`) },
)
</script>

<template>
  <span
    class="inline-flex h-8 shrink-0 items-center justify-center gap-1 rounded-full px-2 py-1 text-body-sm whitespace-nowrap"
    :class="[chip.style.surface, chip.style.text]"
  >
    <component
      :is="chip.style.icon"
      class="size-4 shrink-0"
      :class="chip.style.iconColor"
      aria-hidden="true"
    />
    {{ chip.label }}
  </span>
</template>

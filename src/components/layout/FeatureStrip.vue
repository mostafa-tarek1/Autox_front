<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import CardIcon from '@/assets/icons/credit-card-validation--duotone-rounded.svg'
import SupportIcon from '@/assets/icons/customer-service-02--duotone-rounded.svg'
import CartCheckIcon from '@/assets/icons/shopping-cart-check-out-01--duotone-rounded.svg'
import UserStarIcon from '@/assets/icons/user-star-01--duotone-rounded.svg'

const { t } = useI18n()

const features = [
  { key: 'securePayments', icon: CardIcon },
  { key: 'returns', icon: CartCheckIcon },
  { key: 'trustedSuppliers', icon: UserStarIcon },
  { key: 'support', icon: SupportIcon },
] as const
</script>

<template>
  <ul
    class="page-container grid grid-cols-2 gap-3 rounded-xl bg-white p-3 sm:gap-4 sm:p-4 lg:grid-cols-4 lg:gap-0"
  >
    <li
      v-for="(feature, index) in features"
      :key="feature.key"
      class="relative flex flex-col items-center gap-2 rounded-2xl bg-surface/50 p-3 text-center sm:flex-row sm:gap-3 sm:bg-transparent sm:p-6 sm:text-start"
      :class="
        index > 0 &&
        'lg:before:absolute lg:before:start-0 lg:before:top-1/2 lg:before:h-[60px] lg:before:w-px lg:before:-translate-y-1/2 lg:before:bg-line'
      "
    >
      <span
        class="grid size-12 shrink-0 place-items-center rounded-2xl bg-surface p-3 text-primary"
      >
        <component :is="feature.icon" class="size-6" aria-hidden="true" />
      </span>
      <span class="text-body-sm text-ink sm:text-body-lg">{{ t(`features.${feature.key}`) }}</span>
    </li>
  </ul>
</template>

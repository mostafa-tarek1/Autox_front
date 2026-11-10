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
    class="page-container grid grid-cols-1 gap-4 rounded-xl bg-white p-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0"
  >
    <li
      v-for="(feature, index) in features"
      :key="feature.key"
      class="relative flex items-center gap-3 rounded-2xl p-6"
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
      <span class="text-body-lg text-ink">{{ t(`features.${feature.key}`) }}</span>
    </li>
  </ul>
</template>

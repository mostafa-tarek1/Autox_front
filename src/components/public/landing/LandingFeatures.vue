<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import ArrowLeftIcon from '@/assets/icons/arrow-left-01--stroke-standard.svg'
import InvoiceIcon from '@/assets/icons/invoice-03--duotone-rounded.svg'
import SearchIcon from '@/assets/icons/search-01--duotone-rounded.svg'
import CartCheckIcon from '@/assets/icons/shopping-cart-check-in-02--duotone-rounded.svg'
import UserGroupIcon from '@/assets/icons/user-group--duotone-rounded.svg'
import BaseButton from '@/components/ui/BaseButton.vue'

import SectionBadge from '../SectionBadge.vue'

const { t } = useI18n()

const features = [
  { key: 'smartSearch', icon: SearchIcon },
  { key: 'suppliers', icon: UserGroupIcon },
  { key: 'quotes', icon: InvoiceIcon },
  { key: 'orders', icon: CartCheckIcon },
] as const
</script>

<template>
  <section
    id="features"
    class="scroll-mt-[72px] bg-white py-16 sm:py-[88px]"
    aria-labelledby="features-title"
  >
    <div class="page-container flex flex-col items-center gap-12 sm:gap-[72px]">
      <header class="flex flex-col items-center gap-4 text-center">
        <SectionBadge>{{ t('public.landing.features.badge') }}</SectionBadge>
        <h2 id="features-title" class="text-h2 text-ink sm:text-h1 sm:leading-10">
          {{ t('public.landing.features.title') }}
        </h2>
      </header>

      <ul class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <li
          v-for="feature in features"
          :key="feature.key"
          class="flex flex-col items-start gap-4 rounded-2xl bg-surface p-6 shadow-card"
        >
          <span class="grid size-[52px] place-items-center rounded-2xl bg-white p-3 text-primary">
            <component :is="feature.icon" class="size-7" aria-hidden="true" />
          </span>
          <div class="flex flex-col gap-2">
            <h3 class="text-h3 text-ink">
              {{ t(`public.landing.features.items.${feature.key}.title`) }}
            </h3>
            <p class="text-body-sm text-secondary">
              {{ t(`public.landing.features.items.${feature.key}.description`) }}
            </p>
          </div>
        </li>
      </ul>

      <BaseButton to="/register">
        {{ t('public.landing.features.cta') }}
        <ArrowLeftIcon class="size-5 ltr:-scale-x-100" aria-hidden="true" />
      </BaseButton>
    </div>
  </section>
</template>

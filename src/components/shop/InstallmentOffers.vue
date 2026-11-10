<script setup lang="ts">
import PriceTag from '@/components/ui/PriceTag.vue'
import { useI18n } from 'vue-i18n'

import tabbyLogo from '@/assets/images/shop/tabby-installments.webp'
import tamaraLogo from '@/assets/images/shop/tamara-installments.webp'

/** "يمكنك التقسيط عن طريق" — tabby / tamara offers (Figma 359:6154). */
defineProps<{ monthlyFrom: number }>()
const { t } = useI18n()

const providers = [
  {
    key: 'tabby',
    logo: tabbyLogo,
    logoClass: 'size-[95px] max-w-none object-cover',
    href: 'https://tabby.ai',
  },
  {
    key: 'tamara',
    logo: tamaraLogo,
    logoClass: 'h-[26px] w-[81px] object-contain',
    href: 'https://tamara.co',
  },
] as const
</script>

<template>
  <section class="flex flex-col items-start gap-4" aria-labelledby="installments-title">
    <h3 id="installments-title" class="text-h4 text-ink">
      {{ t('shop.payment.installmentsTitle') }}
    </h3>
    <ul class="grid w-full gap-4 md:grid-cols-2 md:gap-8">
      <li
        v-for="provider in providers"
        :key="provider.key"
        class="flex items-center gap-[19px] rounded-xl bg-surface px-4 py-3"
      >
        <span
          class="grid h-14 w-[87px] shrink-0 place-items-center overflow-hidden rounded-2xl bg-white"
        >
          <img
            :src="provider.logo"
            :alt="provider.key"
            :class="provider.logoClass"
            loading="lazy"
          />
        </span>
        <div class="flex min-w-0 flex-col items-start gap-2">
          <p class="flex items-center gap-3">
            <span class="text-h4 text-ink">{{ t('shop.payment.startingFrom') }}</span>
            <PriceTag :amount="monthlyFrom" size="lg" tone="primary" />
          </p>
          <p class="text-body-sm text-secondary">{{ t('shop.payment.installmentsHint') }}</p>
          <a
            :href="provider.href"
            target="_blank"
            rel="noopener noreferrer"
            class="text-button text-primary hover:underline"
          >
            {{ t('shop.payment.learnMore') }}
          </a>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import ArrowLeftIcon from '@/assets/icons/arrow-left-01--stroke-standard.svg'
import partsBanner from '@/assets/images/parts-banner.webp'
import BaseButton from '@/components/ui/BaseButton.vue'

import SectionBadge from '../SectionBadge.vue'

const { t } = useI18n()
</script>

<template>
  <section
    id="top"
    class="relative isolate scroll-mt-[72px] overflow-hidden bg-ink pt-16 sm:pt-[117px]"
  >
    <div class="page-container flex flex-col items-center gap-14 text-center">
      <div class="flex flex-col items-center gap-4">
        <SectionBadge tone="dark">{{ t('public.landing.hero.badge') }}</SectionBadge>
        <h1 class="max-w-[664px] text-[28px]/[44px] font-bold text-white sm:text-display">
          {{ t('public.landing.hero.title') }}
        </h1>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
        <BaseButton to="/register">
          {{ t('public.landing.hero.traderSignup') }}
          <ArrowLeftIcon class="size-5 ltr:-scale-x-100" aria-hidden="true" />
        </BaseButton>
        <BaseButton
          to="/register?type=supplier"
          variant="outline"
          class="border-white bg-white hover:bg-white/90"
        >
          {{ t('public.landing.hero.supplierSignup') }}
          <ArrowLeftIcon class="size-5 ltr:-scale-x-100" aria-hidden="true" />
        </BaseButton>
      </div>
    </div>
    <div class="relative mx-auto mt-[35px] w-full max-w-[623px] px-4 pt-[35px] pb-[41px] sm:px-0">
      <div
        class="absolute inset-x-[48px] top-0 -z-10 h-[286px] rounded-full bg-accent/15 blur-[100px]"
        aria-hidden="true"
      />
      <img
        :src="partsBanner"
        alt=""
        width="623"
        height="234"
        class="h-auto w-full"
        fetchpriority="high"
      />
    </div>
  </section>
</template>

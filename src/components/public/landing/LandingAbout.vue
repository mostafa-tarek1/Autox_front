<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import storeCounterSm from '@/assets/images/public/store-counter-sm.webp'
import storeCounter from '@/assets/images/public/store-counter.webp'
import { landingStats } from '@/mocks/public'

import SectionBadge from '../SectionBadge.vue'

const { t } = useI18n()
</script>

<template>
  <section id="about" class="scroll-mt-[72px] py-16 sm:py-[88px]" aria-labelledby="about-title">
    <div class="page-container flex flex-col items-center gap-[52px]">
      <header class="flex max-w-[792px] flex-col items-center gap-6 text-center">
        <div class="flex flex-col items-center gap-4">
          <SectionBadge>{{ t('public.landing.about.badge') }}</SectionBadge>
          <h2 id="about-title" class="text-h2 text-ink sm:text-h1 sm:leading-10">
            {{ t('public.landing.about.title') }}
          </h2>
        </div>
        <p class="text-h4 text-secondary">{{ t('public.landing.about.description') }}</p>
      </header>

      <div class="relative isolate w-full overflow-hidden rounded-3xl bg-white shadow-card">
        <img
          :src="storeCounter"
          :srcset="`${storeCounterSm} 768w, ${storeCounter} 1536w`"
          sizes="(min-width: 1232px) 1200px, 100vw"
          alt=""
          width="1200"
          height="534"
          loading="lazy"
          decoding="async"
          class="h-[420px] w-full object-cover object-[50%_42%] sm:h-[534px]"
        />
        <div
          class="absolute inset-0 bg-linear-to-b from-success/0 from-12% to-black"
          aria-hidden="true"
        />
        <dl
          class="absolute inset-x-4 bottom-6 grid grid-cols-2 gap-y-4 rounded-3xl border border-white/30 bg-linear-to-r from-white/30 to-white/10 p-5 backdrop-blur-[8px] sm:inset-x-auto sm:bottom-12 sm:left-1/2 sm:w-[837px] sm:max-w-[calc(100%-2rem)] sm:-translate-x-1/2 sm:grid-cols-4 sm:gap-y-0"
        >
          <div
            v-for="(stat, index) in landingStats"
            :key="stat.key"
            class="flex flex-col items-center gap-1 text-center"
            :class="index > 0 && 'sm:border-s-[0.6px] sm:border-line/40'"
          >
            <dt class="order-2 text-body-md text-white">
              {{ t(`public.landing.stats.${stat.key}`) }}
            </dt>
            <dd class="order-1 text-h1 leading-10 text-accent tabular-nums" dir="ltr">
              {{ stat.value }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

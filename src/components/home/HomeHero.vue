<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import partsBanner from '@/assets/images/parts-banner.webp'
import XPattern from '@/components/ui/XPattern.vue'

const { t } = useI18n()
</script>

<template>
  <section class="relative isolate overflow-hidden bg-primary-deep pt-[75px] pb-[146px]">
    <XPattern
      class="absolute -right-6 top-0 -z-10 hidden h-[484px] w-[543px] text-accent opacity-[0.08] md:block"
    />
    <div
      class="absolute top-[175px] left-1/2 -z-10 h-[171px] w-[263px] -translate-x-1/2 rounded-full bg-accent/30 blur-[100px]"
      aria-hidden="true"
    />
    <div class="page-container flex flex-col items-center gap-[30px]">
      <h1 class="max-w-[736px] text-center text-[28px]/[44px] font-bold text-white sm:text-display">
        {{ t('home.heroTitle') }}
      </h1>
      <img
        :src="partsBanner"
        alt=""
        width="580"
        height="217"
        class="h-auto w-full max-w-[580px]"
        fetchpriority="high"
      />
    </div>
  </section>
</template>

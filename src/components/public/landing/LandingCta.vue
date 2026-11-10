<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import ArrowLeftIcon from '@/assets/icons/arrow-left-01--stroke-standard.svg'
import BaseButton from '@/components/ui/BaseButton.vue'

const { t } = useI18n()
</script>

<template>
  <section class="bg-primary py-16 sm:py-20" aria-labelledby="cta-title">
    <div class="page-container flex flex-col items-center gap-8 text-center">
      <div class="flex max-w-[800px] flex-col items-center gap-4">
        <h2 id="cta-title" class="text-h2 text-white sm:text-h1 sm:leading-10">
          {{ t('public.landing.cta.title') }}
        </h2>
        <p class="text-body-lg text-white/80">{{ t('public.landing.cta.description') }}</p>
      </div>
      <BaseButton to="/register">
        {{ t('public.landing.cta.button') }}
        <ArrowLeftIcon class="size-5 ltr:-scale-x-100" aria-hidden="true" />
      </BaseButton>
    </div>
  </section>
</template>

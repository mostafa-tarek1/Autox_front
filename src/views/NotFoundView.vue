<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import BaseButton from '@/components/ui/BaseButton.vue'

const { t } = useI18n()
</script>

<template>
  <main class="grid min-h-dvh place-items-center bg-surface p-4">
    <div class="flex flex-col items-center gap-4 text-center">
      <p class="text-[96px] leading-none font-bold text-primary">404</p>
      <h1 class="text-h2 text-ink">{{ t('pageTitles.notFound') }}</h1>
      <BaseButton :to="{ name: 'home' }">{{ t('nav.home') }}</BaseButton>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, type StyleValue } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

import partsBanner from '@/assets/images/parts-banner.webp'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher.vue'
import AppLogo from '@/components/ui/AppLogo.vue'
import XPattern from '@/components/ui/XPattern.vue'

const route = useRoute()

/** Space between the card and the parts image on desktop (Figma: 91px on login, 52px on register). */
const bannerGapStyle = computed<StyleValue>(() => ({
  '--banner-gap': `${route.meta.authBannerGap ?? 91}px`,
}))
</script>

<template>
  <div class="relative isolate flex min-h-dvh flex-col overflow-hidden bg-primary-deep">
    <XPattern
      class="absolute right-0 bottom-0 -z-10 h-[523px] w-[586px] max-w-[80vw] text-accent opacity-[0.08]"
    />

    <header class="page-container flex items-center justify-between pt-[33px]">
      <RouterLink :to="{ name: 'home' }" aria-label="Parts X">
        <AppLogo tone="accent" class="h-10 w-[149px]" />
      </RouterLink>
      <LanguageSwitcher class="[&>button]:bg-surface" align="end" />
    </header>

    <main class="flex flex-1 flex-col items-center px-4 pt-16 sm:pt-[146px]">
      <RouterView />
      <img
        :src="partsBanner"
        alt=""
        width="598"
        height="224"
        class="mt-auto h-auto w-full max-w-[598px] pt-16 pb-24 sm:pt-(--banner-gap)"
        :style="bannerGapStyle"
        fetchpriority="low"
      />
    </main>
  </div>
</template>

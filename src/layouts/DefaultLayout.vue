<script setup lang="ts">
import { computed, type StyleValue } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import AppFooter from '@/components/layout/AppFooter.vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import FeatureStrip from '@/components/layout/FeatureStrip.vue'
import SupportFab from '@/components/layout/SupportFab.vue'
import AddedToCartToast from '@/components/shop/AddedToCartToast.vue'

const route = useRoute()

/** Desktop uses each page's Figma gap above the footer; phones get a fixed 64px. */
const footerGapStyle = computed<StyleValue | undefined>(() =>
  route.meta.footerGap ? { '--footer-gap': `${route.meta.footerGap}px` } : undefined,
)
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <AppNavbar />
    <main
      id="main"
      class="flex-1"
      :class="{ 'pb-16 lg:pb-(--footer-gap)': route.meta.footerGap }"
      :style="footerGapStyle"
    >
      <RouterView />
    </main>
    <section v-if="route.meta.featureStrip" class="mt-[106px] mb-10">
      <FeatureStrip />
    </section>
    <AppFooter />
    <SupportFab />
    <AddedToCartToast />
  </div>
</template>

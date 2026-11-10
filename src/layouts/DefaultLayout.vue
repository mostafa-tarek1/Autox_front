<script setup lang="ts">
import { RouterView } from 'vue-router'

import AppFooter from '@/components/layout/AppFooter.vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import FeatureStrip from '@/components/layout/FeatureStrip.vue'
import SupportFab from '@/components/layout/SupportFab.vue'
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <AppNavbar />
    <main id="main" class="flex-1">
      <RouterView />
    </main>
    <section class="mt-[106px] mb-10" aria-hidden="false">
      <FeatureStrip />
    </section>
    <AppFooter />
    <SupportFab />
  </div>
</template>

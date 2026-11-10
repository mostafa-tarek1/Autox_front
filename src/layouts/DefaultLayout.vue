<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'

import AppFooter from '@/components/layout/AppFooter.vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import FeatureStrip from '@/components/layout/FeatureStrip.vue'
import SupportFab from '@/components/layout/SupportFab.vue'
import AddedToCartToast from '@/components/shop/AddedToCartToast.vue'

const route = useRoute()
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <AppNavbar />
    <main id="main" class="flex-1">
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

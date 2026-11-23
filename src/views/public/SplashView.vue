<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import AppLogo from '@/components/ui/AppLogo.vue'

/** Brand splash (Figma "landing" 224:1524); hands over to the landing page after a short pause. */
const router = useRouter()

onMounted(() => {
  window.setTimeout(() => router.replace({ name: 'landing' }), 1500)
})
</script>

<template>
  <main class="relative isolate grid min-h-dvh place-items-center overflow-hidden bg-primary-deep">
    <div
      class="absolute top-[30%] left-1/2 -z-10 h-[232px] w-[245px] -translate-x-1/2 rounded-full bg-accent/35 blur-[70px]"
      aria-hidden="true"
    />
    <AppLogo tone="accent" class="-mt-[112px] h-14 w-[209px]" />
  </main>
</template>

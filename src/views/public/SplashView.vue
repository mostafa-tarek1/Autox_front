<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import AppLogo from '@/components/ui/AppLogo.vue'
import XPattern from '@/components/ui/XPattern.vue'

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
    <XPattern
      class="absolute right-0 bottom-0 -z-10 h-[474px] w-[531px] max-w-[80vw] text-accent opacity-[0.08]"
    />
    <AppLogo tone="accent" class="-mt-[208px] h-14 w-[197px]" />
  </main>
</template>

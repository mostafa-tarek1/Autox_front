<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import AppFooter from '@/components/layout/AppFooter.vue'
import SupportFab from '@/components/layout/SupportFab.vue'
import GuestNavbar from '@/components/public/landing/GuestNavbar.vue'
import LandingAbout from '@/components/public/landing/LandingAbout.vue'
import LandingCta from '@/components/public/landing/LandingCta.vue'
import LandingFeatures from '@/components/public/landing/LandingFeatures.vue'
import LandingHero from '@/components/public/landing/LandingHero.vue'
import LandingTestimonials from '@/components/public/landing/LandingTestimonials.vue'

const SECTION_IDS = ['top', 'about', 'features', 'testimonials']
const activeSection = ref('top')
let observer: IntersectionObserver | null = null

/** Keeps the guest navbar link of the section in view highlighted. */
onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') {
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  for (const id of SECTION_IDS) {
    const element = document.getElementById(id)
    if (element) {
      observer.observe(element)
    }
  }
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <GuestNavbar :active-section="activeSection" />
    <main id="main" class="flex-1">
      <LandingHero />
      <LandingAbout />
      <LandingFeatures />
      <LandingTestimonials />
      <LandingCta />
    </main>
    <AppFooter variant="guest" />
    <SupportFab />
  </div>
</template>

<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import ArrowLeftIcon from '@/assets/icons/arrow-left-01--stroke-standard.svg'
import ArrowRightIcon from '@/assets/icons/arrow-right-01--stroke-standard.svg'
import { testimonials } from '@/mocks/public'

import SectionBadge from '../SectionBadge.vue'
import TestimonialCard from './TestimonialCard.vue'

const { t, locale } = useI18n()
const isDesktop = useMediaQuery('(min-width: 1024px)')

const perPage = computed(() => (isDesktop.value ? 3 : 1))
const page = ref(1)
const items = computed(() => testimonials[locale.value as 'ar' | 'en'] ?? testimonials.ar)
const totalPages = computed(() => Math.max(1, Math.ceil(items.value.length / perPage.value)))
const visible = computed(() =>
  items.value.slice((page.value - 1) * perPage.value, page.value * perPage.value),
)

watch(totalPages, (total) => (page.value = Math.min(page.value, total)))

/** Wraps around at both ends, like the design's always-enabled arrows. */
function go(delta: number): void {
  const total = totalPages.value
  page.value = ((page.value - 1 + delta + total) % total) + 1
}
</script>

<template>
  <section
    id="testimonials"
    class="scroll-mt-[72px] py-16 sm:py-[88px]"
    aria-labelledby="testimonials-title"
  >
    <div class="page-container flex flex-col items-center gap-[52px]">
      <header class="flex flex-col items-center gap-4 text-center">
        <SectionBadge>{{ t('public.landing.testimonials.badge') }}</SectionBadge>
        <h2 id="testimonials-title" class="text-h2 text-ink sm:text-h1 sm:leading-10">
          {{ t('public.landing.testimonials.title') }}
        </h2>
      </header>

      <div class="flex w-full flex-col items-center gap-8">
        <ul class="grid w-full grid-cols-1 gap-6 lg:grid-cols-3" aria-live="polite">
          <li v-for="item in visible" :key="item.id">
            <TestimonialCard :testimonial="item" />
          </li>
        </ul>

        <div class="flex items-center gap-8">
          <button
            type="button"
            class="grid size-[46px] place-items-center rounded-xl bg-accent p-2 text-primary transition hover:brightness-95"
            :aria-label="t('common.previous')"
            @click="go(-1)"
          >
            <ArrowRightIcon class="size-5 ltr:-scale-x-100" aria-hidden="true" />
          </button>
          <span class="min-w-6 text-center text-body-sm text-secondary tabular-nums" dir="ltr">
            {{ page }}/{{ totalPages }}
          </span>
          <button
            type="button"
            class="grid size-[46px] place-items-center rounded-xl bg-accent p-2 text-primary transition hover:brightness-95"
            :aria-label="t('common.next')"
            @click="go(1)"
          >
            <ArrowLeftIcon class="size-5 ltr:-scale-x-100" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

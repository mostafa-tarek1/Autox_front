<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

import ArrowLeftIcon from '@/assets/icons/arrow-left-01--stroke-standard.svg'
import XPattern from '@/components/ui/XPattern.vue'

export interface Breadcrumb {
  label: string
  to?: RouteLocationRaw
}

/**
 * Green header of every inner page (Figma "hero", 152px): title + glass breadcrumb pill.
 * Without `breadcrumbs` it renders "Home › <title>".
 */
const props = defineProps<{ title: string; breadcrumbs?: Breadcrumb[] }>()
const { t } = useI18n()

const trail = computed<Breadcrumb[]>(
  () =>
    props.breadcrumbs ?? [{ label: t('nav.home'), to: { name: 'home' } }, { label: props.title }],
)
</script>

<template>
  <section class="relative isolate overflow-hidden bg-primary">
    <XPattern class="absolute top-0 right-0 -z-10 h-[237px] w-[333px] text-accent opacity-10" />
    <div
      class="page-container flex min-h-[152px] flex-col-reverse items-start justify-center gap-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10"
    >
      <h1 class="text-[28px]/[44px] font-bold text-white sm:text-display">{{ title }}</h1>
      <nav :aria-label="t('nav.breadcrumb')">
        <ol
          class="flex h-[34px] w-fit items-center gap-2 rounded-3xl border border-white/30 bg-linear-to-r from-white/30 to-white/10 px-3 py-1 backdrop-blur-[8px]"
        >
          <li v-for="(crumb, index) in trail" :key="index" class="flex items-center gap-2">
            <ArrowLeftIcon
              v-if="index > 0"
              class="size-4 text-white ltr:-scale-x-100"
              aria-hidden="true"
            />
            <RouterLink
              v-if="crumb.to"
              :to="crumb.to"
              class="text-body-sm text-white/60 hover:text-white"
            >
              {{ crumb.label }}
            </RouterLink>
            <span v-else class="text-body-sm text-white" aria-current="page">{{
              crumb.label
            }}</span>
          </li>
        </ol>
      </nav>
    </div>
  </section>
</template>

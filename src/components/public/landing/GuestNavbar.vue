<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

import ArrowLeftIcon from '@/assets/icons/arrow-left-01--stroke-standard.svg'
import UserIcon from '@/assets/icons/user--duotone-rounded.svg'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher.vue'
import AppLogo from '@/components/ui/AppLogo.vue'

defineProps<{ activeSection: string }>()
const { t } = useI18n()
const isMenuOpen = ref(false)

/** In-page anchors of the landing page, in navbar order (start → end). */
const links = [
  { id: 'top', key: 'home' },
  { id: 'about', key: 'about' },
  { id: 'features', key: 'features' },
  { id: 'testimonials', key: 'testimonials' },
] as const
</script>

<template>
  <header class="sticky top-0 z-40 bg-white/90 shadow-soft backdrop-blur-[16px]">
    <div class="page-container flex h-[72px] items-center justify-between gap-4">
      <RouterLink :to="{ name: 'landing' }" class="shrink-0" aria-label="Auto X">
        <AppLogo class="h-8 w-28" />
      </RouterLink>

      <nav :aria-label="t('nav.mainMenu')" class="hidden lg:block">
        <ul class="flex items-center gap-2">
          <li v-for="link in links" :key="link.id">
            <a
              :href="`#${link.id}`"
              class="block p-2 text-button transition-colors hover:text-primary"
              :class="activeSection === link.id ? 'text-primary' : 'text-secondary'"
              :aria-current="activeSection === link.id ? 'true' : undefined"
            >
              {{ t(`public.landing.nav.${link.key}`) }}
            </a>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-2 sm:gap-4">
        <LanguageSwitcher class="hidden sm:block" />
        <RouterLink
          to="/login"
          class="flex h-10 items-center gap-2 rounded-full border-[0.5px] border-line bg-surface py-1 ps-1 pe-2 transition-colors hover:border-accent"
        >
          <span class="grid size-8 place-items-center rounded-full bg-white p-2 text-primary">
            <UserIcon class="size-4" aria-hidden="true" />
          </span>
          <span class="flex items-center gap-1">
            <span class="text-body-md text-secondary">{{ t('public.landing.login') }}</span>
            <ArrowLeftIcon class="size-4 text-ink ltr:-scale-x-100" aria-hidden="true" />
          </span>
        </RouterLink>
        <button
          type="button"
          class="grid size-10 place-items-center rounded-full border-[0.5px] border-line bg-surface lg:hidden"
          :aria-label="t('nav.openMenu')"
          :aria-expanded="isMenuOpen"
          aria-controls="guest-menu"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span class="flex w-4 flex-col gap-1" aria-hidden="true">
            <span class="h-0.5 rounded bg-ink" />
            <span class="h-0.5 rounded bg-ink" />
            <span class="h-0.5 rounded bg-ink" />
          </span>
        </button>
      </div>
    </div>

    <nav
      v-if="isMenuOpen"
      id="guest-menu"
      class="border-t border-line bg-white lg:hidden"
      :aria-label="t('nav.mainMenu')"
    >
      <ul class="page-container flex flex-col py-2">
        <li v-for="link in links" :key="link.id">
          <a
            :href="`#${link.id}`"
            class="block rounded-lg p-3 text-button"
            :class="activeSection === link.id ? 'bg-surface text-primary' : 'text-secondary'"
            @click="isMenuOpen = false"
          >
            {{ t(`public.landing.nav.${link.key}`) }}
          </a>
        </li>
        <li class="p-3 sm:hidden"><LanguageSwitcher align="start" /></li>
      </ul>
    </nav>
  </header>
</template>

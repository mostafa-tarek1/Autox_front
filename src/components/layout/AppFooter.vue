<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

import FacebookIcon from '@/assets/icons/facebook-02--duotone-rounded.svg'
import InstagramIcon from '@/assets/icons/instagram--duotone-rounded.svg'
import XIcon from '@/assets/icons/new-twitter--duotone-rounded.svg'
import SnapchatIcon from '@/assets/icons/snapchat--duotone-rounded.svg'
import vatLogo from '@/assets/images/vat-logo.webp'
import AppLogo from '@/components/ui/AppLogo.vue'
import XPattern from '@/components/ui/XPattern.vue'

/**
 * `default`: site footer (links row, divider within the 1200px column).
 * `guest`: landing-page footer (no links row, full-width divider).
 */
withDefaults(defineProps<{ variant?: 'default' | 'guest' }>(), { variant: 'default' })

const { t } = useI18n()
const year = new Date().getFullYear()

const links = [
  { key: 'terms', to: '/terms' },
  { key: 'privacy', to: '/privacy' },
  { key: 'contact', to: '/contact' },
] as const

/** Placeholder URLs until the real accounts are provided. */
const socials = [
  { name: 'Facebook', href: '#', icon: FacebookIcon },
  { name: 'Instagram', href: '#', icon: InstagramIcon },
  { name: 'X', href: '#', icon: XIcon },
  { name: 'Snapchat', href: '#', icon: SnapchatIcon },
]
</script>

<template>
  <footer class="relative overflow-hidden bg-ink text-white">
    <XPattern class="absolute -right-4 top-0 h-[415px] w-[465px] text-accent opacity-10" />
    <div class="relative pt-[66px]" :class="variant === 'guest' ? 'pb-[21px]' : 'pb-[23px]'">
      <div class="page-container flex flex-col items-center gap-8">
        <RouterLink :to="{ name: 'home' }" :aria-label="t('nav.home')">
          <AppLogo tone="accent" class="h-10 w-[141px]" />
        </RouterLink>

        <ul v-if="variant === 'default'" class="flex flex-wrap items-center justify-center gap-8">
          <li v-for="link in links" :key="link.key">
            <RouterLink :to="link.to" class="block text-button hover:text-accent">{{
              t(`footer.${link.key}`)
            }}</RouterLink>
          </li>
        </ul>

        <ul class="flex items-center gap-6" :aria-label="t('footer.social')">
          <li v-for="social in socials" :key="social.name">
            <a
              :href="social.href"
              :aria-label="social.name"
              target="_blank"
              rel="noopener noreferrer"
              class="grid size-9 place-items-center rounded-xl bg-primary p-2 text-accent transition hover:brightness-125"
            >
              <component :is="social.icon" class="size-5" aria-hidden="true" />
            </a>
          </li>
        </ul>

        <div class="flex items-center gap-2">
          <img
            :src="vatLogo"
            alt=""
            width="34"
            height="43"
            class="h-[43px] w-[34px] object-contain"
          />
          <div class="flex flex-col items-start gap-2">
            <span class="text-body-sm text-white/60">{{ t('footer.taxNumber') }}</span>
            <span class="text-body-sm tabular-nums">1234567890</span>
          </div>
        </div>
      </div>

      <div
        class="border-t border-line/10 pt-[15px] text-center"
        :class="variant === 'guest' ? 'mt-10' : 'page-container mt-6'"
      >
        <i18n-t keypath="footer.rights" tag="p" scope="global" class="text-body-sm">
          <template #brand>
            <bdi dir="ltr">© {{ year }} Auto X</bdi>
          </template>
        </i18n-t>
      </div>
    </div>
  </footer>
</template>

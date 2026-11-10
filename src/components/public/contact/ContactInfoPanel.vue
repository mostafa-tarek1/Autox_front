<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import CallingIcon from '@/assets/icons/calling-02--stroke-rounded.svg'
import FacebookIcon from '@/assets/icons/facebook-02--duotone-rounded.svg'
import InstagramIcon from '@/assets/icons/instagram--duotone-rounded.svg'
import MailIcon from '@/assets/icons/mail-02--stroke-rounded.svg'
import XIcon from '@/assets/icons/new-twitter--duotone-rounded.svg'
import SnapchatIcon from '@/assets/icons/snapchat--duotone-rounded.svg'
import partsBanner from '@/assets/images/parts-banner.webp'
import XPattern from '@/components/ui/XPattern.vue'
import { contactDetails } from '@/mocks/public'

const { t } = useI18n()

const channels = [
  { key: 'call', value: contactDetails.phone, href: contactDetails.phoneHref, icon: CallingIcon },
  {
    key: 'email',
    value: contactDetails.email,
    href: `mailto:${contactDetails.email}`,
    icon: MailIcon,
  },
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
  <aside
    class="relative isolate flex flex-col gap-8 overflow-hidden bg-primary p-6 sm:p-12 sm:pb-[21px]"
    :aria-labelledby="'contact-info-title'"
  >
    <XPattern
      class="absolute right-0 bottom-0 -z-10 h-[292px] w-[327px] text-accent opacity-[0.08]"
    />

    <h2 id="contact-info-title" class="text-h2 text-white">{{ t('public.contact.infoTitle') }}</h2>

    <ul class="flex flex-col gap-6">
      <li v-for="channel in channels" :key="channel.key" class="flex items-center gap-3">
        <span
          class="grid size-9 shrink-0 place-items-center rounded-xl bg-surface p-2 text-primary"
        >
          <component :is="channel.icon" class="size-5" aria-hidden="true" />
        </span>
        <span class="flex flex-col items-start gap-1">
          <span class="text-body-sm text-placeholder">{{
            t(`public.contact.channels.${channel.key}`)
          }}</span>
          <a :href="channel.href" dir="ltr" class="text-button text-white hover:text-accent">{{
            channel.value
          }}</a>
        </span>
      </li>
    </ul>

    <ul class="-mt-2.5 flex items-center gap-6" :aria-label="t('footer.social')">
      <li v-for="social in socials" :key="social.name">
        <a
          :href="social.href"
          :aria-label="social.name"
          target="_blank"
          rel="noopener noreferrer"
          class="grid size-9 place-items-center rounded-xl bg-white/10 p-2 text-accent transition hover:bg-white/20"
        >
          <component :is="social.icon" class="size-5" aria-hidden="true" />
        </a>
      </li>
    </ul>

    <img
      :src="partsBanner"
      alt=""
      width="372"
      height="140"
      loading="lazy"
      decoding="async"
      class="mx-auto mt-auto h-auto w-full max-w-[372px] pt-8"
    />
  </aside>
</template>

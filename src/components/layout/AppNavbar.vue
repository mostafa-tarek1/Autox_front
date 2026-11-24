<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { ref, useTemplateRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import NotificationIcon from '@/assets/icons/notification-02--stroke-rounded.svg'
import CartIcon from '@/assets/icons/shopping-cart-01--stroke-rounded.svg'
import CartPopover from '@/components/shop/CartPopover.vue'
import AppLogo from '@/components/ui/AppLogo.vue'
import { navItems } from '@/composables/useNavItems'
import { useCartStore } from '@/stores/cart'

import LanguageSwitcher from './LanguageSwitcher.vue'
import NavIconButton from './NavIconButton.vue'
import { mockNotifications } from './notifications'
import NotificationsMenu from './NotificationsMenu.vue'
import UserMenu from './UserMenu.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const isMenuOpen = ref(false)
const isCartOpen = ref(false)
const cartRoot = useTemplateRef<HTMLElement>('cartRoot')
const isNotificationsOpen = ref(false)
const notificationsRoot = useTemplateRef<HTMLElement>('notificationsRoot')
const { itemsCount } = storeToRefs(useCartStore())

onClickOutside(cartRoot, () => (isCartOpen.value = false))
onClickOutside(notificationsRoot, () => (isNotificationsOpen.value = false))
watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false
    isCartOpen.value = false
    isNotificationsOpen.value = false
  },
)

/** Mock session data for the UI phase. */
const user = { name: 'فهد العتيبي' }
const notifications = mockNotifications

function logout(): void {
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="sticky top-0 z-40 bg-white/90 shadow-soft backdrop-blur-[16px]">
    <div
      class="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 xl:px-14"
    >
      <RouterLink :to="{ name: 'home' }" class="shrink-0" :aria-label="t('nav.home')">
        <AppLogo class="h-8 w-[119px]" />
      </RouterLink>

      <nav :aria-label="t('nav.mainMenu')" class="hidden lg:block">
        <ul class="flex items-center gap-3">
          <li v-for="item in navItems" :key="item.key">
            <RouterLink
              :to="item.to"
              class="block p-2 text-button transition-colors hover:text-primary"
              :class="route.meta.nav === item.key ? 'text-primary' : 'text-secondary'"
              :aria-current="route.meta.nav === item.key ? 'page' : undefined"
            >
              {{ t(`nav.${item.key}`) }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-2 sm:gap-4">
        <!-- Cart and notification popovers are centred under their icon, as in Figma. -->
        <div ref="cartRoot" class="relative">
          <NavIconButton
            :label="t('nav.cart')"
            :count="itemsCount"
            aria-haspopup="dialog"
            :aria-expanded="isCartOpen"
            @click="isCartOpen = !isCartOpen"
          >
            <CartIcon class="size-6" aria-hidden="true" />
          </NavIconButton>
          <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            leave-active-class="transition duration-100 ease-in"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <CartPopover
              v-if="isCartOpen"
              class="fixed inset-x-4 top-[84px] z-40 sm:absolute sm:inset-x-auto sm:top-full sm:left-1/2 sm:mt-3 sm:-translate-x-1/2"
              @close="isCartOpen = false"
            />
          </Transition>
        </div>
        <div ref="notificationsRoot" class="relative">
          <NavIconButton
            :label="t('nav.notifications')"
            :count="notifications.length"
            aria-haspopup="dialog"
            :aria-expanded="isNotificationsOpen"
            @click="isNotificationsOpen = !isNotificationsOpen"
          >
            <NotificationIcon class="size-6" aria-hidden="true" />
          </NavIconButton>
          <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            leave-active-class="transition duration-100 ease-in"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <NotificationsMenu
              v-if="isNotificationsOpen"
              :notifications="notifications"
              class="fixed inset-x-4 top-[84px] z-40 sm:absolute sm:inset-x-auto sm:top-full sm:left-1/2 sm:mt-3 sm:-translate-x-1/2"
              @close="isNotificationsOpen = false"
            />
          </Transition>
        </div>
        <LanguageSwitcher class="hidden sm:block" />
        <UserMenu class="hidden sm:block" :name="user.name" @logout="logout" />
        <button
          type="button"
          class="grid size-10 place-items-center rounded-full border-[0.5px] border-line bg-surface lg:hidden"
          :aria-label="t('nav.openMenu')"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-menu"
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
      id="mobile-menu"
      class="border-t border-line bg-white lg:hidden"
      :aria-label="t('nav.mainMenu')"
    >
      <ul class="page-container flex flex-col py-2">
        <li v-for="item in navItems" :key="item.key">
          <RouterLink
            :to="item.to"
            class="block rounded-lg p-3 text-button"
            :class="route.meta.nav === item.key ? 'bg-surface text-primary' : 'text-secondary'"
          >
            {{ t(`nav.${item.key}`) }}
          </RouterLink>
        </li>
        <li class="flex items-center gap-2 p-3 sm:hidden">
          <LanguageSwitcher align="start" />
          <UserMenu :name="user.name" @logout="logout" />
        </li>
      </ul>
    </nav>
  </header>
</template>

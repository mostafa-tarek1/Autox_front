<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import NotificationIcon from '@/assets/icons/notification-02--stroke-rounded.svg'
import CartIcon from '@/assets/icons/shopping-cart-01--stroke-rounded.svg'
import AppLogo from '@/components/ui/AppLogo.vue'
import { navItems } from '@/composables/useNavItems'

import LanguageSwitcher from './LanguageSwitcher.vue'
import NavIconButton from './NavIconButton.vue'
import UserMenu from './UserMenu.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const isMenuOpen = ref(false)

watch(
  () => route.fullPath,
  () => (isMenuOpen.value = false),
)

/** Mock session data for the UI phase. */
const user = { name: 'فهد العتيبي' }
const counts = { notifications: 3, cart: 5 }

function logout(): void {
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="sticky top-0 z-40 bg-white/90 shadow-soft backdrop-blur-[16px]">
    <div class="page-container flex h-[72px] items-center justify-between gap-4">
      <RouterLink :to="{ name: 'home' }" class="shrink-0" :aria-label="t('nav.home')">
        <AppLogo class="h-8 w-28" />
      </RouterLink>

      <nav :aria-label="t('nav.mainMenu')" class="hidden lg:block">
        <ul class="flex items-center gap-2">
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
        <NavIconButton :label="t('nav.cart')" :count="counts.cart" to="/cart">
          <CartIcon class="size-6" aria-hidden="true" />
        </NavIconButton>
        <NavIconButton :label="t('nav.notifications')" :count="counts.notifications">
          <NotificationIcon class="size-6" aria-hidden="true" />
        </NavIconButton>
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

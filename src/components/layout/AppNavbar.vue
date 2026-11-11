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
import UserMenu from './UserMenu.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const isMenuOpen = ref(false)
const isCartOpen = ref(false)
const cartRoot = useTemplateRef<HTMLElement>('cartRoot')
const { itemsCount } = storeToRefs(useCartStore())

onClickOutside(cartRoot, () => (isCartOpen.value = false))
watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false
    isCartOpen.value = false
  },
)

/** Mock session data for the UI phase. */
const user = { name: 'فهد العتيبي' }
const notificationsCount = 3

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
              class="fixed inset-x-4 top-[84px] z-40 sm:absolute sm:inset-x-auto sm:end-0 sm:top-full sm:mt-3"
              @close="isCartOpen = false"
            />
          </Transition>
        </div>
        <NavIconButton :label="t('nav.notifications')" :count="notificationsCount">
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

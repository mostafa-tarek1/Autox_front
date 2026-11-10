<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import ArrowDownIcon from '@/assets/icons/arrow-down-01--stroke-standard.svg'
import CardIcon from '@/assets/icons/credit-card-validation--stroke-rounded.svg'
import LogoutIcon from '@/assets/icons/logout-03--stroke-rounded.svg'
import BasketIcon from '@/assets/icons/shopping-basket-01--stroke-rounded.svg'
import AccountIcon from '@/assets/icons/user-account--stroke-rounded.svg'
import UserIcon from '@/assets/icons/user--duotone-rounded.svg'
import BaseDropdown from '@/components/ui/BaseDropdown.vue'
import DropdownItem from '@/components/ui/DropdownItem.vue'

defineProps<{ name: string }>()
const emit = defineEmits<{ logout: [] }>()
const { t } = useI18n()
const open = ref(false)
</script>

<template>
  <BaseDropdown v-model:open="open" align="end" width="w-[164px]">
    <template #trigger="{ toggle, menuId }">
      <button
        type="button"
        class="flex h-10 items-center gap-2 rounded-full border-[0.5px] border-line bg-surface py-1 ps-1 pe-2"
        :aria-label="t('nav.userMenu')"
        aria-haspopup="menu"
        :aria-expanded="open"
        :aria-controls="menuId"
        @click="toggle"
      >
        <span class="grid size-8 place-items-center rounded-full bg-white p-2 text-primary">
          <UserIcon class="size-4" aria-hidden="true" />
        </span>
        <span class="flex items-center gap-1">
          <span class="max-w-32 truncate text-body-md text-secondary">{{ name }}</span>
          <ArrowDownIcon class="size-4 text-ink" aria-hidden="true" />
        </span>
      </button>
    </template>
    <DropdownItem to="/account">
      <template #icon><AccountIcon class="size-5" aria-hidden="true" /></template>
      {{ t('nav.account') }}
    </DropdownItem>
    <DropdownItem to="/orders">
      <template #icon><BasketIcon class="size-5" aria-hidden="true" /></template>
      {{ t('nav.orders') }}
    </DropdownItem>
    <DropdownItem to="/payments">
      <template #icon><CardIcon class="size-5" aria-hidden="true" /></template>
      {{ t('nav.payments') }}
    </DropdownItem>
    <DropdownItem @select="emit('logout')">
      <template #icon><LogoutIcon class="size-5" aria-hidden="true" /></template>
      {{ t('nav.logout') }}
    </DropdownItem>
  </BaseDropdown>
</template>

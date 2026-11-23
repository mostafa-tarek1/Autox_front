<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import ArrowDownIcon from '@/assets/icons/arrow-down-01--stroke-standard.svg'
import LogoutIcon from '@/assets/icons/logout-03--stroke-rounded.svg'
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
  <BaseDropdown v-model:open="open" align="end" width="w-[194px]">
    <template #trigger="{ toggle, menuId }">
      <button
        type="button"
        class="flex h-10 items-center gap-2 rounded-full border-[0.5px] border-line bg-surface p-1 sm:pe-2"
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
          <span class="hidden max-w-32 truncate text-body-md text-secondary sm:inline">{{
            name
          }}</span>
          <ArrowDownIcon class="hidden size-4 text-secondary sm:block" aria-hidden="true" />
        </span>
      </button>
    </template>
    <DropdownItem :to="{ name: 'dashboard-profile' }">
      <template #icon><AccountIcon class="size-5" aria-hidden="true" /></template>
      {{ t('dashboard.profile') }}
    </DropdownItem>
    <DropdownItem class="text-error! hover:text-error!" @select="emit('logout')">
      <template #icon><LogoutIcon class="size-5" aria-hidden="true" /></template>
      {{ t('nav.logout') }}
    </DropdownItem>
  </BaseDropdown>
</template>

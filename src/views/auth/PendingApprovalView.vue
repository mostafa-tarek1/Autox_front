<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import UserCheckIcon from '@/assets/icons/user-check-01--duotone-rounded.svg'
import AuthCard from '@/components/auth/AuthCard.vue'
import AuthHeading from '@/components/auth/AuthHeading.vue'

const { t } = useI18n()
</script>

<template>
  <AuthCard aria-labelledby="pending-title" role="status">
    <span class="grid size-16 place-items-center rounded-full bg-white text-primary">
      <UserCheckIcon class="size-8" aria-hidden="true" />
    </span>
    <AuthHeading
      title-id="pending-title"
      :title="t('auth.pending.title')"
      :subtitle="t('auth.pending.subtitle')"
    />
  </AuthCard>
</template>

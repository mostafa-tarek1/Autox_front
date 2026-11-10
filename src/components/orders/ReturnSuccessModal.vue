<script setup lang="ts">
import { useId } from 'vue'
import { useI18n } from 'vue-i18n'

import TickIcon from '@/assets/icons/tick-02--solid-standard.svg'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'

/** "Return request sent" dialog (Figma 282:4387). */
const open = defineModel<boolean>('open', { default: false })
const { t } = useI18n()
const titleId = useId()
</script>

<template>
  <BaseModal
    v-model:open="open"
    tone="surface"
    panel-class="max-w-[320px] rounded-2xl! p-6"
    :labelled-by="titleId"
    :dismissible="false"
  >
    <div class="flex flex-col items-center gap-6">
      <div class="flex flex-col items-center gap-2">
        <span class="grid size-10 place-items-center rounded-full bg-accent text-primary">
          <TickIcon class="size-8" aria-hidden="true" />
        </span>
        <h2 :id="titleId" class="text-h4 text-secondary">{{ t('returns.success.title') }}</h2>
      </div>
      <BaseButton :to="{ name: 'returns' }" block>{{ t('returns.success.track') }}</BaseButton>
    </div>
  </BaseModal>
</template>
